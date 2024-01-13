import ProtoType from 'prop-types';
import '../index.css';
import { useDispatch } from 'react-redux';

function GenericFail({additionalClasses,
                      displayState = "hidden",
                      changeDisplayState,
                    }){

    const dispatch = useDispatch();

    return (
        <div className={"absolute z-20 top-0 left-0 w-[100%] h-[100%] flex flex-col flex-nowrap justify-center opacity-100 bg-slate-950/30 " + displayState}>
            <div className={"absolute top-[40%] left-[40%] flex flex-col flex-nowrap justify-start bg-red-200 border border-red-500 rounded-md p-2 " + additionalClasses}>
                <p className="text-sm font-semibold text-red-800 ">Fail</p>
                <button onClick = {() => dispatch(changeDisplayState())}>Close</button>
            </div>
        </div>
    );
}

GenericFail.propTypes = {
    additionalClasses: ProtoType.string,
    displayState: ProtoType.string,
    changeDisplayState: ProtoType.func,
};

export default GenericFail;