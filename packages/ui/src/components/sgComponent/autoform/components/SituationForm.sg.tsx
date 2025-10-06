import React from 'react';
import { AutoFormFieldProps } from '../react';
import { BriefcaseBusiness, LucideProps } from 'lucide-react';
import { clsx } from 'clsx';
import { useIsMobile } from '@/hooks/use-mobile';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Button } from '../../ui/button';

export const SituationForm: React.FC<AutoFormFieldProps> = (props) => {
  const isMobile = useIsMobile();
  const [selectedValue, setSelectedValue] = React.useState<string | null>(props.value || null);
  const options = props?.field.fieldConfig?.customData?.data as {
    label: string;
    value: string;
    icon?: React.ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>>;
  }[];
  const handleButtonClick = (value: string) => {
    setSelectedValue(value);
    const syntheticEvent = {
      target: {
        value,
        name: props.field.key,
      },
    } as React.ChangeEvent<HTMLInputElement>;
    props.inputProps.onChange(syntheticEvent);
  };
  if (isMobile) {
    return (
      <Select onValueChange={handleButtonClick} value={selectedValue ?? ''}>
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options?.map((option) => {
            return (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {options?.map((option) => {
        const IconComponent = option?.icon;
        return (
          <Button
            key={option.value}
            variant="outline"
            className={clsx(
              'h-auto min-h-[40px] sm:min-h-[60px] p-2 text-center whitespace-normal break-words leading-tight flex flex-row items-center justify-start gap-3 hover:bg-accent/70 transition-colors',
              {
                ['bg-primary text-primary-foreground']: selectedValue === option.value,
              },
            )}
            onClick={() => handleButtonClick(option.value)}
            type="button"
          >
            {IconComponent && (
              <IconComponent
                className={clsx('h-6 w-6 sm:h-8 sm:w-8', {
                  ['text-primary-foreground']: selectedValue === option.value,
                })}
              />
            )}
            <span className="text-xs sm:text-sm font-semibold">{option.label}</span>
          </Button>
        );
      })}
    </div>
  );
};
