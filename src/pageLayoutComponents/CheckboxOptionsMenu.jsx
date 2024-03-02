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
            className={displayState.state + " absolute z-20 top-0 left-0 flex flex-col flex-nowrap justify-center items-center w-[100%] h-[100%]"}
        > 
            <section
                className="flex flex-row flex-nowrap m-5 p-2 h-10 w-[90%] justify-center items-center"
            >
                <FontAwesomeIcon 
                    icon="fa-times-circle" 
                    color="#ff0000" 
                    className="h-10 w-10"
                />
                <p>
                    {displayState.message}
                </p>
            </section>
            {checkBoxOptions.map((checkBoxOption) => {
                return (
                    <section key={checkBoxOption.id}>
                        <input type="checkbox" id={checkBoxOption.id} value={false} onClick={() => setOptions(checkBoxOption.id)}/>
                        <label htmlFor={checkBoxOption.id}>{checkBoxOption.label}</label>
                    </section>
                );
            })}
            <section>
                <button onClick={handleProceed}>Proceed</button>
                <button onClick={() => dispatch(changeDisplayState())}>Cancel</button>
            </section>
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