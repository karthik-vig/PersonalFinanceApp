//import { useState } from 'react';
import './index.css';
import './sideSectionButton.jsx';
import SideSectionButton from './sideSectionButton.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHouse, faChartLine } from '@fortawesome/free-solid-svg-icons';
library.add(faHouse, faChartLine);

function App() {
  //const [count, setCount] = useState(0);

  return (
    <div className="flex flex-row flex-nowrap border-0 w-[100vw] h-[100vh]">
      <div className="flex flex-col flex-wrap justify-start content-center h-[100%] min-h-[700px] w-[5%] min-w-[50px] max-w-[60px] bg-primary-cl">
        <SideSectionButton isActive={true}>
          <FontAwesomeIcon className="m-[0%] p-[0%] w-[100%] h-[100%]" icon={faHouse} />
        </SideSectionButton>
        <SideSectionButton>
          <FontAwesomeIcon className="m-[0%] p-[0%] w-[100%] h-[100%]" icon={faChartLine} />
        </SideSectionButton>
      </div>
      <div className="h-[100%] w-[95%]">

      </div>
    </div>
  );
}

export default App;
