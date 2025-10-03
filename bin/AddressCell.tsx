import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@ui/components/ui/tooltip";

export const AddressCell = ({ address }: { address: string }) => {
  const shortAddress =
    address?.length > 50 ? address.substring(0, 50) + "@pages/Gli/components/..." : address;
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="max-w-xs cursor-help">
            <div className="text-sm text-gray-900 font-medium truncate">
              {shortAddress}
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-sm p-3">
          <div className="text-sm whitespace-pre-wrap">{address}</div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
