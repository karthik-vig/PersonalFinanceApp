import ProtoType from 'prop-types';
import '../index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';

function SelectOptionMenu({selectOptions={},
                            selectState,
                            setOptions,
                            handleProceed,
                            displayState={ state: "hidden", message: ""},
                            handleCancel
                        }) {

    const dispatch = useDispatch();
    // selectOptions = [{
    //     id: "setNullValue", // some id value
    //     label: "Select an option to replace the entity with", // the label for the checkbox
    //     options: ["Option 1", "Option 2", "Option 3"], // options the user can select from
    // }];
    // selectState = {id1: value1, id2: value2}sets the default state value for each select options box when the menu opens
    // setOptions = a function that sets the redux state for the use the selectOptions id
    // handleProceed = a function that sets the states to enable next steps on proceed button
    // displayState = a state that sets the visibility of the menu and also the message to display about the menu
    // handleCancel = a function that sets the states to disable next steps on cancel button
    
    return (
        <div
            className={displayState.state + " absolute z-20 top-0 left-0 flex flex-col flex-nowrap justify-center items-center w-[100%] h-[100%] opacity-100 bg-slate-950/30"}
        >
            <div
                className="absolute top-[25%] sm:left-[15%] md:left-[20%] lg:left-[40%] p-2 h-auto sm:w-[70%] md:w-[60%] lg:w-[30%] flex flex-col flex-nowrap justify-center items-center border border-slate-400 rounded-md bg-slate-100"
            > 
                <section
                    className="flex flex-row flex-nowrap m-5 p-2 h-10 w-[90%] justify-center items-center"
                >
                    <FontAwesomeIcon 
                        icon="fa-exclamation-triangle" 
                        color="#b34b4b" 
                        className="h-10 w-10"
                    />
                    <p
                        className="h-[100%] w-auto text-sm font-semibold text-black-800 ml-2 items-center"
                    >
                        {displayState.message}
                    </p>
                </section>
                <section
                    className="mb-6 h-auto w-auto flex flex-col flex-nowrap justify-start"
                >
                    {Object.keys(selectOptions).map((selectOptionID) => {
                        console.log("rendering select option");
                        console.log(selectOptions[selectOptionID]);
                        return (
                            <section 
                                className="flex flex-row flex-nowrap"
                                key={"DeleteSettingsSelectSectionKey:"+selectOptionID}
                            >
                                <label
                                    htmlFor={"DeleteSettingsSelectID:"+selectOptionID}
                                    className="text-sm font-semibold text-black-800"
                                >
                                    {selectOptions[selectOptionID].label}
                                </label>
                                <select 
                                    id={"DeleteSettingsSelectID:"+selectOptionID}
                                    className="border rounded-md bg-slate-100 text-semibold text-black-800 w-40 h-8 hover:bg-slate-200 border-slate-200 ml-2"
                                    value={selectState[selectOptionID]}
                                    onChange={(event) => dispatch(setOptions({id: selectOptionID, value: event.target.value}))}
                                >
                                    <option value="choose" disabled>Choose...</option>
                                    {selectOptions[selectOptionID].options.map((option) => {
                                        return (
                                            <option 
                                                value={option}
                                                key={option}
                                            >
                                                {option}
                                            </option>
                                        );
                                    })}
                                </select>
                            </section>
                        );
                    })}
                </section>
                <section
                    className="flex flex-row flex-nowrap"
                >
                    <button 
                        className="border rounded-md bg-green-600 text-semibold text-white w-20 h-8 hover:bg-green-700 border-green-700"
                        onClick={handleProceed}
                    >
                        Proceed
                    </button>
                    <button 
                        className="ml-14 border rounded-md bg-red-400 text-semibold text-white w-20 h-8 hover:bg-red-700 border-red-700"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                </section>
            </div>
        </div>
    );
}

SelectOptionMenu.propTypes = {
    selectOptions: ProtoType.array,
    selectState: ProtoType.object,
    setOptions: ProtoType.func,
    handleProceed: ProtoType.func,
    displayState: ProtoType.object,
    handleCancel: ProtoType.func,
};

export default SelectOptionMenu;