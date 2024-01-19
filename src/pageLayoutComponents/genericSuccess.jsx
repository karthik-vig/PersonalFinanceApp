import ProtoType from 'prop-types';
import '../index.css';
import { useDispatch } from 'react-redux';

function GenericSuccess({additionalClasses,
                         displayState = "hidden",
                         changeDisplayState,
                        }){

    const dispatch = useDispatch();

    return (
        <div className={"absolute z-20 top-0 left-0 w-[100%] h-[100%] flex flex-col flex-nowrap justify-center opacity-100 bg-slate-950/30 " + displayState}>
            <div className={"absolute top-[45%] left-[45%] flex flex-col flex-nowrap justify-center items-center bg-green-100 border border-green-300 rounded-md p-2 " + additionalClasses}>
                <p className="text-sm font-semibold text-lime-800 m-5">Success</p>
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