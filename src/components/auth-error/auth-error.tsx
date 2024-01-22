import { useDispatch, useSelector } from '../../hooks';
import { resetUserError, selectUserError } from '../../services/slices/user-slice';
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
