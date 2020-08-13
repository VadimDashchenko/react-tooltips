import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import StartPage from "../StartPage/StartPage";
import CreatePage from '../CreatePage/CreatePage';
import EditPage from "../EditPage/EditPage";
import * as userActions from '../../actions/users';
import {connect} from 'react-redux';
import data from '../../commons/data.json';
import './styles.scss';

class App extends Component {

    componentDidMount() {
        const {loadData} = this.props;
        let getData = JSON.parse(localStorage.getItem('data'));
        if(getData !== null){
            loadData(getData);
            if(getData.length === 0) localStorage.clear()
        } else {
            localStorage.setItem('data', JSON.stringify(data));
            loadData(data)
        }
    }

    render(){
        return (
            <Router>
             <div className="app">
                 <Switch>
                <Route exact path="/">
                    <StartPage />
                </Route>
                <Route path="/create">
                    <CreatePage />
                </Route>
                     <Route path="/edit">
                    <EditPage />
                </Route>
            </Switch>
                 </div>
        </Router>
        )
    }
}

export default connect(
    null,
    userActions
)(App);
