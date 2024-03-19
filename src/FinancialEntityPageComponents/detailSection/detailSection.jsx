//import PropTypes from 'prop-types';
import '../../index.css';
import {TitleSection, 
        EntityTypeSection, 
        DatetimeInput, 
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
            className="flex flex-nowrap flex-col ml-2 mr-7 mt-0 mb-4 border rounded-lg bg-surface-cl drop-shadow-lg overflow-x-hidden overflow-y-scroll md:px-[2%] lg:px-[10%] py-[2%]" 
            style={{ height: 'calc(100% - 150px)', width: 'calc(75% - 92px)' }}
        >
            <TitleSection />
            <EntityTypeSection />
            <DatetimeInput 
                datetimeValue={selectedItem.createdDate}
                heading="Created Date"
                fieldName="createdDate"
                readonly={true}
            />
            <DatetimeInput 
                datetimeValue={selectedItem.modifiedDate}
                heading="Modified Date"
                fieldName="modifiedDate"
                readonly={true}
            />
        </div>
    );
}

/*
DetailSection.propTypes = {
    handleValueChange: PropTypes.func,
};
*/

export default DetailSection;