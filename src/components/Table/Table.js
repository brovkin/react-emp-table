import React, { Component } from 'react';
import List from '../List/List';
import {fetchItems, sortedItems} from "../../redux/actions/items";
import ListItem from "../ListItem/ListItem";
import {connect} from "react-redux";

class Table extends Component {

  render() {

    const { loading, items, filteredItems } = this.props;

    const renderItems = () => {
      if (filteredItems.length > 0) {
        return filteredItems.map(el => {
          return (
            <ListItem key={el.id} props={el}/>
          );
        })
      } else {
        return items.map(el => {
          return (
            <ListItem key={el.id} props={el}/>
          );
        })
      }

    };

    if (loading) {
      return 'Loading...'
    }

    return (
      <table className="responsive-table highlight">
        <thead>
          <tr>
            <th>isArchive</th>
            <th onClick={() => this.props.dispatch(sortedItems('name'))}>Имя</th>
            <th onClick={() => this.props.dispatch(sortedItems('birthday'))}>Дата рождения</th>
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
    loading: state.itemsStorage.loading
  }
};

// const mapDispatchToProps = dispatch => {
//   return {
//     sortedItems: (column) => dispatch({type: 'SORTED_ITEMS_BY', column })
//   }
// }

export default connect(mapStateToProps)(Table);
