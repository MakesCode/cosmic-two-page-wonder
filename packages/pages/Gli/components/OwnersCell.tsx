import { Building, User, Users } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@ui/components/ui/tooltip";

export const OwnersCell = ({ owners }: { owners: any[] }) => {
  if (!owners || owners?.length === 0)
    return <span className="text-gray-400">-</span>;
  const primaryOwner = owners?.[0];
  const additionalCount = owners?.length - 1;
  const getPrimaryOwnerName = (owner: any) => {
    if (owner.naturalEntity)
      return `${owner.naturalEntity.firstName} ${owner.naturalEntity.lastName}`;
    if (owner.legalEntity) return owner.legalEntity.name;
    return "Propriétaire inconnu";
  };
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2 cursor-help max-w-[200px]">
            {primaryOwner.naturalEntity ? (
              <User className="h-3 w-3 text-blue-500 flex-shrink-0" />
            ) : (
              <Building className="h-3 w-3 text-green-500 flex-shrink-0" />
            )}
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-medium">
                {getPrimaryOwnerName(primaryOwner)}
              </div>
              {additionalCount > 0 && (
                <div className="flex items-center gap-1 mt-0.5">
                  <Users className="h-3 w-3 text-gray-400" />
                  <span className="text-xs text-gray-500">
                    +{additionalCount} autre{additionalCount > 1 ? "s" : ""}
                  </span>
                </div>
              )}
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent side="right" className="p-3">
          <div>
            <div className="font-medium mb-2">
              Propriétaire{owners?.length > 1 ? "s" : ""}
            </div>
            <div className="space-y-2 max-w-sm">
              {owners?.map((owner) => (
                <div key={owner.id} className="flex items-center gap-2">
                  {owner.naturalEntity ? (
                    <User className="h-3 w-3" />
                  ) : (
                    <Building className="h-3 w-3" />
                  )}
                  <span className="text-sm">
                    {owner.naturalEntity
                      ? `${owner.naturalEntity.firstName} ${owner.naturalEntity.lastName}`
                      : owner.legalEntity?.name || "Inconnu"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
