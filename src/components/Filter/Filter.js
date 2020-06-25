import React, { Component } from 'react';
import { connect } from 'react-redux';

class Filter extends Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        console.log(event.target.value);
        this.props.filteredSelect(event.target.value);
    }

    render() {
        return (
            <div>
                test
                <select value={this.props.selectValue} style={{display: 'block'}} className="input-field" onChange={this.handleChange}>
                    <option value="cook">Повар</option>
                    <option value="driver">Водитель</option>
                    <option value="waiter">Официант</option>
                </select>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        items: state.items
    }
};

const mapDispatchToProps = dispatch => {
    return {
        filteredSelect: (value) => dispatch({type: 'FILTERED_SELECT', payload: value})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
