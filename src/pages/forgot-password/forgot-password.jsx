import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../../components/auth-form/auth-form';
import Hint from '../../components/hint/hint';
import { restorePassword } from '../../services/user-slice';
import AuthContainer from '../../components/auth-container/auth-container';
import Alert from '../../components/alert/alert';

function ForgotPassword() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  
  const handleClose = () => setError(null);

  const handleSubmit = (fields) => {
    restorePassword(fields)
      .then(() => navigate('/reset-password', { state: { isSentPasswordCode: true }} ))
      .catch((err) => setError(err?.message || 'Something went wrong..'));
  };

  return (
    <AuthContainer title="Восстановление пароля">
      <Alert error={error} onClose={handleClose} />
      <AuthForm
        title="Восстановление пароля"
        buttonTitle="Восстановить"
        fields={[
          {
            type: 'email',
            name: 'email',
            placeholder: 'Укажите e-mail',
          },
        ]}
        onSubmit={handleSubmit}
      />
      <Hint text="Вспомнили пароль?" link="Войти" to="/login"/>
    </AuthContainer>
  );
}

export default ForgotPassword;
