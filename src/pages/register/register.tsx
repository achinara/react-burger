import { useDispatch } from '../../hooks';
import AuthForm from '../../components/auth-form/auth-form';
import { TUserRegisterBody } from '../../utils/types/user-types';
import Hint from '../../components/hint/hint';
import { auth } from '../../services/slices/user-slice';
import AuthContainer from '../../components/auth-container/auth-container';
import AuthError from '../../components/auth-error/auth-error';

function Register() {
  const dispatch = useDispatch();

  const submit = (fields: TUserRegisterBody) => {
    dispatch(auth(fields));
  };
  
  return (
    <AuthContainer title="Регистрация">
      <AuthError />
      <AuthForm<TUserRegisterBody>
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
