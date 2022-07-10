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
import CreateBudgetForm from "./CreateBudgetForm";

export default function CreateBudgetModal() {
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
                            Set your budget
                        </Heading>
                    </HStack>
                    <Text fontSize="md" fontWeight="medium" mt="20px">
                        hello!
                    </Text>
                </ModalHeader>
                <ModalBody>
                    <CreateBudgetForm
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
                            navigate("/plan");
                        }}
                        text="Cancel"
                    />
                    <SubmitButton text="Create budget" form="create-budget" />
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
