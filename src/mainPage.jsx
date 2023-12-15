import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import './index.css';
import { useImmer } from 'use-immer';
import SideSectionButton from './sideSectionButton';
import GenericIconButton from './genericIconBtn';

function SideBar({ items, handleItemClick}) {
    return ( 
    <div className="sidebar">
                <ul>
                    {items.map((item) => (
                        <li key={item.id} className="flex flex-row flex-wrap" onClick={() => handleItemClick(item)}>
                            <h1>{item.transaction}</h1>
                            <p>{item.date}</p>
                            <p>{item.value}</p>
                        </li>
                    ))}
                </ul>
            </div>
    );
}

SideBar.propTypes = {
    items: PropTypes.array,
    handleItemClick: PropTypes.func,
};


function TopBarButton({ svgIcon, btnName, onClickHandler }) {
    return (
        <button className="" onClick={()=>onClickHandler("")}>
            <FontAwesomeIcon className="" icon={svgIcon} />
            <p>{btnName}</p>
        </button>
    );
}

TopBarButton.propTypes = {
    svgIcon: PropTypes.object,
    btnName: PropTypes.string,
    onClickHandler: PropTypes.func,
};

function TopBar({ items, handleItemClick }) {

    return (
        <div className="">
           <TopBarButton svgIcon={} btnName="" onClickHandler={handleItemClick}/>
        </div>
    );
}

TopBar.propTypes = {
    items: PropTypes.array,
    handleItemClick: PropTypes.func,
};

function DetailSection({ selectedItem }) {

    return (
        <div className="">
            <p>{selectedItem.description}</p>
        </div>
    );
}

DetailSection.propTypes = {
    selectedItem: PropTypes.object,
};

const MainPage = () => {

    /*
    const [selectedItem, setSelectedItem] = useState(null);

    const handleItemClick = (item) => {
        setSelectedItem(item);
    };
    */

    return (
        <div className="flex flex-row flex-wrap">
            <TopBar items={items} handleItemClick={handleItemClick} />
            <SideBar items={items} handleItemClick={handleItemClick} />
            <DetailSection selectedItem={selectedItem} />
        </div>
    );
};

export default MainPage;
