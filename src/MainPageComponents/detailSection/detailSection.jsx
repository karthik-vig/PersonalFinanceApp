//import PropTypes from 'prop-types';
import '../../index.css';
import {TitleSection, 
        DescriptionSection, 
        SalarySection, 
        H3HeadingSection, 
        TransactionTypeSection, 
        TransactionCategorySection, 
        FromTypeSection,
        FromEntitySection,
        ToTypeSection,
        ToEntitySection,
        RecurringEntity,
        FileInput,
        DatetimeInput,
    } from './sectionComponents';
//import { useImmer } from 'use-immer';
import { useSelector,
     //useDispatch,
     } from 'react-redux';


// this is the detail section that is used in the main page
function DetailSection() {

    const selectedItem = useSelector((state) => state.mainPageStates.selectedItem);

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
            <DescriptionSection />
            <SalarySection />
            <H3HeadingSection>Configure Transaction</H3HeadingSection>
            <TransactionTypeSection />
            <TransactionCategorySection />
            <FromTypeSection />
            <FromEntitySection />
            <ToTypeSection />
            <ToEntitySection />
            { selectedItem.recurringEntity && <RecurringEntity /> }
            <H3HeadingSection>Files</H3HeadingSection>
            <FileInput />
            <H3HeadingSection>Additional Information</H3HeadingSection>
            <DatetimeInput
                datetimeValue={selectedItem.createdDate}
                heading={"Created On"}
                fieldName={"createdDate"}
                readonly={true}
            />
            <DatetimeInput
                datetimeValue={selectedItem.modifiedDate}
                heading={"Last Modified On"}
                fieldName={"modifiedDate"}
                readonly={true}
            />
            <DatetimeInput
                datetimeValue={selectedItem.transactionDate}
                heading={"Set Transaction Date"}
                fieldName={"transactionDate"}
                readonly={false}
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