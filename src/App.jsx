//import { useState } from 'react';
import { useImmer } from 'use-immer';
import './index.css';
import './sideSectionButton.jsx';
import SideSectionButton from './sideSectionButton.jsx';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faHouse, faChartLine, faBuildingColumns, faTicketSimple } from '@fortawesome/free-solid-svg-icons';
library.add(faHouse, faChartLine, faBuildingColumns, faTicketSimple);

function App() {
  const [activeTab, setActiveTab] = useImmer({
                                              mainPage: true,
                                             chartPage: false,
                                             bankPage: false,
                                             cardPage: false,
                                            });

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
        <SideSectionButton svgIcon={faChartLine} tabName="chartPage" onClickHandler={changeActiveTab} isActive={activeTab.chartPage}/>
        <SideSectionButton svgIcon={faBuildingColumns} tabName="bankPage" onClickHandler={changeActiveTab} isActive={activeTab.bankPage}/>
        <SideSectionButton svgIcon={faTicketSimple} tabName="cardPage" onClickHandler={changeActiveTab} isActive={activeTab.cardPage}/>
      </div>
      <div className="flex flex-row flex-wrap h-[100%] w-auto">
        
      </div>
    </div>
  );
}

export default App;
