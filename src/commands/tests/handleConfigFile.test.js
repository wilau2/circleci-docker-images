import handleConfigFile from '../handleConfigFile';
import MandatoryFileInputFlagError from '../MandatoryFileInputFlagError';

describe('when handleConfigFile', () => {
  it('should return a javascript object', async () => {
    const config = await handleConfigFile(`${__dirname}/__mocks__/config.yml`);
    expect(config.version).toEqual(2);
  });

  it('should reject when no file as argument', () => {
    expect(handleConfigFile(false)).rejects.toEqual(new MandatoryFileInputFlagError());
    expect(handleConfigFile(undefined)).rejects.toEqual(new MandatoryFileInputFlagError());
  });
});
