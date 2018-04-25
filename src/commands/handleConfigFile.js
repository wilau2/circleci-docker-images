import yaml from 'js-yaml';
import { readFile } from '../lib/fs-async';
import MandatoryFileOrInitOptionFlagError from './MandatoryFileInputFlagError';

export default async function handleConfigFile(file, init) {
  if (file) {
    return yaml.safeLoad(await readFile(file));
  } else if (init) {
    return {};
  }
  throw new MandatoryFileOrInitOptionFlagError();
}
