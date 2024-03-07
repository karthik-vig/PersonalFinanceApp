import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';



function AnalyticsStats() {

    // mock data; replace with data from redux store
    // const linePlotData = {
    //     labels: ['Jun', 'Jul', 'Aug'],
    //     datasets: [
    //       {
    //         id: 1,
    //         label: 'Line 1',
    //         data: [5, 6, 7],
    //       },
    //       {
    //         id: 2,
    //         label: 'Line 2',
    //         data: [3, 2, 1],
    //       },
    //     ],
    //   };

    const expenditurePlotData = useSelector(state => state.analyticsPageStates.plotData.expenditurePlotData);

    return (
        <section 
            className="flex flex-col flex-nowrap items-center justify-center mx-7 my-2 p-1 sm:h-[50%] sm:w-[90%] md:w-[90%] md:h-[60%] lg:h-[50%] lg:w-[45%] bg-surface-cl border border-slate-300 rounded-md drop-shadow-lg"
        >
            <Line 
                height="100%"
                width="200%"
                datasetIdKey="analyticsStatsLineChartIdKey"
                data={expenditurePlotData} 
            />
        </section>
    );
}

export default AnalyticsStats;