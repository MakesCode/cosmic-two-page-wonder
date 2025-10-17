import { Sidebar } from "@ui/components/sgComponent/sidebar/Sidebar";
import { SiteHeader } from "@ui/components/sgComponent/sidebar/SiteHeader";
import { StatsContainer } from "@pages/pro/Gli/components/stats/StatsContainer";

export function GliPage() {
  return (
    <Sidebar>
      <SiteHeader />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="">
            <StatsContainer />
          </div>
          <div className="w-full">
            <div className="border-b">
              <div className=" px-6 py-3">
                <div className="flex items-center justify-between">
                  <div>
                    {/* font-bold  font-['Raleway',Georgia,serif] */}

                    <h1 className="text-2xl font-bold text-foreground">Garanties GLI</h1>
                    <p className="text-sm text-muted-foreground mt-1">Gérez vos demandes de GLI</p>
                  </div>
                  <div className="flex items-center gap-3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  );
}

export default GliPage;
