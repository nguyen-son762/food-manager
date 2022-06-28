import React, { memo, ReactNode, useEffect, useState } from 'react';
import DashboardImage from '@app/assets/images/dashboard.png';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.scss';
import { useAppDispatch, useAppSelector } from '@app/redux/store';
import { logout } from '@app/features/auth/auth';
import { AUTH_ROLE } from '@app/constants/auth.constants';
import Chat from '@app/components/Chat/Chat';
import { RoleDef } from '@app/types/role.type';
interface NavbarProps {
  children: ReactNode;
}
const Navbar = memo(({ children }: NavbarProps) => {
  const user = useAppSelector(state => state.auth.user);
  const dispatch = useAppDispatch();
  const [isShowSettingUser, setIsShowSettingUser] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (e: MouseEvent) => {
    const element = e.target as HTMLElement;
    if (element.parentElement?.classList.contains('icon-user')) {
      return;
    }
    setIsShowSettingUser(false);
  };
  const handleSettingUser = () => {
    setIsShowSettingUser(!isShowSettingUser);
  };
  const logoutUser = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div>
      <nav className="flex flex-col pl-3 fixed min-h-[100vh] max-h-[100vh] w-[6.5rem] bg-dark-second pt-6 text-primary text-[26px] z-10">
        <NavLink to="/home" className="mb-7 flex-center">
          <img src={DashboardImage} alt="" />
        </NavLink>
        <NavLink
          to="/home"
          className={({ isActive }) => (isActive ? styles.active : '')}
        >
          <div className={styles.box}>
            <span className="material-icons-outlined">home</span>
          </div>
        </NavLink>
        {user &&
          (user?.role === AUTH_ROLE.ADMIN || user?.role === AUTH_ROLE.USER) && (
            <NavLink
              to="/order"
              className={({ isActive }) => (isActive ? styles.active : '')}
            >
              <div className={styles.box}>
                <span className="material-icons-outlined">bookmark_added</span>
              </div>
            </NavLink>
          )}
        {user && user.role === AUTH_ROLE.ADMIN && (
          <>
            <NavLink
              to="/settings"
              className={({ isActive }) => (isActive ? styles.active : '')}
            >
              <div className={styles.box}>
                <span className="material-icons-outlined">settings</span>
              </div>
            </NavLink>
            <NavLink
              to="/inbox"
              className={({ isActive }) => (isActive ? styles.active : '')}
            >
              <div className={styles.box}>
                <span className="material-icons-outlined">chat</span>
              </div>
            </NavLink>
          </>
        )}
        <div className="absolute bottom-8 left-[50%] translate-x-[-50%] icon-user">
          {user && user.avatar_url ? (
            <div
              className="w-[3.2rem] h-[3.2rem] object-cover rounded-full cursor-pointer icon-user"
              onClick={handleSettingUser}
            >
              <img
                src={user.avatar_url}
                alt=""
                className="w-full h-full rounded-full"
              />
            </div>
          ) : (
            <span
              className="material-icons-outlined text-4xl cursor-pointer"
              onClick={handleSettingUser}
            >
              account_circle
            </span>
          )}
        </div>
        {isShowSettingUser && (
          <div className="absolute bottom-8 left-[110%] text-lg">
            <ul className="bg-dark-second rounded-xl px-5 py-3">
              {user ? (
                <>
                  <li
                    className="flex items-center mb-3 hover:text-white cursor-pointer"
                    onClick={() => navigate('/user/settings')}
                  >
                    <span className="material-icons-outlined mr-2">
                      manage_accounts
                    </span>
                    <span className="whitespace-nowrap">Setting user</span>
                  </li>
                  <li
                    className="flex items-center hover:text-white cursor-pointer"
                    onClick={logoutUser}
                  >
                    <span className="material-icons-outlined mr-2">logout</span>
                    <span>Logout</span>
                  </li>
                </>
              ) : (
                <li
                  className="flex items-center hover:text-white cursor-pointer"
                  onClick={() => navigate('/login')}
                >
                  <span className="material-icons-outlined mr-2">logout</span>
                  <span>Login</span>
                </li>
              )}
            </ul>
            <div className={styles.triangle}></div>
          </div>
        )}
      </nav>
      <div className="ml-[6.5rem]">{children}</div>
      {user && user.role === RoleDef.USER && window.innerWidth > 640 && (
        <Chat />
      )}
    </div>
  );
});

export default React.memo(Navbar);

