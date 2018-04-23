import yaml from 'js-yaml';
import writeFileAsync from '../fs-async/writeFile';
import fs from 'fs';
export default async (saveFlag, initFlag, inputFile) => {
  const yamlInputFile = yaml.safeDump(inputFile);
  if (saveFlag) {
    await writeFileAsync(saveFlag, yamlInputFile);
  }
  if (initFlag) {
    const dir = `${__dirname}/../../.circleci`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    await writeFileAsync(`${dir}/config.yml`, yamlInputFile);
  }
};
