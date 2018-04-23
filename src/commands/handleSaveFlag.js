import yaml from 'js-yaml';
import writeFileAsync from '../fs-async/writeFile';

export default async (saveFlag, inputFile) => {
  if (saveFlag) {
    const yamlInputFile = yaml.safeDump(inputFile);
    await writeFileAsync(saveFlag, yamlInputFile);
  }
};
