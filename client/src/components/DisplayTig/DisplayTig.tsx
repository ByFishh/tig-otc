import { IUnit } from '@/types/IUnit/IUnit';
import { Text } from '@radix-ui/themes';
import React from 'react';

const DisplayTig = (props: { value: number; unit: IUnit }) => {
  return (
    <Text as="p" size="3" weight="regular">
      {Number(props.value).toFixed(2)}
      <span style={{ fontSize: '.8rem' }}>{props.unit}</span>
    </Text>
  );
};

export default DisplayTig;
