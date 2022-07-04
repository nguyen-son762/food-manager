import Chat from '@app/components/Chat/Chat';
import { useAppSelector } from '@app/redux/store';
import { RoleDef } from '@app/types/role.type';
import { ReactNode } from 'react';
import Navbar from '../Navbar/Navbar';

type Props = {
  children: ReactNode;
};

const DefaultLayout = ({ children }: Props) => {
  const user = useAppSelector(state => state.auth.user);
  return (
    <div>
      <Navbar />
      <div className="ml-[6.5rem]">{children}</div>
      {user && user.role === RoleDef.USER && <Chat />}
    </div>
  );
};

export default DefaultLayout;
