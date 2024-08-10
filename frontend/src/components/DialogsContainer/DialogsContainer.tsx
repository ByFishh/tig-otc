import React from 'react';
import { useDialogsContainer } from './DialogsContainer.logic';

const DialogsContainer = () => {
  const logic = useDialogsContainer();

  return (
    <>
      {logic.displayDialogs.map((item) => (
        <div key={item.key}>{item.show && item.content}</div>
      ))}
    </>
  );
};

export default DialogsContainer;
