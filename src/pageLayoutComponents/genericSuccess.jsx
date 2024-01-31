import ProtoType from 'prop-types';
import '../index.css';
import { useDispatch } from 'react-redux';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
library.add(faCheckCircle);

function GenericSuccess({additionalClasses,
                         displayState = {state: "hidden", message: ""},
                         changeDisplayState,
                        }){

    const dispatch = useDispatch();

    return (
        <div className={"absolute z-20 top-0 left-0 w-[100%] h-[100%] flex flex-col flex-nowrap justify-center opacity-100 bg-slate-950/30 " + displayState.state}>
            <div className={"absolute top-[25%] left-[40%] h-32 w-[20%] flex flex-col flex-nowrap justify-center items-center bg-lime-100 border border-lime-300 rounded-md p-2 " + additionalClasses}>
                <div className="flex flex-row flex-nowrap m-5 h-10 w-[90%] justify-center items-center">
                    <FontAwesomeIcon icon={faCheckCircle} color="#00ff00" className="h-10 w-10"/>
                    <p
                        className="flex fles-wrap items-center ml-2 h-10 w-[80%] text-sm font-semibold text-lime-800"
                    >
                        Success : {displayState.message}
                    </p>
                </div>
                <button 
                    className="flex flex-row flex-nowrap justify-center items-center w-20 h-8 border rounded-md bg-lime-500 hover:bg-lime-700 border-lime-600"
                    onClick = {() => dispatch(changeDisplayState())}
                >
                    Close
                </button>
            </div>
        </div>
    );
}

GenericSuccess.propTypes = {
    additionalClasses: ProtoType.string,
    displayState: ProtoType.string,
    changeDisplayState: ProtoType.func,

};

export default GenericSuccess;