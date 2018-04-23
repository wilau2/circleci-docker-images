import readFile from '../readFile';

describe('when readFile asynchronously', () => {
  it('should return file content', async () => {
    const text = await readFile(`${__dirname}/__mocks__/mockedFile`);
    expect(text.toString()).toEqual('anyText');
  });
});
