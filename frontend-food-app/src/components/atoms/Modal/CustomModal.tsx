import { memo, ReactNode } from 'react';
import Modal from 'react-modal';
import './CustomModal.scss';

Modal.setAppElement('#root');
interface IPropsModal {
  isShow: boolean;
  children: ReactNode;
  closeModal: Function;
  stylesOverlay?: object;
  stylesContent?: object;
  shouldCloseOnOverlayClick?: boolean;
}
function CustomModal({
  children,
  closeModal,
  isShow,
  stylesContent={
    position: 'absolute',
    top: '0',
    left: '100%',
    transform: 'translateX(-100%)',
    background: '#1F1D2B',
    border: 'none',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '4px',
    outline: 'none',
    padding: '20px',
    width: '26rem',
    height: '100vh',
    animation: 'transformX 0.5s ease-in-out',
    cursor: 'default'
  },
  stylesOverlay= {
    background: 'rgba(0,0,0,0.6)',
    cursor: 'pointer'
  },
  shouldCloseOnOverlayClick
}: IPropsModal) {
  const handleCloseModal = () => {
    closeModal();
  };
  return (
    <div>
      <Modal
        isOpen={isShow}
        onRequestClose={handleCloseModal}
        shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
        style={{
          overlay: stylesOverlay,
          content: stylesContent
        }}
        contentLabel="Example Modal"
      >
        {children}
      </Modal>
    </div>
  );
}

export default memo(CustomModal);
