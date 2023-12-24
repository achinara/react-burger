import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { selectUser, updateUserData } from '../../../services/user-slice';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useForm } from '../../../hooks/useForm';
import { useCallback, useEffect, useState } from 'react';
import AuthError from '../../../components/auth-error/auth-error';
import styles from './user-profile.module.css';

const initialState = (state) => ({
  name: state?.name || '',
  email: state?.email || '',
  password: state?.password || '',
});

function UserProfile() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const { values: state, setValues: setUser, handleChange } = useForm({ name: '', email:  '', password: '' });

  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    setUser(initialState(user));
  }, [setUser, user])

  useEffect(() => {
    setIsChanged(!shallowEqual(initialState(user), initialState(state)));
  }, [user, state]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserData(state));
  }

  const handleCancel = useCallback(() => {
    setUser(initialState(user));
  }, [setUser, user]);

  return (
    <form className={styles.root} onSubmit={handleSubmit}>
      <Input
        name="name"
        value={state.name}
        extraClass="mb-6"
        icon={'EditIcon'}
        placeholder="Имя"
        onChange={handleChange}
      />
      <Input
        name="email"
        value={state.email}
        extraClass="mb-6"
        icon={'EditIcon'}
        placeholder="Логин"
        onChange={handleChange}
      />
      <PasswordInput
        name="password"
        value={state.password}
        extraClass="mb-6"
        icon={'EditIcon'}
        placeholder="Пароль"
        onChange={handleChange}
      />
      <AuthError />
      {isChanged && (
        <div className={styles.footer}>
          <Button htmlType="button" type="secondary" onClick={handleCancel}>Отмена</Button>
          <Button htmlType="submit" type="primary">Сохранить</Button>
        </div>
      )}
    </form>
  )
}

export default UserProfile;
