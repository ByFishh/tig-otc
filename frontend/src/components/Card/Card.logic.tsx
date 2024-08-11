import { IUnit } from "@/types/IUnit/IUnit";
import { Text } from "@radix-ui/themes";

export const useCard = () => {
  const getValue = (value: number | null, unit: IUnit): JSX.Element => {
    if (typeof value !== "number")
      return (
        <Text as="p" size="7" weight="medium" color="red">
          Error
        </Text>
      );

    const formatedValue = value.toFixed(2);
    const map: Record<IUnit, JSX.Element> = {
      [IUnit.DOLLARD]: (
        <Text as="p" size="7" weight="medium">
          <span style={{ fontSize: ".825rem" }}>$</span>
          {formatedValue}
        </Text>
      ),
      [IUnit.TIG]: (
        <Text as="p" size="7" weight="medium">
          {formatedValue}
          <span style={{ fontSize: ".825rem" }}>TIG</span>
        </Text>
      ),
      [IUnit.TIG_PER_HOUR]: (
        <Text as="p" size="7" weight="medium">
          {formatedValue}
          <span style={{ fontSize: ".825rem" }}>TIG/h</span>
        </Text>
      ),
      [IUnit.DOLLARD_PER_MONTH]: <></>,
      [IUnit.USDC]: <></>,
      [IUnit.DOLLAR_PER_TIG]: <></>,
    };
    return map[unit];
  };

  return { getValue };
};
