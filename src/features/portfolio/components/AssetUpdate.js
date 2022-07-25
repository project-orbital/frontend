import FormModal from "../../../common/components/form/FormModal";
import * as Yup from "yup";
import { useReadAssetQuery, useUpdateAssetMutation } from "../../../app/api";
import { useNavigate, useParams } from "react-router-dom";
import { FormControl, FormHelperText, useToast } from "@chakra-ui/react";
import {
    InputControl,
    NumberInputControl,
    SelectControl,
} from "formik-chakra-ui";

export default function AssetUpdate() {
    const { assetId } = useParams();
    const { data: asset, isLoading, isError } = useReadAssetQuery(assetId);
    const [updateAsset] = useUpdateAssetMutation();
    const navigate = useNavigate();
    const toast = useToast();

    if (isLoading) {
        return null;
    }
    if (isError) {
        return null;
    }

    async function handleSubmit(values, { setErrors }) {
        try {
            toast.closeAll();
            await updateAsset({
                id: assetId,
                ...values,
                yield: values.yield === "" ? 0 : values.yield,
            }).unwrap();
            toast({
                title: "Asset updated.",
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
            title="Editing asset records..."
            heading={`What do you wish to update for ${asset.name}?`}
            subheading="The existing asset information has been pre-filled for you."
            cancelText={`Cancel update`}
            submitText={`Update asset`}
            initialValues={{
                name: asset.name,
                symbol: asset.symbol,
                category: asset.category,
                price: asset.price,
                yield: asset.yield,
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
