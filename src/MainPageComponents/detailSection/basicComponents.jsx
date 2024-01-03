//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import '../../index.css';
//import { useImmer } from 'use-immer';


// below are the basic components that can be used to build the detail section
function H6HeadingText({children, additonalClasses}) {

    return (
        <h6 className={"text-start font-bold font-serif antialiased tracking-widest truncate text-lg text-black/50" + " " + additonalClasses + " "}>{children}</h6>
    );
}

H6HeadingText.propTypes = {
    children: PropTypes.string,
    additonalClasses: PropTypes.string,
};

function H3HeadingText({children, additonalClasses}) {

    return (
        <h3 className={"justify-self-center text-start font-bold font-serif antialiased tracking-widest truncate text-xl text-black" + " " + additonalClasses + " "}>{children}</h3>
    );
}

H3HeadingText.propTypes = {
    children: PropTypes.string,
    additonalClasses: PropTypes.string,
};

function TextInputSection({textValue, additonalClasses, fieldName, handleValueChange}) {

    return (
        <input 
            className={"text-start font-serif antialiased tracking-widest truncate text-base text-black bg-background-cl border rounded-lg outline-1 hover:outline hover:outline-gray-500 hover:outline-offset-2 hover:bg-back" + " " + additonalClasses + " "} 
            value={textValue} 
            type="text" 
            onChange={(event) => handleValueChange(fieldName, event.target.value)}
        />
    );
}

TextInputSection.propTypes = {
    textValue: PropTypes.string,
    additonalClasses: PropTypes.string,
    handleValueChange: PropTypes.func,
    fieldName: PropTypes.string,
};

function TextAreaSection({textValue, fieldName, handleValueChange}) {

    return (
        <textarea 
            className=" text-start font-serif antialiased tracking-widest truncate text-base text-black bg-background-cl border rounded-lg outline-1 hover:outline hover:outline-gray-500 hover:outline-offset-2 hover:bg-back overflow-y-scroll resize-none w-[100%] h-[60%] " 
            value={textValue} 
            type="text"
            onChange={(event) => handleValueChange(fieldName, event.target.value)}
        />
    );
}

TextAreaSection.propTypes = {
    textValue: PropTypes.string,
    handleValueChange: PropTypes.func,
    fieldName: PropTypes.string,
};

function SelectInputSection({selectedValue, options, additonalClasses, fieldName, handleValueChange}) {

    return (
        <select 
            className={"text-start font-serif antialiased tracking-widest truncate text-base text-black border rounded-lg bg-background-cl" + " " + additonalClasses + " "} 
            value={selectedValue}
            onChange={(event) => handleValueChange(fieldName, event.target.value)}
        >
            {options.map((option) => {
                return (<option key={option} value={option}>{option}</option>);
                })
            }
        </select>
    );
}

SelectInputSection.propTypes = {
    selectedValue: PropTypes.string,
    options: PropTypes.array,
    additonalClasses: PropTypes.string,
    fieldName: PropTypes.string,
    handleValueChange: PropTypes.func,
};

function NumberInputSection({numberValue, additonalClasses, fieldName, handleValueChange}) {

    return (
        <input 
            className={"text-start font-serif antialiased tracking-widest truncate text-base text-black bg-background-cl border rounded-lg outline-1 hover:outline hover:outline-gray-500 hover:outline-offset-2 hover:bg-back" + " " + additonalClasses + " "} 
            value={numberValue} 
            type="number"
            onChange={(event) => handleValueChange(fieldName, event.target.value)}
        />
    );
}

NumberInputSection.propTypes = {
    numberValue: PropTypes.number,
    additonalClasses: PropTypes.string,
    fieldName: PropTypes.string,
    handleValueChange: PropTypes.func,
};

function RadioButtonSection({ radioBtnID, fieldName, children, additonalClasses, checked, handleValueChange}) {

    return (
        <>
            <input 
                type="radio"
                id={radioBtnID}
                name={radioBtnID} 
                value={children} 
                checked={checked} 
                onClick={(event) =>  handleValueChange(fieldName, event.target.value) } 
                className={additonalClasses}
            />
            <label 
                htmlFor={fieldName}
            >
                {children}
            </label>
        </>
    );
}

RadioButtonSection.propTypes = {
    fieldName: PropTypes.string,
    radioBtnID: PropTypes.string,
    children: PropTypes.string,
    additonalClasses: PropTypes.string,
    checked: PropTypes.bool,
    handleValueChange: PropTypes.func,
};

function FileInputSection({additonalClasses, fieldName, handleValueChange}) {
    
    return (
        <input 
            type="file" 
            multiple 
            className={"" + " " + additonalClasses + " "}
            onChange={(event) => handleValueChange(fieldName, event.target.files)}
        />
    );
}

FileInputSection.propTypes = {
    additonalClasses: PropTypes.string,
    fieldName: PropTypes.string,
    handleValueChange: PropTypes.func,
};

function DatetimeInputSection({datetimeValue, additonalClasses, readonly, fieldName, handleValueChange}) {

    return (
        <input 
            className={"text-start font-serif antialiased tracking-widest truncate text-base text-black bg-background-cl border rounded-lg outline-1 hover:outline hover:outline-gray-500 hover:outline-offset-2 hover:bg-back" + " " + additonalClasses + " "} 
            value={datetimeValue} 
            type="datetime-local" 
            readOnly={readonly}
            onChange={(event) => handleValueChange(fieldName, event.target.value)}
        />
    );
}

DatetimeInputSection.propTypes = { 
    datetimeValue: PropTypes.string,
    additonalClasses: PropTypes.string,
    readonly: PropTypes.bool,
    fieldName: PropTypes.string,
    handleValueChange: PropTypes.func,
};

function SectionContainer({children, additonalClasses}) {

    return (
        <section className={"flex flex-row flex-wrap" + " " + additonalClasses + " "}>
            {children}
        </section>
    );
}

SectionContainer.propTypes = {
    children: PropTypes.node,
    additonalClasses: PropTypes.string,
};

export {H6HeadingText, 
        H3HeadingText, 
        TextInputSection, 
        TextAreaSection, 
        SelectInputSection, 
        NumberInputSection, 
        RadioButtonSection, 
        FileInputSection, 
        DatetimeInputSection, 
        SectionContainer
    };