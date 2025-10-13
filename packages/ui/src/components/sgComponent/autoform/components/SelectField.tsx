import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/components/ui/select';
import { AutoFormFieldProps } from '@ui/components/sgComponent/autoform/react/types';

type SelectOption = {
  label: string;
  value?: string | number;
  key?: string | number;
  [extra: string]: unknown;
};

export const SelectField: React.FC<AutoFormFieldProps> = ({ field, inputProps, error, id, value }) => {
  const { key: _key, onChange, ...props } = inputProps ?? {};
  const options = field?.fieldConfig?.customData?.data as SelectOption[] | undefined;

  const selectedValue = value === null || value === undefined ? '' : String(value);

  const triggerOnChange = (nextValue: string) => {
    const syntheticEvent = {
      target: {
        value: nextValue,
        name: field.key,
      },
    } as React.ChangeEvent<HTMLInputElement>;
    onChange?.(syntheticEvent);
  };

  if (options?.length) {
    return (
      <Select onValueChange={triggerOnChange} value={selectedValue}>
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => {
            const optionValue = option.value ?? option.key ?? option.label;
            const optionValueAsString = String(optionValue);

            return (
              <SelectItem key={optionValueAsString} value={optionValueAsString}>
                {option.label}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    );
  }

  return (
    <Select
      {...props}
      onValueChange={(nextValue) => {
        const syntheticEvent = {
          target: {
            value: nextValue,
            name: field.key,
          },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange?.(syntheticEvent);
      }}
      defaultValue={field.default || value}
    >
      <SelectTrigger id={id} className={error ? 'border-destructive' : ''}>
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent>
        {(field.options || []).map(([key, label]) => (
          <SelectItem key={key} value={key}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
