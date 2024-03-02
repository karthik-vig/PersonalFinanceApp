import './index.css';
import './sideSectionButton.jsx';
import SideSectionButton from './sideSectionButton.jsx';
import MainPage from './MainPageComponents/mainPage.jsx';
import FinancialEntityPage from './FinancialEntityPageComponents/financialEntityPage.jsx';
import RecurringEntityPage from './RecurringEntityPageComponents/recurringEntityPage.jsx';
import { setRecurringTransactions } from './stateManagement/sharedStates/additionalInformation.js';
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
          faExclamationTriangle
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
            faExclamationTriangle
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

  const activeTab = useSelector((state) => state.sharedStates.activeTabState);

  return (
    <div className="flex flex-row flex-nowrap border-0 w-[100vw] h-[100vh]">
      <div className="flex flex-col flex-wrap justify-start content-center h-[100%] min-h-[500px] w-[50px] bg-primary-cl">
        <SideSectionButton svgIcon="fa-exchange-alt" onClickHandler={ () => dispatch(selectTab("mainPage")) } isActive={activeTab.mainPage} isTop={true} />
        <SideSectionButton svgIcon="fa-chart-line" onClickHandler={ () => dispatch(selectTab("analyticPage")) } isActive={activeTab.analyticPage}/>
        <SideSectionButton svgIcon="fa-building-columns" onClickHandler={ () => dispatch(selectTab("financialEntityPage")) } isActive={activeTab.financialEntityPage}/>
        <SideSectionButton svgIcon="fa-redo-alt" onClickHandler={ () => dispatch(selectTab("recurringTransactionPage")) } isActive={activeTab.recurringTransactionPage}/>
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
