import { IUnit } from '@/types/IUnit/IUnit';

export const useGlobalInformation = () => {
  const items = [
    {
      title: 'Last transaction price',
      description: 'Review here the last transaction done',
      data: [
        {
          title: 'Last transaction price',
          value: 0,
          unit: IUnit.DOLLARD,
        },
      ],
    },
    {
      title: 'Market cap',
      description: 'Review here the global market cap relative to TIG',
      data: [
        {
          title: 'Market cap',
          value: 0,
          unit: IUnit.TIG,
        },
        {
          title: 'Market cap',
          value: 0,
          unit: IUnit.DOLLARD,
        },
      ],
    },
    {
      title: '24h Volume',
      description: 'Review here the global volume during the last 24h',
      data: [
        {
          title: '24h Volume',
          value: 0,
          unit: IUnit.TIG,
        },
        {
          title: '24h Volume',
          value: 0,
          unit: IUnit.DOLLARD,
        },
      ],
    },
  ];

  return { items };
};
