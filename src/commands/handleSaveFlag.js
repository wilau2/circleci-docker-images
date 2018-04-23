import yaml from 'js-yaml';
import { writeFile, exists, mkdir } from '../fs-async';

export default async (saveFlag, initFlag, inputFile) => {
  const yamlInputFile = yaml.safeDump(inputFile);
  if (saveFlag) {
    await writeFile(saveFlag, yamlInputFile);
  }
  if (initFlag) {
    const dir = `${__dirname}/../../.circleci`;
    if (!exists(dir)) {
      mkdir(dir);
    }
    await writeFile(`${dir}/config.yml`, yamlInputFile);
  }
};
