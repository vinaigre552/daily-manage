import React, { LazyExoticComponent } from 'react';
import { Spin } from 'antd';

function LoadingComponent() {
  return (
    <div>
      <Spin />
    </div>
  );
}

export const LazyImportComponent = (props: {
  lazyChildren: LazyExoticComponent<() => JSX.Element>;
}) => {
  return (
    <React.Suspense fallback={<LoadingComponent />}>
      <props.lazyChildren />
    </React.Suspense>
  );
};