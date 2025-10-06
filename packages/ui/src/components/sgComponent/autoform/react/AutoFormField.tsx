import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useAutoForm } from '@ui/components/sgComponent/autoform/react/context';
import { ObjectField } from '@ui/components/sgComponent/autoform/react/ObjectField';
import { ArrayField } from '@ui/components/sgComponent/autoform/react/ArrayField';
import { AutoFormFieldProps } from '@ui/components/sgComponent/autoform/react/types';
import { getPathInObject } from '@ui/components/sgComponent/autoform/react/utils';
import { ParsedField } from '@ui/components/sgComponent/autoform/core/types';
import { getLabel } from '@ui/components/sgComponent/autoform/core/label';

export const AutoFormField: React.FC<{
  field: ParsedField;
  path: string[];
}> = ({ field, path }) => {
  const { formComponents, uiComponents } = useAutoForm();
  const {
    register,
    formState: { errors },
    getValues,
  } = useFormContext();

  const fullPath = path.join('@ui/components/sgComponent/autoform/react');
  const error = getPathInObject(errors, path)?.message as string | undefined;
  const value = getValues(fullPath);

  const FieldWrapper = field.fieldConfig?.fieldWrapper || uiComponents.FieldWrapper;

  let FieldComponent: React.ComponentType<AutoFormFieldProps> = () => <uiComponents.ErrorMessage error={`[AutoForm Configuration Error] No component found for type "${field.type}" nor a fallback`} />;

  if (field.type === 'array') {
    FieldComponent = ArrayField;
  } else if (field.type === 'object') {
    FieldComponent = ObjectField;
  } else if (field.type in formComponents) {
    FieldComponent = formComponents[field.type as keyof typeof formComponents]!;
  } else if ('fallback' in formComponents) {
    FieldComponent = formComponents.fallback;
  }

  return (
    <FieldWrapper label={getLabel(field)} error={error} id={fullPath} field={field}>
      <FieldComponent
        label={getLabel(field)}
        field={field}
        value={value}
        error={error}
        id={fullPath}
        key={fullPath}
        path={path}
        inputProps={{
          required: field.required,
          error: error,
          key: `${fullPath}-input`,
          ...field.fieldConfig?.inputProps,
          ...register(fullPath),
        }}
      />
    </FieldWrapper>
  );
};
