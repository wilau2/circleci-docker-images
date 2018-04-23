jest.mock('js-yaml');
jest.mock('../../fs-async/writeFile');
import handleSaveFlag from '../handleSaveFlag';
import yaml from 'js-yaml';
import writeFileAsync from '../../fs-async/writeFile';

describe('when handleSaveFlag', () => {
  const inputFile = '{"myConfig": "test"}';
  it('should writeFile if save flag is present', async () => {
    await handleSaveFlag(true, inputFile);
    expect(yaml.safeDump).toHaveBeenCalledWith(inputFile);
    expect(writeFileAsync).toHaveBeenCalled();
  });

  it('should not writeFile if save flag is present', async () => {
    await handleSaveFlag(false, inputFile);
    expect(yaml.safeDump).not.toHaveBeenCalled();
    expect(writeFileAsync).not.toHaveBeenCalled();
  });
});
