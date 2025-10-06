import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { cn } from '../../lib/utils';
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

function useClickOutside(ref: React.RefObject<HTMLDivElement>, handler: () => void) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler();
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

export interface SearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value?: string;
  onChange?: (value: string) => void;
  onDebouncedChange?: (value: string) => void;
  debounceDelay?: number;
  loading?: boolean;
  onClear?: () => void;
  clearable?: boolean;
  children?: ReactNode;
  dropdownClassName?: string;
  showDropdown?: boolean;
  onDropdownChange?: (show: boolean) => void;
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      className,
      value = '',
      onChange,
      onDebouncedChange,
      debounceDelay = 300,
      loading = false,
      onClear,
      clearable = true,
      children,
      dropdownClassName,
      showDropdown = false,
      onDropdownChange,
      onFocus,
      onBlur,
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = useState(value);
    const [internalShowDropdown, setInternalShowDropdown] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const debouncedValue = useDebounce(internalValue, debounceDelay);

    useEffect(() => {
      if (value !== internalValue) {
        setInternalValue(value);
      }
    }, [value]);

    useEffect(() => {
      if (onDebouncedChange && debouncedValue !== value) {
        onDebouncedChange(debouncedValue);
      }
    }, [debouncedValue, onDebouncedChange]);

    const isDropdownOpen = onDropdownChange ? showDropdown : internalShowDropdown;
    useClickOutside(containerRef, () => {
      if (onDropdownChange) {
        onDropdownChange(false);
      } else {
        setInternalShowDropdown(false);
      }
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInternalValue(newValue);
      onChange?.(newValue);

      if (children && newValue.length > 0) {
        if (onDropdownChange) {
          onDropdownChange(true);
        } else {
          setInternalShowDropdown(true);
        }
      }
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      if (children && internalValue.length > 0) {
        if (onDropdownChange) {
          onDropdownChange(true);
        } else {
          setInternalShowDropdown(true);
        }
      }
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      onBlur?.(e);
    };

    const handleClear = () => {
      setInternalValue('');
      onChange?.('');
      onClear?.();
      if (onDropdownChange) {
        onDropdownChange(false);
      } else {
        setInternalShowDropdown(false);
      }
    };

    const showClearButton = clearable && internalValue.length > 0 && !loading;

    return (
      <div ref={containerRef} className="relative w-full">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            ref={ref}
            className={cn('pl-9', showClearButton && 'pr-9', loading && 'pr-9', className)}
            value={internalValue}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />

          <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {loading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}

            {showClearButton && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-muted-foreground hover:text-foreground"
                onClick={handleClear}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>

        <AnimatePresence>
          {isDropdownOpen && children && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.1 }}
              className={cn(
                'absolute top-full z-50 mt-1 w-full rounded-md border bg-popover p-0 text-popover-foreground shadow-md outline-none',
                dropdownClassName,
              )}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  },
);
