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
import { useNavigate } from "react-router-dom";
import SpendingTransactionCreationForm from "./SpendingTransactionCreationForm";
import ReceivingTransactionCreationForm from "./ReceivingTransactionCreationForm";

export default function TransactionCreationModal({ isSpending }) {
    const navigate = useNavigate();
    const { onClose } = useDisclosure();
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
                            Creating your transaction...
                        </Heading>
                    </HStack>
                    <Text fontSize="md" fontWeight="medium" mt="20px">
                        We need some details about this transaction.
                    </Text>
                    <Text fontSize="sm" fontWeight="normal" color="gray.600">
                        The transaction will be created under this account. If
                        this is incorrect, change the account and then try
                        again.
                    </Text>
                </ModalHeader>
                <ModalBody>
                    {isSpending ? (
                        <SpendingTransactionCreationForm
                            afterSubmit={() => {
                                onClose();
                                navigate("../");
                            }}
                        />
                    ) : (
                        <ReceivingTransactionCreationForm
                            afterSubmit={() => {
                                onClose();
                                navigate("../");
                            }}
                        />
                    )}
                </ModalBody>
                <ModalFooter gap="20px">
                    <CancelButton
                        onClick={() => {
                            onClose();
                            navigate("../");
                        }}
                        text="Cancel transaction creation"
                    />
                    <SubmitButton text="Create transaction" form="create" />
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
