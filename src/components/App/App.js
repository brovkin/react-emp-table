import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Route, Switch, useHistory} from 'react-router-dom';
import './App.css';
import Filter from '../Filter/Filter';
import AddForm from '../AddForm/AddForm';
import EditForm from "../EditForm/EditForm";
import Table from '../Table/Table';
import NavBar from "../NavBar/NavBar";
import { connect } from 'react-redux';
import {fetchItems} from "../../redux/actions/items";
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

    componentDidMount() {
        this.props.dispatch(fetchItems());
    }

    render() {
        return (

            <div className="app__wrapper">
                <h1 className="app__title">Сотрудники компании</h1>
                <Router>
                    <NavBar/>
                    <Switch>
                        <Route exact path="/">
                            <Filter/>
                            <div className="main-table table-responsive">
                                <Table/>
                            </div>
                        </Route>
                        <Route path="/add">
                            <AddForm/>
                        </Route>
                        <Route path="/edit/:id" component={EditForm}/>
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
