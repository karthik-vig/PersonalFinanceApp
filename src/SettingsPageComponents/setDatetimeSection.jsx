import moment from "moment-timezone";
import Heading from "./headingSection";
import { useSelector, useDispatch } from "react-redux";
import { setTimezone } from "../stateManagement/settingsPageStates/settings";

function SelectTimezone(){
    const timezone = useSelector((state) => state.settingsPageStates.settings.timezone);
    const dispatch = useDispatch();
    return (
        <select
            className="bg-background-cl p-2 sm:w-[100%] md:w-[100%] lg:w-[90%] xl:w-[80%] 2xl:w-[80%]\
                         h-auto \
                         border rounded-md"
            value={timezone}
            onChange={(event) => dispatch(setTimezone(event.target.value))}
        >
            {moment.tz.names().map((timezone, index) => (
                <option key={index}>{timezone}</option>
            ))}
        </select>
    );

}

function SetDatetimeSection(){
    return (
        <div
            className="flex flex-col flex-nowrap \
                        sm:w-[70%] md:w-[70%] lg:w-[60%] xl:w-[60%] 2xl:w-[50%] \
                        h-auto\
                        p-2 my-4" 
        >
            <Heading 
                titleText="Set Datetime Section"
            />
            <SelectTimezone />
        </div>
    );
}

export default SetDatetimeSection;