import {
    Button,
    Heading,
    HStack,
    Modal,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text
} from "@chakra-ui/react";
import {BsFillCaretLeftFill} from "react-icons/bs";

export default function ConfirmCancelModal({modal, action}) {
    // === === ===
    // Action handling.
    const handleNoCancel = () => {
        modal.onClose();
    }

    const handleActualCancel = () => {
        modal.onClose();
        action();
    }

    // === === ===
    // Modal buttons.
    const NoCancelButton = () => {
        return <Button h="60px" w="100%" colorScheme="gray" leftIcon={<BsFillCaretLeftFill/>}
                       onClick={handleNoCancel}>
            No, don't cancel
        </Button>
    }

    const ActualCancelButton = () => {
        return <Button h="60px" w="100%" colorScheme="red"
                       onClick={handleActualCancel}>
            Yes, cancel upload
        </Button>
    }

    // === === ===
    // Modal component.
    return <>
        <Modal
            isCentered
            onClose={modal.onClose}
            isOpen={modal.isOpen}
            closeOnOverlayClick={false}
            scrollBehavior="inside"
            size="md"
            motionPreset="slideInBottom"
        >
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>
                    <HStack align="center">
                        <Heading as="h3" size="md" fontWeight="semibold">
                            Cancel file uploading
                        </Heading>
                    </HStack>
                    <Text fontSize="md" fontWeight="medium" mt="20px">
                        Are you sure you want to cancel getting the transactions from your bank statements?
                    </Text>
                    <Text fontSize="sm" fontWeight="normal" color="gray.600">
                        You will lose all your current selections.
                    </Text>
                </ModalHeader>
                <ModalFooter mt="20px" gap="20px">
                    <NoCancelButton/>
                    <ActualCancelButton/>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </>
}
