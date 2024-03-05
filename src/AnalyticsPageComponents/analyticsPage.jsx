import AnalyticsStats from './analyticsStats.jsx';
import { Chart as ChartJS, registerables } from 'chart.js';
ChartJS.register(...registerables);

function AnalyticsPage() {

  return (
    <div
        className="relative z-0 flex flex-row flex-wrap h-[100%] w-[100%] bg-background-cl"
    >
      <AnalyticsStats />
    </div>
  );
}

export default AnalyticsPage;