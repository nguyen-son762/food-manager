import { memo, ReactNode } from 'react';

type BlankLayoutProps = {
  children: ReactNode;
};

const BlankLayout = memo(({ children }: BlankLayoutProps) => (
  <div>{children}</div>
));

export default BlankLayout;
