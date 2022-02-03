import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv({
  coerceTypes: true,
  useDefaults: true,
});
addFormats(ajv);

export const validateEnv: (
  validationSchema: object,
  options?: {
    requiredProperties?: string[];
    coerceVars?: boolean;
  },
) => void = (validationSchema, options = { coerceVars: true }) => {
  const { requiredProperties, coerceVars } = options;

  if (!validationSchema) {
    throw new Error(
      'Impossible to load environment variables validation schema.',
    );
  }

  const schema = {
    type: 'object',
    properties: {
      ...validationSchema,
    },
    required: requiredProperties,
  };

  const validate = ajv.compile(schema);

  const data = { ...process.env };

  if (!validate(data)) {
    throw new Error(
      ajv.errorsText(validate.errors, { dataVar: 'process.env' }),
    );
  }

  if (typeof coerceVars === 'undefined' ? true : coerceVars) {
    process.env = data;
  }
};

enum Environment {
  PRODUCTION = 'production',
  DEVELOPMENT = 'development',
  TEST = 'test',
}

export const currentEnv = (
  !!process.env.NODE_ENV && process.env.NODE_ENV !== undefined
    ? process.env.NODE_ENV
    : Environment.DEVELOPMENT
)
  ?.toString()
  ?.toLowerCase()
  ?.trim();
export const isProductionEnv = currentEnv === Environment.PRODUCTION;
export const isDevelopmentEnv = currentEnv === Environment.DEVELOPMENT;
export const isTestEnv = currentEnv === Environment.TEST;
export const isDeployedEnv =
  currentEnv !== Environment.DEVELOPMENT && currentEnv !== Environment.TEST;
