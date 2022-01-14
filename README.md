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
