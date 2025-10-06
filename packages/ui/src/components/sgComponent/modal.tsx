import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ui/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@ui/components/ui/drawer";
import { cn } from "@utils/cn";
import { useIsMobile } from "@hooks/use-mobile";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const desktopDialogVariants = cva("flex flex-col", {
  variants: {
    size: {
      sm: "max-w-sm",
      md: "max-w-md",
      lg: "max-w-lg",
      xl: "max-w-xl",
      "2xl": "max-w-2xl",
      "3xl": "max-w-3xl",
      "4xl": "max-w-4xl",
      "5xl": "max-w-5xl",
      full: "max-w-[95vw]",
    },
    height: {
      auto: "max-h-[90vh]",
      sm: "max-h-[40vh]",
      md: "max-h-[60vh]",
      lg: "max-h-[80vh]",
      xl: "max-h-[90vh]",
      full: "max-h-[95vh]",
    },
    padding: {
      none: "p-0",
      sm: "p-2",
      md: "p-4",
      lg: "p-6",
      xl: "p-8",
    },
  },
  defaultVariants: {
    size: "lg",
    height: "xl",
    padding: "md",
  },
});

const mobileDrawerVariants = cva("flex flex-col", {
  variants: {
    mobileHeight: {
      quarter: "h-[25vh]",
      half: "h-[50vh]",
      threequarter: "h-[75vh]",
      full: "h-[100vh]",
      auto: "h-auto min-h-[200px]",
    },
    mobilePadding: {
      none: "",
      sm: "px-2",
      md: "px-4",
      lg: "px-6",
      xl: "px-8",
    },
  },
  defaultVariants: {
    mobileHeight: "threequarter",
    mobilePadding: "md",
  },
});

interface DrawerDialogProps extends VariantProps<typeof desktopDialogVariants> {
  trigger?: React.ReactNode;
  title?: string;
  description?: string;
  content: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  contentClassName?: string;
  headerClassName?: string;
  footerClassName?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;

  // Props spécifiques pour le mode MOBILE (drawer)
  mobileHeight?: VariantProps<typeof mobileDrawerVariants>["mobileHeight"];
  mobilePadding?: VariantProps<typeof mobileDrawerVariants>["mobilePadding"];
  mobileModalSide?: "bottom" | "top" | "left" | "right";

  // Props généraux
  breakpoint?: string;
  modal?: boolean;
}

export interface DrawerDialogRef {
  isOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
}

export const DrawerDialog = React.forwardRef<DrawerDialogRef, DrawerDialogProps>(
  (
    {
      trigger,
      title,
      description,
      content,
      footer,
      className,
      contentClassName,
      headerClassName,
      footerClassName,
      size,
      height,
      padding,
      mobileHeight,
      mobilePadding,
      breakpoint = "(min-width: 768px)",
      modal = true,
      mobileModalSide = "bottom",
      open,
      onOpenChange,
      ...props
    },
    ref,
  ) => {
    const [internalOpen, setInternalOpen] = React.useState(false);
    const isMobile = useIsMobile();
    const isDesktop = !isMobile;

    const isOpen = open ?? internalOpen;
    const handleOpenChange = onOpenChange ?? setInternalOpen;

    React.useImperativeHandle(ref, () => ({
      isOpen,
      openDialog: () => handleOpenChange(true),
      closeDialog: () => handleOpenChange(false),
    }));

    if (isDesktop) {
      return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange} modal={modal}>
          {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
          <DialogContent
            className={cn(
              "flex flex-col",
              size === "sm" && "!max-w-sm",
              size === "md" && "!max-w-md",
              size === "lg" && "!max-w-lg",
              size === "xl" && "!max-w-xl",
              size === "2xl" && "!max-w-2xl",
              size === "3xl" && "!max-w-3xl",
              size === "4xl" && "!max-w-4xl",
              size === "5xl" && "!max-w-5xl",
              size === "full" && "!max-w-[98vw] !w-[98vw]",

              height === "auto" && "!max-h-[90vh]",
              height === "sm" && "!max-h-[40vh] !h-[40vh]",
              height === "md" && "!max-h-[60vh] !h-[60vh]",
              height === "lg" && "!max-h-[80vh] !h-[80vh]",
              height === "xl" && "!max-h-[90vh] !h-[90vh]",
              height === "full" && "!max-h-[98vh] !h-[98vh]",

              padding === "none" && "!p-0",
              padding === "sm" && "!p-2",
              padding === "md" && "!p-4",
              padding === "lg" && "!p-6",
              padding === "xl" && "!p-8",

              className,
            )}
            onInteractOutside={(e) => {
              e.preventDefault();
            }}
            {...props}
          >
            {(title || description) && (
              <DialogHeader className={cn("flex-shrink-0", headerClassName)}>
                {title && <DialogTitle>{title}</DialogTitle>}
                {description && <DialogDescription>{description}</DialogDescription>}
              </DialogHeader>
            )}
            <div className={cn("flex-1 overflow-y-auto", contentClassName)}>{content}</div>
            {footer && (
              <DialogFooter className={cn("flex-shrink-0 mt-auto", footerClassName)}>
                {footer}
              </DialogFooter>
            )}
          </DialogContent>
        </Dialog>
      );
    }

    return (
      <Drawer
        open={isOpen}
        onOpenChange={handleOpenChange}
        modal={modal}
        direction={mobileModalSide}
      >
        {trigger && <DrawerTrigger asChild>{trigger}</DrawerTrigger>}
        <DrawerContent
          className={cn(
            "flex flex-col",
            mobileHeight === "quarter" && "h-[25vh]",
            mobileHeight === "half" && "h-[50vh]",
            mobileHeight === "threequarter" && "h-[75vh]",
            mobileHeight === "full" && "h-[100vh]",
            mobileHeight === "auto" && "h-auto min-h-[200px]",

            mobilePadding === "none" && "",
            mobilePadding === "sm" && "px-2",
            mobilePadding === "md" && "px-4",
            mobilePadding === "lg" && "px-6",
            mobilePadding === "xl" && "px-8",

            className,
          )}
        >
          {(title || description) && (
            <DrawerHeader className={cn("text-left flex-shrink-0", headerClassName)}>
              {title && <DrawerTitle>{title}</DrawerTitle>}
              {description && <DrawerDescription>{description}</DrawerDescription>}
            </DrawerHeader>
          )}
          <div className={cn("overflow-y-auto flex-1", contentClassName)}>{content}</div>
          {footer && (
            <DrawerFooter className={cn("pt-2 mt-auto pb-6 flex-shrink-0", footerClassName)}>
              {footer}
            </DrawerFooter>
          )}
        </DrawerContent>
      </Drawer>
    );
  },
);

DrawerDialog.displayName = "DrawerDialog";

export { desktopDialogVariants, mobileDrawerVariants };
export type { DrawerDialogProps };
