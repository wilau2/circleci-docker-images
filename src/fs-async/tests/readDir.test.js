import readDir from '../readDir';

describe('when readDir asynchronously', () => {
  it('should return array of file names', async () => {
    const files = await readDir(`${__dirname}/__mocks__/dir`);
    expect(files).toEqual(['aFile']);
  });
});
