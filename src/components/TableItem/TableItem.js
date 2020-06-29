import React from 'react';
import { useHistory } from 'react-router-dom';
import { editWorker } from "../../redux/actions/items";
import { connect } from 'react-redux';
import './TableItem.css';

const TableItem = (props) => {

  const history = useHistory();

  const { id, name, isArchive, isEdit, role, birthday, phone  } = props.props;

  let roleObj = {
    driver: {
      id: 'driver',
      translate: 'Водитель'
    },
    waiter: {
      id: 'waiter',
      translate: 'Официант'
    },
    cook: {
      id: 'cook',
      translate: 'Повар'
    }
  };

  function handleClick(id) {
    history.push(`/edit/${id}`);
  }

  return (
        <tr className="table-item" onClick={() => handleClick(id)}>
          <td> { id } </td>
          <td> {name} </td>
          <td> {birthday} </td>
          <td> {roleObj[role].translate} </td>
          <td> {phone} </td>
        </tr>

  );
}

const mapStateToProps = state => {
  return {
    // isArchive: state.itemsStorage.
  }
};

const mapDispatchToProps = dispatch => {
  return {
    editEvent: (id) => dispatch(editWorker(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableItem);
