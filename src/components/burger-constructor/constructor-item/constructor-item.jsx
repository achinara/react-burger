import PropTypes from 'prop-types';
import { useMemo, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { decrementCount } from '../../../services/ingredients-slice';
import {  removeIngredient, reorder, selectBurgerIngredients } from '../../../services/constructor-items-slice';
import FullItem from '../full-item/full-item';

function ConstructorItem({ dragId, index }) {
  const dispatch = useDispatch();
  const items = useSelector(selectBurgerIngredients);
  
  const current = useMemo(() => items.find((i) => i.dragId === dragId), [items, dragId]);
  const ref = useRef(null);
  
  const [{ isDragging }, drag] = useDrag({
    type: 'items',
    item: () => {
      return { index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  
  const [{ handlerId }, drop] = useDrop({
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
    
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
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
    <div ref={ref} style={{opacity: isDragging ? 0 : 1}} data-handler-id={handlerId}>
      <FullItem dragId={dragId} onRemove={handleRemove} />
    </div>
  )
}

export default ConstructorItem;

ConstructorItem.propTypes = {
  dragId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
}
