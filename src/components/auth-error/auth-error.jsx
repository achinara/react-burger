import { useDispatch, useSelector } from 'react-redux';
import { resetUserError, selectUserError } from '../../services/user-slice';
import Alert from '../alert/alert';

function AuthError() {
  const dispatch = useDispatch();
  const error = useSelector(selectUserError);
  const handleClick = () => dispatch(resetUserError());

  return  (
    <Alert error={error} onClose={handleClick} />
  )
}

export default AuthError;
