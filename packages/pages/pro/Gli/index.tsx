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
          <div className="w-full"></div>
        </div>
      </div>
    </Sidebar>
  );
}

export default GliPage;
