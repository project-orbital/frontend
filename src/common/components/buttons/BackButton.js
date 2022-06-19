import { IconButton } from "@chakra-ui/react";
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function BackButton() {
    const navigate = useNavigate();

    return (
        <IconButton
            aria-label="Back"
            icon={<IoChevronBack />}
            mr="10px"
            onClick={() => navigate(-1)}
        />
    );
}
