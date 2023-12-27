import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import '../index.css';
//import { useImmer } from 'use-immer'; //will be used later when we will have to handle the click event on the side bar items

function SideBar({ items, handleItemClick}) {


    return ( 
    <div className="flex flex-nowrap flex-col w-[25%] mx-7 mt-0 mb-4 border rounded-lg bg-surface-cl drop-shadow-lg overflow-x-hidden overflow-y-scroll" style={{ height: 'calc(100% - 150px)' }}>
                <ul>
                    {items.map((item) => {
                        let fontColor = "text-green-500";
                        if (item.transactionType === "out") fontColor = "text-red-500"; 
                        return (<li key={item.id}>
                            <button  className="flex flex-row flex-wrap w-[100%] h-20 border-t-2 p-4" onClick={() => handleItemClick(item.id)}>
                                <FontAwesomeIcon className="m-2 w-10 h-10 border rounded-full outline outline-cyan-950" icon={item.icon} />
                                <section className="flex flex-row flex-wrap h-[100%] ml-4" style={{ width: 'calc(100% - 76px)' }}>
                                    <h6 className={"w-[100%] h-[60%] text-start font-bold font-serif antialiased tracking-widest truncate text-lg " + fontColor}>{item.title + " (" + item.transactionType + ")"}</h6>
                                    <p className="w-[100%] h-[40%] text-start text-black/50 font-medium antialiased truncate text-sm ">{"Transaction Date: " + item.transactionDate + " . " + "Value: " + item.value}</p>
                                </section>
                            </button>
                        </li>);
                    })}
                </ul>
            </div>
    );
}

SideBar.propTypes = {
    items: PropTypes.array,
    handleItemClick: PropTypes.func,
};

export default SideBar;