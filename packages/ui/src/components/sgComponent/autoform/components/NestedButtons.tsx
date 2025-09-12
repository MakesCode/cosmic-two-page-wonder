import React, { JSX, useState } from 'react';
import { AutoFormFieldProps } from '../react';
import clsx from 'clsx';
import { LucideProps } from 'lucide-react';
import { Button } from '../../ui/button';
import { cn } from 'packages/hooks/utils';
import { Label } from '../../ui/label';
import { TooltipProvider } from '../../ui/tooltip';

interface Data {
  name: string;
  value: string;
}

interface ChildrenGroup {
  title: string;
  data: NestedData[];
}

interface NestedData {
  label: string;
  title?: string;
  data?: Data;
  children?: ChildrenGroup[];
  icon?: React.ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>>;
}

interface NestedButtonsProps {
  data: NestedData[];
  onSelect?: (dataObject: Record<string, string>) => void;
  defaultValue?: string;
  defaultValues?: Record<string, string>;
  containerClassName?: string;
  buttonClassName?: string;
  selectedButtonClassName?: string;
  titleClassName?: string;
}

interface SelectionState {
  parentIndex: number | null;
  selections: Map<string, number>;
}

const findPathByValues = (items: NestedData[], defaultValues: Record<string, string>): SelectionState | null => {
  const validDefaultValues = Object.fromEntries(Object.entries(defaultValues).filter(([_, value]) => value != null && value !== ''));

  if (Object.keys(validDefaultValues).length === 0) {
    return null;
  }

  for (let parentIndex = 0; parentIndex < items.length; parentIndex++) {
    const parent = items[parentIndex];
    let parentData: Record<string, string> = {};

    if (parent.data) {
      parentData[parent.data.name] = parent.data.value;
    }

    let parentMatches = true;
    for (const [key, expectedValue] of Object.entries(validDefaultValues)) {
      if (parentData.hasOwnProperty(key) && parentData[key] !== expectedValue) {
        parentMatches = false;
        break;
      }
    }

    if (!parentMatches) continue;

    if (!parent.children) {
      const matchedKeys = Object.keys(validDefaultValues).filter((key) => parentData[key] === validDefaultValues[key]);
      if (matchedKeys.length > 0) {
        return { parentIndex, selections: new Map() };
      }
      continue;
    }

    const selections = new Map<string, number>();
    let totalMatches = 0;

    for (const [key, expectedValue] of Object.entries(validDefaultValues)) {
      if (parentData[key] === expectedValue) {
        totalMatches++;
      }
    }

    for (let groupIndex = 0; groupIndex < parent.children.length; groupIndex++) {
      const group = parent.children[groupIndex];

      for (let childIndex = 0; childIndex < group.data.length; childIndex++) {
        const child = group.data[childIndex];
        const childData = { ...parentData };

        if (child.data) {
          childData[child.data.name] = child.data.value;
        }

        let childMatches = true;
        let childMatchCount = totalMatches;

        for (const [key, expectedValue] of Object.entries(validDefaultValues)) {
          if (childData[key] === expectedValue && !parentData.hasOwnProperty(key)) {
            childMatchCount++;
          } else if (childData.hasOwnProperty(key) && childData[key] !== expectedValue) {
            childMatches = false;
            break;
          }
        }

        if (childMatches && childMatchCount > totalMatches) {
          selections.set(`${groupIndex}`, childIndex);

          if (child.children) {
            for (let subGroupIndex = 0; subGroupIndex < child.children.length; subGroupIndex++) {
              const subGroup = child.children[subGroupIndex];

              for (let subChildIndex = 0; subChildIndex < subGroup.data.length; subChildIndex++) {
                const subChild = subGroup.data[subChildIndex];
                const subChildData = { ...childData };

                if (subChild.data) {
                  subChildData[subChild.data.name] = subChild.data.value;
                }

                let subChildMatches = true;
                let subChildMatchCount = childMatchCount;

                for (const [key, expectedValue] of Object.entries(validDefaultValues)) {
                  if (subChildData[key] === expectedValue && !childData.hasOwnProperty(key)) {
                    subChildMatchCount++;
                  } else if (subChildData.hasOwnProperty(key) && subChildData[key] !== expectedValue) {
                    subChildMatches = false;
                    break;
                  }
                }

                if (subChildMatches && subChildMatchCount > childMatchCount) {
                  selections.set(`${groupIndex}-${childIndex}-${subGroupIndex}`, subChildIndex);
                }
              }
            }
          }
        }
      }
    }

    if (selections.size > 0) {
      return { parentIndex, selections };
    }
  }

  return null;
};

const getInitialSelections = (defaultValues: Record<string, string> | undefined, data: NestedData[]): SelectionState => {
  if (defaultValues) {
    const result = findPathByValues(data, defaultValues);
    if (result) {
      return result;
    }
  }

  return { parentIndex: null, selections: new Map() };
};

