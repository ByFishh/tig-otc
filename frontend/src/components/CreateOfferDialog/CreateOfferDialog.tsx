import { CircleBackslashIcon, Cross1Icon, PlusIcon } from "@radix-ui/react-icons";
import { Box, Button, Callout, Dialog, Flex, Grid, IconButton, Spinner, Text, TextField } from "@radix-ui/themes";
import React, { useMemo } from "react";
import { useCreateOfferDialog } from "./CreateOfferDialog.logic";
import { IOfferType } from "@/types/IOfferType/IOfferType";
import { Controller } from "react-hook-form";
import { IUnit } from "@/types/IUnit/IUnit";
import { formatTIG } from "../../utils/formatTIG";

const CreateOfferDialog = () => {
  const logic = useCreateOfferDialog();

  const UI = useMemo(
    () => ({
      title: logic.data.type === IOfferType.BUY ? "Create Buy Offer" : "Create Sell Offer",
      description: logic.data.type === IOfferType.BUY ? "Create your Buy offer" : "Create your Sell offer",
    }),
    [logic.data.type]
  );

  return (
    <Dialog.Root open>
      <Dialog.Content size="4">
        <Flex justify="between" align="center">
          <Dialog.Title size="5">{UI.title}</Dialog.Title>
          <Dialog.Close>
            <Flex>
              <IconButton style={{ background: "transparent" }} onClick={logic.closeModal}>
                <Cross1Icon width="15" height="15" color="white" />
              </IconButton>
            </Flex>
          </Dialog.Close>
        </Flex>
        <Dialog.Description size="2" color="gray" mb="5">
          {UI.description}
        </Dialog.Description>
        {logic.balance !== undefined ? (
          <Flex>
            <form action="" style={{ width: "100%" }}>
              <Flex mt="4" style={{ flexFlow: "column" }}>
                <Flex width="100%" style={{ flexFlow: "column" }}>
                  <Flex align="center" justify="between" mb="1">
                    <Text as="label" size="2" weight="regular" color="gray">
                      Amount of tig (required)
                    </Text>
                    <Text as="span" size="2" weight="regular" color="gray">
                      Balance: {formatTIG(logic.balance)}
                      <span style={{ fontSize: ".6rem" }}>{IUnit.TIG}</span>
                    </Text>
                  </Flex>
                  <Box mb="4">
                    <Controller
                      name="quantity"
                      rules={{ required: true, validate: (field) => logic.hasEnoughtTIG(field) }}
                      control={logic.control}
                      render={({ field, fieldState }) => (
                        <>
                          <TextField.Root
                            size="3"
                            type="number"
                            style={{ paddingLeft: "0" }}
                            onChange={(e) => logic.fieldUpdate("quantity", e, field.onChange)}
                            min={1}
                            value={field.value}
                          >
                            <TextField.Slot style={{ paddingLeft: "0" }}></TextField.Slot>
                            <TextField.Slot>
                              <Text as="label" size="2" weight="regular" color="gray">
                                {IUnit.TIG}
                              </Text>
                            </TextField.Slot>
                          </TextField.Root>
                          {fieldState.error && (
                            <Callout.Root mt="4" color="red">
                              <Callout.Icon>
                                <CircleBackslashIcon />
                              </Callout.Icon>
                              <Callout.Text>{fieldState.error.message}</Callout.Text>
                            </Callout.Root>
                          )}
                        </>
                      )}
                    ></Controller>
                  </Box>
                  <Grid columns="2" gap="6">
                    <Flex width="100%" style={{ flexFlow: "column" }} mb="4">
                      <Text as="label" size="2" weight="regular" mb="1" color="gray">
                        Price per TIG (required)
                      </Text>
                      <Controller
                        name="price"
                        control={logic.control}
                        render={({ field }) => (
                          <TextField.Root
                            size="3"
                            type="number"
                            onChange={(e) => logic.fieldUpdate("price", e, field.onChange)}
                            value={field.value}
                          >
                            <TextField.Slot style={{ paddingLeft: "0" }}></TextField.Slot>
                            <TextField.Slot>
                              <Text as="label" size="2" weight="regular" color="gray">
                                {IUnit.USDC}
                              </Text>
                            </TextField.Slot>
                          </TextField.Root>
                        )}
                      ></Controller>
                    </Flex>
                    <Flex width="100%" style={{ flexFlow: "column" }}>
                      <Text as="label" size="2" weight="regular" mb="1" color="gray">
                        Total USDC (required)
                      </Text>
                      <Box>
                        <Controller
                          name="total"
                          control={logic.control}
                          render={({ field }) => (
                            <TextField.Root
                              size="3"
                              type="number"
                              onChange={(e) => logic.fieldUpdate("total", e, field.onChange)}
                              value={field.value}
                            >
                              <TextField.Slot style={{ paddingLeft: "0" }}></TextField.Slot>
                              <TextField.Slot>
                                <Text as="label" size="2" weight="regular" color="gray">
                                  {IUnit.DOLLARD}
                                </Text>
                              </TextField.Slot>
                            </TextField.Root>
                          )}
                        ></Controller>
                      </Box>
                    </Flex>
                  </Grid>
                  <Flex justify={"end"}>
                    <Box>
                      <Button onClick={logic.handleSubmit(logic.onSubmit)} disabled={!logic.isDirty || !logic.isValid}>
                        <PlusIcon /> Create Offer
                      </Button>
                    </Box>
                  </Flex>
                </Flex>
              </Flex>
            </form>
          </Flex>
        ) : (
          <Flex justify="center" align="center" style={{ minHeight: "200px" }}>
            <Spinner />
          </Flex>
        )}
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default CreateOfferDialog;
