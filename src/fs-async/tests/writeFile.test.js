import writeFile from '../writeFile';
import readFile from '../readFile';

describe('when readFile asynchronously', () => {
  it('should return file content', async () => {
    const filePath = `${__dirname}/__mocks__/newFile`;
    await writeFile(filePath, 'newText');
    const fileContent = await readFile(filePath);
    expect(fileContent.toString()).toEqual('newText');
  });
});
