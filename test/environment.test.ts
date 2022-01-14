describe('NODE_ENV verifiers', () => {
  beforeEach(() => {
    jest.resetModules(); // Most important - it clears the cache
    delete process.env.NODE_ENV;
  });

  describe('currentEnv', () => {
    it('expect to return a string', () => {
      const { currentEnv } = require('../src');
      expect(typeof currentEnv).toEqual('string');
    });

    it('should return development if no NODE_ENV is precised', () => {
      const { currentEnv } = require('../src');
      expect(currentEnv).toEqual('development');
    });

    it('should return env if NODE_ENV is precised', () => {
      const environment = 'preproduction';
      process.env.NODE_ENV = environment;

      const { currentEnv } = require('../src');
      expect(currentEnv).toEqual(environment);
    });

    it('should return env with trim and without upper case', () => {
      const environment = ' THISISATEST  ';
      process.env.NODE_ENV = ' THISISATEST  ';

      const { currentEnv } = require('../src');
      expect(currentEnv).toEqual(environment.trim().toLowerCase());
    });
  });

  describe('isProductionEnv', () => {
    it('expect to return a boolean', () => {
      const { isProductionEnv } = require('../src');
      expect(typeof isProductionEnv).toEqual('boolean');
    });

    it('should return true if NODE_ENV is production', () => {
      process.env.NODE_ENV = 'production';
      const { isProductionEnv } = require('../src');
      expect(isProductionEnv).toEqual(true);
    });

    it('should return false if NODE_ENV is not production', () => {
      let isProductionEnv = require('../src').isProductionEnv;
      expect(isProductionEnv).toEqual(false);
      jest.resetModules();

      process.env.NODE_ENV = 'development';
      isProductionEnv = require('../src').isProductionEnv;
      expect(isProductionEnv).toEqual(false);
      jest.resetModules();

      process.env.NODE_ENV = 'production';
      isProductionEnv = require('../src').isProductionEnv;
      expect(isProductionEnv).toEqual(true);
    });
  });

  describe('isDevelopmentEnv', () => {
    it('expect to return a boolean', () => {
      const { isDevelopmentEnv } = require('../src');
      expect(typeof isDevelopmentEnv).toEqual('boolean');
    });

    it('should return true if NODE_ENV is development or undefined', () => {
      let isDevelopmentEnv = require('../src').isDevelopmentEnv;
      expect(isDevelopmentEnv).toEqual(true);
      jest.resetModules();

      process.env.NODE_ENV = 'development';
      isDevelopmentEnv = require('../src').isDevelopmentEnv;
      expect(isDevelopmentEnv).toEqual(true);
    });

    it('should return false if NODE_ENV is not development or undefined', () => {
      process.env.NODE_ENV = 'thisisatest';
      let isDevelopmentEnv = require('../src').isDevelopmentEnv;
      expect(isDevelopmentEnv).toEqual(false);
      jest.resetModules();

      process.env.NODE_ENV = 'production';
      isDevelopmentEnv = require('../src').isDevelopmentEnv;
      expect(isDevelopmentEnv).toEqual(false);
      jest.resetModules();

      process.env.NODE_ENV = 'test';
      isDevelopmentEnv = require('../src').isDevelopmentEnv;
      expect(isDevelopmentEnv).toEqual(false);
    });
  });

  describe('isTestEnv', () => {
    it('expect to return a boolean', () => {
      const { isTestEnv } = require('../src');
      expect(typeof isTestEnv).toEqual('boolean');
    });

    it('should return true if NODE_ENV is test', () => {
      process.env.NODE_ENV = 'test';
      const isTestEnv = require('../src').isTestEnv;
      expect(isTestEnv).toEqual(true);
    });

    it('should return false if NODE_ENV is not test', () => {
      process.env.NODE_ENV = 'thisisatest';
      let isTestEnv = require('../src').isTestEnv;
      expect(isTestEnv).toEqual(false);
      jest.resetModules();

      process.env.NODE_ENV = 'production';
      isTestEnv = require('../src').isTestEnv;
      expect(isTestEnv).toEqual(false);
      jest.resetModules();

      process.env.NODE_ENV = 'development';
      isTestEnv = require('../src').isTestEnv;
      expect(isTestEnv).toEqual(false);
    });
  });

  describe('isDeployedEnv', () => {
    it('expect to return a boolean', () => {
      const { isDeployedEnv } = require('../src');
      expect(typeof isDeployedEnv).toEqual('boolean');
    });

    it('should return false if NODE_ENV is development or test', () => {
      process.env.NODE_ENV = 'development';
      let isDeployedEnv = require('../src').isDeployedEnv;
      expect(isDeployedEnv).toEqual(false);
      jest.resetModules();

      process.env.NODE_ENV = 'test';
      isDeployedEnv = require('../src').isDeployedEnv;
      expect(isDeployedEnv).toEqual(false);
    });

    it('should return true if NODE_ENV is not development', () => {
      process.env.NODE_ENV = 'thisisatest';
      let isDeployedEnv = require('../src').isDeployedEnv;
      expect(isDeployedEnv).toEqual(true);
      jest.resetModules();

      process.env.NODE_ENV = 'production';
      isDeployedEnv = require('../src').isDeployedEnv;
      expect(isDeployedEnv).toEqual(true);
    });
  });
});
