import { auditAccessibility } from './accessibility.js';
import { reviewBestPractices } from './best_practices.js';
import { generatePRDescription } from './describe_pr.js';
import { generateTestCases } from './unit_tests.js';
import { getModel, getStagedDiff, getTaskArg, type AgentTask } from './common.js';

async function runTask(task: Exclude<AgentTask, 'all'>, diff: string): Promise<void> {
  const model = getModel();

  if (task === 'a11y') {
    await auditAccessibility(model, diff);
    return;
  }

  if (task === 'tests') {
    await generateTestCases(model, diff);
    return;
  }

  if (task === 'pr') {
    await generatePRDescription(model, diff);
    return;
  }

  if (task === 'best-practices') {
    await reviewBestPractices(model, diff);
  }
}

async function startAgent(): Promise<void> {
  const diff = await getStagedDiff();
  if (!diff.trim()) {
    console.log('No staged changes found.');
    return;
  }

  const task = getTaskArg();
  const tasks: Array<Exclude<AgentTask, 'all'>> =
    task === 'all' ? ['a11y', 'tests', 'pr', 'best-practices'] : [task];

  for (const currentTask of tasks) {
    console.log(`\n▶ Running task: ${currentTask}`);
    await runTask(currentTask, diff);
  }
}

startAgent().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});