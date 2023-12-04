import PropTypes from 'prop-types';
import { useDrop } from 'react-dnd';
import uuid4 from 'uuid4';
import { useDispatch } from 'react-redux';
import { incrementCount } from '../../../services/ingredients-slice';
import { addIngredient } from '../../../services/constructor-items-slice';
import styles from '../burger-constructor.module.css';

function ConstructorGroup({ dragType, children, className}) {
  const dispatch = useDispatch();
  
  const [{ isOver }, ref] = useDrop({
    accept: dragType,
    collect: (monitor) => {
      return { isOver: monitor.isOver()}
    },
    drop(item) {
      dispatch(incrementCount({ id: item._id, dragType: dragType }));
      dispatch(addIngredient({
        ...item,
        dragId: uuid4(),
      }))
    }
  });

  return (
    <div ref={ref} className={`${className || ''} ${styles.group} ${isOver ? styles.drag : ''}`}>
      {children}
    </div>
  )
}

export default ConstructorGroup;

ConstructorGroup.propTypes = {
  dragType: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
}
