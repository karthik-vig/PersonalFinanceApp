import ProtoType from 'prop-types';
import '../index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';

function CheckboxOptionsMenu({checkBoxOptions=[], 
                                setOptions, 
                                handleProceed, 
                                displayState={ state: "hidden", message: ""},
                                changeDisplayState
                            }) {
    // checkBoxOptions = [{
    //     id: "deleteAll", // some id value
    //     label: "Delete All", // the label for the checkbox
    // }]
    // setDeleteSettings is a function that sets the redux state for the delete settings
    // deleteAction is a function sets the state for the warning box.
    // the cancel button resets the delete settings state AND sets the display state to "hidden"

    const dispatch = useDispatch();
    return (
        <div
            className={displayState.state + " absolute z-20 top-0 left-0 flex flex-col flex-nowrap justify-center items-center w-[100%] h-[100%] opacity-100 bg-slate-950/30"}
        >
            <div
                className="absolute top-[25%] left-[40%] p-2 h-auto w-[30%] flex flex-col flex-nowrap justify-center items-center border border-slate-400 rounded-md bg-slate-100"
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
                    {checkBoxOptions.map((checkBoxOption) => {
                        return (
                            <section 
                                className="flex flex-row flex-nowrap"
                                key={checkBoxOption.id}
                            >
                                <input type="checkbox" id={checkBoxOption.id} onChange={() => dispatch(setOptions(checkBoxOption.id))}/>
                                <label htmlFor={checkBoxOption.id}>{checkBoxOption.label}</label>
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
                        onClick={() => dispatch(changeDisplayState())}
                    >
                        Cancel
                    </button>
                </section>
            </div>
        </div>
    );
}

CheckboxOptionsMenu.propTypes = {
    checkBoxOptions: ProtoType.array,
    setOptions: ProtoType.func,
    handleProceed: ProtoType.func,
    displayState: ProtoType.string,
    changeDisplayState: ProtoType.func,
};

export default CheckboxOptionsMenu;