import React, { Component } from 'react';
import { connect } from 'react-redux';
import { filteredSelect, filteredCheckbox } from "../../redux/actions/items";

class Filter extends Component {

    componentDidMount() {
        filteredSelect('test')
    }

    render() {
        return (
            <div>
                <select
                        style={{display: 'block'}}
                        value={this.props.selectValue}
                        className="input-field"
                        onChange={(event) => this.props.dispatch(filteredSelect(event))}>
                    <option value="">Все должности</option>
                    <option value="cook">Повар</option>
                    <option value="driver">Водитель</option>
                    <option value="waiter">Официант</option>
                </select>
                <label>
                    <input
                        type="checkbox"
                        className="filled-in"
                        onChange={(event) => this.props.dispatch(filteredCheckbox(event))}/>
                    <span>В архиве</span>
                </label>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        items: state.items,
        selectValue: state.selectValue
    }
};

export default connect(mapStateToProps)(Filter);
