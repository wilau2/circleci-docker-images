import yaml from 'js-yaml';
import { writeFile, exists, mkdir } from '../../lib/fs-async';

export default async (saveFlag, initFlag, inputFile) => {
  let filePath;
  if (saveFlag) {
    filePath = saveFlag;
  }
  if (initFlag) {
    const dir = `${__dirname}/../../.circleci`;
    if (!exists(dir)) {
      mkdir(dir);
    }
    filePath = `${dir}/config.yml`;
  }
  if (filePath) {
    const yamlInputFile = yaml.safeDump(inputFile);
    await writeFile(filePath, yamlInputFile);
  }
};
