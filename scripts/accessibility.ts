import type { GenerativeModel } from '@google/generative-ai';
import fs from 'fs';
import { parseJsonResponse } from './common.js';

type A11ySeverity = 'low' | 'medium' | 'high';

type A11yIssue = {
  filePath: string;
  line: number;
  severity: A11ySeverity;
  wcagTag: string;
  problem: string;
  exactFix: string;
};

type A11yAudit = {
  summary: string;
  issues: A11yIssue[];
};

const A11Y_PROMPT = `
You are a senior accessibility reviewer.
Review the code diff and return ONLY valid JSON with this exact shape:
{
  "summary": "string",
  "issues": [
    {
      "filePath": "string",
      "line": number,
      "severity": "low|medium|high",
      "wcagTag": "string",
      "problem": "string",
      "exactFix": "string"
    }
  ]
}

Rules:
- Report only real issues from changed lines.
- "exactFix" must be concrete and directly editable.
- If no issues, return {"summary":"No accessibility issues found","issues":[]}
- Do not add markdown or explanations outside JSON.
`;

export async function auditAccessibility(model: GenerativeModel, diff: string): Promise<A11yAudit> {
  const fullPrompt = `${A11Y_PROMPT}\n\nCode Diff:\n${diff}`;
  const result = await model.generateContent(fullPrompt);
  const responseText = result.response.text();
  console.log(responseText)
  const audit = parseJsonResponse<A11yAudit>(responseText);

  console.log('\n♿ Accessibility Audit Results');
  console.log(`Summary: ${audit.summary}`);
  if (audit.issues.length === 0) {
    console.log('✅ No accessibility issues found.');
  } else {
    for (const issue of audit.issues) {
      console.log(
        `- ${issue.filePath}:${issue.line} [${issue.severity.toUpperCase()}] ${issue.problem} -> ${issue.exactFix}`,
      );
    }
  }

  fs.writeFileSync('ACCESSIBILITY_REPORT.json', JSON.stringify(audit, null, 2));
  console.log('💾 Saved to ACCESSIBILITY_REPORT.json');

  return audit;
}