import FormInput from '@app/components/atoms/FormInput/FormInput';
import LoadingSpinner from '@app/components/atoms/LoadingSpinner/LoadingSpinner';
import Toastify from '@app/components/atoms/Toastify/Toastify';
import { dataInput } from '@app/constants/validation.constanst';
import {
  changeAmountOrder,
  removeOrder,
  uploadOrders
} from '@app/features/orders/orders';
import { useAppDispatch, useAppSelector } from '@app/redux/store';
import { enumToastify } from '@app/types/atom.type';
import { formatCurrency } from '@app/utils/functions';
import { useMemo, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import cx from 'classnames';
import styles from './CheckoutScreeen.module.scss';

const CheckoutScreen = () => {
  const user = useAppSelector(state => state.auth.user);
  const orders = useAppSelector(state => state.order.listOrder);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const toastRef = useRef<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [statusToast, setStatusToast] = useState({
    type: enumToastify.success,
    message: 'Taọ order thành công'
  });
  const [isPaid, setIsPaid] = useState(false);
  const { handleSubmit, control } = useForm<any>({
    mode: 'onChange'
  });

  const total = useMemo(() => {
    return orders.reduce((total, item) => {
      return total + (item.amount ?? 0) * (item.food?.price ?? 0);
    }, 0);
  }, [orders]);

  const renderFieldInput = () => {
    const values = [
      user?.first_name ?? '',
      user?.last_name ?? '',
      user?.address ?? '',
      user?.phonenumber ?? 0
    ];
    for (let i = 0; i < dataInput.length; i++) {
      dataInput[i].value = values[i] as any;
    }
    const result = dataInput.map(item => {
      return (
        <div key={item.name}>
          <p className="text-white font-14 mb-1 text-sm mt-3">{item.label}:</p>
          <Controller
            defaultValue={item.value}
            control={control}
            name={item.name}
            rules={item.rules}
            render={({
              field: { onChange, name, value = item.value },
              fieldState: { error }
            }) => {
              return (
                <FormInput
                  name={name}
                  value={value}
                  error={error?.message}
                  onChange={onChange}
                  type={item.type}
                />
              );
            }}
          />
        </div>
      );
    });
    return result;
  };
  const renderOrders = () => {
    const result = orders.map((item, index) => {
      return (
        <div
          className={cx(
            'flex bg-dark rounded-lg p-4 justify-between min-w-[25rem] mb-4 mt-2',
            styles.card
          )}
          key={index}
        >
          <div className="flex">
            <div className="mr-5">
              <img
                className="w-[4rem] h-[4rem] rounded-full object-cover"
                src={item.food?.url_img}
                alt=""
              />
            </div>
            <div>
              <p>
                <span className="mr-5">{item.food?.name}</span>
                <span className="text-sm italic">
                  {formatCurrency(item.food?.price ?? 0)}
                </span>
              </p>
              <div className="flex items-center">
                <button
                  type="button"
                  className="btn-primary-outline w-[2rem] h-[1rem] rounded-lg flex-center"
                  onClick={() => changeAmount(index, false)}
                >
                  -
                </button>
                <span className="mx-2">{item.amount}</span>
                <button
                  type="button"
                  className="btn-primary-outline w-[2rem] h-[1rem] rounded-lg flex-center"
                  onClick={() => changeAmount(index, true)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div>
            <span
              className="material-icons-outlined text-primary cursor-pointer"
              onClick={() => deleteOrder(index)}
            >
              close
            </span>
          </div>
        </div>
      );
    });
    return result;
  };

  const onSubmit = async (data: any) => {
    console.log('submit');
    if (!orders.length) {
      return;
    }
    setIsLoading(true);
    const result = await dispatch(
      uploadOrders({
        listFood: orders,
        address: data.address,
        fullname: data.first_name + ' ' + data.last_name,
        phonenumber: data.phonenumber ?? 0,
        user_id: user?._id ?? ''
      })
    );
    if (uploadOrders.fulfilled.match(result)) {
      setIsPaid(true);
      setStatusToast({
        message: 'Taọ order thành công',
        type: enumToastify.success
      });
    } else {
      setStatusToast({
        message: 'Taọ order thất bại',
        type: enumToastify.error
      });
    }
    setIsLoading(false);
    toastRef.current.showToast();
  };
  const changeAmount = (index: number, increse = true) => {
    const preAmount = orders[index].amount;
    const amount = increse ? preAmount + 1 : preAmount - 1;
    dispatch(
      changeAmountOrder({
        amount,
        position: index
      })
    );
  };
  const deleteOrder = (index: number) => {
    dispatch(removeOrder(index));
  };
  return (
    <section className="bg-dark min-h-[100vh] text-white pt-20 px-14">
      {!isPaid ? (
        <div className="bg-dark-second py-8 rounded-xl">
          <div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex justify-around flex-wrap px-3"
            >
              <div className="w-[100%] md:w-[50%]">{renderFieldInput()}</div>
              <div>
                <div className="min-h-[10rem] max-h-[40rem] custom-scrollbar overflow-y-auto rounded-lg">
                  {renderOrders()}
                </div>
                <div className="text-2xl mt-4">
                  <span className="mr-4">Total:</span>
                  <span>{formatCurrency(total)}</span>
                </div>
                <button
                  className="btn-primary w-[13rem] mt-4 flex-center"
                  type="submit"
                >
                  {isLoading && <LoadingSpinner />}{' '}
                  <span className="ml-2">Đặt hàng</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex-center mt-40">
          <button
            className="btn-primary rounded-3xl px-20"
            onClick={() => navigate('/')}
          >
            Quay lại trang chủ
          </button>
        </div>
      )}
      <Toastify
        type={statusToast.type}
        message={statusToast.message}
        ref={toastRef}
      />
    </section>
  );
};

export default CheckoutScreen;
