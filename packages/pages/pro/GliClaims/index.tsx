import { Sidebar } from "@ui/components/sgComponent/sidebar/Sidebar";
import { SiteHeader } from "@ui/components/sgComponent/sidebar/SiteHeader";
import { ClaimsTable } from "./components/ClaimsTable";
import { ClaimsStats } from "./components/ClaimsStats";

export function GliClaimsPage() {
  return (
    <Sidebar>
      <SiteHeader />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-6 p-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Gestion des sinistres GLI</h1>
            <p className="text-muted-foreground mt-2">
              Suivez et gérez tous les sinistres de garantie loyers impayés
            </p>
          </div>
          
          <ClaimsStats />
          
          <ClaimsTable />
        </div>
      </div>
    </Sidebar>
  );
}

export default GliClaimsPage;
