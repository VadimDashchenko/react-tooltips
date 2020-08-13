import React from "react"
import PropTypes from 'prop-types';
import './styles.scss';

const Button = props => {
    const {title, type, onClick} = props;
    return(
        <button onClick={onClick} className={type === 'delete' ? 'button button__delete' : 'button button__inform'}>
            {title}
        </button>
    )
}

Button.propTypes = {
    title: PropTypes.string,
    type: PropTypes.string,
    onClick: PropTypes.func
};

export default Button;
