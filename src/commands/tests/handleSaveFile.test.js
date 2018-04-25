jest.mock('js-yaml');
jest.mock('../../../lib/fs-async');
import handleSaveFlag from '../handleSaveFlag';
import yaml from 'js-yaml';
import { writeFile } from '../../lib/fs-async';

describe('when handleSaveFlag', () => {
  const inputFile = '{"myConfig": "test"}';
  it('should writeFile if save flag is present', async () => {
    await handleSaveFlag(true, false, inputFile);
    expect(yaml.safeDump).toHaveBeenCalledWith(inputFile);
    expect(writeFile).toHaveBeenCalled();
  });

  it('should not writeFile if save flag is present', async () => {
    await handleSaveFlag(false, false, inputFile);
    expect(yaml.safeDump).not.toHaveBeenCalled();
    expect(writeFile).not.toHaveBeenCalled();
  });
});
