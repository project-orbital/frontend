import FormModal from "../../../common/components/form/FormModal";
import * as Yup from "yup";
import { useCreateOrderMutation } from "../../../app/api";
import { useNavigate, useParams } from "react-router-dom";
import { FormControl, FormHelperText, useToast } from "@chakra-ui/react";
import { InputControl, NumberInputControl } from "formik-chakra-ui";
import { format } from "date-fns";

export default function OrderCreate({ type }) {
    const [createOrder] = useCreateOrderMutation();
    const { assetId } = useParams();
    const navigate = useNavigate();
    const toast = useToast();

    async function handleSubmit(values, { setErrors }) {
        try {
            toast.closeAll();
            await createOrder({
                ...values,
                amount: type === "sell" ? -values.amount : values.amount,
                fee: values.fee === "" ? 0 : values.fee,
                assetId: assetId,
            }).unwrap();
            toast({
                title: `${type === "buy" ? "Buy" : "Sell"} order recorded.`,
                status: "success",
            });
            navigate("../");
        } catch (error) {
            setErrors(error);
            toast({
                ...error,
                status: "error",
            });
        }
    }

    return (
        <FormModal
            title={`Adding your ${type} order...`}
            heading={`We need some details about this ${type} order.`}
            subheading={`Please fill out the form to record your ${type} order.`}
            cancelText={`Discard ${type} order`}
            submitText={`Record ${type} order`}
            initialValues={{
                date: format(new Date(), "yyyy-MM-dd"),
                amount: "",
                price: "",
                fee: "",
            }}
            validationSchema={Yup.object({
                date: Yup.date().required("Please provide a date."),
                amount: Yup.number()
                    .typeError("Please provide a numerical value.")
                    .required("Please provide an amount."),
                price: Yup.number()
                    .typeError("Please provide a numerical value.")
                    .required("Please provide a price."),
                fee: Yup.number().typeError(
                    "Please provide a numerical value."
                ),
            })}
            onSubmit={handleSubmit}
        >
            <InputControl
                isRequired
                name="date"
                label="Date"
                inputProps={{
                    type: "date",
                }}
            />
            <FormControl>
                <NumberInputControl
                    isRequired
                    name="price"
                    label={`${type === "buy" ? "Purchase" : "Sell"} Price`}
                    numberInputProps={{
                        precision: 4,
                        step: 1,
                    }}
                />
                <FormHelperText>
                    {`The market price of the asset at the time of the ${type} order.`}
                </FormHelperText>
            </FormControl>
            <NumberInputControl
                isRequired
                name="amount"
                label="Amount"
                numberInputProps={{
                    precision: 4,
                    step: 1,
                }}
            />
            <FormControl>
                <NumberInputControl
                    name="fee"
                    label="Fee"
                    numberInputProps={{
                        precision: 2,
                        step: 1,
                    }}
                />
                <FormHelperText>
                    Usually the commission fee charged for the purchase.
                </FormHelperText>
            </FormControl>
        </FormModal>
    );
}
