import PropTypes from 'prop-types';
import '../index.css';

function GenericWarningBox({warningText, 
                            additionalClasses, 
                            displayState = "hidden",
                            changeDisplayState,
                            warningCaller,
                            action,
                            handleActionResponse,
                        }) {


    return (
        <div 
            className={"absolute z-20 top-0 left-0 w-[100%] h-[100%] flex flex-col flex-nowrap justify-center opacity-100 bg-slate-950/30 " + displayState }
        >
            <div className={"absolute top-[40%] left-[40%] flex flex-col flex-nowrap justify-start bg-yellow-200 border border-yellow-500 rounded-md p-2 " + additionalClasses}>
                <p className="text-sm font-semibold text-yellow-800">{warningText}</p>
                <section className="flex flex-row flex-nowrap justify-center">
                    <button 
                        className="flex flex-row flex-nowrap justify-center items-center w-20 h-8 rounded-md bg-yellow-500 hover:bg-yellow-600"
                        onClick={() => { changeDisplayState(draft => {draft[warningCaller] = "hidden"}); handleActionResponse(action()); }}
                    >
                        <p className="text-sm font-semibold text-white">Yes</p>
                    </button>
                    <button 
                        className="flex flex-row flex-nowrap justify-center items-center w-20 h-8 rounded-md bg-yellow-500 hover:bg-yellow-600"
                        onClick={() => changeDisplayState(draft => {draft[warningCaller] = "hidden"})}
                    >
                        <p className="text-sm font-semibold text-white">No</p>
                    </button>
                </section>
            </div>
        </div>
    );
}

GenericWarningBox.propTypes = {
    warningText: PropTypes.string,
    additionalClasses: PropTypes.string,
    displayState: PropTypes.string,
    changeDisplayState: PropTypes.func,
    warningCaller: PropTypes.string,
    action: PropTypes.func,
    handleActionResponse: PropTypes.func,
};

export default GenericWarningBox;