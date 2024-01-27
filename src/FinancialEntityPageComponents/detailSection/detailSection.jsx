//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import PropTypes from 'prop-types';
import '../../index.css';
import {TitleSection, 
        EntityTypeSection, 
    } from './sectionComponents';
//import { useImmer } from 'use-immer';
import { useSelector,
     //useDispatch,
     } from 'react-redux';


// this is the detail section that is used in the main page
function DetailSection() {

    const selectedItem = useSelector((state) => state.financialEntityPageStates.selectedItem);

    if (selectedItem === null) {
        return (
            <div 
            className="flex flex-nowrap flex-col ml-2 mr-7 mt-0 mb-4 border rounded-lg bg-surface-cl drop-shadow-lg overflow-x-hidden overflow-y-scroll px-[20%] py-[2%]" 
            style={{ height: 'calc(100% - 150px)', width: 'calc(75% - 92px)' }}
            >
                
            </div>
        );
    }


    return (
        <div 
            className="flex flex-nowrap flex-col ml-2 mr-7 mt-0 mb-4 border rounded-lg bg-surface-cl drop-shadow-lg overflow-x-hidden overflow-y-scroll px-[10%] py-[2%]" 
            style={{ height: 'calc(100% - 150px)', width: 'calc(75% - 92px)' }}
        >
            <TitleSection />
            <EntityTypeSection />
        </div>
    );
}

/*
DetailSection.propTypes = {
    handleValueChange: PropTypes.func,
};
*/

export default DetailSection;