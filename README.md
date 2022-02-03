[![Maintainability](https://api.codeclimate.com/v1/badges/9d8e089c9e3e1115302f/maintainability)](https://codeclimate.com/github/qlaffont/env-vars-validator/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/9d8e089c9e3e1115302f/test_coverage)](https://codeclimate.com/github/qlaffont/env-vars-validator/test_coverage) ![npm](https://img.shields.io/npm/v/env-vars-validator) ![npm](https://img.shields.io/npm/dm/env-vars-validator) ![Snyk Vulnerabilities for npm package](https://img.shields.io/snyk/vulnerabilities/npm/env-vars-validator) ![NPM](https://img.shields.io/npm/l/env-vars-validator)
# env-vars-validator

A library who will validate your environment variables from AJV schema.

## Usage

```js
const { validateEnv } = require("env-vars-validator")

validateEnv(
  {
    NODE_ENV: { type: 'string' },
    PORT: { type: 'integer' },
  },
  {
    requiredProperties: ['NODE_ENV'],
  },
);
```

## API

### validateEnv(schema, options?)

Return: `void`

Able to validate env var from [Ajv Properties Fields](https://ajv.js.org/json-schema.html).

**Options**

| Field Name | Type | Default | Description |
| --- | --- | --- | --- |
| requiredProperties | string[] | []  | Indicate if field is required (*More Information :* [JSON Schema Required](https://ajv.js.org/json-schema.html#required)) |
| coercevars         | boolean  | true | Indicate if fields will be cast to type (*Example:* NODE_ENV will be cast to number in our usage example) |

### currentEnv

Default: `development`

Return: `Boolean`

Return current NODE_ENV without space and in lowercase format

### isProductionEnv

Return: `Boolean`

Return if NODE_ENV is equal to `production`

### isDevelopmentEnv

Return: `Boolean`

Return if NODE_ENV is equal to `development`

### isTestEnv

Return: `Boolean`

Return if NODE_ENV is equal to `test`

### isDeployedEnv

Return: `Boolean`

Return if NODE_ENV is **not equal** to `development` and to `test`

## Maintain

This package use [TSdx](https://github.com/jaredpalmer/tsdx). Please check documentation to update this package.
