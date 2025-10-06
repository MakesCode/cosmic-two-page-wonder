import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../ui/select';
import { AutoFormFieldProps } from '../react/types';
import React from 'react';

export const SelectField: React.FC<AutoFormFieldProps> = ({ field, inputProps, error, id, value }) => {
  const { key, ...props } = inputProps;
  const options = field?.fieldConfig?.customData?.data as { label: string; key: string }[];

  const [selectedValue, setSelectedValue] = React.useState<string | null>(value || null);
  const handleButtonClick = (value: string) => {
    setSelectedValue(String(value));
    const syntheticEvent = {
      target: {
        value: String(value),
        name: field.key,
      },
    } as React.ChangeEvent<HTMLInputElement>;
    inputProps.onChange(syntheticEvent);
  };

  if (options?.length > 0) {
    return (
      <Select onValueChange={handleButtonClick} value={selectedValue ?? ''}>
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options?.map((option) => {
            return (
              <SelectItem key={option.key} value={String(option.key)}>
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
      onValueChange={(value) => {
        const syntheticEvent = {
          target: {
            value,
            name: field.key,
          },
        } as React.ChangeEvent<HTMLInputElement>;
        props.onChange(syntheticEvent);
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
