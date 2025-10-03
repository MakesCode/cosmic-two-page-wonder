import { buildZodFieldConfig } from '@ui/components/sgComponent/autoform/react/utils';
import { FieldTypes } from '@ui/components/sgComponent/autoform/AutoForm';

export const fieldConfig = buildZodFieldConfig<
  FieldTypes,
  {
    // Add types for `customData` here.
    group?: string;
  }
>();
