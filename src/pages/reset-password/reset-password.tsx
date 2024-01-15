import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { resetPassword } from '../../services/user-slice';
import { TPassResetBody } from '../../utils/types/user-types';
import AuthForm from '../../components/auth-form/auth-form';
import Hint from '../../components/hint/hint';
import AuthContainer from '../../components/auth-container/auth-container';
import Alert from '../../components/alert/alert';

function ResetPassword() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleClose = () => setError(null);
  const handleSubmit = (fields: TPassResetBody) => {
    resetPassword(fields)
      .then(() => navigate('/login', { state: null} ))
      .catch((err) => setError(err?.message || 'Something went wrong..'));
  };
  
  return (
    <AuthContainer title="Вход">
      <Alert error={error} onClose={handleClose}/>
      <AuthForm<TPassResetBody>
        buttonTitle="Войти"
        fields={[
          {
            type: 'password',
            name: 'password',
            placeholder: 'Введите новый пароль',
          },
          {
            type: 'text',
            name: 'token',
            placeholder: 'Введите код из письма',
          },
        ]}
        onSubmit={handleSubmit}
      />
      <Hint text="Вспомнили пароль?" link="Войти" to="/login"/>
    </AuthContainer>
  );
}

export default ResetPassword;
