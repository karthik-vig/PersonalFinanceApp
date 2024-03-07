import AnalyticsStats from './analyticsStats.jsx';
import Topbar from './topBar.jsx';
import StatsByCategory from './statsByCategory.jsx';
import StatBox from './statBox.jsx';
import { Chart as ChartJS, registerables } from 'chart.js';
ChartJS.register(...registerables);

function AnalyticsPage() {

  const someStats = [
    {
      title: "Total Expenditure",
      value: "1000",
      color: "red",
    },
    {
      title: "Transaction In - Amount",
      value: "2000",
      color: "green",
    },
    {
      title: "Transaction Out - Amount",
      value: "1000",
      color: "green",
    },
    {
      title: "Transaction In - Number",
      value: "1000",
      color: "green",
    },
    {
      title: "Transaction Out - Number",
      value: "500",
      color: "green",
    },
    {
      title: "Number of Transactions",
      value: "1500",
      color: "green",
    },
    {
      title: "Number of Financial Entities",
      value: "10",
      color: "blue",
    },
    {
      title: "Number of Recurring Transactions Entities",
      value: "10",
      color: "orange",
    },
    {
      title: "Number of Transactins using Internal Financial Entities as Source",
      value: "10",
      color: "purple",
    },
    {
      title: "Number of Transactins using External Financial Entities as Source",
      value: "10",
      color: "pink",
    },
    {
      title: "Number of Transactins using Internal Financial Entities as Destination",
      value: "10",
      color: "yellow",
    },
    {
      title: "Number of Transactins using External Financial Entities as Destination",
      value: "10",
      color: "brown",
    },
  ]

  return (
    <div
        className="flex flex-row flex-wrap justify-evenly h-[100%] w-[100%] bg-background-cl overflow-y-scroll"
    > 
      <Topbar />
      <AnalyticsStats />
      <StatsByCategory />
      <section
        className="flex flex-row flex-wrap justify-start w-[100%] h-auto p-1 mx-7 my-2"
      >
        {someStats.map((stat) => {
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