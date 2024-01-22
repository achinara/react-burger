import { useDispatch } from '../../hooks';
import AuthForm from '../../components/auth-form/auth-form';
import Hint from '../../components/hint/hint';
import { TLoginBody } from '../../utils/types/user-types';
import { login } from '../../services/slices/user-slice';
import AuthError from '../../components/auth-error/auth-error';
import AuthContainer from '../../components/auth-container/auth-container';

function Login() {
  const dispatch = useDispatch();
  const submit = (fields: TLoginBody) => {
    dispatch(login(fields));
  };
  
  return (
    <AuthContainer title="Вход">
      <AuthError />
      <AuthForm<TLoginBody>
        buttonTitle="Войти"
        fields={[
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
      <Hint text="Вы новый пользователь?" link="Зарегистрироваться" to="/register"/>
      <Hint text="Забыли пароль?" link="Восстановить пароль" to="/forgot-password"/>
    </AuthContainer>
  );
}

export default Login;
