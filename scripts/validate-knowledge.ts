import { entities, relationships, sources } from '../data/augustine';
import { validateKnowledgeDataset } from '../lib/knowledge/validate';

const issues = validateKnowledgeDataset({ entities, relationships, sources });

if (issues.length > 0) {
  console.error('Knowledge validation failed:');
  for (const issue of issues) console.error(`- [${issue.code}] ${issue.message}`);
  process.exit(1);
}

console.log(`Knowledge validation passed: ${entities.length} entities, ${relationships.length} relationships, ${sources.length} sources.`);
