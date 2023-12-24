import PropTypes from 'prop-types';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useForm } from '../../hooks/useForm';

function initialState(fields) {
  return fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {});
}

function AuthForm({ fields, buttonTitle, onSubmit }) {
  const { values, handleChange } = useForm(initialState(fields));
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
  };
  
  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      {fields.map(({ name, type, placeholder }) => {
        const InputNode = type === 'password' ? PasswordInput : Input;
        return (
          <InputNode
            key={name}
            type={type}
            required
            placeholder={placeholder}
            name={name}
            value={values[name]}
            extraClass="mb-6"
            onChange={handleChange}
          />
        );
      })}
      <Button extraClass="mb-20" htmlType="submit">{buttonTitle}</Button>
    </form>
  );
}

AuthForm.propTypes = {
  buttonTitle: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.oneOf(['password', 'text', 'email']),
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
  })).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default AuthForm;
