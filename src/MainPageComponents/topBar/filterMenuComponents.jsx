import PropTypes from 'prop-types';
import '../../index.css';

function FilterMenu({ handleFilterClick }){
    return (
        <div 
            className="flex flex-col flex-nowrap h-14 mx-7 mt-10 mb-4 rounded-lg border bg-surface-cl drop-shadow-lg "
            onClick={handleFilterClick}
        >
            
        </div>
    );
}

FilterMenu.propTypes = {
    handleFilterClick: PropTypes.func,
};

export default FilterMenu;