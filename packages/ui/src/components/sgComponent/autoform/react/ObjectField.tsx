import React from 'react';
import { AutoFormField } from '@ui/components/sgComponent/autoform/react/AutoFormField';
import { useAutoForm } from '@ui/components/sgComponent/autoform/react/context';
import { ParsedField } from '@ui/components/sgComponent/autoform/core/types';
import { getLabel } from '@ui/components/sgComponent/autoform/core/label';

export const ObjectField: React.FC<{
  field: ParsedField;
  path: string[];
}> = ({ field, path }) => {
  const { uiComponents } = useAutoForm();

  return (
    <uiComponents.ObjectWrapper label={getLabel(field)} field={field}>
      {Object.entries(field.schema!).map(([_key, subField]) => (
        <AutoFormField key={`${path.join('@ui/components/sgComponent/autoform/react')}.${subField.key}`} field={subField} path={[...path, subField.key]} />
      ))}
    </uiComponents.ObjectWrapper>
  );
};
