import PropTypes from 'prop-types';
import '../index.css';
import { useDispatch } from 'react-redux';

function GenericWarningBox({warningText, 
                            additionalClasses, 
                            displayState = "hidden",
                            changeDisplayState,
                            setState,
                            //warningCaller,
                            //action,
                            //handleActionResponse,
                        }) {

    const dispatch = useDispatch();

    return (
        <div 
            className={"absolute z-20 top-0 left-0 w-[100%] h-[100%] flex flex-col flex-nowrap justify-center opacity-100 bg-slate-950/30 " + displayState }
        >
            <div className={"absolute top-[40%] sm:left-[15%] md:left-[20%] lg:left-[40%] h-auto sm:w-[70%] md:w-[60%] lg:w-[30%] flex flex-col flex-nowrap justify-start bg-yellow-100 border border-yellow-300 rounded-md p-2 " + additionalClasses}>
                <p className="text-sm font-semibold text-yellow-800 my-2">{warningText}</p>
                <section className="flex flex-row flex-nowrap justify-evenly">
                    <button 
                        className="flex flex-row flex-nowrap justify-center items-center w-20 h-8 border rounded-md bg-lime-500 hover:bg-lime-700 border-lime-600"
                        onClick={() => { dispatch(setState()); dispatch(changeDisplayState()) } }
                    >
                        <p className="text-sm font-semibold text-white">Yes</p>
                    </button>
                    <button 
                        className="flex flex-row flex-nowrap justify-center items-center w-20 h-8 border rounded-md bg-red-500 hover:bg-red-700 border-red-600"
                        onClick={() => dispatch(changeDisplayState()) }
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
    setState: PropTypes.func,
    //warningCaller: PropTypes.string,
    //action: PropTypes.func,
    //handleActionResponse: PropTypes.func,
};

export default GenericWarningBox;