import { ReactElement} from 'react';
import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuthChecked, selectUser } from '../../services/user-slice';
import Spinner from '../spinner/spinner';

const RESET_PASS_PATH = '/reset-password';

type TProtectedProps = {
  onlyUnAuth?: boolean;
  readonly component: ReactElement;
};

function ProtectedRoute({ onlyUnAuth = false, component }: TProtectedProps) {
  const isAuthChecked = useSelector(selectAuthChecked);
  const user = useSelector(selectUser);
  const location = useLocation();

  const isResetPassPath = RESET_PASS_PATH === location.pathname;
  
  if (!isAuthChecked) {
    return <Spinner size={45} />;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }
  
  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  
  if (isResetPassPath && !location.state?.isSentPasswordCode) {
    return <Navigate to='/login' />
  }
  
  return component;
}

ProtectedRoute.propTypes = {
  component: PropTypes.element.isRequired,
  onlyUnAuth: PropTypes.bool,
};

export default ProtectedRoute;

export const OnlyAuth = ProtectedRoute;
export const OnlyUnAuth = ({ component }: { readonly component: ReactElement }) => (
  <ProtectedRoute onlyUnAuth={true} component={component}/>
);
