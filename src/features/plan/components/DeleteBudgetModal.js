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
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteBudget } from "../state/budgets";

export default function BudgetDeleteModal() {
    const { onClose } = useDisclosure();
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
                            Deleting your budget...
                        </Heading>
                    </HStack>
                    <Text fontSize="md" fontWeight="medium" mt="20px">
                        Are you sure you want to delete your budget?
                    </Text>
                </ModalHeader>
                <ModalFooter gap="20px">
                    <CancelButton
                        isNonDestructive
                        onClick={() => {
                            onClose();
                            navigate("../");
                        }}
                        text="Cancel"
                    />
                    <SubmitButton
                        text="Delete budget"
                        isDestructive
                        onClick={() => {
                            dispatch(deleteBudget());
                            onClose();
                            navigate("/plan");
                        }}
                    />
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
