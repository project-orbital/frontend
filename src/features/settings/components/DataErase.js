import FormModal from "../../../common/components/form/FormModal";
import { InputControl, RadioGroupControl } from "formik-chakra-ui";
import { Radio, Stack, useToast } from "@chakra-ui/react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import ky from "ky";

export default function DataErase() {
    const navigate = useNavigate();
    const toast = useToast();

    const handleSubmit = async (values, { setErrors }) => {
        try {
            toast.closeAll();
            await ky.delete(
                `${process.env.REACT_APP_BACKEND}/users/preferences/erase-data`,
                {
                    credentials: "include",
                    headers: {
                        password: values.password,
                    },
                }
            );
            toast({
                title: "Data erased successfully.",
                description: "Data synchronization has also been disabled.",
                status: "success",
            });
            navigate("../");
        } catch (error) {
            const errors = await error.response.json();
            setErrors(errors);
            toast({
                title: "Data erasure failed.",
                description: "Please try again.",
                status: "error",
                isClosable: true,
            });
        }
    };

    return (
        <FormModal
            isDestructive
            title="Erasing your data..."
            heading="Are you absolutely sure you want to erase your data?"
            subheading="This cannot be undone. You will lose all your data except for your account."
            cancelText="Cancel data erasure"
            submitText="Erase data"
            initialValues={{
                location: "remote",
                password: "",
            }}
            validationSchema={Yup.object({
                location: Yup.string().required("Please choose one option."),
                password: Yup.string().required("Password is required."),
            })}
            onSubmit={handleSubmit}
        >
            <RadioGroupControl
                isRequired
                name="location"
                label="Where do you want to erase your data from?"
                helperText="This will also disable data synchronization across your devices.
                You can re-enable this in Settings."
            >
                <Stack direction="column">
                    <Radio value="remote">DollarPlanner's servers</Radio>
                    <Radio value="remote-and-local">
                        DollarPlanner's servers, and this device
                    </Radio>
                </Stack>
            </RadioGroupControl>
            <InputControl
                isRequired
                name="password"
                label="Enter your password to confirm."
                inputProps={{
                    type: "password",
                    autoComplete: "new-password",
                    placeholder: "••••••••",
                }}
            />
        </FormModal>
    );
}
