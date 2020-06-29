import React, { Component } from 'react';
import {sortedItems} from "../../redux/actions/items";
import TableItem from "../TableItem/TableItem";
import './Table.css';
import {connect} from "react-redux";

class Table extends Component {

  constructor(props) {
    super(props);

    this.state = {
      filteredColumn: {
        name: false,
        date: false
      }
    }
  }

  render() {

    const { loading, items, filteredItems } = this.props;

    const renderItems = () => {
      if (filteredItems.length > 0) {
        return filteredItems.map(el => {
          return (
            <TableItem  key={el.id} props={el}/>
          );
        })
      } else {
        return items.map(el => {
          return (
            <TableItem key={el.id} props={el}/>
          );
        })
      }

    };

    if (loading) {
      return 'Loading...'
    }

    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>№</th>
            <th className="table__sort-item" onClick={() => this.props.dispatch(sortedItems('name'))}>
              Имя
            </th>
            <th className="table__sort-item" onClick={() => this.props.dispatch(sortedItems('birthday'))}>
              Дата рождения
            </th>
            <th>Должность</th>
            <th>Телефон</th>
          </tr>
        </thead>
        <tbody>
          { renderItems() }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = state => {
  return {
    items: state.itemsStorage.items,
    filteredItems: state.itemsStorage.filteredItems,
    loading: state.itemsStorage.loading,
    filteredColumn: state.itemsStorage.filteredColumn
  }
};

export default connect(mapStateToProps)(Table);
