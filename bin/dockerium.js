#!/usr/bin/env node

import program from 'commander';
import inquirer from 'inquirer';
import fs from 'fs';
import pkg from '../package';
import { promisify } from 'util';
import { exec } from 'child_process';

const writeFileAsync = promisify(fs.writeFile);
const readFileAsync = promisify(fs.readFile);
const readDirAsync = promisify(fs.readdir);

program
  .version(pkg.version)
  .option('-d, --development', 'Development mode')
  .option('-i, --interactive', 'Interactive mode')
  .option('-b, --build', 'Build docker image')
  .parse(process.argv);


console.log('You are building a docker image for circleci');
let test = async () => {
  const integrations = await readDirAsync(`${__dirname}/docker`);

  let answers;
  if (program.development) {
    answers = {
      "base_image": "circleci/node:8",
      "integrations": [
        "codepush",
        "firebase"
      ],
      "scripts": true,
      "circleci_template": true,
      "circleci_commit_lint_step": true,
      "circleci_build_infra_step": true,
      "circleci_gitbook_firebase_step": true
    };
  } else {
    answers = await inquirer.prompt([
      {
        type: 'input',
        message: 'Type initial docker image name?',
        name: 'base_image',
        default: 'circleci/node:8',
        validate: function(answer) {
          shouldNotBeEmpty(answer, this.name);
          if (!answer.includes("circleci/")) return "Base image should contain circleci/";
          return true;
        },
      },
      {
        type: 'checkbox',
        message: 'Select integrations',
        name: 'integrations',
        choices: integrations.map((integration) => ({name: integration})),
      },
    ])
  }

  console.log(JSON.stringify(answers, null, '  '));
  await createDockerfile(answers);

  if(program.build){
    exec()
  }
};

const shouldNotBeEmpty = (answer, name) => {
  if (answer === "") return `${name} should not be empty`;
};

const createDockerfile = async (answers) => {
  let dockerfileContent = "";
  dockerfileContent += from(answers.base_image);
  dockerfileContent += copy('scripts', 'scripts');
  dockerfileContent += await addIntegrations(answers.integrations);
  try {
    await writeFileAsync(`${__dirname}/Dockerfile`, dockerfileContent);
  } catch (error) {
    console.error(error);
  }
};

const addIntegrations = async (integrations) => {
  const readingFiles = integrations.map(async (integration) => {
    return await readFileAsync(`${__dirname}/docker/${integration}`);
  });
  let files = await Promise.all(readingFiles);
  return files.join('\r\n');
};

const from = (string) => (
  `FROM ${writeNewLine(string)}`
);

const copy = (from, to) => (
  `COPY ${writeNewLine(`${from} ${to}`)}`
);

const writeNewLine = (string) => (
   string + '\r\n'
);

test();


