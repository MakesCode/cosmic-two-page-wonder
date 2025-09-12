import React from 'react';
import { Users, CheckCircle, Home, AlertTriangle, Euro } from 'lucide-react';
import { 
  UseSubscriptionPresenter, 
  UseKpiPresenter, 
  UseRentalApprovalsPresenter 
} from '@mock/interfaces';

interface Dependencies {
  useSubscriptionPresenter: UseSubscriptionPresenter;
  useKpiPresenter: UseKpiPresenter;
  useRentalApprovalsPresenter: UseRentalApprovalsPresenter;
  RentalGuaranteeManagement: React.ComponentType<{ presenter: any }>;
  Sidebar: React.ComponentType<{ children: React.ReactNode }>;
  SiteHeader: React.ComponentType;
}

interface GliPageProps {
  dependencies: Dependencies;
}

export function GliPage({ dependencies }: GliPageProps) {
  const { 
    useSubscriptionPresenter, 
    useKpiPresenter, 
    useRentalApprovalsPresenter,
    RentalGuaranteeManagement,
    Sidebar,
    SiteHeader
  } = dependencies;
  
  const { subscription } = useSubscriptionPresenter();
  const { kpi } = useKpiPresenter({ subscriptionId: subscription?.id });
  const presenter = useRentalApprovalsPresenter({ subscriptionId: subscription?.id });

  return (
    <Sidebar>
      <SiteHeader />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="">
            <DashboardStats
              stats={{
                averageRent: kpi?.averageGuaranteedRentAmount ?? 0,
                guaranteedTenants: kpi?.activeRentalApprovalCount ?? 0,
                openClaims: kpi?.claimCount ?? 0,
                totalCandidates: kpi?.rentalApprovalCount ?? 0,
                validatedFiles: kpi?.approvedRentalApprovalCount ?? 0,
              }}
            />
          </div>
          <div className="w-full">
            <RentalGuaranteeManagement presenter={presenter} />
          </div>
        </div>
      </div>
    </Sidebar>
  );
}

function DashboardStats({
  stats,
}: {
  stats: {
    totalCandidates: number | string;
    validatedFiles: number | string;
    guaranteedTenants: number | string;
    openClaims: number | string;
    averageRent: number | string;
  };
}) {
  return (
    <div className="p-4 bg-white">
      <div className="flex flex-wrap gap-3">
        <StatCard icon={<Users size={16} className="text-[#8B5CF6]" />} value={stats.totalCandidates} title="Total candidats" color="#8B5CF6" />
        <StatCard icon={<CheckCircle size={16} className="text-[#3B82F6]" />} value={stats.validatedFiles} title="Dossiers validés" color="#3B82F6" />
        <StatCard icon={<Home size={16} className="text-[#10B981]" />} value={stats.guaranteedTenants} title="Locataires garantis" color="#10B981" />
        <StatCard icon={<AlertTriangle size={16} className="text-[#EF4444]" />} value={stats.openClaims} title="Sinistres ouverts" color="#EF4444" />
        <StatCard icon={<Euro size={16} className="text-[#F59E0B]" />} value={stats.averageRent} title="Loyer moyen garanti (€)" color="#F59E0B" />
      </div>
    </div>
  );
}

function StatCard({ icon, value, title, color }: { icon: React.ReactNode; value: number | string; title: string; color: string }) {
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

export default GliPage;
