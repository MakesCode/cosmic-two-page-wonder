import { Sidebar } from '@ui/components/sgComponent/sidebar/Sidebar';
import { SiteHeader } from '@ui/components/sgComponent/sidebar/SiteHeader';
import { StatsContainer } from './components/stats/StatsContainer';

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
            {/* <RentalGuaranteeManagement presenter={presenter} /> */}
          </div>
        </div>
      </div>
    </Sidebar>
  );
}



export default GliPage;
