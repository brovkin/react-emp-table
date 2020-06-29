import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Redirect, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import InputMask from 'react-input-mask';
import "react-datepicker/dist/react-datepicker.css";
import {submitEditForm} from "../../redux/actions/items";
import './EditForm.css';

const EditForm = (props) => {

  const history = useHistory();
  
  const itemID = +props.match.params.id;
  const user = props.items.find(item => item.id === itemID);

  if (!user) {
    return <Redirect to="/"/>
  }

  let { name, phone, role, isArchive } = user;

  let schema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Слишком короткое имя')
      .max(50, 'Слишком длинное имя')
      .required('Это обязательное поле!'),
    phone: Yup.string()
      .required('Это обязательное поле!'),
  });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const form = useFormik({
    initialValues: {
      name, phone, role, isArchive
    },
    validationSchema: schema,
    onSubmit: values => {
      const newItem = {
        ...user,
        ...values,
        isEdit: false
      };

      props.submit(newItem);
      history.push('/')
    },
  });



  return (

      <form className="edit-form" onSubmit={form.handleSubmit}>
        <h3 className="edit-form__title">Редактировать сотрудника</h3>
        <div className="row">
          <div className="col-md-6">
            <input className="form-control" autoComplete="off" value={form.values.name} name="name" placeholder="Имя" type="text" onChange={form.handleChange}/>
            {form.errors.name ? <div className="alert alert-danger">{form.errors.name}</div> : null}
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <InputMask className="form-control" mask="+7 (999) 999-9999" value={form.values.phone} name="phone" placeholder="Телефон" type="text" onChange={form.handleChange}/>
            {form.errors.phone ? <div className="alert alert-danger">{form.errors.phone}</div> : null}
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <select value={form.values.role} name="role" className="form-control" onChange={form.handleChange}>
              <option value="cook">Повар</option>
              <option value="driver">Водитель</option>
              <option value="waiter">Официант</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="form-group col-md-3">
            <input checked={form.values.isArchive}
                   id="checkbox-edit"
                   name="isArchive"
                   onChange={form.handleChange}
                   type="checkbox" className="add-form__checkbox"/>
            <label className="form-check-label" htmlFor="checkbox-edit">В архиве</label>
          </div>
        </div>
        <button type="submit" className="btn btn-dark text-white">Редактировать</button>
      </form>
  );
};

const mapStateToProps = state => {
  return {
    items: state.itemsStorage.items
  }
};

const mapDispatchToProps = dispatch => {
  return {
    submit: (user) => dispatch(submitEditForm(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditForm);
