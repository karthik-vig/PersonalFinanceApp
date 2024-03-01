//import { useState } from 'react';
// import { useImmer } from 'use-immer';
import './index.css';
import './sideSectionButton.jsx';
import SideSectionButton from './sideSectionButton.jsx';
import MainPage from './MainPageComponents/mainPage.jsx';
import FinancialEntityPage from './FinancialEntityPageComponents/financialEntityPage.jsx';
import RecurringEntityPage from './RecurringEntityPageComponents/recurringEntityPage.jsx';
import { setRecurringTransactions } from './stateManagement/sharedStates/additionalInformation.js';
import { useSelector, useDispatch } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHouse, 
         faChartLine, 
         faBuildingColumns, 
         faTicketSimple,
         faTrashAlt,
         faTimes,
         faEraser,
         faFilter,
         faSort,
         faPlus,
         faTrashCan,
         faEdit,
         faRefresh,
         faShoppingBasket,
          faUtensils,
          faShoppingCart,
          faTools,
          faPhone,
          faBus,
          faHome,
          faShieldAlt,
          faHeartbeat,
          faGraduationCap,
          faFilm,
          faPlane,
          faSpa,
          faDumbbell,
          faPiggyBank,
          faCreditCard,
          faHandHoldingHeart,
          faHammer,
          faBaby,
          faPaw,
          faFileInvoiceDollar,
          faBalanceScale,
          faEllipsisH,
          faDollarSign,
          faTimesCircle,
          faCheckCircle,
          faSync,
          } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import { setCurrencies, 
  setTransactionCategories, 
  setTransactionEntities,
} from './stateManagement/sharedStates/additionalInformation.js';
import { selectTab } from './stateManagement/sharedStates/activeTab.js';
library.add(faHouse, 
            faChartLine, 
            faBuildingColumns, 
            faTicketSimple,
            faTrashAlt,
            faTimes,
            faEraser,
            faFilter,
            faSort,
            faPlus,
            faTrashCan,
            faEdit,
            faRefresh,
            faShoppingBasket,
            faUtensils,
            faShoppingCart,
            faTools,
            faPhone,
            faBus,
            faHome,
            faShieldAlt,
            faHeartbeat,
            faGraduationCap,
            faFilm,
            faPlane,
            faSpa,
            faDumbbell,
            faPiggyBank,
            faCreditCard,
            faHandHoldingHeart,
            faHammer,
            faBaby,
            faPaw,
            faFileInvoiceDollar,
            faBalanceScale,
            faEllipsisH,
            faDollarSign,
            faTimesCircle,
            faCheckCircle,
            faSync
            );

function App() {

  const dispatch = useDispatch();

  //fetch additional information from the main process
  //and set currencies value
  useEffect(() => {
    window.initializeDatabase.getCurrencies().then((currencies) => { 
      dispatch(setCurrencies(currencies));
    });
  }, [dispatch,]);

  //fetch additional information from the main process
  //and set transaction categories value
  useEffect(() => {
    window.initializeDatabase.getTransactionCategories().then((transactionCategories) => {
      dispatch(setTransactionCategories(transactionCategories));
    });
  }, [dispatch,]);

  //fetch additional information from the main process
  //and set transaction entities value
  useEffect(() => {
    window.financialEntityOperations.getTransactionEntities().then((transactionEntities) => {
      dispatch(setTransactionEntities(transactionEntities));
    }).catch((err) => { 
      if (err) dispatch(setTransactionEntities([]));
    });
  }, [dispatch,]);

  //fetch additional information from the main process
  //and set transaction entities value
  useEffect(() => {
    window.recurringTransactionOperations.getRecurringTransactions().then((retrievedRecurringTransactions) => {
        dispatch(setRecurringTransactions(retrievedRecurringTransactions));
    });
  }, [dispatch,]);
    

  // const [activeTab, setActiveTab] = useImmer({
  //                                             mainPage: true,
  //                                            analyticPage: false,
  //                                            financialEntityPage: false,
  //                                            recurringTransactionPage: false,
  //                                           });

  const activeTab = useSelector((state) => state.sharedStates.activeTabState);

  // const changeActiveTab = (tabName) => {
  //   // setActiveTab(draft => {
  //   //   Object.keys(draft).forEach(key => {
  //   //     draft[key] = false;
  //   //   });
  //   //   draft[tabName] = true;
  //   // });
  //   dispatch(selectTab(tabName));
  // };

  return (
    <div className="flex flex-row flex-nowrap border-0 w-[100vw] h-[100vh]">
      <div className="flex flex-col flex-wrap justify-start content-center h-[100%] min-h-[500px] w-[50px] bg-primary-cl">
        <SideSectionButton svgIcon={faHouse} onClickHandler={ () => dispatch(selectTab("mainPage")) } isActive={activeTab.mainPage} isTop={true} />
        <SideSectionButton svgIcon={faChartLine} onClickHandler={ () => dispatch(selectTab("analyticPage")) } isActive={activeTab.analyticPage}/>
        <SideSectionButton svgIcon={faBuildingColumns} onClickHandler={ () => dispatch(selectTab("financialEntityPage")) } isActive={activeTab.financialEntityPage}/>
        <SideSectionButton svgIcon={faTicketSimple} onClickHandler={ () => dispatch(selectTab("recurringTransactionPage")) } isActive={activeTab.recurringTransactionPage}/>
      </div>
      <div className="flex flex-row flex-wrap h-[100%] min-h-[500px] min-w-[600px]" style={{ width: 'calc(100% - 50px)' }}>
        {activeTab.mainPage && <MainPage />}
        {activeTab.analyticPage && <div>Analytics Page</div>}
        {activeTab.financialEntityPage && <FinancialEntityPage />}
        {activeTab.recurringTransactionPage && <RecurringEntityPage />}
      </div>
    </div>
  );
}

export default App;
