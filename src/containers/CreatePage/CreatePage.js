import React, {Component} from "react";
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import classNames from 'classnames';
import { v4 as uuid} from 'uuid';
import * as userActions from '../../actions/users';
import Button from "../../components/Button/Button";

import './styles.scss';

class CreatePage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            file: '',
            imagePreview: '',
            inform: {
                color: 'change color',
                description: '',
                position: 'change position',
            },
            positionChange: false
        }
    }

    static propTypes = {
        addNewImage: PropTypes.func
    }

    loadImg = (event) => {
        let reader = new FileReader();
        let file = event.target.files[0];
        reader.onloadend = (() => {
            this.setState({
                file: file,
                imagePreview: reader.result
            })
        });
        reader.readAsDataURL(file);
    }

    handleChange = ({target: {name, value}}) => {
        this.setState(prevState => {
            return {
                inform: {
                    ...prevState.inform,
                    [name]: value
                },
            }
        })
        if(value !== 'change position' && name === 'position') {
            this.setState({
                positionChange: true
            })
        }
    }

    createDataImage = () => {
        const {addNewImage} = this.props;
        const {imagePreview, inform:{description, color, position}} = this.state;
        let dataItem = {
            id: uuid(),
            description: description,
            tooltip: description,
            color: color,
            position: position,
            img: imagePreview
        }
        let getData = JSON.parse(localStorage.getItem('data'));
        if(getData === null){
            localStorage.setItem('data', JSON.stringify([dataItem]));
            this.setState({positionChange:false})
            addNewImage([dataItem]);
        }else{
            getData.push(dataItem);
            localStorage.setItem('data', JSON.stringify(getData));
            this.setState({positionChange:false})
            addNewImage(dataItem);
        }
    }

    render() {
        const {imagePreview, inform: {color, position, description}, positionChange} = this.state;
        let tooltip = classNames({
            'create-page__tooltips-item': true,
            'center-right': position === 'center right',
            'center-left': position === 'center left',
            'center-bottom': position === 'center bottom',
            'primary': color === 'primary',
            'secondary': color === 'secondary',
            'danger': color === 'danger',
            'success': color === 'success',
        });
        return (
            <div className="create-page">
                <Link to="/">
                    <Button title="back" />
                </Link>
                <div className="create-page__dropdown">
                    {imagePreview !== ''
                        ?
                        <>
                           <img src={imagePreview} alt="" />
                            {positionChange === true && position !== 'change position' ?
                            <span className={tooltip}>{description}</span>
                                : null
                            }
                        </>
                        :
                        <>
                            <input type="file"
                                   id="dropdown"
                                   onChange={(e) => this.loadImg(e)}
                            />
                            <label htmlFor="dropdown" >load pictures</label>
                        </>
                    }
                </div>
                <div className="create-page__options">
                    <select name="color" id="" onChange={this.handleChange}>
                        <option defaultValue={color}>{color}</option>
                        <option value="danger">danger</option>
                        <option value="primary">primary</option>
                        <option value="secondary">secondary</option>
                        <option value="success">success</option>
                    </select>
                    <input type="text"
                           placeholder="enter your description"
                           name="description"
                           value={description}
                           onChange={this.handleChange}
                    />
                    <select name="position" id="" onChange={this.handleChange}>
                        <option defaultValue={position}>change position</option>
                        <option value="center left">center left</option>
                        <option value="center right">center right</option>
                        <option value="center bottom">center bottom</option>
                    </select>
                </div>
                <div className="create-page__buttons">
                    <Link to="/">
                        <Button title="save" onClick={this.createDataImage} />
                    </Link>
                </div>
            </div>
        )
    }
}

export default connect(
    null,
    userActions
)(CreatePage);
