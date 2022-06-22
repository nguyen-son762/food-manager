import { enumToastify } from '@app/types/atom.type';
import { forwardRef, memo, useImperativeHandle } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

type Props = {
  message: string;
  type: enumToastify;
};

const Toastify = forwardRef(({ type, message }: Props, ref) => {
  useImperativeHandle(ref, () => ({
    showToast() {
      if (type === enumToastify.success) {
        toast.success(message, {
          position: 'bottom-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });
      } else {
        toast.error(message, {
          position: 'bottom-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });
      }
    }
  }));
  return (
    <div>
      <ToastContainer />
    </div>
  );
});

export default memo(Toastify);
