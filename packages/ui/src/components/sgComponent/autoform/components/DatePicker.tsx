import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { AutoFormFieldProps } from '../react';
import { fr } from 'date-fns/locale';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';
import { Button } from '../../ui/button';
import { Calendar } from '../../ui/calendar';
import { cn } from 'packages/hooks/utils';

export const DatePicker: React.FC<AutoFormFieldProps> = (props) => {
  const [date, setDate] = React.useState<Date | undefined>(props.value ? new Date(props.value) : undefined);
  const handleSelect = (value: Date | undefined): any => {
    setDate(value);
    const syntheticEvent = {
      target: {
        value: value?.toISOString(),
        name: props.field.key,
      },
    };
    props.inputProps.onChange(syntheticEvent);
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={'outline'} className={cn('w-full justify-start text-left font-normal', !date && 'text-muted-foreground')}>
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'dd/MM/yyyy') : <span>Choisissez une date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar locale={fr} mode="single" selected={date} onSelect={handleSelect} initialFocus />
      </PopoverContent>
    </Popover>
  );
};
