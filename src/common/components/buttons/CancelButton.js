import { Button } from "@chakra-ui/react";

export default function CancelButton({ onClick, text }) {
    return (
        <Button
            h="60px"
            w="100%"
            colorScheme="red"
            onClick={onClick}
            transition="transform .1s"
            _hover={{
                transform: "scale(1.08)",
            }}
        >
            {text || "Cancel"}
        </Button>
    );
}
