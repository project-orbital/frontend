import {Button} from "@chakra-ui/react";

export default function CancelButton({onClick, text}) {
    return <Button
        h="60px"
        w="100%"
        colorScheme="red"
        onClick={onClick}
    >
        {text || 'Cancel'}
    </Button>
}
