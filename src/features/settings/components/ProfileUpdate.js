import FormModal from "../../../common/components/form/FormModal";
import * as Yup from "yup";
import FormTextField from "../../../common/components/form/FormTextField";
import { HStack, useToast } from "@chakra-ui/react";
import ky from "ky";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfileUpdate() {
    const navigate = useNavigate();
    const toast = useToast();
    const [profile, setProfile] = useState();

    // Fetch profile data to pre-fill the form.
    useEffect(() => {
        async function fetchProfile() {
            try {
                const response = await ky
                    .get(
                        `${process.env.REACT_APP_BACKEND}/users/preferences/user-profile`,
                        { credentials: "include" }
                    )
                    .json();
                setProfile(response);
            } catch (error) {
                setProfile({
                    firstName: "",
                    lastName: "",
                    username: "",
                    email: "",
                });
            }
        }
        fetchProfile();
    }, []);

    const handleSubmit = async (values, { setErrors }) => {
        try {
            await ky.patch(
                `${process.env.REACT_APP_BACKEND}/users/preferences/user-profile`,
                {
                    json: values,
                    credentials: "include",
                }
            );
            toast.closeAll();
            toast({
                title: "Profile updated successfully.",
                status: "success",
                isClosable: true,
            });
            navigate("../");
        } catch (error) {
            setErrors(await error.response.json());
            toast({
                title: "Profile update failed.",
                description: "Please try again.",
                status: "error",
                isClosable: true,
            });
        }
    };

    return (
        <FormModal
            title="Updating your profile..."
            heading="Any changes here will take effect immediately."
            subheading="Your existing profile information has been pre-filled for you."
            cancelText="Cancel profile update"
            submitText="Update profile"
            initialValues={profile}
            validationSchema={Yup.object({
                firstName: Yup.string()
                    .max(99, "First name is too long.")
                    .matches(
                        /^[A-Za-z ]+$/,
                        "Only letters and spaces are allowed."
                    )
                    .required("First name is required."),
                lastName: Yup.string()
                    .max(99, "Last name is too long.")
                    .matches(
                        /^[A-Za-z ]+$/,
                        "Only letters and spaces are allowed."
                    )
                    .required("Last name is required."),
                username: Yup.string()
                    .max(99, "Username is too long.")
                    .required("Username is required."),
                email: Yup.string()
                    .email("Invalid email address.")
                    .required("Email is required."),
            })}
            onSubmit={handleSubmit}
        >
            <HStack align="start" spacing="20px">
                <FormTextField
                    id="firstName"
                    isRequired
                    withErrorMessage
                    labelText="First name"
                    placeholderText="John"
                />
                <FormTextField
                    id="lastName"
                    isRequired
                    withErrorMessage
                    labelText="Last name"
                    placeholderText="Doe"
                />
            </HStack>
            <FormTextField
                id="email"
                isRequired
                isDisabled
                w="75%"
                withErrorMessage
                labelText="Email"
                placeholderText="someone@example.com"
                helperText="Email addresses cannot be changed at the moment."
            />
            <FormTextField
                id="username"
                isRequired
                w="50%"
                withErrorMessage
                labelText="Username"
                placeholderText="john_doe"
            />
        </FormModal>
    );
}
