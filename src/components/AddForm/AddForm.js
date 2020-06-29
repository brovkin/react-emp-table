import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {filteredCheckbox, submitForm} from "../../redux/actions/items";
import InputMask from 'react-input-mask';
import DatePicker from "react-datepicker";
import ru from 'date-fns/locale/ru';
import "react-datepicker/dist/react-datepicker.css";
import './AddForm.css';

class AddForm extends Component {

  constructor(props) {
    super(props);
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
      <form className="add-form" onSubmit={this.handleSubmit}>
        <h3 className="add-form__title">Добавить сотрудника</h3>
        <fieldset className="form-group">
          <div className="row">
            <div className="col-md-6">
              <input className="form-control" value={this.state.name} placeholder="Имя" type="text" onChange={this.handleChangeName.bind(this)}/>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <InputMask className="form-control" mask="+7 (999) 999-9999" value={this.state.phone} placeholder="Телефон" type="text" onChange={this.handleChangePhone.bind(this)}/>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <select  value={this.state.role} className="form-control" onChange={this.handleSelectRole.bind(this)}>
                <option value="cook">Повар</option>
                <option value="driver">Водитель</option>
                <option value="waiter">Официант</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <DatePicker
                locale={ru}
                selected={this.state.birthday}
                onChange={this.handleChangeBirthday}
                placeholderText="Дата рождения"
                dateFormat="dd.MM.yyyy"
                className="form-control"
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-3">
              <input checked={this.state.isArchive}
                     id="checkbox-add"
                     onChange={this.handleChangeCheckbox.bind(this)}
                     type="checkbox" className="add-form__checkbox"/>
              <label className="form-check-label" htmlFor="checkbox-add">В архиве</label>
            </div>
          </div>
        <button type="submit" className="btn btn-dark text-white">Добавить</button>
        </fieldset>
      </form>
    );
  }
}

const mapStateToProps = state => {
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
