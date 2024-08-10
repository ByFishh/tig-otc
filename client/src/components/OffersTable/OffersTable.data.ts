import { IUnit } from "@/types/IUnit/IUnit";

export const headers: { txt: string; unit?: IUnit }[] = [
  {
    txt: "Quantity",
    unit: IUnit.TIG,
  },
  {
    txt: "Price",
    unit: IUnit.DOLLAR_PER_TIG,
  },
  {
    txt: "Total",
    unit: IUnit.DOLLARD,
  },
  {
    txt: "",
  },
];
