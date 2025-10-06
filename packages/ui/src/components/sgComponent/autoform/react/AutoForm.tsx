import React, { JSX, useEffect, useState } from 'react';
import { useForm, FormProvider, DefaultValues } from 'react-hook-form';
import { AutoFormProps } from '@ui/components/sgComponent/autoform/react/types';
import { AutoFormProvider } from '@ui/components/sgComponent/autoform/react/context';
import { AutoFormField } from '@ui/components/sgComponent/autoform/react/AutoFormField';
import { getDefaultValues, parseSchema, removeEmptyValues } from '@ui/components/sgComponent/autoform/core/logic';
import { ParsedField } from '@ui/components/sgComponent/autoform/core/types';

export function AutoForm<T extends Record<string, any>>({
  schema,
  onSubmit = () => {},
  defaultValues,
  values,
  children,
  uiComponents,
  formComponents,
  withSubmit = false,
  onFormInit = () => {},
  onErrorForm,
  formProps = {},
  id,
}: AutoFormProps<T>) {
  const parsedSchema = parseSchema(schema);
  const methods = useForm<T>({
    defaultValues: {
      ...(getDefaultValues(schema) as Partial<T>),
      ...defaultValues,
    } as DefaultValues<T>,
    values: values as T,
  });

  const formData = methods.getValues();
  useEffect(() => {
    if (defaultValues) {
      methods.reset({
        ...(getDefaultValues(schema) as Partial<T>),
        ...defaultValues,
      } as DefaultValues<T>);
    }
  }, [defaultValues, schema, methods]);

  function getFieldByPath(fields: ParsedField[], path: (string | number)[]): ParsedField | undefined {
    let current: ParsedField | undefined;
    for (const key of path) {
      if (!current) {
        current = fields.find((f) => f.key === key);
      } else {
        current = current.schema?.find((f) => f.key === key);
      }
      if (!current) {
        return undefined;
      }
    }
    return current;
  }

  const handleSubmit = async (dataRaw: T) => {
    const data = removeEmptyValues(dataRaw);

    const validationResult = schema.validateSchema(data as T);

    const hasOnlyHiddenFieldErrors =
      // @ts-ignore
      validationResult?.errors?.every((error) => {
        const field = getFieldByPath(parsedSchema.fields, error.path);
        return field?.fieldConfig?.shouldRender?.(formData) === false;
      }) ?? true;

    if (validationResult.success || hasOnlyHiddenFieldErrors) {
      // @ts-ignore
      await onSubmit(data as T, methods);
    } else {
      methods.clearErrors();
      const formData = methods.getValues();
      const visibleErrors: any[] = [];
      validationResult.errors?.forEach((error) => {
        const path = error.path.join('@ui/components/sgComponent/autoform/react');
        const field = getFieldByPath(parsedSchema.fields, error.path);

        if (field && field.fieldConfig?.shouldRender?.(formData) !== false) {
          methods.setError(path as any, {
            type: 'custom',
            message: error.message,
          });

          const correctedPath = error.path?.slice?.(0, -1);
          if (correctedPath?.length > 0) {
            methods.setError(correctedPath.join('@ui/components/sgComponent/autoform/react') as any, {
              type: 'custom',
              message: error.message,
            });
          }
          visibleErrors.push({
            path: error.path,
            message: error.message,
            field: field,
          });
        }
      });
      if (onErrorForm && visibleErrors.length > 0) {
        onErrorForm(visibleErrors, methods);
      }
    }
  };

  const renderFields = () => {
    const elements: JSX.Element[] = [];
    let currentGroup: string | null = null;
    let groupFields: ParsedField[] = [];

    const formData = methods.watch();

    const closeGroup = () => {
      if (groupFields.length > 0) {
        elements.push(
          <div key={`group-${currentGroup}`} className="flex gap-4 flex-col md:flex-row">
            {groupFields.map((field) => (
              <AutoFormField key={field.key} field={field} path={[field.key]} />
            ))}
          </div>,
        );
        groupFields = [];
      }
    };

    parsedSchema.fields.forEach((field, index) => {
      const shouldRender = field.fieldConfig?.shouldRender?.(formData) ?? true;
      if (!shouldRender) {
        return;
      }

      const customData = field.fieldConfig?.customData?.group as string | undefined;

      if (customData) {
        if (currentGroup !== customData) {
          closeGroup();
          currentGroup = customData;
        }
        groupFields.push(field);
      } else {
        closeGroup();
        currentGroup = null;
        elements.push(
          <React.Fragment key={field.key}>
            <AutoFormField field={field} path={[field.key]} />
          </React.Fragment>,
        );
      }

      if (index === parsedSchema.fields.length - 1) {
        closeGroup();
      }
    });

    return elements;
  };
  return (
    <FormProvider {...methods}>
      <AutoFormProvider
        value={{
          schema: parsedSchema,
          uiComponents,
          formComponents,
        }}
      >
        <uiComponents.Form onSubmit={methods.handleSubmit(handleSubmit)} {...formProps} id={id} className="w-full flex flex-col gap-6">
          {renderFields()}
          {withSubmit && <uiComponents.SubmitButton form={id}>Submit</uiComponents.SubmitButton>}
          {children}
        </uiComponents.Form>
      </AutoFormProvider>
    </FormProvider>
  );
}
