import type { GenerativeModel } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';
import { parseJsonResponse } from './common.js';

type TestGenerationResult = {
  targetTestFile: string;
  rationale: string;
  testCode: string;
};

type TestWriteResult = TestGenerationResult & {
  writtenTo: string;
  writeMode: 'created' | 'appended';
};

const TEST_GEN_PROMPT = `
You are a senior QA engineer.
Generate Vitest test cases from the code diff.
Return ONLY valid JSON with exact shape:
{
  "targetTestFile": "string",
  "rationale": "string",
  "testCode": "string"
}

Rules:
- testCode must be plain TypeScript code (no markdown fences).
- Cover happy path, edge cases, and error behavior.
- Keep tests focused on changed logic only.
- Do not add any text outside JSON.
`;

export async function generateTestCases(
  model: GenerativeModel,
  diff: string,
): Promise<TestWriteResult> {
  const fullPrompt = `${TEST_GEN_PROMPT}\n\nCode Diff:\n${diff}`;
  const result = await model.generateContent(fullPrompt);
  const responseText = result.response.text();
  console.log(responseText)

  const parsed = parseJsonResponse<TestGenerationResult>(responseText);
  const written = writeGeneratedTests(parsed.targetTestFile, parsed.testCode);

  console.log('\n🧪 Generated Test Cases');
  console.log(`Target: ${written.writtenTo}`);
  console.log(`Reason: ${parsed.rationale}`);
  console.log(`Write mode: ${written.writeMode}`);

  return { ...parsed, ...written };
}

function writeGeneratedTests(targetTestFile: string, rawCode: string): {
  writtenTo: string;
  writeMode: 'created' | 'appended';
} {
  const cleanCode = sanitizeAiCode(rawCode);
  const resolvedPath = resolveTestFilePath(targetTestFile);
  const dir = path.dirname(resolvedPath);
  fs.mkdirSync(dir, { recursive: true });

  if (fs.existsSync(resolvedPath)) {
    fs.appendFileSync(
      resolvedPath,
      `\n\n// New tests generated on ${new Date().toLocaleDateString()}\n${cleanCode}`,
    );
    return { writtenTo: resolvedPath, writeMode: 'appended' };
  }

  fs.writeFileSync(resolvedPath, `${cleanCode}\n`);
  return { writtenTo: resolvedPath, writeMode: 'created' };
}

function resolveTestFilePath(targetTestFile: string): string {
  const ext = path.extname(targetTestFile);
  if (ext) {
    return targetTestFile;
  }
  return path.join(targetTestFile, 'generated.test.ts');
}

function sanitizeAiCode(rawCode: string): string {
  const codeBlockRegex = /```(?:typescript|javascript|ts|js)?\n([\s\S]*?)```/;
  const match = rawCode.match(codeBlockRegex);
  return (match?.[1] ?? rawCode).trim();
}