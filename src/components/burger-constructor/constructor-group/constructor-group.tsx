import { ReactNode } from 'react';
import { useDrop } from 'react-dnd';
import uuid4 from 'uuid4';
import { useDispatch } from '../../../hooks';
import { incrementCount } from '../../../services/slices/ingredients-slice';
import { addIngredient } from '../../../services/slices/constructor-items-slice';
import { TIngredient } from '../../../utils/types/ingredients-types';
import styles from '../burger-constructor.module.css';

type TConstructorGroupProps = {
  dragType: string;
  className?: string;
  children: ReactNode;
};

type TDragObject = {
  item: TIngredient;
};

type TCollectedProps = {
  isOver: boolean;
};

function ConstructorGroup({ dragType, children, className}: TConstructorGroupProps) {
  const dispatch = useDispatch();
  
  const [{ isOver }, ref] = useDrop<TDragObject, unknown, TCollectedProps>({
    accept: dragType,
    collect: (monitor) => {
      return { isOver: monitor.isOver()}
    },
    drop({ item }) {
      dispatch(incrementCount({ id: item._id, dragType: dragType }));
      dispatch(addIngredient({
        ...item,
        dragId: uuid4(),
      }))
    }
  });

  return (
    <div
      ref={ref}
      className={`${className || ''} ${styles.group} ${isOver ? styles.drag : ''}`}
      data-test={dragType}
    >
      {children}
    </div>
  )
}

export default ConstructorGroup;
