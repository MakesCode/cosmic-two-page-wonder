import {
  AlertDialog as AlertDialogC,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@ui/components/ui/alert-dialog';
import React from 'react';
import { Loading } from '@ui/components/sgComponent/Loading';
interface DrawerDialogProps {
  trigger?: React.ReactNode;
  title?: string;
  description?: string | React.ReactNode;
  ref?: React.Ref<AlertDialogRef>;
  onSubmit?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
  isLoading?: boolean;
}
export interface AlertDialogRef {
  isOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
}
export const AlertDialog = ({ ref, trigger, title, description, onSubmit, disabled, isLoading }: DrawerDialogProps) => {
  const [open, onOpenChange] = React.useState(false);
  React.useImperativeHandle(ref, () => {
    return {
      isOpen: open,
      openDialog: () => onOpenChange(true),
      closeDialog: () => onOpenChange(false),
    };
  }, []);
  return (
    <AlertDialogC open={open} onOpenChange={onOpenChange}>
      {trigger && <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Fermer</AlertDialogCancel>
          {onSubmit && (
            <AlertDialogAction onClick={onSubmit} disabled={disabled}>
              {isLoading && <Loading />}
              Continuer
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogC>
  );
};
