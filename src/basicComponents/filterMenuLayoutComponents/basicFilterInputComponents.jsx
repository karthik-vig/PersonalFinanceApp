import PropTypes from 'prop-types';
import '../../index.css';
import { useImmer } from 'use-immer';

function H6Heading({additionalClasses, headingText}){

    return (
        <h6 
            className={"truncate text-lg font-semibold text-indigo-400 " + additionalClasses}
        >
            {headingText}
        </h6>
    );
}

H6Heading.propTypes = {
    additionalClasses: PropTypes.string,
    headingText: PropTypes.string,
};

function LabelText({additionalClasses, labelText}){

    return (
        <label 
            className={"text-sm font-semibold text-primary-cl " + additionalClasses}
        >
            {labelText}
        </label>
    );
}

LabelText.propTypes = {
    additionalClasses: PropTypes.string,
    labelText: PropTypes.string,
};

function CheckboxInputField({additionalClasses, fieldName, handleInputChange}){ 
    
        const [checkedStatus, setCheckedStatus] = useImmer(false);

        const handleCheckedChange = () => {
            setCheckedStatus(!checkedStatus);
            handleInputChange(fieldName);
        }

        return (
            <input 
                type="checkbox"
                className={"w-4 h-4 rounded-md border border-primary-cl " + additionalClasses}
                checked={checkedStatus}
                onChange={handleCheckedChange}
            />
        );
}

CheckboxInputField.propTypes = {
    additionalClasses: PropTypes.string,
    fieldName: PropTypes.string,
    handleInputChange: PropTypes.func,
};

function NumberInputField({additionalClasses, fieldName, handleInputChange}){

    return (
        <input 
            type="number"
            className={"w-full h-8 rounded-md border border-primary-cl " + additionalClasses}
            onChange={(event) => handleInputChange(fieldName, event.target.value)}
        />
    );
}

NumberInputField.propTypes = {
    additionalClasses: PropTypes.string,
    fieldName: PropTypes.string,
    handleInputChange: PropTypes.func,
};

function DateInputField({additionalClasses, fieldName, handleInputChange}){

    return (
        <input 
            type="datetime-local"
            className={"w-full h-8 rounded-md border border-primary-cl " + additionalClasses}
            onChange={(event) => handleInputChange(fieldName, event.target.value)}
            readOnly={false}
        />
    );
}

DateInputField.propTypes = {
    additionalClasses: PropTypes.string,
    fieldName: PropTypes.string,
    handleInputChange: PropTypes.func,
};

function SelectInputField({additionalClasses, fieldName, handleInputChange, selectOptions}){

    return (
        <select 
            className={"w-full h-8 rounded-md border border-primary-cl " + additionalClasses}
            onChange={(event) => handleInputChange(fieldName, event.target.value)}
        >   
            <option 
                key="choose"
                value="choose"
                selected
            > 
                choose
            </option>
            {selectOptions.map((option) => (
                <option 
                    key={option}
                    value={option}
                >
                    {option}
                </option>
            ))}
        </select>
    );
}

SelectInputField.propTypes = {
    additionalClasses: PropTypes.string,
    fieldName: PropTypes.string,
    handleInputChange: PropTypes.func,
    selectOptions: PropTypes.array,
};


export {
        H6Heading,
        LabelText,
        CheckboxInputField,
        NumberInputField,
        DateInputField,
        SelectInputField,
        };