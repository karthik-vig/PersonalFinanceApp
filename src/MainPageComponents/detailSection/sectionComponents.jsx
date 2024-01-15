import PropTypes from 'prop-types';
import '../../index.css';
import {H6HeadingText, 
        H3HeadingText, 
        TextInputSection, 
        TextAreaSection, 
        FileInputSection,
        GetFileSection,
        DeleteFileButtonSection, 
        DatetimeInputSection, 
        SelectInputSection, 
        NumberInputSection, 
        RadioButtonSection, 
        SectionContainer
    } from '../../basicComponents/userInputLayoutComponents/basicUserInputComponents.jsx';
import { handleItemClick,
    } from '../../stateManagement/mainPageStates/selectedItem.js';
import { useSelector } from 'react-redux';

// below are the sections that are used in the detail section; built using the basic components
function TitleSection() {

    const titleValue = useSelector((state) => state.selectedItem.title);

    return (
    <SectionContainer 
        additonalClasses="w-auto h-20 border-b-2 pb-4 min-w-80"
    >
        <H6HeadingText 
            additonalClasses={"w-[100%] h-[38%] mb-2"}
        >
            Title
        </H6HeadingText>
        <TextInputSection 
            textValue={titleValue} 
            additonalClasses="w-[100%] h-[60%]" 
            fieldName={"title"}
            handleValueChange={handleItemClick}
        />
    </SectionContainer>
    );
}

/*
TitleSection.propTypes = {
    titleValue: PropTypes.string,
    handleValueChange: PropTypes.func,
};
*/

function DescriptionSection() {

    const descriptionValue = useSelector((state) => state.selectedItem.description);

    return (
    <SectionContainer 
        additonalClasses="w-auto h-72 border-b-2 pb-4 min-w-80"
    >
        <H6HeadingText 
            additonalClasses={"w-[100%] h-[38%] mb-2"}
        >
            Description
        </H6HeadingText>
        <TextAreaSection 
            textValue={descriptionValue}
            fieldName={"description"}
            handleValueChange={handleItemClick}
        />
    </SectionContainer>
    );
}

/*
DescriptionSection.propTypes = {
    descriptionValue: PropTypes.string,
    handleValueChange: PropTypes.func,
};
*/

function SalarySection() {

    const transactionValue = useSelector((state) => state.selectedItem.value);
    const currencyValue = useSelector((state) => state.selectedItem.currency);
    const currencies = useSelector((state) => state.additionalInformationState.currencies);

    return (
        <SectionContainer 
            additonalClasses="w-auto h-20 border-b-2 pb-4 min-w-80"
        >
            <H6HeadingText 
                additonalClasses={"w-[100%] h-[38%] mb-2"}
            >
                Transaction Value
            </H6HeadingText>
            <NumberInputSection 
                numberValue={transactionValue} 
                additonalClasses="w-[70%] h-[60%] mx-4"
                fieldName={"value"}
                handleValueChange={handleItemClick}
            />
            <SelectInputSection 
                selectedValue={currencyValue} 
                options={currencies} 
                additonalClasses="w-[20%] h-[60%]"
                fieldName={"currency"}
                handleValueChange={handleItemClick}
            />
        </SectionContainer>
    );
}

/*
SalarySection.propTypes = {
    transactionValue: PropTypes.number,
    currencyValue: PropTypes.string,
    currencies: PropTypes.array,
    handleValueChange: PropTypes.func,
};
*/

function H3HeadingSection({children}) {
    return (
        <SectionContainer additonalClasses="w-auto h-20 border-b-2 pb-4 min-w-80 justify-center">
            <H3HeadingText>{children}</H3HeadingText>
        </SectionContainer>
    );
}

H3HeadingSection.propTypes = {
    children: PropTypes.string,
};

