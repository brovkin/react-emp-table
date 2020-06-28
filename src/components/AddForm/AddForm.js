import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { submitForm } from "../../redux/actions/items";
import DatePicker from "react-datepicker";
import ru from 'date-fns/locale/ru';
import { parseISO } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";

class AddForm extends Component {

  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      name: '',
      phone: '',
      role: 'cook',
      birthday: new Date(),
      isArchive: false
    };

    this.redirect = false;


  }

  handleSubmit = (event) => {
    event.preventDefault();
    const parseDate = new Date(this.state.birthday).toLocaleDateString();
    this.props.submit({
      ...this.state,
      birthday: parseDate
    });
    this.redirect = true;
  }

  handleChangeName(event) {
    this.setState({
      name: event.target.value
    })
  }

  handleChangePhone(event) {
    this.setState({
      phone: event.target.value
    })
  }

  handleSelectRole(event) {
    this.setState({
      role: event.target.value
    })
  }

  handleChangeBirthday = (date) => {
    this.setState({
      birthday: date
    })
  }

  handleChangeCheckbox(event) {
    this.setState({
      isArchive: event.target.checked
    })
  }

  render() {


    if (this.redirect) {
      return <Redirect to="/"/>
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Добавить сотрудника</h3>
          <div className="row">
            <div className="col s6">
              <input value={this.state.name} placeholder="Имя" type="text" onChange={this.handleChangeName.bind(this)}/>
            </div>
          </div>
          <div className="row">
            <div className="col s6">
              <input value={this.state.phone} placeholder="Телефон" type="text" onChange={this.handleChangePhone.bind(this)}/>
            </div>
          </div>
          <div className="row">
            <div className="col s6">
              <select value={this.state.role} className="browser-default" onChange={this.handleSelectRole.bind(this)}>
                <option value="cook">Повар</option>
                <option value="driver">Водитель</option>
                <option value="waiter">Официант</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col s6">
              <DatePicker
                locale={ru}
                selected={this.state.birthday}
                onChange={this.handleChangeBirthday}
                placeholderText="Дата рождения"
                dateFormat="dd.MM.yyyy"
              />
            </div>
          </div>
          <div className="row">
            <div className="col s6">
              <label>
                <input value={this.state.isArchive} onChange={this.handleChangeCheckbox.bind(this)} type="checkbox" className="filled-in"/>
                <span>В архиве</span>
              </label>
            </div>
          </div>
        <button type="submit">Добавить</button>
      </form>
    );
  }
}

const mapStateToProps = state => {
  console.log('STATE', state);
  return {
    items: state.itemsStorage.items,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    submit: (user) => dispatch(submitForm(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddForm);
