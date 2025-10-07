import { Sidebar } from '@ui/components/sgComponent/sidebar/Sidebar';
import { ClaimsStats } from './components/ClaimsStats';
import { ClaimsTable } from './components/ClaimsTable';

export default function GliClaimsPage() {
  return (
    <Sidebar>
      <div className="flex-1 space-y-4 p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Gestion des sinistres</h2>
        </div>
        <ClaimsStats />
        <ClaimsTable />
      </div>
    </Sidebar>
  );
}
