import PropTypes from 'prop-types';
import '../../index.css';
//import { useImmer } from 'use-immer';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {  triggerAddFile,
    resetTriggerAddFile,
    triggerDeleteFile,
    resetTriggerDeleteFile,
    triggerGetFile,
    resetTriggerGetFile,
 } from '../../stateManagement/mainPageStates/triggerUpdateFile.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
// library.add(faTrashAlt);


// below are the basic components that can be used to build the detail section
function H6HeadingText({children, additonalClasses}) {

    return (
        <h6 className={"text-start font-semibold antialiased tracking-widest truncate text-base text-black/75" + " " + additonalClasses + " "}>{children}</h6>
    );
}

H6HeadingText.propTypes = {
    children: PropTypes.string,
    additonalClasses: PropTypes.string,
};

function H3HeadingText({children, additonalClasses}) {

    return (
        <h3 className={"justify-self-center text-start font-bold antialiased tracking-widest truncate text-xl text-black" + " " + additonalClasses + " "}>{children}</h3>
    );
}

H3HeadingText.propTypes = {
    children: PropTypes.string,
    additonalClasses: PropTypes.string,
};

function TextInputSection({textValue, additonalClasses, fieldName, handleValueChange, textLength=30}) {

    if (textValue === null) textValue = "";
    const dispatch = useDispatch();

    return (
        <input 
            className={"p-1 text-start antialiased tracking-widest truncate text-base text-black bg-background-cl border rounded-lg outline-1 hover:outline hover:outline-gray-500 hover:outline-offset-2 hover:bg-back" + " " + additonalClasses + " "} 
            value={textValue} 
            type="text" 
            maxLength={textLength}
            onChange={(event) => dispatch(handleValueChange({fieldName: fieldName, fieldValue: event.target.value}))}
        />
    );
}

TextInputSection.propTypes = {
    textValue: PropTypes.string,
    additonalClasses: PropTypes.string,
    handleValueChange: PropTypes.func,
    textLength: PropTypes.number,
    fieldName: PropTypes.string,
};

function TextAreaSection({textValue, fieldName, handleValueChange, textLength=10000}) {

    if (textValue === null) textValue = "";
    const dispatch = useDispatch();

    return (
        <textarea 
            className="whitespace-pre-wrap text-start antialiased tracking-widest text-base text-black bg-background-cl border rounded-lg outline-1 hover:outline hover:outline-gray-500 hover:outline-offset-2 hover:bg-back overflow-y-scroll overflow-x-clip resize-y w-[100%] h-auto min-h-28 max-h-56 px-2 py-1" 
            value={textValue} 
            type="text"
            maxLength={textLength}
            onChange={(event) => dispatch(handleValueChange({fieldName: fieldName, fieldValue: event.target.value}))}
        />
    );
}

TextAreaSection.propTypes = {
    textValue: PropTypes.string,
    handleValueChange: PropTypes.func,
    fieldName: PropTypes.string,
    textLength: PropTypes.number,
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

function NumberInputSection({numberValue, minValue=null, additonalClasses, fieldName, handleValueChange}) {

    if (numberValue === null) numberValue = 0;
    if (minValue === null) minValue = 0;
    const dispatch = useDispatch();

    return (
        <input 
            className={"text-start font-serif antialiased tracking-widest truncate text-base text-black bg-background-cl border rounded-lg outline-1 hover:outline hover:outline-gray-500 hover:outline-offset-2 hover:bg-back" + " " + additonalClasses + " "} 
            value={numberValue} 
            type="number"
            min={minValue}
            onChange={(event) => dispatch(handleValueChange({fieldName: fieldName, fieldValue: event.target.value}))}
        />
    );
}

NumberInputSection.propTypes = {
    numberValue: PropTypes.number,
    minValue: PropTypes.number,
    additonalClasses: PropTypes.string,
    fieldName: PropTypes.string,
    handleValueChange: PropTypes.func,
};

function RadioButtonSection({ radioBtnID, fieldName, children, additonalClasses, checked, handleValueChange}) {

    if (checked === null) checked = false;
    const dispatch = useDispatch();

    return (
        <section
            className={ "flex flex-row flex-nowrap items-center justify-start" + " " + additonalClasses }
        >
            <input 
                type="radio"
                id={radioBtnID}
                name={radioBtnID} 
                value={children} 
                checked={checked} 
                onChange={(event) =>  dispatch(handleValueChange({fieldName: fieldName, fieldValue: event.target.value})) } 
                className=""
            />
            <label 
                htmlFor={fieldName}
            >
                {children}
            </label>
        </section>
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

    const triggerUpdateFilesState = useSelector((state) => state.mainPageStates.triggerUpdateFileState);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!triggerUpdateFilesState.addFile) return;
        window.transactionOperations.openFileDialog().then((fileDetails) => {
            if(fileDetails.length > 0) {
                let filesCopy = new Map(files.map((fileDetail) => [fileDetail.fileid, fileDetail.filename]));
                fileDetails.forEach((fileDetail) => {
                    if (!filesCopy.has(fileDetail.fileid)) filesCopy.set(fileDetail.fileid, fileDetail.filename);
                });
                const newFilesCopy = Array.from(filesCopy).map(([fileid, filename]) => ({fileid: fileid, filename: filename}));
                dispatch(handleValueChange({fieldName: "file", fieldValue: newFilesCopy}))
            }
            dispatch(resetTriggerAddFile());
        });
    }, [triggerUpdateFilesState,
        files, 
        dispatch,
        handleValueChange,
    ]);
    
    return (
        <section
            className={"flex flex-row flex-nowrap justify-center items-center" + " " + additonalClasses + " "}
        >
            <button 
                className="border bg-blue-500 hover:bg-blue-800 text-white font-bold py-1 px-2 rounded-lg"
                onClick={() => dispatch(triggerAddFile())}
            >
                Add File
            </button>
        </section>
    );
}

