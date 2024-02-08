import { useMemo, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch, useSelector } from '../../../hooks';
import { Identifier } from 'dnd-core';
import { TConstructorItem } from '../../../utils/types/ingredients-types';
import { decrementCount } from '../../../services/slices/ingredients-slice';
import { removeIngredient, reorder, selectBurgerIngredients } from '../../../services/slices/constructor-items-slice';
import FullItem from '../full-item/full-item';
import styles from './constructor-item.module.css';

type TConstructorItemProps = {
  dragId: string;
  index: number;
};

type TDragObjects = {
  index: number;
};

type TCollectProps = {
  isDragging: boolean;
};

type TCollectDropProps = {
  handlerId: Identifier | null;
};

function ConstructorItem({ dragId, index }: TConstructorItemProps) {
  const dispatch = useDispatch();
  const items: TConstructorItem[] = useSelector(selectBurgerIngredients);
  
  const current: TConstructorItem | undefined = useMemo(() => items.find((i) => i.dragId === dragId), [items, dragId]);
  const ref = useRef<HTMLDivElement | null>(null);
  
  const [{ isDragging }, drag] = useDrag<TDragObjects, unknown, TCollectProps>({
    type: 'items',
    item: () => {
      return { index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  
  const [{ handlerId }, drop] = useDrop<TDragObjects, unknown, TCollectDropProps>({
    accept: 'items',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index;
      const hoverIndex = index;
     
      if (dragIndex === hoverIndex) {
        return
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();
    
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      dispatch(reorder({ dragIndex: index, dropIndex: item.index }))
      item.index = hoverIndex;
    },
  });
  
  const handleRemove = () => {
    if (!current) return;
    dispatch(removeIngredient(dragId));
    dispatch(decrementCount(current._id))
  }
  
  drag(drop(ref));

  return(
    <div ref={ref} className={`${styles.root} mb-4`} style={{opacity: isDragging ? 0 : 1}} data-handler-id={handlerId}>
      <FullItem dragId={dragId} onRemove={handleRemove} />
    </div>
  )
}

export default ConstructorItem;
