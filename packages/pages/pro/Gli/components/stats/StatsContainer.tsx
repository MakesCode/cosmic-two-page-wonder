import * as React from "react";
import { Users, CheckCircle, Home, AlertTriangle, Euro } from "lucide-react";
import { useStats } from "@pages/pro/Gli/components/stats/useStats";

export const StatsContainer = () => {
  const { averageRent, guaranteedTenants, openClaims, totalCandidates, validatedFiles } =
    useStats();
  console.log(averageRent, guaranteedTenants, openClaims, totalCandidates, validatedFiles);

  return (
    <>
      <DashboardStats
        stats={{
          averageRent,
          guaranteedTenants,
          openClaims,
          totalCandidates,
          validatedFiles,
        }}
      />
    </>
  );
};

function DashboardStats({
  stats,
}: {
  stats: {
    totalCandidates: number;
    validatedFiles: number;
    guaranteedTenants: number;
    openClaims: number;
    averageRent: number;
  };
}) {
  return (
    <div className="p-4 bg-white">
      <div className="flex flex-wrap gap-3">
        <StatCard
          icon={<Users size={16} className="text-[#8B5CF6]" />}
          value={stats.totalCandidates}
          title="Total candidats"
          color="#8B5CF6"
        />
        <StatCard
          icon={<CheckCircle size={16} className="text-[#3B82F6]" />}
          value={stats.validatedFiles}
          title="Dossiers validés"
          color="#3B82F6"
        />
        <StatCard
          icon={<Home size={16} className="text-[#10B981]" />}
          value={stats.guaranteedTenants}
          title="Locataires garantis"
          color="#10B981"
        />
        <StatCard
          icon={<AlertTriangle size={16} className="text-[#EF4444]" />}
          value={stats.openClaims}
          title="Sinistres ouverts"
          color="#EF4444"
        />
        <StatCard
          icon={<Euro size={16} className="text-[#F59E0B]" />}
          value={stats.averageRent}
          title="Loyer moyen garanti (€)"
          color="#F59E0B"
        />
      </div>
    </div>
  );
}

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
