import '../../index.css';
import {H6HeadingText, 
        TextInputSection, 
        RadioButtonSection,  
        SectionContainer
    } from '../../basicComponents/userInputLayoutComponents/basicUserInputComponents.jsx';
import { handleItemClick,
    } from '../../stateManagement/financialEntityPageStates/selectedItem.js';
import { useSelector } from 'react-redux';

// below are the sections that are used in the detail section; built using the basic components
function TitleSection() {

    const titleValue = useSelector((state) => state.financialEntityPageStates.selectedItem.title);

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


function EntityTypeSection() {

    const entityType = useSelector((state) => state.financialEntityPageStates.selectedItem.type);

    return (
        <SectionContainer 
            additonalClasses="w-auto h-20 border-b-2 pb-4 min-w-80"
        >
            <H6HeadingText 
                additonalClasses="h-[100%] w-[40%]"
            >
                Entity Type
            </H6HeadingText>
            <RadioButtonSection 
                radioBtnID="financialEntityInternal"
                fieldName="type" 
                additonalClasses="h-[100%] w-[20%] mx-2" 
                checked={entityType === "Internal"} 
                handleValueChange={handleItemClick}
            >
                Internal
            </RadioButtonSection>
            <RadioButtonSection
                radioBtnID="financialEntityExternal"
                fieldName="type" 
                additonalClasses="h-[100%] w-[20%]" 
                checked={entityType === "External"} 
                handleValueChange={handleItemClick}
            >
                External
            </RadioButtonSection>
        </SectionContainer>
    );
}



export {TitleSection, 
    EntityTypeSection,
    };