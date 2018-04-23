#!/usr/bin/env node

import program from 'commander';
import pkg from '../package';
import handleConfigFile from './commands/handleConfigFile';
import handleSaveFlag from './commands/handleSaveFlag';
import handleUserInput from './commands/handleUserInput';
import addSelectedCircleCiSteps from './commands/addSelectedCircleCiSteps';

program
  .version(pkg.version)
  .usage('[options]')
  .option('-f, --file [path]', 'config file')
  .option('-s, --save [path]', 'save output file')
  .parse(process.argv);

console.log('You are enhancing your circleci pipeline');

const circleCiTools = async ({ file, save }) => {
  const config = await handleConfigFile(file);
  const answers = await handleUserInput(config);
  await addSelectedCircleCiSteps(answers, config);
  await handleSaveFlag(save, config);
};

circleCiTools(program).then(
  () => {
    console.log('Success');
  },
  () => {
    console.error('Something went wrong');
  },
);
