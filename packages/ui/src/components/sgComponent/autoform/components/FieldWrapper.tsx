import React from 'react';
import { FieldWrapperProps } from '../react/types';
import { Renderable } from '../core/types';
import { Label } from '../../../ui/label';

const DISABLED_LABELS = ['boolean', 'object', 'array'];

export const FieldWrapper: React.FC<FieldWrapperProps> = ({ label, children, id, field, error }) => {
  const isDisabled = DISABLED_LABELS.includes(field.type);

  return (
    <div className="space-y-2 grow flex flex-col relative">
      {!isDisabled && <LabelWrapper label={label} required={field.required} id={id} />}
      {children}
      {field.fieldConfig?.description && <p className="text-sm text-muted-foreground">{field.fieldConfig.description}</p>}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
};
export const LabelWrapper = (props: { required: boolean; id?: string; label: Renderable<React.ReactNode> }) => {
  return (
    <Label htmlFor={props?.id}>
      {props.label}
      {props.required && <span className="text-destructive"> *</span>}
    </Label>
  );
};
