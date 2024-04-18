import './index.css';
import './sideSectionButton.jsx';
import SideSectionButton from './sideSectionButton.jsx';
import MainPage from './MainPageComponents/mainPage.jsx';
import FinancialEntityPage from './FinancialEntityPageComponents/financialEntityPage.jsx';
import RecurringEntityPage from './RecurringEntityPageComponents/recurringEntityPage.jsx';
import AnalyticsPage from './AnalyticsPageComponents/analyticsPage.jsx';
import SettingsPage from './SettingsPageComponents/settingsPage.jsx';
import { setRecurringTransactions } from './stateManagement/sharedStates/additionalInformation.js';
import { setTimezone, setFilePath } from './stateManagement/settingsPageStates/settings.js';
import { useSelector, useDispatch } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faExchangeAlt, 
         faChartLine, 
         faBuildingColumns, 
         faRedoAlt,
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
          faExternalLink,
          faExclamationTriangle,
          faGear,
          faCircleInfo,
          } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import { setCurrencies, 
  setTransactionCategories, 
  setTransactionEntities,
} from './stateManagement/sharedStates/additionalInformation.js';
import { selectTab } from './stateManagement/sharedStates/activeTab.js';
library.add(faExchangeAlt, 
            faChartLine, 
            faBuildingColumns, 
            faRedoAlt,
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
            faExternalLink,
            faExclamationTriangle,
            faGear,
            faCircleInfo,
            );

function App() {

  const dispatch = useDispatch();

  //load the config file values into the state
  useEffect(() => {
    window.initializeDatabase.getConfigFile().then((config) => {
      dispatch(setTimezone(config.timezone));
      dispatch(setFilePath(config.filePath));
    });
  }, [dispatch,]);

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
    }).catch((err) => { 
      if (err) dispatch(setRecurringTransactions([]));
    });
  }, [dispatch,]);

  const activeTab = useSelector((state) => state.sharedStates.activeTabState);

  return (
    <div className="flex flex-row flex-nowrap border-0 w-[100vw] h-[100vh]">
      <div className="flex flex-col flex-nowrap justify-start items-center content-center h-[100%] min-h-[500px] w-[50px] bg-surface-cl drop-shadow-2xl pt-12">
        <SideSectionButton 
          svgIcon="fa-exchange-alt" 
          onClickHandler={ () => dispatch(selectTab("mainPage")) } 
          iconColour="#FFA113" 
          isActive={activeTab.mainPage}
        />
        <SideSectionButton 
          svgIcon="fa-chart-line" 
          onClickHandler={ () => dispatch(selectTab("analyticPage")) } 
          iconColour="#83D234" 
          isActive={activeTab.analyticPage}
        />
        <SideSectionButton 
          svgIcon="fa-building-columns" 
          onClickHandler={ () => dispatch(selectTab("financialEntityPage")) } 
          iconColour="#EA2D31" 
          isActive={activeTab.financialEntityPage}
        />
        <SideSectionButton 
          svgIcon="fa-redo-alt" 
          onClickHandler={ () => dispatch(selectTab("recurringTransactionPage")) } 
          iconColour="#BE49E5" 
          isActive={activeTab.recurringTransactionPage}
        />
        <SideSectionButton 
          svgIcon="fa-gear" 
          onClickHandler={ () => dispatch(selectTab("settingsPage")) } 
          iconColour="#3FA6FE" 
          isActive={activeTab.settingsPage}
        />
      </div>
      <div 
        //id="pageContainer" 
        className="flex flex-row flex-nowrap flex-grow h-[100%] min-h-[500px] min-w-[600px]"
      >
        {activeTab.mainPage && <MainPage />}
        {activeTab.analyticPage && <AnalyticsPage />}
        {activeTab.financialEntityPage && <FinancialEntityPage />}
        {activeTab.recurringTransactionPage && <RecurringEntityPage />}
        {activeTab.settingsPage && <SettingsPage />}
      </div>
    </div>
  );
}

export default App;
