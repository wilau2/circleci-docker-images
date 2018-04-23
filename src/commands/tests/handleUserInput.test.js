jest.mock('inquirer');
jest.mock('../../fs-async/readDir', () =>
  jest.fn().mockImplementation(() => ['enhancement1.yml', 'enhancement2.yml']),
);
import handleUserInput from '../handleUserInput';
import inquirer from 'inquirer';
import readDirAsync from '../../fs-async/readDir';

describe('when handleUserInput', () => {
  it('should call readDirAsync', async () => {
    await handleUserInput({});
    expect(readDirAsync).toHaveBeenCalled();
  });
  describe('and has workflow', () => {
    const configFile = { workflows: { pipelineName: [] } };
    it('should call prompt with proper params', async () => {
      await handleUserInput(configFile);
      expect(inquirer.prompt).toHaveBeenCalledWith([
        { choices: ['pipelineName'], message: 'Select pipeline', name: 'pipeline', type: 'list' },
        {
          choices: [{ name: 'enhancement1' }, { name: 'enhancement2' }],
          message: 'Select enhancements',
          name: 'enhancements',
          type: 'checkbox',
        },
      ]);
    });
  });
  describe('and has no workflow', () => {
    const configFile = {};

    it('should return default pipeline name', async () => {
      await handleUserInput(configFile);
      expect(inquirer.prompt).toHaveBeenCalledWith([
        {
          choices: ['default-pipeline-name'],
          message: 'Select pipeline',
          name: 'pipeline',
          type: 'list',
        },
        {
          choices: [{ name: 'enhancement1' }, { name: 'enhancement2' }],
          message: 'Select enhancements',
          name: 'enhancements',
          type: 'checkbox',
        },
      ]);
    });
  });
});
