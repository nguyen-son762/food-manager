import FormInput from '@app/components/atoms/FormInput/FormInput';
import LoadingSpinner from '@app/components/atoms/LoadingSpinner/LoadingSpinner';
import Toastify from '@app/components/atoms/Toastify/Toastify';
import { ENV } from '@app/constants/env';
import { dataInput } from '@app/constants/validation.constanst';
import { useAppDispatch, useAppSelector } from '@app/redux/store';
import { enumToastify } from '@app/types/atom.type';
import { useRef, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { updateUserInfo } from '../../auth';

const SettingsScreen = () => {
  const user = useAppSelector(state => state.auth.user);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [statusToast, setStatusToast] = useState({
    type: enumToastify.success,
    message: 'Thêm thành công'
  });
  const toastRef = useRef<any>();
  const [img_url, setImgUrl] = useState('');
  const { handleSubmit, control } = useForm<any>({
    mode: 'onChange'
  });
  const inputFileRef = useRef<any>(null);

  const showInput = () => {
    if (!user) {
      return null;
    }
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
                  type="text"
                />
              );
            }}
          />
        </div>
      );
    });
    return result;
  };

  const onSubmit: SubmitHandler<any> = async data => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    const formData = new FormData();
    if (inputFileRef.current.files[0]) {
      formData.append('file', inputFileRef.current.files[0]);
    } else {
      formData.append('avatar_url', user?.avatar_url ?? '');
    }
    formData.append('first_name', data.first_name);
    formData.append('last_name', data.last_name);
    formData.append('username', data.username);
    formData.append('phonenumber', data.phonenumber);
    formData.append('address', data.address);
    formData.append('email', user?.email ?? '');
    const result = await dispatch(updateUserInfo(formData));
    if (updateUserInfo.fulfilled.match(result)) {
      setStatusToast({
        message: 'Update success',
        type: enumToastify.success
      });
    } else {
      setStatusToast({
        message: 'Update fail',
        type: enumToastify.error
      });
    }
    toastRef.current.showToast();
    setIsLoading(false);
  };
  const clickInputFile = () => {
    inputFileRef.current.click();
  };
  const changeAvatar = () => {
    const [file] = inputFileRef.current.files;
    if (file) {
      setImgUrl(URL.createObjectURL(file));
    }
    return;
  };
  return (
    <section className="bg-dark min-h-[100vh] text-white pt-8 px-14">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-dark-second rounded-2xl"
      >
        <p className="text-center text-3xl pt-6 pb-7">Thông tin người dùng</p>
        <div className="flex justify-around flex-col md:flex-row px-3">
          <div className="basis-[50%]">{showInput()}</div>
          <div className="text-center flex flex-col justify-center items-center">
            <div
              className={`h-fit rounded-full w-fit ${
                !user || !user.avatar_url
                  ? 'border-[1px] border-primary border-solid '
                  : ''
              }`}
            >
              <img
                className="w-[10rem] md:w-[14rem] h-[10rem] md:h-[14rem] object-cover rounded-full"
                src={
                  img_url
                    ? img_url
                    : user && user.avatar_url
                    ? user?.avatar_url
                    : ENV.URL_IMAGE_DEFAULT
                }
                alt=""
              />
            </div>
            <button
              className="mt-5 btn-primary-outline px-5 rounded-3xl py-2 outline-none"
              onClick={clickInputFile}
              type="button"
            >
              Change avatar
            </button>
          </div>
        </div>
        <div className="flex-center mt-[100px] pb-10">
          <button
            className={`btn-primary text-white text-center bg-primary py-[14px] rounded-lg text-sm flex-center w-[300px] cursor-pointer `}
            type="submit"
          >
            {isLoading && <LoadingSpinner size={20} />}
            <span className={isLoading ? 'ml-1' : ''}>Change</span>
          </button>
        </div>
      </form>
      <input
        type="file"
        className="hidden"
        ref={inputFileRef}
        onChange={changeAvatar}
      />
      <Toastify
        type={statusToast.type}
        message={statusToast.message}
        ref={toastRef}
      />
    </section>
  );
};

export default SettingsScreen;
