import { ComponentType } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/modal/modal';

export type TModalProps = {
  title?: string;
};

const WithModal = <T extends TModalProps>(Component: ComponentType<T>) => {
  function WrappedComponent (props: T) {
    const navigate = useNavigate();
    const resetCurrentIngredient = () => {
      navigate(-1);
    };

    return (
      <Modal title={props.title} onClose={resetCurrentIngredient}>
        <Component {...props} />
      </Modal>
    )
  }

  return WrappedComponent;
}

export default WithModal;
