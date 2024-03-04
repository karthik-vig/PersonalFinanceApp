import PropTypes from 'prop-types';
import '../../index.css';
import {H6HeadingText, 
        H3HeadingText, 
        TextInputSection, 
        TextAreaSection, 
        DatetimeInputSection, 
        SelectInputSection, 
        NumberInputSection, 
        RadioButtonSection, 
        SectionContainer,
        PopOut,
    } from '../../basicComponents/userInputLayoutComponents/basicUserInputComponents.jsx';
import { handleItemClick,
    } from '../../stateManagement/recurringEntityPageStates/selectedItem.js';
import { useSelector, useDispatch } from 'react-redux';
import { selectTab } from '../../stateManagement/sharedStates/activeTab.js';
import { showFailBox } from '../../stateManagement/mainPageStates/failBoxDisplay.js';
import { setCurrentSelectedItem as financialEntitySetCurrentSelectedItem } from '../../stateManagement/financialEntityPageStates/currentSelectedItem.js';

// below are the sections that are used in the detail section; built using the basic components
function TitleSection() {

    const titleValue = useSelector((state) => state.recurringEntityPageStates.selectedItem.title);

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

    const descriptionValue = useSelector((state) => state.recurringEntityPageStates.selectedItem.description);

    return (
    <SectionContainer 
        additonalClasses="w-auto h-auto border-b-2 pb-4 min-w-80"
    >
        <H6HeadingText 
            additonalClasses={"w-[100%] h-6 mb-2"}
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

    const transactionValue = useSelector((state) => state.recurringEntityPageStates.selectedItem.value);
    const currencyValue = useSelector((state) => state.recurringEntityPageStates.selectedItem.currency);
    const currencies = useSelector((state) => state.sharedStates.additionalInformationState.currencies);

    return (
        <SectionContainer 
            additonalClasses="w-auto h-20 border-b-2 pb-4 min-w-80"
        >
            <H6HeadingText 
                additonalClasses={"w-[40%] h-[100%]"}
            >
                Transaction Value
            </H6HeadingText>
            <NumberInputSection 
                numberValue={transactionValue} 
                additonalClasses="w-[20%] h-[100%] mx-2"
                fieldName={"value"}
                handleValueChange={handleItemClick}
            />
            <SelectInputSection 
                selectedValue={currencyValue} 
                options={currencies} 
                additonalClasses="w-[20%] h-[100%]"
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

    const transactionType = useSelector((state) => state.recurringEntityPageStates.selectedItem.transactionType);

    return (
        <SectionContainer 
            additonalClasses="w-auto h-20 border-b-2 pb-4 min-w-80"
        >
            <H6HeadingText 
                additonalClasses={"w-[40%] h-[100%]"}
            >
                Transaction Type
            </H6HeadingText>
            <RadioButtonSection 
                radioBtnID="transactionTypeIn"
                fieldName="transactionType" 
                additonalClasses="h-[100%] w-[20%] mx-2" 
                checked={transactionType === "In"} 
                handleValueChange={handleItemClick}
            >
                In
            </RadioButtonSection>
            <RadioButtonSection
                radioBtnID="transactionTypeOut"
                fieldName="transactionType" 
                additonalClasses="h-[100%] w-[20%]" 
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

    const transactionCategory = useSelector((state) => state.recurringEntityPageStates.selectedItem.transactionCategory);
    const transactionCategories = useSelector((state) => state.sharedStates.additionalInformationState.transactionCategories);

    return (
        <SectionContainer 
            additonalClasses="w-auto h-20 border-b-2 pb-4 min-w-80"
        >
            <H6HeadingText 
                additonalClasses={"w-[40%] h-[100%]"}
            >
                Transaction Category
            </H6HeadingText>
            <SelectInputSection 
                selectedValue={transactionCategory} 
                options={transactionCategories} 
                additonalClasses="w-[30%] h-[100%]"
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

    const fromType = useSelector((state) => state.recurringEntityPageStates.selectedItem.fromType);

    return (
        <SectionContainer 
            additonalClasses="w-auto h-20 border-b-2 pb-4 min-w-80"
        >
            <H6HeadingText 
                additonalClasses="h-[100%] w-[40%]"
            >
                From Type
            </H6HeadingText>
            <RadioButtonSection 
                radioBtnID="transactionFromInternal"
                fieldName="fromType" 
                additonalClasses="h-[100%] w-[20%] mx-2" 
                checked={fromType === "Internal"} 
                handleValueChange={handleItemClick}
            >
                Internal
            </RadioButtonSection>
            <RadioButtonSection
                radioBtnID="transactionFromExternal"
                fieldName="fromType" 
                additonalClasses="h-[100%] w-[20%]" 
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
    
    const fromEntity = useSelector((state) => state.recurringEntityPageStates.selectedItem.fromEntity);
    const fromType = useSelector((state) => state.recurringEntityPageStates.selectedItem.fromType);
    let transactionEntities = useSelector((state) => state.sharedStates.additionalInformationState.transactionEntities);
    const transformedEntities = transactionEntities.filter((entity) => entity.type === fromType ).map((entity) => entity.name);
    const dispatch = useDispatch();

    const handlePopOut = () => { 
        console.log("External Link Clicked");
        if (fromEntity === "" || fromEntity === null || fromEntity === undefined) { 
            dispatch(showFailBox("No Entity Selected!"));
            return;
        }
        window.financialEntityOperations.getIdFromTitle(fromEntity).then((id) => {
            dispatch(financialEntitySetCurrentSelectedItem(id));
            dispatch(selectTab("financialEntityPage"));
        }).catch((err) => { 
            if (err) dispatch(showFailBox("Entity not found"));
        });
    };

    return (
        <SectionContainer 
            additonalClasses="w-auto h-12 border-b-2 pb-4 min-w-80"
        >
            <H6HeadingText 
                additonalClasses="h-[100%] w-[40%]"
            >
                From Entity
            </H6HeadingText>
            <SelectInputSection 
                selectedValue={fromEntity} 
                options={transformedEntities} 
                additonalClasses="w-[30%] h-[100%]"
                fieldName={"fromEntity"}
                handleValueChange={handleItemClick}
            />
            <PopOut
                additonalClasses="h-[80%] w-[10%]"
                handlePopOut={handlePopOut}
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

    const toType = useSelector((state) => state.recurringEntityPageStates.selectedItem.toType);

    return (
        <SectionContainer 
            additonalClasses="w-auto h-20 border-b-2 pb-4 min-w-80"
        >
            <H6HeadingText 
                additonalClasses="h-[100%] w-[40%]"
            >
                To Type
            </H6HeadingText>
            <RadioButtonSection 
                radioBtnID="transactionToInternal"
                fieldName="toType" 
                additonalClasses="h-[100%] w-[20%] mx-2" 
                checked={toType === "Internal"} 
                handleValueChange={handleItemClick}
            >
                Internal
            </RadioButtonSection>
            <RadioButtonSection
                radioBtnID="transactionToExternal"
                fieldName="toType" 
                additonalClasses="h-[100%] w-[20%]" 
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

    const toEntity = useSelector((state) => state.recurringEntityPageStates.selectedItem.toEntity);
    const toType = useSelector((state) => state.recurringEntityPageStates.selectedItem.toType);
    const transactionEntities = useSelector((state) => state.sharedStates.additionalInformationState.transactionEntities);
    const transformedEntities = transactionEntities.filter((entity) => entity.type === toType ).map((entity) => entity.name);
    const dispatch = useDispatch();

    const handlePopOut = () => { 
        console.log("External Link Clicked");
        if (toEntity === "" || toEntity === null || toEntity === undefined) { 
            dispatch(showFailBox("No Entity Selected!"));
            return;
        }
        window.financialEntityOperations.getIdFromTitle(toEntity).then((id) => {
            dispatch(financialEntitySetCurrentSelectedItem(id));
            dispatch(selectTab("financialEntityPage"));
        }).catch((err) => { 
            if (err) dispatch(showFailBox("Entity not found"));
        });
    };

    return (
        <SectionContainer 
            additonalClasses="w-auto h-12 border-b-2 pb-4 min-w-80"
        >
            <H6HeadingText 
                additonalClasses="h-[100%] w-[40%]"
            >
                To Entity
            </H6HeadingText>
            <SelectInputSection 
                selectedValue={toEntity} 
                options={transformedEntities} 
                additonalClasses="w-[30%] h-[100%]"
                fieldName={"toEntity"}
                handleValueChange={handleItemClick}
            />
            <PopOut
                additonalClasses="h-[80%] w-[10%]"
                handlePopOut={handlePopOut}
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

function DatetimeInput({ datetimeValue, 
                         heading, 
                         fieldName, 
                         readonly, 
                         }) {

    return (
        <SectionContainer additonalClasses="w-auto h-20 border-b-2 pb-4 min-w-80">
            <H6HeadingText 
                additonalClasses="h-[100%] w-[40%]"
            >
                {heading}
            </H6HeadingText>
            <DatetimeInputSection 
                datetimeValue={datetimeValue}
                additonalClasses="h-[100%] w-[30%]"
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


function RecurringFrequencyInput() {

    const recurringFrequency = useSelector((state) => state.recurringEntityPageStates.selectedItem.recurringFrequency);
    const dispatch = useDispatch();
    //console.log(recurringFrequency)
    
    return (
        <SectionContainer additonalClasses="flex flex-nowarp flex-row w-auto h-auto border-b-2 pb-4 min-w-80">
            <H6HeadingText 
                additonalClasses="h-[100%] w-[40%]"
            >
                Recurring Frequency
            </H6HeadingText>
            <section className="flex flex-col flex-nowrap h-[100%] w-[60%]">
                {/*The below select is for choosing the frequency*/}
                <section className="flex flex-row flex-nowrap w-[100%] h-auto">
                    <h6 className="w-[50%] h-[100%]">Frequency</h6>
                    <SelectInputSection 
                        selectedValue={recurringFrequency.frequency ?? "choose"} 
                        options={["Daily", "Weekly", "Monthly", "Yearly"]} 
                        additonalClasses="w-[50%] h-[100%] block"
                        fieldName={"recurringFrequency/frequency"}
                        handleValueChange={handleItemClick}
                    />
                </section>
                {/*The below select is for choosing the day of the week*/}
                <section className={"flex flex-row flex-nowrap w-[100%] h-auto " + (recurringFrequency.frequency === "Weekly" ? "block" : "hidden")}>
                    <h6 className="w-[50%] h-[100%]">Day of the Week</h6>
                    <SelectInputSection 
                        selectedValue={recurringFrequency.dayOfTheWeek ?? "choose"} 
                        options={["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]} 
                        additonalClasses="w-[50%] h-[100%] "
                        fieldName={"recurringFrequency/dayOfTheWeek"}
                        handleValueChange={handleItemClick}
                    />
                </section>
                {/*The below select is for choosing the day of the month*/}
                <section className={"flex flex-row flex-nowrap w-[100%] h-auto " + (recurringFrequency.frequency === "Monthly" || recurringFrequency.frequency === "Yearly" ? "block" : "hidden")}>
                    <h6 className="w-[50%] h-[100%]">Day of the Month</h6>
                    <SelectInputSection 
                        selectedValue={recurringFrequency.dayOfTheMonth ?? "choose"} 
                        options={Array(31).fill().map((_, idx) => idx + 1)} 
                        additonalClasses="w-[50%] h-[100%] "
                        fieldName={"recurringFrequency/dayOfTheMonth"}
                        handleValueChange={handleItemClick}
                    />
                </section>
                {/*The below select is for choosing the month*/}
                <section className={"flex flex-row flex-nowrap w-[100%] h-auto "  + (recurringFrequency.frequency === "Yearly" ? "block" : "hidden")}>
                    <h6 className="w-[50%] h-[100%]">Month</h6>
                    <SelectInputSection 
                        selectedValue={recurringFrequency.month ?? "choose"} 
                        options={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]} 
                        additonalClasses="w-[50%] h-[100%] "
                        fieldName={"recurringFrequency/month"}
                        handleValueChange={handleItemClick}
                    />
                </section>
                {/*The below select is for choosing the time*/}
                <section className={"flex flex-row flex-nowrap w-[100%] h-auto " + (recurringFrequency.frequency !== undefined && recurringFrequency.frequency !== "choose"? "block" : "hidden")}>
                    <h6 className="w-[50%] h-[100%]">Time</h6>
                    <input
                        className="w-[50%] h-[100%] "
                        type="time"
                        value={recurringFrequency.time ?? "HH:MM:SS"}
                        onChange={(event) => { console.log("time changed, time is: ", event.target.value)
                                            dispatch(handleItemClick({fieldName: "recurringFrequency/time", fieldValue: event.target.value}))
                                            }
                                }
                    />
                </section>
            </section>
        </SectionContainer>
    );
}


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
        DatetimeInput,
        RecurringFrequencyInput,
};