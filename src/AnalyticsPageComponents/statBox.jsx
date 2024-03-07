import ProtoType from 'prop-types';

function StatBox({ title, value, color}) {
    return (
        <div
            className="flex flex-col flex-nowrap items-center m-2 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 bg-surface-cl border border-slate-300 rounded-lg drop-shadow-lg"
        >
            <h2
                className="text-semibold justify-self-start sm:text-md md:text-lg lg:text-xl"
            >
                {title}
            </h2>
            <p
                className="text-semibold mx-auto sm:text-lg md:text-xl lg:text-2xl"
                style={{ color: color }}
            >
                {value}
            </p>
            
        </div>
    );
}

StatBox.propTypes = {
    title: ProtoType.string,
    value: ProtoType.string,
    color: ProtoType.string,
}

export default StatBox;