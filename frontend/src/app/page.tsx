import GlobalInformation from "@/components/GlobalInformation/GlobalInformation";
import Offers from "@/components/Offers/Offers";
import Trades from "@/components/Trades/Trades";
import { IOfferType } from "@/types/IOfferType/IOfferType";
import { Flex, Grid, Section } from "@radix-ui/themes";

export default function Home() {
  return (
    <Section>
      <Flex direction="column" gap="3">
        <GlobalInformation />
        <Flex width="100%" gap="3" direction="column">
          <Grid gap="3" columns={{ md: "2" }}>
            <Offers type={IOfferType.BUY} title="Buy offers" description="All buy offers currently available" />
            <Offers type={IOfferType.SELL} title="Sell offers" description="All sell offers currently available" />
          </Grid>
          <Flex py="4" mt="6">
            <Trades />
          </Flex>
        </Flex>
      </Flex>
    </Section>
  );
}
