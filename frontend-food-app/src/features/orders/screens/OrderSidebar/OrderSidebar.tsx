import FormInput from '@app/components/atoms/FormInput/FormInput';
import { useAppDispatch, useAppSelector } from '@app/redux/store';
import cx from 'classnames';
import { ChangeEvent, Fragment, useMemo, useState } from 'react';
import {
  changeAmountOrder,
  changeNoteOrder
} from '@app/features/orders/orders';
import styles from './OrderSidebar.module.scss';
import LoadingSpinner from '@app/components/atoms/LoadingSpinner/LoadingSpinner';
import { formatCurrency } from '@app/utils/functions';
import {
  removeOrder,
  changeStatusOrder,
  updateOrders
} from '../../redux/order.slice';
import CustomSelect from '@app/components/atoms/CustomSelect/CustomSelect';
import { dataSelectStatus } from '@app/constants/selectbox.constants';
import { CustomSelectProps } from '@app/types/atom.type';
import { useNavigate } from 'react-router';

interface IPropsListOrders {
  closeModalAndNotify: Function;
  isEdit?: boolean;
  closeModal: Function;
}

function OrderSidebar({
  closeModalAndNotify,
  isEdit = false,
  closeModal
}: IPropsListOrders) {
  const dispatch = useAppDispatch();
  const listOrders = useAppSelector(state => state.order.listOrder);
  const orderStore = useAppSelector(state => state.order);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // render list
  const renderListOrders = () => {
    const result = listOrders.map((order, index) => {
      const { food, amount, note } = order;
      return (
        <Fragment key={order.food?._id}>
          <tr>
            <td className="pt-6 w-[16.5rem]">
              <div className="flex items-center">
                <div className="w-[3rem] h-[3rem] object-cover mr-2">
                  <img
                    className="w-full h-full rounded-full"
                    src={order.food?.url_img ?? ''}
                    alt=""
                  />
                </div>
                <div>
                  <p className="text-sm">{food?.name}</p>
                  <p className="text-xs text-[#ABBBC2]">
                    {formatCurrency(food?.price ?? 0)}
                  </p>
                </div>
              </div>
            </td>
            <td className="pt-3 w-[3rem]">
              <div className="w-full h-[28px]">
                <FormInput
                  type="number"
                  value={amount || ''}
                  onChange={e => changeAmount(e, index)}
                />
              </div>
            </td>
            <td className="align-middle pt-6 pl-4">
              <p
                className="whitespace-nowrap w-[100px] text-ellipsis overflow-hidden"
                title={formatCurrency((food?.price ?? 0) * (amount ?? 0))}
              >
                {formatCurrency((food?.price ?? 0) * (amount ?? 0))}
              </p>
            </td>
          </tr>
          <tr>
            <td colSpan={2} className="pt-2">
              <FormInput
                value={note ?? ''}
                onChange={e => changeNote(e, index)}
              />
            </td>
            <td className="pl-4 pt-2">
              {!isEdit && (
                <div
                  className={cx('flex-center w-[3rem]', styles.delete)}
                  onClick={() => deleteOrder(index)}
                >
                  <span className="material-icons-outlined">delete</span>
                </div>
              )}
            </td>
          </tr>
        </Fragment>
      );
    });
    return result;
  };

  const total = useMemo(() => {
    return listOrders.reduce((total, item) => {
      return total + (item.amount ?? 0) * (item.food?.price ?? 0);
    }, 0);
  }, [listOrders]);

  const changeAmount = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    dispatch(
      changeAmountOrder({
        amount: Number(e.target.value) < 1 ? 0 : Number(e.target.value),
        position: index
      })
    );
  };
  const changeNote = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    dispatch(changeNoteOrder({ note: e.target.value, position: index }));
  };
  const onChangeSelect = (item: CustomSelectProps) => {
    dispatch(changeStatusOrder(item.title));
  };
  const deleteOrder = (index: number) => {
    dispatch(removeOrder(index));
  };

  const save = async () => {
    if (!listOrders.length) {
      return;
    }
    setIsLoading(true);
    const foods = listOrders.map(item => {
      return {
        food: item.food?._id ?? '',
        amount: item.amount ?? 0,
        note: item.note ?? ''
      };
    });
    const data = {
      listFood: foods,
      _id: orderStore._id,
      status: orderStore.status
    };
    const result = await dispatch(updateOrders(data));
    if (updateOrders.fulfilled.match(result)) {
      setIsLoading(false);
      closeModalAndNotify(true);
    } else {
      setIsLoading(false);
      closeModalAndNotify();
    }
  };

  return (
    <div>
      <div className="text-white">
        <div className="flex items-center justify-between mb-5">
          <p>Orders #34562</p>
          {isEdit && (
            <CustomSelect
              value={{
                title: orderStore.status
              }}
              onChange={onChangeSelect}
              data={dataSelectStatus}
            />
          )}
        </div>
        <div className="max-h-[70vh] overflow-y-auto custom-scrollbar">
          <table className="w-full">
            <thead>
              <tr className={cx(styles.divider)}>
                <td className="pb-6">Thực đơn</td>
                <td className="pb-6">Số lượng</td>
                <td className="pb-6">Giá</td>
              </tr>
            </thead>
            <tbody>
              {renderListOrders()}
              <tr>
                <td colSpan={3}>
                  <div className={cx(styles.divider, 'pt-6')}></div>
                </td>
              </tr>
              <tr>
                <td colSpan={2} className="pt-6">
                  Tổng tiền
                </td>
                <td className="pl-4 pt-6">{formatCurrency(total)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        {!isEdit ? (
          <button
            className={`btn-primary w-full py-3 mt-7 flex-center outline-none border-none ${
              listOrders.length === 0 ? 'opacity-50 pointer-events-none' : ''
            }`}
            onClick={() => navigate('/checkout')}
          >
            {isLoading && <LoadingSpinner size={20} />}
            <span className="ml-1">Tạo đơn hàng</span>
          </button>
        ) : (
          <div className="flex gap-2 mt-12">
            <button
              className="btn-primary-outline flex-center flex-1"
              onClick={() => closeModalAndNotify()}
            >
              Hủy bỏ
            </button>
            <button className="btn-primary flex-center flex-1" onClick={save}>
              {isLoading && <LoadingSpinner size={20} />}
              Lưu thay đổi
            </button>
          </div>
        )}
        <div className="flex mt-3">
          <button
            className="btn-primary-outline flex-center flex-1"
            onClick={() => closeModal()}
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderSidebar;
