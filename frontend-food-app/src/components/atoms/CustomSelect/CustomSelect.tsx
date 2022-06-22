import { CustomSelectProps } from '@app/types/atom.type';
import { memo, useEffect, useState } from 'react';
import styles from './CustomSelect.module.scss';

interface Props {
  data: Array<CustomSelectProps>;
  value?: CustomSelectProps;
  width?: number;
  onChange: Function;
}
const CustomSelect = ({ value, data, width = 140, onChange }: Props) => {
  const [isShow, setIsShow] = useState(false);

  // effect
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (e: MouseEvent) => {
    const element = e.target as HTMLElement;
    if (element.parentElement?.classList.contains('custom-select')) {
      return;
    }
    setIsShow(false);
  };
  return (
    <div className="custom-select">
      <div
        className={`relative flex rounded-lg bg-[#2D303E] text-[#889898] px-3 py-2 text-sm cursor-pointer custom-select ${
          isShow ? 'rounded-b-none' : ''
        }`}
        style={{
          width: width + 'px'
        }}
        onClick={() => setIsShow(!isShow)}
      >
        <span className="material-icons-outlined">expand_more</span>
        <span>{value?.title}</span>
        {isShow && (
          <ul
            className={`absolute top-[100%] left-0 w-full cursor-pointer ${styles.animation} z-10`}
          >
            {data.map((item, index) => {
              return (
                <li
                  className="bg-[#2D303E] text-[#889898] px-2 text-center py-2 text-sm last:rounded-b-xl border-top hover:bg-primary hover:text-white"
                  key={index}
                  onClick={() => onChange(item)}
                >
                  {item.title}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default memo(CustomSelect);
