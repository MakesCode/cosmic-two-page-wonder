import { Building, User, Users } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@ui/components/ui/tooltip";

export const TenantsCell = ({ tenants }: { tenants: any[] }) => {
  if (!tenants || tenants?.length === 0) return <span></span>;
  const primaryTenant = tenants?.[0];
  const additionalCount = tenants?.length - 1;
  const getPrimaryTenantName = (tenant: any) => {
    if (tenant.tenant?.naturalEntity)
      return `${tenant.tenant.naturalEntity.firstName} ${tenant.tenant.naturalEntity.lastName}`;
    if (tenant.tenant?.legalEntity) return tenant.tenant.legalEntity.name;
    return "Locataire inconnu";
  };
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2 cursor-help max-w-[200px]">
            {primaryTenant.tenant?.naturalEntity ? (
              <User className="h-3 w-3 text-purple-500 flex-shrink-0" />
            ) : (
              <Building className="h-3 w-3 text-orange-500 flex-shrink-0" />
            )}
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-medium">
                {getPrimaryTenantName(primaryTenant)}
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
              Locataire{tenants?.length > 1 ? "s" : ""}
            </div>
            <div className="space-y-2 max-w-sm">
              {tenants?.map((tenant) => (
                <div key={tenant.id} className="flex items-center gap-2">
                  {tenant.tenant?.naturalEntity ? (
                    <User className="h-3 w-3" />
                  ) : (
                    <Building className="h-3 w-3" />
                  )}
                  <span className="text-sm">
                    {tenant.tenant?.naturalEntity
                      ? `${tenant.tenant.naturalEntity.firstName} ${tenant.tenant.naturalEntity.lastName}`
                      : tenant.tenant?.legalEntity?.name || "Inconnu"}
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
