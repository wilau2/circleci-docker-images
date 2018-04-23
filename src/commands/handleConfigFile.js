import yaml from 'js-yaml';
import readFileAsync from '../fs-async/readFile';
import MandatoryFileInputFlagError from './MandatoryFileInputFlagError';

export default async function handleConfigFile(file) {
  if (file) {
    return yaml.safeLoad(await readFileAsync(file));
  }
  throw new MandatoryFileInputFlagError();
}
