//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import '../../index.css';
//import { useImmer } from 'use-immer';
import { useDispatch } from 'react-redux';


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

    if (textValue === null) textValue = "";
    const dispatch = useDispatch();

    return (
        <input 
            className={"text-start font-serif antialiased tracking-widest truncate text-base text-black bg-background-cl border rounded-lg outline-1 hover:outline hover:outline-gray-500 hover:outline-offset-2 hover:bg-back" + " " + additonalClasses + " "} 
            value={textValue} 
            type="text" 
            onChange={(event) => dispatch(handleValueChange({fieldName: fieldName, fieldValue: event.target.value}))}
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

    if (textValue === null) textValue = "";
    const dispatch = useDispatch();

    return (
        <textarea 
            className=" text-start font-serif antialiased tracking-widest truncate text-base text-black bg-background-cl border rounded-lg outline-1 hover:outline hover:outline-gray-500 hover:outline-offset-2 hover:bg-back overflow-y-scroll resize-none w-[100%] h-[60%] " 
            value={textValue} 
            type="text"
            onChange={(event) => dispatch(handleValueChange({fieldName: fieldName, fieldValue: event.target.value}))}
        />
    );
}

TextAreaSection.propTypes = {
    textValue: PropTypes.string,
    handleValueChange: PropTypes.func,
    fieldName: PropTypes.string,
};

function SelectInputSection({selectedValue, options, additonalClasses, fieldName, handleValueChange}) {

    if (selectedValue === null) selectedValue = "Choose";
    const dispatch = useDispatch();

    return (
        <select 
            className={"text-start font-serif antialiased tracking-widest truncate text-base text-black border rounded-lg bg-background-cl" + " " + additonalClasses + " "} 
            value={selectedValue}
            onChange={(event) => dispatch(handleValueChange({fieldName: fieldName, fieldValue: event.target.value}))}
        >   
            <option 
                key="choose"
                value="choose"
            >
                Choose
            </option>
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

    if (numberValue === null) numberValue = 0;
    const dispatch = useDispatch();

    return (
        <input 
            className={"text-start font-serif antialiased tracking-widest truncate text-base text-black bg-background-cl border rounded-lg outline-1 hover:outline hover:outline-gray-500 hover:outline-offset-2 hover:bg-back" + " " + additonalClasses + " "} 
            value={numberValue} 
            type="number"
            onChange={(event) => dispatch(handleValueChange({fieldName: fieldName, fieldValue: event.target.value}))}
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

    if (checked === null) checked = false;
    const dispatch = useDispatch();

    return (
        <>
            <input 
                type="radio"
                id={radioBtnID}
                name={radioBtnID} 
                value={children} 
                checked={checked} 
                onChange={(event) =>  dispatch(handleValueChange({fieldName: fieldName, fieldValue: event.target.value})) } 
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

function FileInputSection({additonalClasses, files, handleValueChange}) {

    const dispatch = useDispatch();
    
    const handleAddFile = () => {
        //console.log(typeof event.target.files);
        const filesCopy = [...files];
        let fileNames = false;
        window.electronAPI.openFileDialog().then((data) => {
            fileNames = data;
        });
        if (fileNames.length > 0) {
            fileNames.forEach((fileName) => {
            if (!filesCopy.includes(fileName)) filesCopy.push(fileName);
            });
        } 
        //handleValueChange("file", filesCopy);
        dispatch(handleValueChange({fieldName: "file", fieldValue: filesCopy}))
    }

    return (
        <button 
            className={"" + " " + additonalClasses + " "}
            onChange={() => handleAddFile()}
        >
            Add File
        </button>
    );
}

FileInputSection.propTypes = {
    additonalClasses: PropTypes.string,
    files: PropTypes.array,
    handleValueChange: PropTypes.func,
};

function GetFileSection({ additonalClasses, fileName }) {

    return (
        <button
            className={"min-w-20 min-h-20" + " " + additonalClasses + " "}
            onClick={() => { window.electronAPI.saveFileDialog(fileName)} }
        >
            {fileName}
        </button>
    );
}

GetFileSection.propTypes = {
    additonalClasses: PropTypes.string,
    fileName: PropTypes.string,
};

function DeleteFileButtonSection({additonalClasses, fileName, files, handleValueChange}) {

    const dispatch = useDispatch();

    const handleFileDelete = (fileName) => { 
        let deleteFileBlobStatus = false;
        window.electronAPI.deleteFileBlob(fileName).then((data) => {
            deleteFileBlobStatus = data;
        });
        let filesCopy = [...files];
        if (deleteFileBlobStatus) {
            filesCopy = files.filter((file) => file !== fileName);
        }
        dispatch(handleValueChange({fieldName: "file", fieldValue: filesCopy}));
    };

    return (
        <button 
            className={"min-w-20 min-h-20" + " " + additonalClasses + " "}
            onClick={() => handleFileDelete(fileName)}
        >
            Delete
        </button>
    );
}

DeleteFileButtonSection.propTypes = {
    additonalClasses: PropTypes.string,
    fileName: PropTypes.string,
    files: PropTypes.array,
    handleValueChange: PropTypes.func,
};

function DatetimeInputSection({datetimeValue, additonalClasses, readonly, fieldName, handleValueChange}) {

    const dispatch = useDispatch();

    return (
        <input 
            className={"text-start font-serif antialiased tracking-widest truncate text-base text-black bg-background-cl border rounded-lg outline-1 hover:outline hover:outline-gray-500 hover:outline-offset-2 hover:bg-back" + " " + additonalClasses + " "} 
            value={datetimeValue} 
            type="datetime-local" 
            readOnly={readonly}
            onChange={(event) => dispatch(handleValueChange({fieldName: fieldName, fieldValue: event.target.value}))}
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
        GetFileSection,
        DeleteFileButtonSection, 
        DatetimeInputSection, 
        SectionContainer
    };