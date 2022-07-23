import FormModal from "../../../common/components/form/FormModal";
import * as Yup from "yup";
import { useCreateAssetMutation } from "../../../app/api";
import { useNavigate } from "react-router-dom";
import { FormControl, FormHelperText, useToast } from "@chakra-ui/react";
import {
    InputControl,
    NumberInputControl,
    SelectControl,
} from "formik-chakra-ui";

export default function AssetCreate() {
    const [createAsset] = useCreateAssetMutation();
    const navigate = useNavigate();
    const toast = useToast();

    async function handleSubmit(values, { setErrors }) {
        try {
            toast.closeAll();
            await createAsset(values).unwrap();
            toast({
                title: "Asset added.",
                description:
                    "You can now record your buy and sell orders for this asset.",
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
            title="Adding your asset..."
            heading="We need some details about this asset."
            subheading="Please fill out the form below to add your asset."
            cancelText={`Cancel asset creation`}
            submitText={`Add asset`}
            initialValues={{
                name: "",
                symbol: "",
                category: "",
                price: "",
                yield: "",
            }}
            validationSchema={Yup.object({
                name: Yup.string()
                    .max(255, "Name is too long.")
                    .required("Please provide an asset name."),
                symbol: Yup.string()
                    .max(255, "Symbol is too long.")
                    .required("Please provide an asset symbol."),
                category: Yup.string().required(
                    "Please select an asset class."
                ),
                price: Yup.number()
                    .typeError("Please provide a numerical value.")
                    .required("Please provide a market price."),
                yield: Yup.number().typeError(
                    "Please provide a numerical value."
                ),
            })}
            onSubmit={handleSubmit}
        >
            <InputControl
                isRequired
                name="name"
                label="Asset Name"
                inputProps={{ placeholder: "Enter an asset name" }}
            />
            <FormControl>
                <InputControl
                    isRequired
                    name="symbol"
                    label="Asset Symbol"
                    inputProps={{ placeholder: "Enter an asset symbol" }}
                />
                <FormHelperText>
                    Usually a unique shorthand for the asset, like "AAPL" or
                    "MSFT".
                </FormHelperText>
            </FormControl>
            <SelectControl isRequired name="category" label="Asset Class">
                <option value="">Please select</option>
                <option value="Bonds">Bonds</option>
                <option value="Stocks">Stocks</option>
                <option value="Cryptocurrencies">Cryptocurrencies</option>
                <option value="Options">Options</option>
                <option value="Futures">Futures</option>
                <option value="Others">Others</option>
            </SelectControl>
            <FormControl>
                <NumberInputControl
                    isRequired
                    name="price"
                    label="Market Price"
                    numberInputProps={{
                        precision: 2,
                        step: 1,
                    }}
                />
                <FormHelperText>
                    In future, we'll implement an API call to fetch this
                    automatically.
                </FormHelperText>
            </FormControl>
            <FormControl>
                <NumberInputControl
                    name="yield"
                    label="Annual Yield"
                    numberInputProps={{
                        precision: 2,
                        step: 1,
                    }}
                />
                <FormHelperText>
                    We'll use this value as a percentage.
                </FormHelperText>
            </FormControl>
        </FormModal>
    );
}
