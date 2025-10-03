import React from 'react';
import { ObjectWrapperProps } from '@ui/components/sgComponent/autoform/react/types';

export const ObjectWrapper: React.FC<ObjectWrapperProps> = ({ label, children }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">{label}</h3>
      {children}
    </div>
  );
};
