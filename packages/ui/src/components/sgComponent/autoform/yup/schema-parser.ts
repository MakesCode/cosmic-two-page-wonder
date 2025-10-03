import * as yup from "yup";
import { inferFieldType } from "@ui/components/sgComponent/autoform/yup/field-type-inference";
import { getYupFieldDefaultValue } from "@ui/components/sgComponent/autoform/yup/default-values";
import { getYupFieldConfig } from "@ui/components/sgComponent/autoform/yup/field-config";
import { YupEnumSchema, YupField, YupObjectOrWrapped } from "@ui/components/sgComponent/autoform/yup/types";
import { ParsedField, ParsedSchema } from "@ui/components/sgComponent/autoform/core/types";

function parseField(key: string, schema: YupField): ParsedField {
  const fieldConfig = getYupFieldConfig(schema);
  const type = inferFieldType(schema, fieldConfig);
  const defaultValue = getYupFieldDefaultValue(schema);

  // Enums
  let optionValues: [string, string][] = [];
  const enumSchema = schema as unknown as YupEnumSchema;
  if (
    schema.type === "mixed" &&
    enumSchema._whitelist &&
    enumSchema._whitelist.size > 0
  ) {
    const options = enumSchema._whitelist;
    optionValues = [...options].map((value) => [value, value]);
  }

  // Arrays and objects
  let subSchema: ParsedField[] = [];
  const objectSchema = schema as yup.ObjectSchema<any>;
  if (schema.type === "object" && objectSchema.fields) {
    subSchema = Object.entries(objectSchema.fields).map(([key, field]) =>
      parseField(key, field as YupField)
    );
  }
  const arraySchema = schema as yup.ArraySchema<any, any>;
  if (schema.type === "array" && arraySchema.innerType) {
    subSchema = [parseField("0", arraySchema.innerType as YupField)];
  }

  return {
    key,
    type,
    required: !schema.spec.optional,
    default: defaultValue,
    description: schema.spec.label,
    fieldConfig,
    options: optionValues,
    schema: subSchema,
  };
}

export function parseSchema(schema: YupObjectOrWrapped): ParsedSchema {
  const fields: ParsedField[] = Object.entries(schema.fields).map(
    ([key, field]) => parseField(key, field as YupField)
  );

  return { fields };
}
