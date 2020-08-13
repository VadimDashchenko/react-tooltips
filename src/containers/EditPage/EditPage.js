import React, {Component} from "react";
import PropTypes from 'prop-types';
import {Link, Redirect} from "react-router-dom";
import {connect} from 'react-redux';
import classNames from "classnames";
import * as userActions from '../../actions/users';
import Button from "../../components/Button/Button";
import {getCurrentEditableDataItem, getData} from "../../selectors/user";
import './styles.scss';

class EditPage extends Component {

    state = {
        editableDataItem: this.props.editableDataItem,
        imagePreview: '',
        file: ''
    }

    static propTypes = {
        getCurrentEditableDataItem: PropTypes.func,
        getData: PropTypes.func,
        editDataImage: PropTypes.func,
        getCurrentEditableItem: PropTypes.func,
        data: PropTypes.array,
        editableDataItem: PropTypes.object
    }

    loadImg = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
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
                editableDataItem: {
                    ...prevState.editableDataItem,
                    [name]: value
                }
            }
        })
    }

    editDataImage = () => {
        const {editableDataItem, imagePreview} = this.state;
        const {editDataImage, data, getCurrentEditableItem} = this.props;
        let dataToEdit = data.map(i =>{
            if(i.id === editableDataItem.id && imagePreview !== ''){
                editableDataItem.img = imagePreview;
                return editableDataItem
            }
            else if(editableDataItem !== i && i.id === editableDataItem.id){
                return editableDataItem
            }
            return i;
        });
        editDataImage(dataToEdit);
        getCurrentEditableItem(null);
        localStorage.setItem('data', JSON.stringify(dataToEdit));
    }

    cancelEditDataItem = () => {
        const {getCurrentEditableItem} = this.props;
        getCurrentEditableItem(null);
    }

    deleteImg = () => {
        this.setState(prevState => {
            return {
                editableDataItem: {
                    ...prevState.editableDataItem,
                    img: ''
                },
                imagePreview: '',
                file: ''
            }
        })
    }

    deleteDataItem = (id) => {
        const {editDataImage, data, getCurrentEditableItem} = this.props;
        let dataToEdit = data.filter(i => i.id !== id);
        editDataImage(dataToEdit);
        getCurrentEditableItem(null);
        localStorage.setItem('data', JSON.stringify(dataToEdit));
    }

    render() {
        const {editableDataItem, imagePreview} = this.state;
        let tooltip = editableDataItem !== undefined && classNames({
            'edit-page__tooltips-item': true,
            'center-right': editableDataItem.position === 'center right',
            'center-left': editableDataItem.position === 'center left',
            'center-bottom': editableDataItem.position === 'center bottom',
            'left-bottom': editableDataItem.position === 'bottom left',
            'primary': editableDataItem.color === 'primary',
            'secondary': editableDataItem.color === 'secondary',
            'danger': editableDataItem.color === 'danger',
            'success': editableDataItem.color === 'success',
        });
        return (
            <>
            {editableDataItem === undefined
                ?
                <Redirect to="/" />
                :
                <div className="edit-page">
                    <Link to="/">
                            <Button title="back to home" onClick={this.cancelEditDataItem} />
                        </Link>
                         <div className="edit-page__dropdown">
                             {
                                 editableDataItem.img !== ''
                                     ?
                                     <>
                                         <img src={editableDataItem.img} alt={editableDataItem.tooltip} />
                                         <span className={tooltip}>{editableDataItem.tooltip}</span>
                                     </>
                                     :
                                     imagePreview === '' ?
                                         <>
                                            <input type="file"
                                                   id="dropdown"
                                                   onChange={(e) => this.loadImg(e)}
                                            />
                                            <label htmlFor="dropdown">load pictures</label>
                                              <span className={tooltip}>{editableDataItem.tooltip}</span>
                                        </>
                                         :
                                         <>
                                             <img src={imagePreview} alt="" />
                                              <span className={tooltip}>{editableDataItem.tooltip}</span>
                                         </>
                             }
                        </div>
                    <div className="edit-page__delete">
                        <Button title="delete image" type="delete" onClick={this.deleteImg} />
                    </div>
                        <div className="edit-page__options">
                            <select name="color" id="" onChange={this.handleChange}>
                                <option defaultValue='color'>{editableDataItem.color}</option>
                                <option value="danger">danger</option>
                                <option value="primary">primary</option>
                                <option value="secondary">secondary</option>
                                <option value="success">success</option>
                            </select>
                            <input type="text"
                                   placeholder="enter your description"
                                   name="tooltip"
                                   value={editableDataItem.tooltip}
                                   onChange={this.handleChange}
                            />
                            <select name="position" id="" onChange={this.handleChange}>
                                <option defaultValue="default position">{editableDataItem.position}</option>
                                <option value="center left">center left</option>
                                <option value="center right">center right</option>
                                <option value="center bottom">center bottom</option>
                            </select>
                        </div>
                        <div className="edit-page__buttons">
                            <Link to="/">
                                <Button title="save" onClick={this.editDataImage} />
                                <Button title="delete" type="delete" onClick={() => this.deleteDataItem(editableDataItem.id)} />
                            </Link>
                        </div>
                    </div>
            }
            </>
        )
    }
}

const mapStateToProps = state => ({
    editableDataItem: getCurrentEditableDataItem(state),
    data: getData(state)
})

export default connect(
    mapStateToProps,
    userActions
)(EditPage);
