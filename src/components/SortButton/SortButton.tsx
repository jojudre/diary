import SortIcon from 'icons/Sort';
import ArrowIcon from 'icons/Arrow';
import React, {
  FC, useEffect, useRef, useState
} from 'react';
import cn from 'classnames';
import { OrderBy, OrderDirection, SortOrder } from 'types';
import css from './SortButton.module.scss';

type SortButtonProps = {
  onSort: (by: OrderBy, sort: SortOrder) => void;
};

const SortButton: FC<SortButtonProps> = ({ onSort }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState<SortOrder>({
    [OrderBy.CREATED]: OrderDirection.DESC,
    [OrderBy.UPDATED]: OrderDirection.DESC,
  });
  const ref = useRef<HTMLDivElement>(null);

  const handleClickSort = (by: OrderBy) => () => {
    const newSortOrder: SortOrder = {
      ...sortOrder,
      [by]:
        sortOrder[by] === OrderDirection.ASC
          ? OrderDirection.DESC
          : OrderDirection.ASC,
    };
    onSort(by, newSortOrder);
    setSortOrder({ ...newSortOrder });
    setIsOpen(false);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  const handleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={css.wrapper} ref={ref}>
      <button type="button" onClick={handleMenu} className={css.button}>
        <SortIcon className={css.sortIcon} />
      </button>
      {isOpen && (
        <div className={css.sortButtons}>
          <button
            type="button"
            onClick={handleClickSort(OrderBy.CREATED)}
            className={css.sortButton}
          >
            <span>
              <ArrowIcon
                className={cn(css.arrowIcon, {
                  [css.arrowDown]: sortOrder.createdAt === OrderDirection.ASC,
                })}
              />
            </span>
            Creation date
          </button>
          <button
            type="button"
            onClick={handleClickSort(OrderBy.UPDATED)}
            className={css.sortButton}
          >
            <span>
              <ArrowIcon
                className={cn(css.arrowIcon, {
                  [css.arrowDown]: sortOrder.updatedAt === OrderDirection.ASC,
                })}
              />
            </span>
            Update date
          </button>
        </div>
      )}
    </div>
  );
};

export default SortButton;
