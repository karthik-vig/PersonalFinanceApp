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
                className="flex flex-nowrap flex-col flex-grow \
                            border rounded-lg bg-surface-cl drop-shadow-lg \
                            overflow-x-hidden sm:overflow-y-visible md:overflow-y-visible lg:overflow-y-scroll \
                            sm:px-[2%] md:px-[2%] lg:px-[10%] py-[2%] \
                            sm:w-[95%] md:w-[95%] lg:w-[70%] xl:w-auto 2xl:w-auto \
                            sm:h-auto md:h-auto lg:h-[85%] 2xl:h-[90%] \
                            sm:my-4 md:my-4 lg:my-2 \
                            "  
                //id="financialEntityDetailSection"
            >
                
            </div>
        );
    }


    return (
        <div 
            className="flex flex-nowrap flex-col flex-grow \
                        border rounded-lg bg-surface-cl drop-shadow-lg \
                        overflow-x-hidden sm:overflow-y-visible md:overflow-y-visible lg:overflow-y-scroll \
                        sm:px-[2%] md:px-[2%] lg:px-[10%] py-[2%] \
                        sm:w-[95%] md:w-[95%] lg:w-[70%] xl:w-auto 2xl:w-auto \
                        sm:h-auto md:h-auto lg:h-[85%] 2xl:h-[90%] \
                        sm:my-4 md:my-4 lg:my-2 \
                       " 
            //id="financialEntityDetailSection"
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