function TransactionTypeSection() {

    const transactionType = useSelector((state) => state.selectedItem.transactionType);

    return (
        <SectionContainer 
            additonalClasses="w-auto h-20 border-b-2 pb-4 min-w-80"
        >
            <H6HeadingText 
                additonalClasses={"w-[50%]"}
            >
                Transaction Type
            </H6HeadingText>
            <RadioButtonSection 
                radioBtnID="transactionTypeIn"
                fieldName="transactionType" 
                additonalClasses="" 
                checked={transactionType === "In"} 
                handleValueChange={handleItemClick}
            >
                In
            </RadioButtonSection>
            <RadioButtonSection
                radioBtnID="transactionTypeOut"
                fieldName="transactionType" 
                additonalClasses="" 
                checked={transactionType === "Out"} 
                handleValueChange={handleItemClick}
            >
                Out
            </RadioButtonSection>
        </SectionContainer>
    );
}

/*
TransactionTypeSection.propTypes = {
    transactionType: PropTypes.string,
    handleValueChange: PropTypes.func,
};
*/

function TransactionCategorySection() {

    const transactionCategory = useSelector((state) => state.selectedItem.transactionCategory);
    const transactionCategories = useSelector((state) => state.additionalInformationState.transactionCategories);

    return (
        <SectionContainer 
            additonalClasses="w-auto h-20 border-b-2 pb-4 min-w-80"
        >
            <H6HeadingText 
                additonalClasses={"w-[50%]"}
            >
                Transaction Category
            </H6HeadingText>
            <SelectInputSection 
                selectedValue={transactionCategory} 
                options={transactionCategories} 
                additonalClasses="w-[50%]"
                fieldName={"transactionCategory"}
                handleValueChange={handleItemClick}
            />
        </SectionContainer>
    );
}

/*
TransactionCategorySection.propTypes = {
    transactionCategory: PropTypes.string,
    transactionCategories: PropTypes.array,
    handleValueChange: PropTypes.func,
};
*/


function FromTypeSection() {

    const fromType = useSelector((state) => state.selectedItem.fromType);

    return (
        <SectionContainer additonalClasses="w-auto h-20 border-b-2 pb-4 min-w-80">
            <H6HeadingText additonalClasses="">From Type</H6HeadingText>
            <RadioButtonSection 
                radioBtnID="transactionFromInternal"
                fieldName="fromType" 
                additonalClasses="" 
                checked={fromType === "Internal"} 
                handleValueChange={handleItemClick}
            >
                Internal
            </RadioButtonSection>
            <RadioButtonSection
                radioBtnID="transactionFromExternal"
                fieldName="fromType" 
                additonalClasses="" 
                checked={fromType === "External"} 
                handleValueChange={handleItemClick}
            >
                External
            </RadioButtonSection>
        </SectionContainer>
    );
}

/*
FromTypeSection.propTypes = {
    fromType: PropTypes.string,
    handleValueChange: PropTypes.func,
};
*/

function FromEntitySection() {
    
    const fromEntity = useSelector((state) => state.selectedItem.fromEntity);
    const fromType = useSelector((state) => state.selectedItem.fromType);
    let transactionEntities = useSelector((state) => state.additionalInformationState.transactionEntities);
    const transformedEntities = transactionEntities.filter((entity) => entity.type === fromType ).map((entity) => entity.name);

    return (
        <SectionContainer additonalClasses="w-auto h-20 border-b-2 pb-4 min-w-80">
            <H6HeadingText 
                additonalClasses=""
            >
                From Entity
            </H6HeadingText>
            <SelectInputSection 
                selectedValue={fromEntity} 
                options={transformedEntities} 
                additonalClasses="min-w-20"
                fieldName={"fromEntity"}
                handleValueChange={handleItemClick}
            />
        </SectionContainer>
    );
}

/*
FromEntitySection.propTypes = {
    fromEntity: PropTypes.string,
    fromType: PropTypes.string,
    transactionEntities: PropTypes.array,
    handleValueChange: PropTypes.func,
};
*/


