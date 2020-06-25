import React, { Component } from 'react';
import ListItem from '../ListItem/ListItem';
import { fetchItems } from "../../redux/actions/items";
import { connect } from 'react-redux';

class List extends Component {
    componentDidMount() {
        this.props.dispatch(fetchItems());

        console.log(this.props);
    }

    render() {

        const { items, loading } = this.props.items;

        const renderItems = () => {
            return items.map(el => {
                return (
                    <ListItem key={el.id} props={el}/>
                );
            })
        };

        if (loading) {
            return 'Loading...'
        }

      return (
          <tbody className="container">
              {renderItems()}
          </tbody>
      );
    }
}

const mapStateToProps = state => {
    return {
        items: state.items,
    }
};

export default connect(mapStateToProps)(List);
