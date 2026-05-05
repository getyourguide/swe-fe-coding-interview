import 'dotenv/config';
import { GoogleGenerativeAI, type GenerativeModel } from '@google/generative-ai';
import { simpleGit } from 'simple-git';

export type AgentTask = 'a11y' | 'tests' | 'pr' | 'best-practices' | 'all';

export function getModel(): GenerativeModel {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('Missing GEMINI_API_KEY environment variable.');
  }
  const genAI = new GoogleGenerativeAI(apiKey);
  return genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL });
}

export async function getStagedDiff(): Promise<string> {
  const git = simpleGit();
  return git.diff(['--cached']);
}

export function parseJsonResponse<T>(rawText: string): T {
  const fenced = rawText.match(/```[a-zA-Z]*\s*([\s\S]*?)```/);
  const clean = (fenced?.[1] ?? rawText).trim();
  try {
    return JSON.parse(clean) as T;
  } catch {
    const withoutLanguagePrefix = clean.replace(/^[a-zA-Z]+\s*\n/, '').trim();
    return JSON.parse(withoutLanguagePrefix) as T;
  }
}

export function getTaskArg(): AgentTask {
  const index = process.argv.indexOf('--task');
  if (index < 0) {
    return 'all';
  }
  const value = process.argv[index + 1];
  const allowed: AgentTask[] = ['a11y', 'tests', 'pr', 'best-practices', 'all'];
  if (!value || !allowed.includes(value as AgentTask)) {
    return 'all';
  }
  return value as AgentTask;
}
