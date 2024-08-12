import { ITradeKey } from "@/types/ITradeKey/ITradeKey";
import { Text } from "@radix-ui/themes";
import Address from "../Address/Address";
import DisplayTig from "../DisplayTig/DisplayTig";
import { IUnit } from "@/types/IUnit/IUnit";
import DisplayDollar from "../DisplayDollar/DisplayDollar";
import { ITrade } from "@/types/ITrade/ITrade";

export const useTradesTable = () => {
  const convertTradesData = (key: ITradeKey, value: string | number): JSX.Element | string | number => {
    switch (key) {
      case ITradeKey.TIME:
        return value;
      case ITradeKey.FROM:
        return <Address address={value as string} copy />;
      case ITradeKey.TO:
        return <Address address={value as string} copy />;
      case ITradeKey.QUANTITY:
        return <DisplayTig value={value as number} unit={IUnit.TIG} />;
      case ITradeKey.PRICE:
        return <DisplayTig value={value as number} unit={IUnit.DOLLAR_PER_TIG} />;
      case ITradeKey.TOTAL:
        return <DisplayDollar value={value as number} unit={IUnit.DOLLARD} />;
      default:
        break;
    }

    return <Text color="ruby">Error</Text>;
  };

  const trades: ITrade[] = [];
  return { convertTradesData, trades };
};
