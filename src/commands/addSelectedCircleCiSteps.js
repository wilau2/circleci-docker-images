import yaml from 'js-yaml';
import { readFile } from '../lib/fs-async';

const handleAddReferences = (config, enhancementName, enhancementYml) => {
  const referenceName = `${enhancementName}-container`;
  if (!config.references) {
    config['references'] = {};
  }

  config.references[referenceName] = enhancementYml.references[referenceName];
};

const handleAddJobs = (config, enhancementName, enhancementYml) => {
  if (!config.jobs) {
    config['jobs'] = {};
  }
  config.jobs[enhancementName] = enhancementYml.jobs[enhancementName];
};

const handleAddWorkflows = (config, enhancementName, answers) => {
  if (!config.workflows) {
    config['workflows'] = { version: 2 };
  }
  if (!config.workflows[answers.pipeline]) {
    config.workflows[answers.pipeline] = { jobs: [] };
  }
  config.workflows[answers.pipeline].jobs.push(enhancementName);
};

const getSelectedTemplates = async (answers) => {
  const readingFiles = answers.enhancements.map(async (enhancement) => {
    return await readFile(`${process.cwd()}/src/circleci/${enhancement}.yml`);
  });

  return await Promise.all(readingFiles);
};

export default async (answers, config) => {
  let templates = await getSelectedTemplates(answers);
  templates.map((template, index) => {
    const enhancementYml = yaml.safeLoad(template); // TODO change place after test implementation
    const enhancementName = answers.enhancements[index];
    handleAddReferences(config, enhancementName, enhancementYml);
    handleAddJobs(config, enhancementName, enhancementYml);
    handleAddWorkflows(config, enhancementName, answers);
  });
};
