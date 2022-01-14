describe('Validate environment variables', () => {
  describe('validateEnv', () => {
    beforeEach(() => {
      jest.resetModules(); // Most important - it clears the cache
      delete process.env.NODE_ENV;
    });

    it('expect to be a function', () => {
      const { validateEnv } = require('../src');
      expect(typeof validateEnv).toEqual('function');
    });

    it('should return error if schema is not defined', () => {
      try {
        const { validateEnv } = require('../src');
        validateEnv();
      } catch (e) {
        expect((e as Error).message).toBe(
          'Impossible to load environment variables validation schema.',
        );
      }
    });

    it('should return error if required properties is not given', () => {
      try {
        const { validateEnv } = require('../src');

        validateEnv(
          {
            NODE_ENV: { type: 'string' },
          },
          { requiredProperties: ['NODE_ENV'] },
        );
      } catch (e) {
        expect((e as Error).message).toBe(
          "process.env must have required property 'NODE_ENV'",
        );
      }
    });

    it('should return error if properties is not valid', () => {
      try {
        const { validateEnv } = require('../src');

        process.env.NODE_ENV = 'test';

        validateEnv({
          NODE_ENV: { type: 'string', enum: ['ceciestunstringnotvalid'] },
        });
      } catch (e) {
        expect((e as Error).message).toBe(
          'process.env/NODE_ENV must be equal to one of the allowed values',
        );
      }
    });

    it('should return nothing', () => {
      const { validateEnv } = require('../src');

      process.env.NODE_ENV = 'test';
      process.env.FALSE_VAR = 'thisisatesttoo';

      expect(
        validateEnv(
          {
            NODE_ENV: { type: 'string', enum: ['test'] },
          },
          { requiredProperties: ['NODE_ENV'] },
        ),
      ).toBeUndefined();
    });
  });
});
