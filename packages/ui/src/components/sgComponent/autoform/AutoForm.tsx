import React from 'react';
import { AutoForm as BaseAutoForm } from '@ui/components/sgComponent/autoform/react/AutoForm';
import { AutoFormProps } from '@ui/components/sgComponent/autoform/types';
import { Form } from '@ui/components/sgComponent/autoform/components/Form';
import { FieldWrapper } from '@ui/components/sgComponent/autoform/components/FieldWrapper';
import { ErrorMessage } from '@ui/components/sgComponent/autoform/components/ErrorMessage';
import { SubmitButton } from '@ui/components/sgComponent/autoform/components/SubmitButton';
import { StringField } from '@ui/components/sgComponent/autoform/components/StringField';
import { NumberField } from '@ui/components/sgComponent/autoform/components/NumberField';
import { BooleanField } from '@ui/components/sgComponent/autoform/components/BooleanField';
import { DateField } from '@ui/components/sgComponent/autoform/components/DateField';
import { SelectField } from '@ui/components/sgComponent/autoform/components/SelectField';
import { ObjectWrapper } from '@ui/components/sgComponent/autoform/components/ObjectWrapper';
import { ArrayWrapper } from '@ui/components/sgComponent/autoform/components/ArrayWrapper';
import { ArrayElementWrapper } from '@ui/components/sgComponent/autoform/components/ArrayElementWrapper';
import { AutoFormUIComponents } from '@ui/components/sgComponent/autoform/react/types';
import { SituationForm } from '@ui/components/sgComponent/autoform/components/SituationForm.sg';
import { DatePicker } from '@ui/components/sgComponent/autoform/components/DatePicker';
import { Switch } from '@ui/components/sgComponent/autoform/components/Switch';
import { CurrencyInput } from '@ui/components/sgComponent/autoform/components/CurrencyInput';
import { PhoneComponent } from '@ui/components/sgComponent/autoform/components/PhoneComponent';
import { NestedButtonsComponent } from '@ui/components/sgComponent/autoform/components/NestedButtons';
import { AdressComponent } from '@ui/components/sgComponent/autoform/components/AdressComponent';

const ShadcnUIComponents: AutoFormUIComponents = {
  Form,
  FieldWrapper,
  ErrorMessage,
  SubmitButton,
  ObjectWrapper,
  ArrayWrapper,
  ArrayElementWrapper,
};

export const ShadcnAutoFormFieldComponents = {
  string: StringField,
  number: NumberField,
  boolean: BooleanField,
  date: DateField,
  select: SelectField,
  situation: SituationForm,
  datepicker: DatePicker,
  switch: Switch,
  currency: CurrencyInput,
  phone: PhoneComponent,
  nestedbutton: NestedButtonsComponent,
  address: AdressComponent,
} as const;
export type FieldTypes = keyof typeof ShadcnAutoFormFieldComponents;

export function AutoForm<T extends Record<string, any>>({ uiComponents, formComponents, ...props }: AutoFormProps<T>) {
  return (
    <BaseAutoForm
      {...props}
      uiComponents={{ ...ShadcnUIComponents, ...uiComponents }}
      formComponents={{ ...ShadcnAutoFormFieldComponents, ...formComponents }}
    />
  );
}
