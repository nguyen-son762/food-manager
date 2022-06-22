import cx from 'classnames';
import { useLocation, useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import styles from './Menu.module.scss';
import { useAppDispatch, useAppSelector } from '@app/redux/store';
import { getCategories } from '@app/features/category/redux/category.slice';

function Menu() {
  const categories = useAppSelector(state => state.category.categories);
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const param = searchParams.get('type');
  const location = useLocation();
  const changeCategory = (type: string) => {
    navigate(`${location.pathname}?type=${type}`);
  };
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    await dispatch(getCategories());
  };
  const showMenu = () => (
    <>
      <ul className="flex gap-8 text-white text-sm">
        {categories.length > 0 &&
          categories.map((e, index) => (
            <li
              key={e.name}
              className={cx(
                styles.menuItem,
                e.name === param || (index === 0 && !param) ? styles.active : ''
              )}
              onClick={() => changeCategory(e.name)}
            >
              {e.name}
            </li>
          ))}
      </ul>
      <div className="h-[1px] w-full bg-[#393C49] mt-3 mb-10" />
    </>
  );
  return <div>{showMenu()}</div>;
}

export default React.memo(Menu);
