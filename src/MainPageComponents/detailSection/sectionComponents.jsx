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

// below are the sections that are used in the detail section; built using the basic components
function TitleSection({titleValue, handleValueChange}) {
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
            handleValueChange={handleValueChange}
        />
    </SectionContainer>
    );
}

TitleSection.propTypes = {
    titleValue: PropTypes.string,
    handleValueChange: PropTypes.func,
};

function DescriptionSection({descriptionValue, handleValueChange}) {
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
            handleValueChange={handleValueChange}
        />
    </SectionContainer>
    );
}

DescriptionSection.propTypes = {
    descriptionValue: PropTypes.string,
    handleValueChange: PropTypes.func,
};

function SalarySection({transactionValue, currencyValue, currencies, handleValueChange}) {
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
                handleValueChange={handleValueChange}
            />
            <SelectInputSection 
                selectedValue={currencyValue} 
                options={currencies} 
                additonalClasses="w-[20%] h-[60%]"
                fieldName={"currency"}
                handleValueChange={handleValueChange}
            />
        </SectionContainer>
    );
}

SalarySection.propTypes = {
    transactionValue: PropTypes.number,
    currencyValue: PropTypes.string,
    currencies: PropTypes.array,
    handleValueChange: PropTypes.func,
};

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

function TransactionTypeSection({transactionType, handleValueChange}) {

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
                handleValueChange={handleValueChange}
            >
                In
            </RadioButtonSection>
            <RadioButtonSection
                radioBtnID="transactionTypeOut"
                fieldName="transactionType" 
                additonalClasses="" 
                checked={transactionType === "Out"} 
                handleValueChange={handleValueChange}
            >
                Out
            </RadioButtonSection>
        </SectionContainer>
    );
}

TransactionTypeSection.propTypes = {
    transactionType: PropTypes.string,
    handleValueChange: PropTypes.func,
};

function TransactionCategorySection({transactionCategory, transactionCategories, handleValueChange}) {

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
                handleValueChange={handleValueChange}
            />
        </SectionContainer>
    );
}

TransactionCategorySection.propTypes = {
    transactionCategory: PropTypes.string,
    transactionCategories: PropTypes.array,
    handleValueChange: PropTypes.func,
};


function FromTypeSection({ fromType, handleValueChange }) {

    return (
        <SectionContainer additonalClasses="w-auto h-20 border-b-2 pb-4 min-w-80">
            <H6HeadingText additonalClasses="">From Type</H6HeadingText>
            <RadioButtonSection 
                radioBtnID="transactionFromInternal"
                fieldName="fromType" 
                additonalClasses="" 
                checked={fromType === "Internal"} 
                handleValueChange={handleValueChange}
            >
                Internal
            </RadioButtonSection>
            <RadioButtonSection
                radioBtnID="transactionFromExternal"
                fieldName="fromType" 
                additonalClasses="" 
                checked={fromType === "External"} 
                handleValueChange={handleValueChange}
            >
                External
            </RadioButtonSection>
        </SectionContainer>
    );
}

FromTypeSection.propTypes = {
    fromType: PropTypes.string,
    handleValueChange: PropTypes.func,
};


function FromEntitySection({ fromEntity, fromType, transactionEntities, handleValueChange }) {

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
                handleValueChange={handleValueChange}
            />
        </SectionContainer>
    );
}

FromEntitySection.propTypes = {
    fromEntity: PropTypes.string,
    fromType: PropTypes.string,
    transactionEntities: PropTypes.array,
    handleValueChange: PropTypes.func,
};


function ToTypeSection({ toType, handleValueChange }) {

    return (
        <SectionContainer additonalClasses="w-auto h-20 border-b-2 pb-4 min-w-80">
            <H6HeadingText additonalClasses="">To Type</H6HeadingText>
            <RadioButtonSection 
                radioBtnID="transactionToInternal"
                fieldName="toType" 
                additonalClasses="" 
                checked={toType === "Internal"} 
                handleValueChange={handleValueChange}
            >
                Internal
            </RadioButtonSection>
            <RadioButtonSection
                radioBtnID="transactionToExternal"
                fieldName="toType" 
                additonalClasses="" 
                checked={toType === "External"} 
                handleValueChange={handleValueChange}
            >
                External
            </RadioButtonSection>
        </SectionContainer>
    );
}

ToTypeSection.propTypes = {
    toType: PropTypes.string,
    handleValueChange: PropTypes.func,
};


function ToEntitySection({ toEntity, toType, transactionEntities, handleValueChange }) {

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
                handleValueChange={handleValueChange}
            />
        </SectionContainer>
    );
}

ToEntitySection.propTypes = {
    toEntity: PropTypes.string,
    toType: PropTypes.string,
    transactionEntities: PropTypes.array,
    handleValueChange: PropTypes.func,
};

function RecurringEntity({ recurringEntity }) {

    return (
        <SectionContainer additonalClasses="w-auto h-20 border-b-2 pb-4 min-w-80">
            <H6HeadingText additonalClasses="">Recurring</H6HeadingText>
            <p>{recurringEntity}</p>
        </SectionContainer>
    );
}

RecurringEntity.propTypes = {
    recurringEntity: PropTypes.string,
};


function FileInput({ files, handleValueChange }) {

    return (
        <SectionContainer additonalClasses="w-auto h-20 border-b-2 pb-4 min-w-80">
            <FileInputSection 
                additonalClasses="justify-center"
                files={files}
                handleValueChange={handleValueChange}
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
                            handleValueChange={handleValueChange}
                        />
                    </li>
                );
                } )
            }
        </SectionContainer>
    );
}

FileInput.propTypes = {
    files: PropTypes.array,
    handleValueChange: PropTypes.func,
};

function DatetimeInput({ datetimeValue, heading, fieldName, readonly, handleValueChange}) {

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
                handleValueChange={handleValueChange}
            />
        </SectionContainer>
    );
}

DatetimeInput.propTypes = {
    datetimeValue: PropTypes.string,
    heading: PropTypes.string,
    fieldName: PropTypes.string,
    readonly: PropTypes.bool,
    handleValueChange: PropTypes.func,
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