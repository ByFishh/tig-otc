import { TIG_ADDRESS } from "@/const/const";
import { useMarketCap } from "@/hooks/useMarketCap";
import { ICard } from "@/types/ICard/ICard";
import { IUnit } from "@/types/IUnit/IUnit";
import { formatUnits } from "viem";

export const useGlobalInformation = () => {
  const marketCap = useMarketCap(TIG_ADDRESS);

  const items: ICard[] = [
    {
      title: "Last transaction price",
      description: "Review here the last transaction done",
      data: [
        {
          title: "Last transaction price",
          value: 0,
          unit: IUnit.DOLLARD,
        },
      ],
    },
    {
      title: "Market cap",
      description: "Review here the global market cap relative to TIG",
      forceRender: true,
      data: [
        {
          title: "Market cap",
          value: Number(formatUnits(marketCap.data ?? BigInt(0), 18)),
          unit: IUnit.TIG,
        },
        {
          title: "Market cap",
          value: 0,
          unit: IUnit.DOLLARD,
        },
      ],
    },
    {
      title: "24h Volume",
      description: "Review here the global volume during the last 24h",
      data: [
        {
          title: "24h Volume",
          value: 0,
          unit: IUnit.TIG,
        },
        {
          title: "24h Volume",
          value: 0,
          unit: IUnit.DOLLARD,
        },
      ],
    },
  ];

  return { items };
};
