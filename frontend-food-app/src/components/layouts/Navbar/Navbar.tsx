import React, { memo, useEffect, useState } from 'react';
import DashboardImage from '@app/assets/images/dashboard.png';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.scss';
import { useAppDispatch, useAppSelector } from '@app/redux/store';
import { logout } from '@app/features/auth/auth';
import { NAVBAR_ITEMS } from '@app/constants/navbar.constants';
const Navbar = memo(() => {
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
  const renderNavbar = () => {
    return NAVBAR_ITEMS.map(navItem => {
      const role = navItem.role.find(role => role == user?.role);
      return (
        <NavLink
          key={navItem.name}
          to={navItem.path}
          className={({ isActive }) => (isActive ? styles.active : '')}
          hidden={role === undefined ? true : false}
        >
          <div className={styles.box}>
            <span className="material-icons-outlined">{navItem.icon}</span>
          </div>
        </NavLink>
      );
    });
  };
  return (
    <nav className="flex flex-col pl-3 fixed min-h-[100vh] max-h-[100vh] w-[6.5rem] bg-dark-second pt-6 text-primary text-[26px] z-10">
      <NavLink to="/home" className="mb-7 flex-center">
        <img src={DashboardImage} alt="" />
      </NavLink>
      {renderNavbar()}
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
  );
});

export default React.memo(Navbar);
