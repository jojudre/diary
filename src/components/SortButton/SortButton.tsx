import SortIcon from "icons/Sort";
import ArrowIcon from "icons/Arrow";
import React, { FC, useEffect, useRef, useState } from "react";
import cn from 'classnames';
import { OrderDirection, SortOrder } from "types";
import css from './SortButton.module.scss';

type SortButtonProps = {
  onSortByCreated: (orderDirection: OrderDirection) => void;
  onSortByUpdated: (orderDirection: OrderDirection) => void;
};

const SortButton: FC<SortButtonProps> = ({
  onSortByCreated,
  onSortByUpdated
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState<SortOrder>({
    createdAt: OrderDirection.DESC,
    updatedAt: OrderDirection.DESC,
  });
  const ref = useRef<HTMLDivElement>(null);

  const handleClickSortByCreated = () => {
    const newSortOrder: SortOrder = {
      ...sortOrder,
      createdAt: sortOrder.createdAt === OrderDirection.ASC ? OrderDirection.DESC : OrderDirection.ASC
    }
    onSortByCreated(newSortOrder.createdAt);
    setSortOrder({...newSortOrder});
    setIsOpen(false);
  }

  const handleClickSortByUpdated = () => {
    const newSortOrder: SortOrder = {
      ...sortOrder,
      updatedAt: sortOrder.updatedAt === OrderDirection.ASC ? OrderDirection.DESC : OrderDirection.ASC
    }
    onSortByUpdated(newSortOrder.updatedAt);
    setSortOrder({...newSortOrder});
    setIsOpen(false);
  }

  const handleClickOutside = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={css.wrapper} ref={ref}>
      <button onClick={() => setIsOpen(!isOpen)} className={css.button}>
        <SortIcon className={css.sortIcon} />
      </button>
      {isOpen && (
        <ul className={css.list}>
          <li onClick={handleClickSortByCreated}>
            <span>
            <ArrowIcon className={cn(css.arrowIcon, {[css.arrowDown]: sortOrder.createdAt === OrderDirection.ASC })} />
            </span>
            Creation date
          </li>
          <li onClick={handleClickSortByUpdated}>
            <span>
            <ArrowIcon className={cn(css.arrowIcon, {[css.arrowDown]: sortOrder.updatedAt === OrderDirection.ASC })} />
              </span>
            Update date
          </li>
        </ul>
      )}
    </div>
  );
}

export default SortButton;
