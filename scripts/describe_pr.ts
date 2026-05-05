import fs from 'fs';
import type { GenerativeModel } from '@google/generative-ai';

const PR_PROMPT = `
You are a lead engineer writing a PR description.
Return markdown only with these exact sections in order:
## Summary
## Traveler Impact
## Technical Changes
## Testing Status

Rules:
- Be concise and factual.
- Mention only changes visible in the diff.
`;

export async function generatePRDescription(model: GenerativeModel, diff: string): Promise<string> {
  const fullPrompt = `${PR_PROMPT}\n\nCode Diff:\n${diff}`;
  const result = await model.generateContent(fullPrompt);
  const description = result.response.text();

  fs.writeFileSync('PR_DESCRIPTION.md', description);
  console.log('\n📝 PR Description generated and saved to PR_DESCRIPTION.md');

  return description;
}