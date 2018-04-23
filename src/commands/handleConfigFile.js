import yaml from 'js-yaml';
import readFileAsync from '../fs-async/readFile';
import MandatoryFileOrInitOptionFlagError from './MandatoryFileInputFlagError';

export default async function handleConfigFile(file, init) {
  if (file) {
    return yaml.safeLoad(await readFileAsync(file));
  } else if (init) {
    return {};
  }
  throw new MandatoryFileOrInitOptionFlagError('MandatoryFileOrInitOptionFlagError');
}
