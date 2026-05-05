import type { GenerativeModel } from '@google/generative-ai';
import fs from 'fs';
import { parseJsonResponse } from './common.js';

type BestPracticeSeverity = 'must-fix' | 'nice-to-have';

type BestPracticeIssue = {
  severity: BestPracticeSeverity;
  filePath: string;
  message: string;
  recommendation: string;
};

type BestPracticeReview = {
  summary: string;
  issues: BestPracticeIssue[];
};

const BEST_PRACTICES_PROMPT = `
You are a senior frontend reviewer.
Review the code diff for best-practice issues.
Return ONLY valid JSON with exact shape:
{
  "summary": "string",
  "issues": [
    {
      "severity": "must-fix|nice-to-have",
      "filePath": "string",
      "message": "string",
      "recommendation": "string"
    }
  ]
}

Rules:
- Focus on readability, maintainability, testability, and reliability.
- Report only issues related to changed code.
- If no issues, return {"summary":"No best-practice issues found","issues":[]}
- Do not add markdown or extra text.
`;

export async function reviewBestPractices(
  model: GenerativeModel,
  diff: string,
): Promise<BestPracticeReview> {
  const fullPrompt = `${BEST_PRACTICES_PROMPT}\n\nCode Diff:\n${diff}`;
  const result = await model.generateContent(fullPrompt);
  const responseText = result.response.text();
  console.log(responseText)

  const review = parseJsonResponse<BestPracticeReview>(responseText);

  console.log('\n📐 Best Practices Review');
  console.log(`Summary: ${review.summary}`);
  for (const issue of review.issues) {
    console.log(`- [${issue.severity}] ${issue.filePath}: ${issue.message} -> ${issue.recommendation}`);
  }

  fs.writeFileSync('BEST_PRACTICES_REPORT.json', JSON.stringify(review, null, 2));
  console.log('💾 Saved to BEST_PRACTICES_REPORT.json');

  return review;
}
