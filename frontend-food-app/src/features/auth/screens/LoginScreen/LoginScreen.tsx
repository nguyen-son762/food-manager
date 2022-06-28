import LoadingSpinner from '@app/components/atoms/LoadingSpinner/LoadingSpinner';
import { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import {
  login,
  LoginRequestDef,
  RegisterRequestDef
} from '@app/features/auth/auth';
import { useAppDispatch } from '@app/redux/store';
import { useNavigate } from 'react-router';
import FormInput from '@app/components/atoms/FormInput/FormInput';
import { register } from '../../redux/auth.slice';
import {
  dataInputLogin,
  dataInputRegister
} from '../../constants/auth.validate';

function LoginScreen() {
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [isErrLogin, setIsErrLogin] = useState<Boolean>(false);
  const [isLogin, setIsLogin] = useState<Boolean>(true);
  const { handleSubmit, formState, control } = useForm<
    RegisterRequestDef | LoginRequestDef
  >({
    mode: 'onChange'
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<
    RegisterRequestDef | LoginRequestDef
  > = async data => {
    setIsLoading(true);
    if (isLogin) {
      const response = await dispatch(login(data as LoginRequestDef));
      if (login.fulfilled.match(response)) {
        setIsLoading(false);
        navigate('/home');
      } else {
        setIsErrLogin(true);
        setIsLoading(false);
      }
    } else {
      const response = await dispatch(register(data as RegisterRequestDef));
      if (register.fulfilled.match(response)) {
        setIsLoading(false);
        navigate('/home');
      } else {
        setIsErrLogin(true);
        setIsLoading(false);
      }
    }
  };

  const renderInputLogin = () => {
    const result = dataInputLogin.map(item => {
      return (
        <div key={item.name}>
          <p className="text-white font-14 mb-1 text-sm mt-3">{item.label}:</p>
          <Controller
            defaultValue={item.value}
            control={control}
            name={item.name as any}
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
                  onFocus={() => setIsErrLogin(false)}
                />
              );
            }}
          />
        </div>
      );
    });
    return result;
  };

  const renderInputRegister = () => {
    const result = dataInputRegister.map(item => {
      return (
        <div key={item.name}>
          <p className="text-white font-14 mb-1 text-sm mt-3">{item.label}:</p>
          <Controller
            defaultValue={item.value}
            control={control}
            name={item.name as any}
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
  return (
    <div className="bg-dark min-h-[100vh] min-w-full flex flex-col justify-center items-center wrapper">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-dark-second px-6 w-[405px] rounded-lg"
      >
        <p className="text-left font-28 mt-6 text-white text-2xl">
          {isLogin ? 'Đăng nhập' : 'Đăng kí'}
        </p>
        <p className="my-5 bg-[#393C49] w-full h-[1px]" />
        {isLogin ? renderInputLogin() : renderInputRegister()}
        {isErrLogin && (
          <p className="text-xs text-red-600">Sai tài khoản hoặc mật khẩu.</p>
        )}
        <p className="my-5 bg-[#393C49] w-full h-[1px]" />
        <button
          className={`btn-primary w-full text-white text-center bg-primary py-[14px] rounded-lg text-sm flex-center ${
            !formState.isValid ? 'disable' : ''
          }`}
          type="submit"
        >
          {isLoading && <LoadingSpinner size={20} />}
          <span className={isLoading ? 'ml-1' : ''}>
            {!isLogin ? 'Đăng kí' : 'Đăng nhập'}
          </span>
        </button>
        <p
          className="text-primary underline text-center mt-4 mb-5 cursor-pointer"
          onClick={() => {
            setIsLogin(!isLogin);
            setIsErrLogin(false);
          }}
        >
          {isLogin ? 'Đăng kí' : 'Đăng nhập'}
        </p>
      </form>
      <div></div>
      <p
        className="text-primary underline cursor-pointer"
        onClick={() => {
          navigate('/');
        }}
      >
        Trang chủ
      </p>
    </div>
  );
}

export default LoginScreen;
