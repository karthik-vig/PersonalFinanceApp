import PropTypes from 'prop-types';
import '../../index.css';

function FilterMenu({ displayState="hidden", handleFilterClick }){

    //each filter param is enabled or disabled based on the whether
    //they are checked in the checkbox or not
    const filterParams = {
                            value: {
                                min: null, //number input
                                max: null, //number input
                            },
                            currency: null, //select list
                            transactionType: null, //select list
                            transactionCategory: null, //select list
                            fromType: null, //select list
                            fromEntity: null, //select list
                            toType: null, //select list
                            toEntity: null, //select list
                            recurringEntity: null, //select list
                            createdDate: { min: null, //date picker
                                            max: null, //date picker
                                            },
                            modifiedDate: { min: null, //date picker
                                            max: null, //date picker
                                            },
                            transactionDate: { min: null, //date picker
                                                max: null, //date picker
                                            },
                            sort: { ascending: true, //select list; can be true or false
                                    field: null, //select list; some valid field name
                                  },
                        };

    return (
        <div 
            className={"h-96 w-[50%] z-50 top-[65px] left-[30%] absolute rounded-lg border bg-surface-cl drop-shadow-lg " + displayState}
            onClick={(event) => handleFilterClick(event, filterParams)}
        >
            
        </div>
    );
}

FilterMenu.propTypes = {
    displayState: PropTypes.string,
    handleFilterClick: PropTypes.func,
};

export default FilterMenu;