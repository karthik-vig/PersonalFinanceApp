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
                className="flex flex-nowrap flex-col flex-grow \
                            border rounded-lg bg-surface-cl drop-shadow-lg \
                            overflow-x-hidden sm:overflow-y-visible md:overflow-y-visible lg:overflow-y-scroll \
                            sm:px-[2%] md:px-[2%] lg:px-[10%] py-[2%] \
                            sm:w-[95%] md:w-[95%] lg:w-[70%] xl:w-[70%] 2xl:w-[70%] \
                            sm:h-auto md:h-auto lg:h-[85%] 2xl:h-[90%] \
                            sm:my-4 md:my-4 lg:my-2 \
                            " 
                //id="recurringTransactionsDetailSection"
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
                        sm:w-[95%] md:w-[95%] lg:w-[70%] xl:w-[70%] 2xl:w-[70%] \
                        sm:h-auto md:h-auto lg:h-[85%] 2xl:h-[90%] \
                        sm:my-4 md:my-4 lg:my-2 \
                        " 
            //id="recurringTransactionsDetailSection"
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