FileInputSection.propTypes = {
    additonalClasses: PropTypes.string,
    files: PropTypes.array,
    handleValueChange: PropTypes.func,
};

function GetFileSection({ additonalClasses, fileName, fileid }) {

    const triggerUpdateFilesState = useSelector((state) => state.mainPageStates.triggerUpdateFileState);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!(triggerUpdateFilesState.getFile.status && triggerUpdateFilesState.getFile.fileid === fileid)) return;
        window.transactionOperations.saveFileDialog(fileid);
        dispatch(resetTriggerGetFile());
    }, [triggerUpdateFilesState,
        fileid,
        fileName,
        dispatch,
    ]);

    return (
        <button
            className={" " + additonalClasses + " "}
            onClick={() => { dispatch(triggerGetFile(fileid)); } }
        >
            <p
                className="text-wrap underline text-blue-300 hover:text-blue-500"
            >
                {fileName}
            </p>        
        </button>
    );
}

GetFileSection.propTypes = {
    additonalClasses: PropTypes.string,
    fileName: PropTypes.string,
    fileid: PropTypes.string,
};

function DeleteFileButtonSection({additonalClasses, fileName, fileid, files, handleValueChange}) {

    const triggerUpdateFilesState = useSelector((state) => state.mainPageStates.triggerUpdateFileState);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!(triggerUpdateFilesState.deleteFile.status && triggerUpdateFilesState.deleteFile.fileid === fileid)) return;
        window.transactionOperations.deleteFileBlob(fileid).then((deleteFileBlobStatus) => {
            if (deleteFileBlobStatus) {
                //let filesCopy = [...files];
                const filesCopy = files.filter((fileDetail) => fileDetail.fileid !== fileid);
                dispatch(handleValueChange({fieldName: "file", fieldValue: filesCopy}));
            }
            dispatch(resetTriggerDeleteFile());
        });
    }, [triggerUpdateFilesState,
        fileName,
        fileid,
        files,
        dispatch,
        handleValueChange,
    ]);

    return (
        <button 
            className={ " " + additonalClasses + " "}
            onClick={() => { dispatch(triggerDeleteFile(fileid)); } }
        >
            <FontAwesomeIcon icon="fa-trash-alt" color='#ff0000'/>
        </button>
    );
}

DeleteFileButtonSection.propTypes = {
    additonalClasses: PropTypes.string,
    fileName: PropTypes.string,
    fileid: PropTypes.string,
    files: PropTypes.array,
    handleValueChange: PropTypes.func,
};

function DatetimeInputSection({datetimeValue, additonalClasses, readonly, fieldName, handleValueChange}) {

    const dispatch = useDispatch();

    return (
        <input 
            className={"py-1 text-start font-serif antialiased tracking-widest truncate text-base text-black bg-background-cl border rounded-lg outline-1 hover:outline hover:outline-gray-500 hover:outline-offset-2 hover:bg-back" + " " + additonalClasses + " "} 
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

function PopOut({additonalClasses, handlePopOut}) {
    return (
        <button 
            className={additonalClasses}
            onClick={handlePopOut}
        >
            <FontAwesomeIcon
                icon="fa-external-link"
                className="h-[100%] w-[100%]"
                color="#34568B"
            />
        </button>
    );
}

PopOut.propTypes = {
    additonalClasses: PropTypes.string,
    handlePopOut: PropTypes.func,
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
        SectionContainer,
        PopOut,
    };