export const NestedButtons = ({
  data,
  onSelect,
  defaultValues,
  containerClassName,
  buttonClassName,
  selectedButtonClassName,
  titleClassName,
}: NestedButtonsProps) => {
  const initialState = getInitialSelections(defaultValues, data);
  const [selectedParent, setSelectedParent] = useState<number | null>(initialState.parentIndex);
  const [selections, setSelections] = useState<Map<string, number>>(initialState.selections);

  const collectAllData = (parentIndex: number, currentSelections: Map<string, number>): Record<string, string> => {
    const parent = data[parentIndex];
    const result: Record<string, string> = {};

    if (parent.data) {
      result[parent.data.name] = parent.data.value;
    }

    const collectChildrenData = (items: NestedData[], basePath: string) => {
      items.forEach((item, index) => {
        const currentPath = basePath;
        const selectedIndex = currentSelections.get(currentPath);

        if (selectedIndex === index && item.data) {
          result[item.data.name] = item.data.value;

          if (item.children) {
            item.children.forEach((group, groupIndex) => {
              const childPath = `${currentPath}-${index}-${groupIndex}`;
              collectChildrenData(group.data, childPath);
            });
          }
        }
      });
    };

    if (parent.children) {
      parent.children.forEach((group, groupIndex) => {
        const groupPath = `${groupIndex}`;
        collectChildrenData(group.data, groupPath);
      });
    }

    return result;
  };

  const handleParentClick = (parentIndex: number) => {
    setSelectedParent(parentIndex);
    setSelections(new Map());

    const dataObject = collectAllData(parentIndex, new Map());
    onSelect?.(dataObject);
  };

  const handleChildClick = (path: string, childIndex: number) => {
    if (selectedParent === null) return;

    const newSelections = new Map(selections);
    newSelections.set(path, childIndex);
    setSelections(newSelections);

    const dataObject = collectAllData(selectedParent, newSelections);
    onSelect?.(dataObject);
  };

  const renderParentButtons = () => {
    return (
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((item, index) => {
            const IconComponent = item.icon;
            const isSelected = selectedParent === index;

            return (
              <Button
                key={item.label}
                variant="outline"
                className={clsx(
                  'h-auto min-h-[40px] sm:min-h-[60px] p-2 text-center whitespace-normal break-words leading-tight flex flex-row items-center justify-start gap-3 hover:bg-accent/70 transition-colors',
                  buttonClassName,
                  {
                    'bg-primary text-primary-foreground': isSelected,
                    [selectedButtonClassName || '']: isSelected && selectedButtonClassName,
                  },
                )}
                onClick={() => handleParentClick(index)}
                type="button"
              >
                {IconComponent && (
                  <IconComponent
                    className={clsx('h-6 w-6 sm:h-8 sm:w-8', {
                      'text-primary-foreground': isSelected,
                    })}
                  />
                )}
                <span className="text-xs sm:text-sm font-semibold">{item.label}</span>
              </Button>
            );
          })}
        </div>
      </div>
    );
  };

  const renderChildrenGroup = (group: ChildrenGroup, groupIndex: number, basePath: string, level: number = 0): JSX.Element => {
    const groupPath = basePath ? `${basePath}-${groupIndex}` : `${groupIndex}`;

    return (
      <div key={groupIndex} className="flex flex-col gap-4">
        <Label className={cn('text-sm font-medium', titleClassName)}>{group.title}</Label>
        <div className={cn('grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4')}>
          {group.data.map((child, childIndex) => {
            const IconComponent = child.icon;
            const isSelected = selections.get(groupPath) === childIndex;

            return (
              <Button
                key={child.label}
                variant="outline"
                className={clsx(
                  'h-auto min-h-[40px] sm:min-h-[60px] p-2 text-center whitespace-normal break-words leading-tight flex flex-row items-center justify-start gap-3 hover:bg-accent/70 transition-colors',
                  buttonClassName,
                  {
                    'bg-primary text-primary-foreground': isSelected,
                    [selectedButtonClassName || '']: isSelected && selectedButtonClassName,
                  },
                )}
                onClick={() => handleChildClick(groupPath, childIndex)}
                type="button"
              >
                {IconComponent && (
                  <IconComponent
                    className={clsx('h-6 w-6 sm:h-8 sm:w-8', {
                      'text-primary-foreground': isSelected,
                    })}
                  />
                )}
                <span className="text-xs sm:text-sm font-semibold">{child.label}</span>
              </Button>
            );
          })}
        </div>

        {(() => {
          const selectedChildIndex = selections.get(groupPath);
          if (selectedChildIndex !== undefined) {
            const selectedChild = group.data[selectedChildIndex];
            if (selectedChild?.children) {
              return (
                <div className="flex flex-col gap-4">
                  {selectedChild.children.map((subGroup, subGroupIndex) =>
                    renderChildrenGroup(subGroup, subGroupIndex, `${groupPath}-${selectedChildIndex}`, level + 1),
                  )}
                </div>
              );
            }
          }
          return null;
        })()}
      </div>
    );
  };

  const renderChildrenGroups = () => {
    if (selectedParent === null) return null;

    const selectedItem = data[selectedParent];
    if (!selectedItem.children) return null;

    return (
      <div className="flex flex-col gap-6">
        {selectedItem.children.map((group, groupIndex) => renderChildrenGroup(group, groupIndex, '', 0))}
      </div>
    );
  };

  return (
    <div className={cn('flex flex-col gap-6', containerClassName)}>
      <TooltipProvider>
        {renderParentButtons()}
        {renderChildrenGroups()}
      </TooltipProvider>
    </div>
  );
};

export const NestedButtonsComponent: React.FC<AutoFormFieldProps> = (props) => {
  const options = props?.field.fieldConfig?.customData?.data as NestedButtonsProps;

  const handleButtonSelect = (dataObject: Record<string, string>) => {
    props.inputProps.onChange({
      target: {
        value: dataObject,
        name: props.field.key,
      },
    });
  };

  return <NestedButtons {...options} onSelect={handleButtonSelect} defaultValues={props.value} />;
};
