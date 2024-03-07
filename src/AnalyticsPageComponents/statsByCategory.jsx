import { Doughnut } from 'react-chartjs-2';
import { useSelector } from 'react-redux';



function StatsByCategory() {

    const statsByCategoryPlotData = useSelector(state => state.analyticsPageStates.plotData.statsByCategoryPlotData);

    return (
        <section 
            className="flex flex-col flex-nowrap items-center justify-center mx-7 my-2 p-1 sm:h-[50%] sm:w-[90%] md:w-[90%] md:h-[60%] lg:h-[50%] lg:w-[45%] bg-surface-cl border border-slate-300 rounded-md drop-shadow-lg"
        >
            <Doughnut
                height="100%"
                width="200%"
                datasetIdKey="analyticsStatsLineChartIdKey"
                data={statsByCategoryPlotData} 
            />
        </section>
    );
}

export default StatsByCategory;