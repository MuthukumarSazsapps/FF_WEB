import React from 'react';
import Spinner from './spinner';

const CenterSpinner = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <div className="absolute inset-0 bg-blur backdrop-blur-[2px]"></div>
      <div className="relative z-10">
        <Spinner className="left-0" color="secondary" />
      </div>
    </div>
  );
};

export default CenterSpinner;
