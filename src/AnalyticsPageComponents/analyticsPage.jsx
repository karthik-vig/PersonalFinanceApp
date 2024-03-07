import AnalyticsStats from './analyticsStats.jsx';
import Topbar from './topBar.jsx';
import { Chart as ChartJS, registerables } from 'chart.js';
ChartJS.register(...registerables);

function AnalyticsPage() {

  return (
    <div
        className="flex flex-row flex-wrap h-[100%] w-[100%] bg-background-cl overflow-y-scroll"
    > 
      <Topbar />
      <AnalyticsStats />
    </div>
  );
}

export default AnalyticsPage;