function ToTypeSection() {

    const toType = useSelector((state) => state.selectedItem.toType);

    return (
        <SectionContainer additonalClasses="w-auto h-20 border-b-2 pb-4 min-w-80">
            <H6HeadingText additonalClasses="">To Type</H6HeadingText>
            <RadioButtonSection 
                radioBtnID="transactionToInternal"
                fieldName="toType" 
                additonalClasses="" 
                checked={toType === "Internal"} 
                handleValueChange={handleItemClick}
            >
                Internal
            </RadioButtonSection>
            <RadioButtonSection
                radioBtnID="transactionToExternal"
                fieldName="toType" 
                additonalClasses="" 
                checked={toType === "External"} 
                handleValueChange={handleItemClick}
            >
                External
            </RadioButtonSection>
        </SectionContainer>
    );
}

/*
ToTypeSection.propTypes = {
    toType: PropTypes.string,
    handleValueChange: PropTypes.func,
};
*/


function ToEntitySection() {

    const toEntity = useSelector((state) => state.selectedItem.toEntity);
    const toType = useSelector((state) => state.selectedItem.toType);
    const transactionEntities = useSelector((state) => state.additionalInformationState.transactionEntities);
    const transformedEntities = transactionEntities.filter((entity) => entity.type === toType ).map((entity) => entity.name);

    return (
        <SectionContainer additonalClasses="w-auto h-20 border-b-2 pb-4 min-w-80">
            <H6HeadingText 
                additonalClasses=""
            >
                To Entity
            </H6HeadingText>
            <SelectInputSection 
                selectedValue={toEntity} 
                options={transformedEntities} 
                additonalClasses="min-w-20"
                fieldName={"toEntity"}
                handleValueChange={handleItemClick}
            />
        </SectionContainer>
    );
}

/*
ToEntitySection.propTypes = {
    toEntity: PropTypes.string,
    toType: PropTypes.string,
    transactionEntities: PropTypes.array,
    handleValueChange: PropTypes.func,
};
*/

function RecurringEntity() {

    const recurringEntity = useSelector((state) => state.selectedItem.recurringEntity);

    return (
        <SectionContainer additonalClasses="w-auto h-20 border-b-2 pb-4 min-w-80">
            <H6HeadingText additonalClasses="">Recurring</H6HeadingText>
            <p>{recurringEntity}</p>
        </SectionContainer>
    );
}

/*
RecurringEntity.propTypes = {
    recurringEntity: PropTypes.string,
};
*/


function FileInput() {

    const files = useSelector((state) => state.selectedItem.file);

    return (
        <SectionContainer additonalClasses="w-auto h-20 border-b-2 pb-4 min-w-80">
            <FileInputSection 
                additonalClasses="justify-center"
                files={files}
                handleValueChange={handleItemClick}
            />
            {files.map((fileName) => {

                return (
                    <li key={fileName}>
                        <GetFileSection
                            additonalClasses=""
                            fileName={fileName}
                        />
                        <DeleteFileButtonSection
                            additonalClasses=""
                            fileName={fileName}
                            files={files}
                            handleValueChange={handleItemClick}
                        />
                    </li>
                );
                } )
            }
        </SectionContainer>
    );
}

/*
FileInput.propTypes = {
    files: PropTypes.array,
    handleValueChange: PropTypes.func,
};
*/

function DatetimeInput({ datetimeValue, 
                         heading, 
                         fieldName, 
                         readonly, 
                         }) {

    return (
        <SectionContainer additonalClasses="w-auto h-20 border-b-2 pb-4 min-w-80">
            <H6HeadingText 
                additonalClasses=""
            >
                {heading}
            </H6HeadingText>
            <DatetimeInputSection 
                datetimeValue={datetimeValue}
                additonalClasses={"justify-center"}
                readonly={readonly}
                fieldName={fieldName}
                handleValueChange={handleItemClick}
            />
        </SectionContainer>
    );
}

DatetimeInput.propTypes = {
    datetimeValue: PropTypes.string,
    heading: PropTypes.string,
    fieldName: PropTypes.string,
    readonly: PropTypes.bool,
};


export {TitleSection, 
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
        DatetimeInput
    };