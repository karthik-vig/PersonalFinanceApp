import ProtoType from 'prop-types';

function StatBox({ title, value, color}) {
    return (
        <div
            className="flex flex-col flex-nowrap m-2 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 bg-surface-cl border border-slate-300 rounded-lg drop-shadow-lg"
        >
            <h2
                className="text-semibold justify-self-start sm:text-base md:text-sm lg:text-md"
            >
                {title}
            </h2>
            <p
                className="text-bold m-auto sm:text-xl md:text-2xl lg:text-3xl"
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