import SetFileSection from "./setFileSection";
import SetDatetimeSection from "./setDatetimeSection";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleConfigUpdate } from "../stateManagement/settingsPageStates/settings";

function SettingsPageHeading(){
    return (
        <h1
            className="text-2xl font-bold text-black self-center"
        >
            Settings
        </h1>
    );

}

function SaveButton(){
    const triggerConfigUpdate = useSelector((state) => state.settingsPageStates.settings.triggerConfigUpdate);
    const filePath = useSelector((state) => state.settingsPageStates.settings.filePath);
    const timezone = useSelector((state) => state.settingsPageStates.settings.timezone);
    const dispatch = useDispatch();

    useEffect(() => { 
        if (!triggerConfigUpdate) return;
        //contact the back-end; save the config to the config file
        //filePath and timezone are the values to be send to the back-end; to be saved to the config file
        window.initializeDatabase.updateConfigFile(filePath, timezone).then(() => {
            // console.log("Config file updated successfully");
            window.app.fullRefresh();
        });
        dispatch(toggleConfigUpdate());
    }, [dispatch, triggerConfigUpdate, filePath, timezone]);
    return (
        <button
            className="truncate border rounded-md bg-green-600 text-semibold text-white \
                        my-1 w-16 h-8 hover:bg-green-700 border-green-700 \
                        self-center"
            onClick={() => dispatch(toggleConfigUpdate())}
        >
            Save
        </button>
    );
}

function SettingsPage() {
  return (
    <div 
        className="relative z-0 flex flex-col flex-nowrap items-center \
                    h-[100%] w-[100%] bg-background-cl \
                    overflow-y-scroll overflow-x-hidden"
    >   
        <div
        className="flex flex-col flex-nowrap \
                    justify-center \
                    sm:w-[80%] md:w-[80%] lg:w-[70%] xl:w-[70%] 2xl:w-[60%] \
                    h-auto \
                    bg-surface-cl p-2 mt-8 mb-4 \
                    border rounded-lg drop-shadow-lg"
        >
            <SettingsPageHeading />
            <SetFileSection />
            <SetDatetimeSection />
            <SaveButton />
        </div>
    </div>
  );
}

export default SettingsPage;