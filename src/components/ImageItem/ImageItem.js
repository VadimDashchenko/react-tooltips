import React from "react";
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {Link} from "react-router-dom";
import Button from "../Button/Button";
import './styles.scss';

const ImageItem = (props) => {
    const {data, showTooltip, hideTooltip, currentItem, editDataItem} = props;
    return (
        <>
            {data !== '' && data.map(item => {
                let main = classNames({
                    'img-item': true,
                    'center-bottom': item.position === 'center bottom',
                    'left-bottom': item.position === 'bottom left',
                    'center-right': item.position === 'center right',
                    'center-left': item.position === 'center left',
                })
                let tooltip = classNames({
                    'img-item__tooltip': true,
                    'primary': item.color === 'primary',
                    'danger': item.color === 'danger',
                    'secondary': item.color === 'secondary',
                    'success': item.color === 'success',
                })
                return (
                    <div className={main} key={item.id}>
                        <div className="img-item__img-block">
                            <img className="img-item__img"
                                 src={item.img}
                                 alt={item.description}
                                 onMouseEnter={() => showTooltip(item.id)}
                                 onMouseLeave={() => hideTooltip(item.id)}
                            />
                            { currentItem !== undefined && item.id === currentItem.id
                                ?
                                <span className={tooltip}>{currentItem.tooltip}</span>
                                : null
                            }
                        </div>
                        <Link to="/edit">
                            <Button title="edit" onClick={() => editDataItem(item.id)} />
                        </Link>
                    </div>
                )
            })}
            </>
    )
}

ImageItem.propTypes = {
    showTooltip: PropTypes.func,
    hideTooltip: PropTypes.func,
    editDataItem: PropTypes.func,
}

export default ImageItem;
