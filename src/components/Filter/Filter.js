import React, { Component } from 'react';
import { connect } from 'react-redux';
import { filteredSelect, filteredCheckbox } from "../../redux/actions/items";
import './Filter.css';

class Filter extends Component {

    render() {
        return (
            <form className="filter-form row d-flex align-items-center">
              <div className="form-group col-md-3">
                <select
                    style={{display: 'block'}}
                    value={this.props.role}
                    className="form-control"
                    onChange={(event) => this.props.dispatch(filteredSelect(event))}
                >
                    <option value="">Все должности</option>
                    <option value="cook">Повар</option>
                    <option value="driver">Водитель</option>
                    <option value="waiter">Официант</option>
                </select>
              </div>
                <div className="form-group form-check col-md-3">
                  <input
                    id="checkbox"
                    type="checkbox"
                    className="form-check-input"
                    checked={this.props.isArchive}
                    onChange={(event) => this.props.dispatch(filteredCheckbox(event))}
                  />
                  <label className="form-check-label" htmlFor="checkbox">В архиве</label>
                </div>
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
      items: state.items,
      role: state.itemsStorage.filter.role,
      isArchive: state.itemsStorage.filter.isArchive
    }
};

export default connect(mapStateToProps)(Filter);
