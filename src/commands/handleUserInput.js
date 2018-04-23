import inquirer from 'inquirer';
import readDirAsync from '../fs-async/readDir';

const getPipelineNameChoices = (configFile) => {
  if (configFile.workflows) {
    return Object.keys(configFile.workflows).filter((key) => key !== 'version');
  }
  return ['default-pipeline-name'];
};

const getEnhancementChoices = (enhancements) => {
  return enhancements.map((enhancement) => ({
    name: enhancement.split('.')[0],
  }));
};

export default async (configFile) => {
  const enhancements = await readDirAsync(`${__dirname}/../circleci`);
  return await inquirer.prompt([
    {
      type: 'list',
      message: 'Select pipeline',
      name: 'pipeline',
      choices: getPipelineNameChoices(configFile),
    },
    {
      type: 'checkbox',
      message: 'Select enhancements',
      name: 'enhancements',
      choices: getEnhancementChoices(enhancements),
    },
  ]);
};
