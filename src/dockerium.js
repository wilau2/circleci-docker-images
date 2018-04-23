#!/usr/bin/env node

import program from 'commander';
import inquirer from 'inquirer';
import fs from 'fs';
import pkg from '../package';
import { promisify } from 'util';
import { execSync } from 'child_process';

const writeFileAsync = promisify(fs.writeFile);
const readFileAsync = promisify(fs.readFile);
const readDirAsync = promisify(fs.readdir);

program
  .version(pkg.version)
  .usage('[options]')
  .option('-f, --file [path]', 'input file')
  .option('-d, --development', 'development mode')
  .option('-s, --save [path]', 'save output file')
  .option('-b, --build [tag]', 'build docker image')
  .parse(process.argv);

console.log('You are building a docker image for circleci');
const main = async () => {
  const answers = await getAnswers(program);
  await createDockerfile(answers);

  if (program.save) {
    console.log('saving config to external file');
    await writeFileAsync(program.save, JSON.stringify(answers));
  }

  if (program.build) {
    console.log(`building docker image ${program.build} from config`);
    execSync(`docker build -t ${program.build} ./bin/ --no-cache`);
  }
};

const getAnswers = async (program) => {
  let answers;
  if (program.development) {
    answers = JSON.parse(await readFileAsync(`${__dirname}/mocked_answers.json`));
  } else if (program.file) {
    answers = JSON.parse(await readFileAsync(program.file));
  } else {
    answers = await prompt();
  }
  console.log(JSON.stringify(answers, null, '  '));
  return answers;
};

const prompt = async () => {
  const integrations = await readDirAsync(`${__dirname}/docker`);
  return await inquirer.prompt([
    {
      type: 'input',
      message: 'Type initial docker image name?',
      name: 'base_image',
      default: 'circleci/node:8',
      validate: function(answer) {
        shouldNotBeEmpty(answer, this.name);
        if (!answer.includes('circleci/')) return 'Base image should contain circleci/';
        return true;
      },
    },
    {
      type: 'checkbox',
      message: 'Select integrations',
      name: 'integrations',
      choices: integrations.map((integration) => ({ name: integration })),
    },
  ]);
};

const shouldNotBeEmpty = (answer, name) => {
  if (answer === '') return `${name} should not be empty`;
};

const createDockerfile = async (answers) => {
  let dockerfileContent = '';
  dockerfileContent += from(answers.base_image) + '\r\n';
  dockerfileContent += await addIntegrations(answers.integrations);
  dockerfileContent += copy('scripts', 'scripts');
  await writeFileAsync(`${__dirname}/Dockerfile`, dockerfileContent);
};

const addIntegrations = async (integrations) => {
  const readingFiles = integrations.map(async (integration) => {
    return await readFileAsync(`${__dirname}/docker/${integration}`);
  });
  let files = await Promise.all(readingFiles);
  return files.join('\r\n');
};

const from = (string) => `FROM ${string}`;

const copy = (from, to) => writeNewLine(`COPY ${from} ${to}`);

const writeNewLine = (string) => '\r\n' + string;

main().then(
  () => {
    console.log('Success');
  },
  () => {
    console.error('Something went wrong');
  },
);
