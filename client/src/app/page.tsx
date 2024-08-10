import GlobalInformation from "@/components/GlobalInformation/GlobalInformation";
import Offers from "@/components/Offers/Offers";
import Trades from "@/components/Trades/Trades";
import { IOfferType } from "@/types/IOfferType/IOfferType";
import { Flex, Grid } from "@radix-ui/themes";

export default function Home() {
  return (
    <main>
      <Flex direction="column" gap="3">
        <GlobalInformation />
        <Flex width="100%" gap="3" direction="column">
          <Grid gap="3" columns={{ md: "2" }}>
            <Offers
              type={IOfferType.BUY}
              title="Buy offers"
              description="All buy offers currently available"
              data={[
                { quantity: 170, price: 23.3, total: 180 },
                { quantity: 170, price: 23.3, total: 180 },
                { quantity: 170, price: 23.3, total: 180 },
                { quantity: 170, price: 23.3, total: 180 },
                { quantity: 170, price: 23.3, total: 180 },
                { quantity: 170, price: 23.3, total: 180 },
                { quantity: 170, price: 23.3, total: 180 },
                { quantity: 170, price: 23.3, total: 180 },
                { quantity: 170, price: 23.3, total: 180 },
                { quantity: 170, price: 23.3, total: 180 },
                { quantity: 170, price: 23.3, total: 180 },
                { quantity: 170, price: 23.3, total: 180 },
              ]}
            />
            <Offers
              type={IOfferType.SELL}
              title="Sell offers"
              description="All sell offers currently available"
              data={[{ quantity: 170, price: 23.3, total: 180 }]}
            />
          </Grid>
          <Flex py="4" mt="6">
            <Trades
              data={[
                {
                  time: "10/08/2024",
                  from: "0xF0AD7F7124f0739fF989eAE017B1d0c2A690424b",
                  to: "0xF0AD7F7124f0739fF989eAE017B1d0c2A690424b",
                  quantity: 170,
                  price: 23.3,
                  total: 180,
                },
                {
                  time: "10/08/2024",
                  from: "0xF0AD7F7124f0739fF989eAE017B1d0c2A690424b",
                  to: "0xF0AD7F7124f0739fF989eAE017B1d0c2A690424b",
                  quantity: 170,
                  price: 23.3,
                  total: 180,
                },
                {
                  time: "10/08/2024",
                  from: "0xF0AD7F7124f0739fF989eAE017B1d0c2A690424b",
                  to: "0xF0AD7F7124f0739fF989eAE017B1d0c2A690424b",
                  quantity: 170,
                  price: 23.3,
                  total: 180,
                },
                {
                  time: "10/08/2024",
                  from: "0xF0AD7F7124f0739fF989eAE017B1d0c2A690424b",
                  to: "0xF0AD7F7124f0739fF989eAE017B1d0c2A690424b",
                  quantity: 170,
                  price: 23.3,
                  total: 180,
                },
                {
                  time: "10/08/2024",
                  from: "0xF0AD7F7124f0739fF989eAE017B1d0c2A690424b",
                  to: "0xF0AD7F7124f0739fF989eAE017B1d0c2A690424b",
                  quantity: 170,
                  price: 23.3,
                  total: 180,
                },
                {
                  time: "10/08/2024",
                  from: "0xF0AD7F7124f0739fF989eAE017B1d0c2A690424b",
                  to: "0xF0AD7F7124f0739fF989eAE017B1d0c2A690424b",
                  quantity: 170,
                  price: 23.3,
                  total: 180,
                },
                {
                  time: "10/08/2024",
                  from: "0xF0AD7F7124f0739fF989eAE017B1d0c2A690424b",
                  to: "0xF0AD7F7124f0739fF989eAE017B1d0c2A690424b",
                  quantity: 170,
                  price: 23.3,
                  total: 180,
                },
                {
                  time: "10/08/2024",
                  from: "0xF0AD7F7124f0739fF989eAE017B1d0c2A690424b",
                  to: "0xF0AD7F7124f0739fF989eAE017B1d0c2A690424b",
                  quantity: 170,
                  price: 23.3,
                  total: 180,
                },
                {
                  time: "10/08/2024",
                  from: "0xF0AD7F7124f0739fF989eAE017B1d0c2A690424b",
                  to: "0xF0AD7F7124f0739fF989eAE017B1d0c2A690424b",
                  quantity: 170,
                  price: 23.3,
                  total: 180,
                },
                {
                  time: "10/08/2024",
                  from: "0xF0AD7F7124f0739fF989eAE017B1d0c2A690424b",
                  to: "0xF0AD7F7124f0739fF989eAE017B1d0c2A690424b",
                  quantity: 170,
                  price: 23.3,
                  total: 180,
                },
                {
                  time: "10/08/2024",
                  from: "0xF0AD7F7124f0739fF989eAE017B1d0c2A690424b",
                  to: "0xF0AD7F7124f0739fF989eAE017B1d0c2A690424b",
                  quantity: 170,
                  price: 23.3,
                  total: 180,
                },
                {
                  time: "10/08/2024",
                  from: "0xF0AD7F7124f0739fF989eAE017B1d0c2A690424b",
                  to: "0xF0AD7F7124f0739fF989eAE017B1d0c2A690424b",
                  quantity: 170,
                  price: 23.3,
                  total: 180,
                },
                {
                  time: "10/08/2024",
                  from: "0xF0AD7F7124f0739fF989eAE017B1d0c2A690424b",
                  to: "0xF0AD7F7124f0739fF989eAE017B1d0c2A690424b",
                  quantity: 170,
                  price: 23.3,
                  total: 180,
                },
                {
                  time: "10/08/2024",
                  from: "0xF0AD7F7124f0739fF989eAE017B1d0c2A690424b",
                  to: "0xF0AD7F7124f0739fF989eAE017B1d0c2A690424b",
                  quantity: 170,
                  price: 23.3,
                  total: 180,
                },
                {
                  time: "10/08/2024",
                  from: "0xF0AD7F7124f0739fF989eAE017B1d0c2A690424b",
                  to: "0xF0AD7F7124f0739fF989eAE017B1d0c2A690424b",
                  quantity: 170,
                  price: 23.3,
                  total: 180,
                },
                {
                  time: "10/08/2024",
                  from: "0xF0AD7F7124f0739fF989eAE017B1d0c2A690424b",
                  to: "0xF0AD7F7124f0739fF989eAE017B1d0c2A690424b",
                  quantity: 170,
                  price: 23.3,
                  total: 180,
                },
                {
                  time: "10/08/2024",
                  from: "0xF0AD7F7124f0739fF989eAE017B1d0c2A690424b",
                  to: "0xF0AD7F7124f0739fF989eAE017B1d0c2A690424b",
                  quantity: 170,
                  price: 23.3,
                  total: 180,
                },
                {
                  time: "10/08/2024",
                  from: "0xF0AD7F7124f0739fF989eAE017B1d0c2A690424b",
                  to: "0xF0AD7F7124f0739fF989eAE017B1d0c2A690424b",
                  quantity: 170,
                  price: 23.3,
                  total: 180,
                },
                {
                  time: "10/08/2024",
                  from: "0xF0AD7F7124f0739fF989eAE017B1d0c2A690424b",
                  to: "0xF0AD7F7124f0739fF989eAE017B1d0c2A690424b",
                  quantity: 170,
                  price: 23.3,
                  total: 180,
                },
                {
                  time: "10/08/2024",
                  from: "0xF0AD7F7124f0739fF989eAE017B1d0c2A690424b",
                  to: "0xF0AD7F7124f0739fF989eAE017B1d0c2A690424b",
                  quantity: 170,
                  price: 23.3,
                  total: 180,
                },
                {
                  time: "10/08/2024",
                  from: "0xF0AD7F7124f0739fF989eAE017B1d0c2A690424b",
                  to: "0xF0AD7F7124f0739fF989eAE017B1d0c2A690424b",
                  quantity: 170,
                  price: 23.3,
                  total: 180,
                },
                {
                  time: "10/08/2024",
                  from: "0xF0AD7F7124f0739fF989eAE017B1d0c2A690424b",
                  to: "0xF0AD7F7124f0739fF989eAE017B1d0c2A690424b",
                  quantity: 170,
                  price: 23.3,
                  total: 180,
                },
                {
                  time: "10/08/2024",
                  from: "0xF0AD7F7124f0739fF989eAE017B1d0c2A690424b",
                  to: "0xF0AD7F7124f0739fF989eAE017B1d0c2A690424b",
                  quantity: 170,
                  price: 23.3,
                  total: 180,
                },
                {
                  time: "10/08/2024",
                  from: "0xF0AD7F7124f0739fF989eAE017B1d0c2A690424b",
                  to: "0xF0AD7F7124f0739fF989eAE017B1d0c2A690424b",
                  quantity: 170,
                  price: 23.3,
                  total: 180,
                },
                {
                  time: "10/08/2024",
                  from: "0xF0AD7F7124f0739fF989eAE017B1d0c2A690424b",
                  to: "0xF0AD7F7124f0739fF989eAE017B1d0c2A690424b",
                  quantity: 170,
                  price: 23.3,
                  total: 180,
                },
              ]}
            />
          </Flex>
        </Flex>
      </Flex>
    </main>
  );
}
