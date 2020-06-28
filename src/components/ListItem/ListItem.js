import React, { Component } from 'react';

class ListItem extends Component {


    render() {

        const { id, name, isArchive, role, birthday, phone  } = this.props.props;

        return (
            <tr>
                <td> {isArchive ? 'true' : 'false'} </td>
                <td> {name} </td>
                <td> {birthday} </td>
                <td> {role} </td>
                <td> {phone} </td>
            </tr>
        );
    }
}

export default ListItem;
