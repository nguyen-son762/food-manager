import cx from 'classnames';
import { memo } from 'react';
import styles from './LoadingSpinner.module.scss';

interface ILoadingSpinnerProps {
  size?: Number;
  primaryColor?: Boolean;
}
function LoadingSpinner({ size, primaryColor }: ILoadingSpinnerProps) {
  return (
    <div
      className={
        primaryColor ? cx(styles.loader, styles.loader__primary) : styles.loader
      }
      style={{ width: `${size}px`, height: `${size}px` }}
    />
  );
}

export default memo(LoadingSpinner);
