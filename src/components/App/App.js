import React, { Component } from 'react';
import './App.css';
import Filter from '../Filter/Filter';
import List from "../List/List";
import { connect } from 'react-redux';

class App extends Component {

    render() {
        return (
            <div className="app__table">
                <Filter/>
                <table className="responsive-table highlight">
                    <thead>
                        <tr>
                            <th>isArchive</th>
                            <th onClick={() => this.props.sortedItems('name')}>Имя</th>
                            <th onClick={() => this.props.sortedItems('birthday')}>Дата рождения</th>
                            <th>Должность</th>
                            <th>Телефон</th>
                        </tr>
                    </thead>
                    <List/>
                </table>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
       state
    }
};


const mapDispatchToProps = dispatch => {
    return {
        sortedItems: (column) => dispatch({type: 'SORTED_ITEMS_BY', column })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
