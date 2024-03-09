import AnalyticsStats from './analyticsStats.jsx';
import Topbar from './topBar.jsx';
import StatsByCategory from './statsByCategory.jsx';
import StatBox from './statBox.jsx';
import GenericFail from '../pageLayoutComponents/genericFail.jsx';
import { Chart as ChartJS, registerables } from 'chart.js';
import { useSelector } from 'react-redux';
import { 
  toggleFailBoxDisplay,
} from '../stateManagement/analyticsPageStates/failBox.js';
ChartJS.register(...registerables);

function AnalyticsPage() {

  const statBoxData = useSelector((state) => state.analyticsPageStates.plotData.statBoxData);
  const failBoxDisplayState = useSelector((state) => state.analyticsPageStates.failBox);
  
  return (
    <div
        className="flex flex-row flex-wrap justify-evenly h-[100%] w-[100%] bg-background-cl overflow-y-scroll"
    > 
      <GenericFail 
        additionalClasses=""
        displayState={failBoxDisplayState} 
        changeDisplayState={toggleFailBoxDisplay}
      />
      <Topbar />
      <AnalyticsStats />
      <StatsByCategory />
      <section
        className="flex flex-row flex-wrap justify-start w-[100%] h-auto p-1 mx-7 my-2"
      >
        {statBoxData.map((stat) => {
          return (
            <StatBox
              key={stat.title} 
              title={stat.title}
              value={stat.value}
              color={stat.color}
            />
          );
        }) }
      </section>
    </div>
  );
}

export default AnalyticsPage;