import cx from 'classnames';
import { useState } from 'react';
import { useAppDispatch } from '@app/redux/store';
import { addOrder } from '@app/features/orders/orders';
import styles from './Food.module.scss';
import { formatCurrency } from '@app/utils/functions';

interface IFoodProps {
  _id: string;
  name: string;
  price: number;
  description?: string;
  url_img: string;
  avaiable: number;
  createOrder: Function;
}
function Food({
  _id,
  name,
  price,
  url_img,
  avaiable,
  createOrder
}: IFoodProps) {
  const [isHover, setIsHover] = useState(false);
  const dispatch = useAppDispatch();
  const add = () => {
    dispatch(
      addOrder({
        food: {
          _id,
          name,
          price,
          url_img,
          avaiable
        },
        amount: 1
      })
    );
    createOrder();
  };
  return (
    <div className="mt-4">
      <div
        className={cx(
          'bg-dark-second rounded-2xl h-[14rem] min-w-[11rem] text-sm text-center cursor-pointer',
          styles.item
        )}
        onMouseOver={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <div className="flex-center translate-y-[-2rem]">
          <img
            src={url_img}
            className="rounded-full w-[7.5rem] h-[7.5rem] object-cover"
            alt=""
          />
        </div>
        <p className="mx-6">{name}</p>
        <p className="mt-2 mb-1">{formatCurrency(price)}</p>
        <button className={isHover ? styles.btnAdd : 'hidden'} onClick={add}>
          <span className="material-icons-outlined">add</span>
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  );
}

export default Food;
