import * as React from "react";
import { AlertCircle, Clock, CheckCircle, XCircle } from "lucide-react";
import { useClaims } from "@pages/pro/GliClaims/hooks/useClaims";

export const ClaimsStats = () => {
  const { stats } = useClaims();

  return (
    <div className="p-4 bg-white">
      <div className="flex flex-wrap gap-3">
        <StatCard
          icon={<AlertCircle size={16} className="text-[#EF4444]" />}
          value={stats.openClaims}
          title="Sinistres ouverts"
          color="#EF4444"
        />
        <StatCard
          icon={<Clock size={16} className="text-[#F59E0B]" />}
          value={stats.inProgressClaims}
          title="En cours"
          color="#F59E0B"
        />
        <StatCard
          icon={<CheckCircle size={16} className="text-[#10B981]" />}
          value={stats.closedClaims}
          title="Clôturés"
          color="#10B981"
        />
        <StatCard
          icon={<XCircle size={16} className="text-[#6B7280]" />}
          value={stats.rejectedClaims}
          title="Rejetés"
          color="#6B7280"
        />
      </div>
    </div>
  );
};

function StatCard({
  icon,
  value,
  title,
  color,
}: {
  icon: React.ReactNode;
  value: number | string;
  title: string;
  color: string;
}) {
  return (
    <div className="flex-1 min-w-[150px] bg-white border border-gray-100 rounded-md shadow-sm p-3">
      <div className="flex items-center space-x-3">
        <div style={{ backgroundColor: `${color}10` }} className="p-2 rounded-md">
          {icon}
        </div>
        <div>
          <div className="text-xl font-semibold text-gray-800">{value}</div>
          <div className="text-xs text-gray-500">{title}</div>
        </div>
      </div>
    </div>
  );
}
