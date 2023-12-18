import { useDispatch } from 'react-redux';
import AuthForm from '../../components/auth-form/auth-form';
import Hint from '../../components/hint/hint';
import { auth } from '../../services/user-slice';
import AuthContainer from '../../components/auth-container/auth-container';
import AuthError from '../../components/auth-error/auth-error';

function Register() {
  const dispatch = useDispatch();

  const submit = (fields) => {
    dispatch(auth(fields));
  };
  
  return (
    <AuthContainer title="Регистрация">
      <AuthError />
      <AuthForm
        buttonTitle="Зарегистрироваться"
        fields={[
          {
            type: 'text',
            name: 'name',
            placeholder: 'Имя',
          },
          {
            type: 'email',
            name: 'email',
            placeholder: 'E-mail',
          },
          {
            type: 'password',
            name: 'password',
            placeholder: 'Пароль',
          },
        ]}
        onSubmit={submit}
      />
      <Hint text="Уже зарегистрированы?" link="Войти" to="/login"/>
    </AuthContainer>
  );
}

export default Register;
