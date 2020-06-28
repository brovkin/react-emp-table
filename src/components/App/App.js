import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Route, Switch, useHistory} from 'react-router-dom';
import './App.css';
import Filter from '../Filter/Filter';
import AddForm from '../AddForm/AddForm';
import Table from '../Table/Table';
import List from "../List/List";
import { connect } from 'react-redux';
import {fetchItems} from "../../redux/actions/items";

class App extends Component {

    componentDidMount() {
        this.props.dispatch(fetchItems());
    }

    render() {
        return (
            <div className="app__table">
                <Router>
                    <Link to="/">На главную</Link>
                    <Link to="/add">Добавить</Link>
                    <Link to="/edit">Редактировать</Link>
                    <Switch>
                        <Route exact path="/">
                            <Filter/>
                            <Table/>
                        </Route>
                        <Route path="/add">
                            <AddForm/>
                        </Route>
                        <Route path="/edit">
                            <h1>Edit</h1>
                        </Route>
                    </Switch>
                </Router>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
       state
    }
};

export default connect(mapStateToProps)(App);
