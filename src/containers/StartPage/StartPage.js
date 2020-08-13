import React, {Component} from "react";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import * as userActions from '../../actions/users';
import ImageItem from "../../components/ImageItem/ImageItem";
import Button from "../../components/Button/Button";
import {getData, getCurrentDataItem} from '../../selectors/user';
import './styles.scss';

class StartPage extends Component {

    state = {}

    static propTypes = {
        getCurrentItemId: PropTypes.func.isRequired,
        getCurrentEditableItem: PropTypes.func.isRequired,
        currentDataItem: PropTypes.object,
    }

    showTooltip = (id) => {
        const {getCurrentItemId} = this.props;
        getCurrentItemId(id);
    }

    hideTooltip = () => {
        const {getCurrentItemId} = this.props;
        getCurrentItemId(null);
    }

    editDataItem = (id) => {
        const {getCurrentEditableItem} = this.props;
        getCurrentEditableItem(id);
    }

    render() {
        const {data, currentDataItem} = this.props;
        return (
            <div className="start-page">
                <Link to="/create">
                    <Button title="add image" />
                </Link>
                <div className="start-page__items">
                    <ImageItem currentItem={currentDataItem}
                               data={data}
                               showTooltip={this.showTooltip}
                               hideTooltip={this.hideTooltip}
                               editDataItem={this.editDataItem}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    data: getData(state),
    currentDataItem: getCurrentDataItem(state),
})

export default connect(
    mapStateToProps,
    userActions
)(StartPage);
