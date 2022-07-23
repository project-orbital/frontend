import { IconButton } from "@chakra-ui/react";
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function BackButton({ isDisabled }) {
    const navigate = useNavigate();

    return (
        <IconButton
            aria-label="Back"
            icon={<IoChevronBack />}
            size={["sm", "md"]}
            mr={[2, 3, 4]}
            bg="dim"
            onClick={() => navigate(-1)}
            isDisabled={isDisabled || false}
        />
    );
}
