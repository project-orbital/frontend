import {
    Heading,
    HStack,
    Modal,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import CancelButton from "../../../common/components/buttons/CancelButton";
import SubmitButton from "../../../common/components/buttons/SubmitButton";
import BackButton from "../../../common/components/buttons/BackButton";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteAccount } from "../state/accounts";

export default function AccountDeleteModal() {
    const { onClose } = useDisclosure();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Grab the existing account ID from the parent context instead of deriving
    // it again from the URL.
    const [id] = useOutletContext();

    return (
        <Modal
            onClose={onClose}
            isOpen
            isCentered
            size="xl"
            motionPreset="slideInBottom"
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <HStack align="center">
                        <BackButton />
                        <Heading as="h3" size="md">
                            Deleting your account...
                        </Heading>
                    </HStack>
                    <Text fontSize="md" fontWeight="medium" mt="20px">
                        Are you absolutely sure you want to delete your account?
                    </Text>
                    <Text fontSize="sm" fontWeight="normal" color="gray.600">
                        This action cannot be undone.
                    </Text>
                </ModalHeader>
                <ModalFooter gap="20px">
                    <CancelButton
                        onClick={() => {
                            onClose();
                            navigate("../");
                        }}
                        text="Cancel account deletion"
                    />
                    <SubmitButton
                        text="Delete account"
                        onClick={() => {
                            dispatch(deleteAccount(id));
                            onClose();
                            navigate("/accounts");
                        }}
                    />
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
