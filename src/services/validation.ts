import tv4 from 'tv4';

interface IFormSchemaField {
  type: string;
  required?: boolean;
}

export interface IFormSchema {
  [key: string]: IFormSchemaField;
}

interface IJSONSchema {
  type: 'object';
  properties: object;
  required: string[];
}

const mapToJsonSchema = (schema: IFormSchema) => {
  return Object.keys(schema).reduce(
    (jsonSchema: IJSONSchema, key: string) => {
      const field = schema[key];
      switch (field.type) {
        case 'string':
          jsonSchema.properties[key] = { type: 'string' };
          if (field.required) {
            jsonSchema.properties[key].minLength = 1;
          }
          jsonSchema.required.push(key);
          break;
        case 'number':
          jsonSchema.properties[key] = { type: 'number' };
          jsonSchema.required.push(key);
          break;
        default:
          break;
      }
      return jsonSchema;
    },
    {
      type: 'object',
      properties: {},
      required: []
    }
  );
};

export const validateValues = <T>(values: T, schema: IFormSchema) => {
  const validationSchema = mapToJsonSchema(schema);

  const { errors: validationErrors } = tv4.validateMultiple(values, validationSchema);
  return validationErrors.reduce((errors, error) => {
    const { dataPath, message, code } = error;
    const fieldName = dataPath.substring(1);
    const fieldValue = code === 200 ? `${fieldName} is a required field` : message;
    errors[fieldName] = fieldValue;
    return errors;
  }, {});
};
