import React from "react";
import PropTypes from 'prop-types'

function TechItem({tech, onDelete}) {
    return (<li>
        {tech}
        <button type="button"
                onClick={onDelete}>Delete
        </button>
    </li>)
}

// it avoid empty variable
TechItem.defaultProps = {
    tech: 'Vazio',
};

// check fields
TechItem.propTypes = {
    tech: PropTypes.string,
    onDelete: PropTypes.func.isRequired,
};

export default TechItem