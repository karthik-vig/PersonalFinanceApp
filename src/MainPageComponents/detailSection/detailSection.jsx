//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
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


// this is the detail section that is used in the main page
function DetailSection({ selectedItem, handleValueChange}) {
    // only common classes are defined here, specific classes are defined in the respective sections
    // specific classes include: height, width, padding, margin, etc.
    //const sectionClasses = " flex flex-row flex-wrap w-auto h-20 border-b-2 pb-4 min-w-80 ";
    //const h6Classes = " text-start font-bold font-serif antialiased tracking-widest truncate text-lg text-black/50 ";
    //const h3Classes = " justify-self-center text-start font-bold font-serif antialiased tracking-widest truncate text-xl text-black ";
    //const inputClasses = " text-start font-serif antialiased tracking-widest truncate text-base text-black bg-background-cl border rounded-lg outline-1 hover:outline hover:outline-gray-500 hover:outline-offset-2 hover:bg-back";
    //const radioBtnClasses = " text-start font-serif antialiased tracking-widest truncate text-base text-black ";
    //const selectBtnClasses = " text-start font-serif antialiased tracking-widest truncate text-base text-black border rounded-lg bg-background-cl";

    //const [fromType, setFromType] = useImmer(selectedItem.fromType);

    if (selectedItem === null) {
        return (
            <div 
            className="flex flex-nowrap flex-col ml-2 mr-7 mt-0 mb-4 border rounded-lg bg-surface-cl drop-shadow-lg overflow-x-hidden overflow-y-scroll px-[20%] py-[2%]" 
            style={{ height: 'calc(100% - 150px)', width: 'calc(75% - 92px)' }}
            >
                
            </div>
        );
    }

    // need to get these from the backend
    const currencies = ["RON", "EUR", "USD"];
    const transactionCategories = ["Salary", "Food", "Clothes", "Rent", "Utilities", "Other"];
    const transactionEntities = [{name: "entity1", type: "Internal"}, {name: "entity2", type: "Internal"}, {name: "entity3", type: "External"}, {name: "entity4", type: "External"}];

    return (
        <div 
            className="flex flex-nowrap flex-col ml-2 mr-7 mt-0 mb-4 border rounded-lg bg-surface-cl drop-shadow-lg overflow-x-hidden overflow-y-scroll px-[20%] py-[2%]" 
            style={{ height: 'calc(100% - 150px)', width: 'calc(75% - 92px)' }}
        >
            <TitleSection 
                titleValue={selectedItem.title} 
                handleValueChange={handleValueChange}
            />
            <DescriptionSection 
                descriptionValue={selectedItem.description} 
                handleValueChange={handleValueChange}
            />
            <SalarySection 
                transactionValue={selectedItem.value} 
                currencyValue={selectedItem.currency} 
                currencies={currencies} 
                handleValueChange={handleValueChange}
            />
            <H3HeadingSection>Configure Transaction</H3HeadingSection>
            <TransactionTypeSection 
                transactionType={selectedItem.transactionType} 
                handleValueChange={handleValueChange}
            />
            <TransactionCategorySection 
                transactionCategory={selectedItem.transactionCategory} 
                transactionCategories={transactionCategories} 
                handleValueChange={handleValueChange}
            />
            <FromTypeSection
                fromEntity={selectedItem.fromEntity}
                fromType={selectedItem.fromType}
                handleValueChange={handleValueChange}
            />
            <FromEntitySection
                fromEntity={selectedItem.fromEntity}
                fromType={selectedItem.fromType}
                transactionEntities={transactionEntities}
                handleValueChange={handleValueChange}
            />
            <ToTypeSection
                toEntity={selectedItem.toEntity}
                toType={selectedItem.toType}
                handleValueChange={handleValueChange}
            />
            <ToEntitySection
                toEntity={selectedItem.toEntity}
                toType={selectedItem.toType}
                transactionEntities={transactionEntities}
                handleValueChange={handleValueChange}
            />
    
            {selectedItem.recurringEntity && 
                <RecurringEntity
                    recurringEntity={selectedItem.recurringEntity}
                />
            }
            <H3HeadingSection>Files</H3HeadingSection>
            <FileInput
                files={selectedItem.file}
                handleValueChange={handleValueChange}
            />
            <H3HeadingSection>Additional Information</H3HeadingSection>
            <DatetimeInput
                datetimeValue={selectedItem.createdDate}
                heading={"Created On"}
                fieldName={"createdDate"}
                readonly={true}
                handleValueChange={handleValueChange}
            />
            <DatetimeInput
                datetimeValue={selectedItem.modifiedDate}
                heading={"Last Modified On"}
                fieldName={"modifiedDate"}
                readonly={true}
                handleValueChange={handleValueChange}
            />
            <DatetimeInput
                datetimeValue={selectedItem.transactionDate}
                heading={"Set Transaction Date"}
                fieldName={"transactionDate"}
                readonly={false}
                handleValueChange={handleValueChange}
            />
        </div>
    );
}

DetailSection.propTypes = {
    selectedItem: PropTypes.object,
    handleValueChange: PropTypes.func,
};

export default DetailSection;