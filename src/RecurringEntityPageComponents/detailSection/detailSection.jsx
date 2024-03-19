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
        DatetimeInput,
        RecurringFrequencyInput,
    } from './sectionComponents';
//import { useImmer } from 'use-immer';
import { useSelector,
     //useDispatch,
     } from 'react-redux';


// this is the detail section that is used in the main page
function DetailSection() {

    const selectedItem = useSelector((state) => state.recurringEntityPageStates.selectedItem);

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
            className="flex flex-nowrap flex-col ml-2 mr-7 mt-0 mb-4 border rounded-lg bg-surface-cl drop-shadow-lg overflow-x-hidden overflow-y-scroll md:px-[2%] sm:px-[2%] lg:px-[10%] py-[2%]" 
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
            <H3HeadingSection>Recurring Transaction Setup</H3HeadingSection>
            <RecurringFrequencyInput />
            <DatetimeInput
                datetimeValue={selectedItem.recurringTransactionStartDate}
                heading={"Recurring Transaction Start Date"}
                fieldName={"recurringTransactionStartDate"}
                readonly={false}
            />
            <DatetimeInput
                datetimeValue={selectedItem.recurringTransactionEndDate}
                heading={"Recurring Transaction End Date"}
                fieldName={"recurringTransactionEndDate"}
                readonly={false}
            />
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
                datetimeValue={selectedItem.lastRecurringTransactionDate}
                heading={"Last Transaction Done On"}
                fieldName={"lastRecurringTransactionDate"}
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