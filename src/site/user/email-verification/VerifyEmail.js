import { Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import PageTemplate from "../../../common/components/PageTemplate";

export default function VerifyEmail() {
    const navigate = useNavigate();
    const toast = useToast();
    const { userId, uniqueString } = useParams();

    useEffect(() => {
        function errorToast() {
            toast({
                title: "Something went wrong.",
                description:
                    "We couldn't verify your email. Please check your have the correct link and try again.",
                status: "error",
                duration: null,
                isClosable: false,
            });
        }

        axios
            .post(`${process.env.REACT_APP_BACKEND}/verify`, {
                userId: userId,
                uniqueString: uniqueString,
            })
            .catch(() => errorToast())
            .then((res) => {
                if (res.status === 200) {
                    toast.closeAll();
                    navigate("/email-verified");
                }
            });
    });

    return (
        <PageTemplate variant="auth" heading="Verifying your email...">
            <Text
                fontSize={["xl", null, "2xl", null, "3xl"]}
                fontWeight="medium"
                color="fg"
            >
                Please give us a moment while we verify your email.
            </Text>
            <Text fontSize={["sm", null, "md", null, "lg"]} color="fg">
                You will be redirected to a new page when your email has been
                verified.
            </Text>
        </PageTemplate>
    );
}
