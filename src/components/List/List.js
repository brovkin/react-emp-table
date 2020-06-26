import React, { Component } from 'react';
import ListItem from '../ListItem/ListItem';
import { fetchItems } from "../../redux/actions/items";
import { connect } from 'react-redux';

class List extends Component {
    componentDidMount() {
        this.props.dispatch(fetchItems());

        console.log('THIS_PROPS', this.props);
    }

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
          <tbody>
              {renderItems()}
          </tbody>
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

export default connect(mapStateToProps)(List);
