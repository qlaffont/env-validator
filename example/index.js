const { validateEnv } = require('env-validator');

validateEnv(
  {
    NODE_ENV: { type: 'string' },
    PORT: { type: 'integer' },
  },
  {
    requiredProperties: ['NODE_ENV'],
  },
);
