import { IUnit } from '@/types/IUnit/IUnit';
import { Text } from '@radix-ui/themes';
import React from 'react';

const DisplayDollar = (props: { value: number; unit: IUnit }) => {
  return (
    <Text as="p" size="3" weight="regular">
      <span style={{ fontSize: '.8rem' }}>{props.unit}</span>
      {Number(props.value).toFixed(2)}
    </Text>
  );
};

export default DisplayDollar;
