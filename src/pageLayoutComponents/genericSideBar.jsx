import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import '../index.css';
import { useDispatch } from 'react-redux';
//import { useImmer } from 'use-immer'; //will be used later when we will have to handle the click event on the side bar items

//item structure is as follows:
/*{
    id: 1, //uuid4
    title: "someName", 
    subTitle: "someSubTitle", 
    titleFontColor: "text-green-500", 
    icon: svgIcons.faFilter
}
*/
// handleItemClick is a function that will be called when the user clicks on a side bar item
// the value passed to it will be the id of the item

function GenericSideBar({ items, handleItemClick}) {

    const dispatch = useDispatch();

    return ( 
    <div className="flex flex-nowrap flex-col w-[25%] mx-7 mt-0 mb-4 border rounded-lg bg-surface-cl drop-shadow-lg overflow-x-hidden overflow-y-scroll" style={{ height: 'calc(100% - 150px)' }}>
                <ul>
                    {items.map((item) => {
                        return (<li key={item.id}>
                            <button  className="flex flex-row flex-wrap w-[100%] h-20 border-t-2 p-4" onClick={() => dispatch(handleItemClick(item.id))}>
                                <FontAwesomeIcon className="m-2 w-10 h-10 border rounded-full outline outline-cyan-950" icon={item.icon} />
                                <section className="flex flex-row flex-wrap h-[100%] ml-4" style={{ width: 'calc(100% - 76px)' }}>
                                    <h6 className={"w-[100%] h-[60%] text-start font-bold font-serif antialiased tracking-widest truncate text-lg " + item.titleFontColor}>{item.title}</h6>
                                    <p className="w-[100%] h-[40%] text-start text-black/50 font-medium antialiased truncate text-sm ">{item.subTitle}</p>
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
};

export default GenericSideBar;