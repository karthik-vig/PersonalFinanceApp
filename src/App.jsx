//import { useState } from 'react';
import { useImmer } from 'use-immer';
import './index.css';
import './sideSectionButton.jsx';
import SideSectionButton from './sideSectionButton.jsx';
import MainPage from './MainPageComponents/mainPage.jsx';
import FinancialEntityPage from './FinancialEntityPageComponents/financialEntityPage.jsx';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faHouse, faChartLine, faBuildingColumns, faTicketSimple, faFilter, faSort, faPlus, faTrashCan, faEdit, faRefresh } from '@fortawesome/free-solid-svg-icons';
library.add(faHouse, faChartLine, faBuildingColumns, faTicketSimple, faFilter, faSort, faPlus, faTrashCan, faEdit, faRefresh);

function App() {
  const [activeTab, setActiveTab] = useImmer({
                                              mainPage: true,
                                             analyticPage: false,
                                             financialEntityPage: false,
                                             recurringTransactionPage: false,
                                            });

  const mainPageSvgIcons = { faFilter,
                              faSort,
                              faPlus,
                              faEdit,
                              faTrashCan,
                              faRefresh,
                           };

  const changeActiveTab = (tabName) => {
    setActiveTab(draft => {
      Object.keys(draft).forEach(key => {
        draft[key] = false;
      });
      draft[tabName] = true;
    });
  };

  return (
    <div className="flex flex-row flex-nowrap border-0 w-[100vw] h-[100vh]">
      <div className="flex flex-col flex-wrap justify-start content-center h-[100%] min-h-[500px] w-[50px] bg-primary-cl">
        <SideSectionButton svgIcon={faHouse} tabName="mainPage" onClickHandler={changeActiveTab} isActive={activeTab.mainPage} isTop={true} />
        <SideSectionButton svgIcon={faChartLine} tabName="analyticPage" onClickHandler={changeActiveTab} isActive={activeTab.analyticPage}/>
        <SideSectionButton svgIcon={faBuildingColumns} tabName="financialEntityPage" onClickHandler={changeActiveTab} isActive={activeTab.financialEntityPage}/>
        <SideSectionButton svgIcon={faTicketSimple} tabName="recurringTransactionPage" onClickHandler={changeActiveTab} isActive={activeTab.recurringTransactionPage}/>
      </div>
      <div className="flex flex-row flex-wrap h-[100%] min-h-[500px] min-w-[600px]" style={{ width: 'calc(100% - 50px)' }}>
        {activeTab.mainPage && <MainPage svgIcons={mainPageSvgIcons}/>}
        {activeTab.analyticPage && <div>Analytics Page</div>}
        {activeTab.financialEntityPage && <FinancialEntityPage svgIcons={mainPageSvgIcons}/>}
        {activeTab.recurringTransactionPage && <div>Recurring Transaction Page</div>}
      </div>
    </div>
  );
}

export default App;
