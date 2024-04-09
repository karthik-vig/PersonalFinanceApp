import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import PropTypes from 'prop-types';
import '../index.css';
//import { useDispatch } from 'react-redux';
//import { useImmer } from 'use-immer'; //will be used later when we will have to handle the click event on the side bar items

//item structure is as follows:
/*{
    id: 1, //uuid4
    title: "someName", 
    subTitle: "someSubTitle", 
    titleFontColor: "text-green-500", 
    icon: svgIcons.faFilter
    iconColor: "#000000", //some hex color value
}
*/
// handleItemClick is a function that will be called when the user clicks on a side bar item
// the value passed to it will be the id of the item

function GenericSideBar({ items, 
                          handleItemClick,
                          currentSelectedItemState,
                        }) {

    //const dispatch = useDispatch();
    return ( 
    <div 
        className="sm:w-[100%] md:w-[100%] lg:w-[25%] xl:w-[25%] 2xl:w-[25%] \
                   sm:mr-0 md:mr-0 lg:mr-4 sm:my-4 md:my-4 lg:my-2 \
                   sm:h-[90%] lg:h-[85%] 2xl:h-[90%] \
                   border rounded-lg bg-surface-cl drop-shadow-lg \
                   overflow-x-hidden overflow-y-scroll "
        //id="genericSideBar"
    >
                <ul
                    className="w-[100%] h-[100%] flex flex-nowrap flex-col "
                >
                    {items.map((item) => {
                        return (<li key={item.id}
                                    className={ "hover:bg-cyan-600 w-[100%] flex flex-row flex-nowrap " + (String(currentSelectedItemState) === String(item.id) ? "bg-cyan-200" : "bg-surface-cl")}
                                >
                            <button  
                                className="flex flex-row flex-nowrap flex-grow justify-evenly items-center w-[100%] h-20 border-b-1 p-2" 
                                onClick={() => handleItemClick(item.id)}
                            >
                                <FontAwesomeIcon 
                                    className="m-1 p-2 \
                                                sm:w-10 md:w-10 lg:w-8 \
                                                sm:h-10 md:h-10 lg:h-8 \
                                                border-2 rounded-lg" 
                                    icon={item.icon} 
                                    color={item.iconColor}
                                />
                                <section 
                                    className="flex flex-row flex-wrap h-[100%] ml-4 sm:w-[80%] lg:w-[70%] xl:w-[80%]" 
                                    //id="genericSideBarSection"
                                >
                                    <h6 
                                        className={"w-[100%] h-[60%] text-start font-bold font-serif antialiased tracking-widest truncate lg:text-lg text-base " + item.titleFontColor}
                                    >
                                        {item.title}
                                    </h6>
                                    <p 
                                        className="w-[100%] h-[40%] text-start text-black/50 font-medium antialiased truncate lg:text-sm text-xs"
                                    >
                                        {item.subTitle}
                                    </p>
                                </section>
                            </button>
                        </li>);
                    })}
                </ul>
            </div>
    );
}

GenericSideBar.propTypes = {
    items: PropTypes.array,
    handleItemClick: PropTypes.func,
    currentSelectedItemState: PropTypes.string,
};

export default GenericSideBar;