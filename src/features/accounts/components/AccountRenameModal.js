import {
    Heading,
    HStack,
    Modal,
    ModalBody,
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
import AccountRenameForm from "./AccountRenameForm";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function AccountRenameModal() {
    const { onClose } = useDisclosure();
    const navigate = useNavigate();

    // Grab the existing account details from the parent context instead of deriving
    // them again from the URL.
    const [id, name, nickname] = useOutletContext();

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
                            Renaming your account...
                        </Heading>
                    </HStack>
                    <Text fontSize="md" fontWeight="medium" mt="20px">
                        What would you like to call this account?
                    </Text>
                    <Text fontSize="sm" fontWeight="normal" color="gray.600">
                        The existing name and nickname have been pre-filled for
                        you.
                    </Text>
                </ModalHeader>
                <ModalBody>
                    <AccountRenameForm
                        id={id}
                        name={name}
                        nickname={nickname}
                        afterSubmit={() => {
                            onClose();
                            navigate("../");
                        }}
                    />
                </ModalBody>
                <ModalFooter gap="20px">
                    <CancelButton
                        onClick={() => {
                            onClose();
                            navigate("../");
                        }}
                        text="Cancel account renaming"
                    />
                    <SubmitButton text="Rename account" form="rename" />
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
