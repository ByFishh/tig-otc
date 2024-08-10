import { ICard } from '@/types/ICard/ICard';
import {
  Box,
  Text,
  Card as RadixCard,
  Flex,
  Badge,
  Grid,
} from '@radix-ui/themes';
import React, { memo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useCard } from './Card.logic';

const propsAreEqual = (prevProps: Readonly<ICard>): boolean =>
  !prevProps.forceRender;

const Card = (props: ICard) => {
  const logic = useCard();
  return (
    <Box width="100%" style={{ height: '100%' }}>
      <RadixCard size="4" style={{ height: '100%' }}>
        <Flex gap="3" align="center" mb="7">
          <Box width="100%">
            <Flex justify="between" align="center">
              <Text as="p" size="6" weight="medium" mb="1">
                {props.title}
              </Text>
              {props.close && props.close}
            </Flex>
            <Text as="p" size="2" color="gray">
              {props.description}
            </Text>
          </Box>
        </Flex>
        <Grid
          columns={{
            xl: '2',
            lg: '2',
            md: '2',
            sm: '1',
            xs: '2',
            initial: '1',
          }}
          align={'center'}
          justify={'start'}
          gapX={'2'}
          gapY={'6'}
        >
          {props.content ? (
            <>{props.content}</>
          ) : (
            <>
              {props.data.map((d) => (
                <Flex key={uuidv4()} style={{ flexFlow: 'column' }}>
                  <Text as="p" size="2" mb="0" color="gray">
                    {d.title} ({d.unit}){' '}
                    {d.percentage && (
                      <Badge
                        color={d.percentage > 0 ? 'jade' : 'ruby'}
                        radius="full"
                      >
                        {d.percentage > 0 && '+'}
                        {d.percentage.toFixed(1)}%
                      </Badge>
                    )}
                  </Text>
                  {logic.getValue(d.value, d.unit)}
                </Flex>
              ))}
            </>
          )}
        </Grid>
      </RadixCard>
    </Box>
  );
};

export default memo(Card, propsAreEqual);
