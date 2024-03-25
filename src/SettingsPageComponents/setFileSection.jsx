import Heading from "./headingSection";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { 
    toggleFileUpdate, 
    setFilePath,
 } from "../stateManagement/settingsPageStates/settings";


function SelectedFile(){
    const filePath = useSelector((state) => state.settingsPageStates.settings.filePath);
    return (
        <input
            type="text"
            className="text-base font-semibold text-black/75 overflow-x-auto \
                        w-[100%] h-8 p-1 bg-background-cl border rounded-md"
            readOnly={true}
            value={filePath}
        />
    );
}

function SelectFile(){
    const triggerFileUpdate = useSelector((state) => state.settingsPageStates.settings.triggerFileUpdate);
    const dispatch = useDispatch();
    useEffect(() => { 
        if (!triggerFileUpdate) return;
        //open file dialog using the back-end and get the file path and set it to the state
        window.initializeDatabase.openFilePathDialog().then((filePath) => { 
            dispatch(setFilePath(filePath));
        });
        dispatch(toggleFileUpdate());
    }, [dispatch, triggerFileUpdate]);
    return (
        <button
            className="border bg-blue-500 hover:bg-blue-800 text-white font-bold py-1 px-2 rounded-lg \
                        w-32 h-8 mx-1 my-2"
            onClick={() => dispatch(toggleFileUpdate())}
        >
            Open File
        </button>
    );
}

function SetFileSection(){
    return (
        <div
            className="flex flex-col flex-nowrap \
                        sm:w-[80%] md:w-[80%] lg:w-[80%] xl:w-[80%] 2xl:w-[80%] \
                        h-auto \
                        p-2 my-4"
        >
            <Heading 
                titleText="Set File Section"
            />
            <SelectedFile />
            <SelectFile />
        </div>
    );
}

export default SetFileSection;