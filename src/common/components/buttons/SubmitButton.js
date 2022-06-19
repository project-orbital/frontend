import { Button } from "@chakra-ui/react";
import { BsFillCaretRightFill } from "react-icons/bs";

export default function SubmitButton({ onClick, text, form, isDisabled }) {
    return (
        <Button
            type="submit"
            h="60px"
            w="100%"
            colorScheme="gray"
            rightIcon={<BsFillCaretRightFill />}
            onClick={onClick}
            form={form}
            isDisabled={isDisabled || false}
        >
            {text || "Submit"}
        </Button>
    );
}
