import { memo } from 'react';
import './Checkbox.scss';

type Props = {
  isChecked: boolean;
  changeChecked: Function;
};

const Checkbox = ({ isChecked, changeChecked }: Props) => {
  return (
    <label>
      <input type="checkbox" onChange={() => changeChecked()} />
      <span
        className={`checkbox ${isChecked ? 'checkbox--active' : ''}`}
        aria-hidden="true"
      >
        <span className="material-icons-outlined icon-check">done</span>
      </span>
    </label>
  );
};

export default memo(Checkbox);
