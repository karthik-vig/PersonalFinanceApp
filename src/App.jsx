//import { useState } from 'react';
import './index.css';
import './sideSectionButton.jsx';
import SideSectionButton from './sideSectionButton.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
library.add(faHouse);

function App() {
  //const [count, setCount] = useState(0);

  return (
    <>
      <div className="h-[100%] w-[5%] min-w-[100px] max-w-[200px]">
        <SideSectionButton>
          <FontAwesomeIcon className="m-[0%] p-[0%] w-[100%] h-[100%]" icon={faHouse} />
        </SideSectionButton>
      </div>
      <div>

      </div>
    </>
  );
}

export default App;
