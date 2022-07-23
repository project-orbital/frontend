import FormModal from "../../../common/components/form/FormModal";
import * as Yup from "yup";
import { useCreatePaymentMutation } from "../../../app/api";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { InputControl, NumberInputControl } from "formik-chakra-ui";
import { format } from "date-fns";

export default function PaymentCreate() {
    const [createPayment] = useCreatePaymentMutation();
    const { liabilityId } = useParams();
    const navigate = useNavigate();
    const toast = useToast();

    async function handleSubmit(values, { setErrors }) {
        try {
            toast.closeAll();
            await createPayment({
                ...values,
                liabilityId: liabilityId,
            }).unwrap();
            toast({
                title: `Repayment recorded.`,
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
            title={`Recording your repayment...`}
            heading={`We need some details about this repayment.`}
            subheading={`Please fill out the form to record your repayment.`}
            cancelText={`Cancel recording`}
            submitText={`Record repayment`}
            initialValues={{
                date: format(new Date(), "yyyy-MM-dd"),
                amount: "",
            }}
            validationSchema={Yup.object({
                date: Yup.date().required("Please provide a date."),
                amount: Yup.number()
                    .typeError("Please provide a numerical value.")
                    .positive("Please provide a positive value.")
                    .required("Please provide an amount."),
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
            <NumberInputControl
                isRequired
                name="amount"
                label="Amount Paid"
                numberInputProps={{
                    precision: 2,
                    step: 1,
                }}
            />
        </FormModal>
    );
}
