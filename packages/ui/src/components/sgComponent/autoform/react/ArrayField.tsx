import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { AutoFormField } from '@ui/components/sgComponent/autoform/react/AutoFormField';
import { useAutoForm } from '@ui/components/sgComponent/autoform/react/context';
import { ParsedField } from '@ui/components/sgComponent/autoform/core/types';
import { getLabel } from '@ui/components/sgComponent/autoform/core/label';

export const ArrayField: React.FC<{
  field: ParsedField;
  path: string[];
}> = ({ field, path }) => {
  const { uiComponents } = useAutoForm();
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: path.join('@ui/components/sgComponent/autoform/react'),
  });

  const subFieldType = field.schema?.[0]?.type;
  let defaultValue: any;
  if (subFieldType === 'object') {
    defaultValue = {};
  } else if (subFieldType === 'array') {
    defaultValue = [];
  } else {
    defaultValue = null;
  }

  return (
    <uiComponents.ArrayWrapper label={getLabel(field)} field={field} onAddItem={() => append(defaultValue)}>
      {fields.map((item, index) => (
        <uiComponents.ArrayElementWrapper key={item.id} onRemove={() => remove(index)} index={index}>
          <AutoFormField field={field.schema![0]!} path={[...path, index.toString()]} />
        </uiComponents.ArrayElementWrapper>
      ))}
    </uiComponents.ArrayWrapper>
  );
};
