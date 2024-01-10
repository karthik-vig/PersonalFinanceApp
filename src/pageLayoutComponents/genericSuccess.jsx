import ProtoType from 'prop-types';
import '../index.css';

function GenericSuccess({additionalClasses,
                         displayState = "hidden",
                         changeDisplayState,
                        }){
    return (
        <div className={"absolute z-20 top-0 left-0 w-[100%] h-[100%] flex flex-col flex-nowrap justify-center opacity-100 bg-slate-950/30 " + displayState}>
            <div className={"absolute top-[40%] left-[40%] flex flex-col flex-nowrap justify-start bg-green-200 border border-green-500 rounded-md p-2 " + additionalClasses}>
                <p className="text-sm font-semibold text-green-800">Success</p>
                <button onClick = {() => changeDisplayState("hidden")}>Close</button>
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