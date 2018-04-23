import addSelectedCircleCiSteps from '../addSelectedCircleCiSteps';

describe('when addSelectedCircleCiSteps', () => {
  it('should work when empty circleci file', async () => {
    const config = {};
    await addSelectedCircleCiSteps(
      { enhancements: ['commitlint'], pipeline: 'pipelineName' },
      config,
    );
    expect(config.workflows.pipelineName.jobs).toEqual(['commitlint']);
    expect(config.references).toHaveProperty('commitlint-container');
    expect(config.jobs).toHaveProperty('commitlint');
  });
  it('should work when existing file', async () => {
    const config = { references: {}, jobs: {}, workflows: { pipelineName: { jobs: [] } } };
    await addSelectedCircleCiSteps(
      { enhancements: ['commitlint'], pipeline: 'pipelineName' },
      config,
    );
    expect(config.workflows.pipelineName.jobs).toEqual(['commitlint']);
    expect(config.references).toHaveProperty('commitlint-container');
    expect(config.jobs).toHaveProperty('commitlint');
  });
});
