import {
    Heading, HStack, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure
} from '@chakra-ui/react';
import CancelButton from '../buttons/CancelButton';
import SubmitButton from '../buttons/SubmitButton';
import BackButton from '../buttons/BackButton';
import AccountCreationForm from './AccountCreationForm';
import {useNavigate} from 'react-router-dom';

export default function AccountCreationModal() {
    const navigate = useNavigate();
    const {onClose} = useDisclosure();
    return <Modal
        onClose={onClose}
        isOpen
        isCentered
        size="xl"
        motionPreset="slideInBottom"
    >
        <ModalOverlay/>
        <ModalContent>
            <ModalHeader>
                <HStack align="center">
                    <BackButton/>
                    <Heading as="h3" size="md">
                        Creating your account...
                    </Heading>
                </HStack>
                <Text fontSize="md" fontWeight="medium" mt="20px">
                    We need some details about this account.
                </Text>
                <Text fontSize="sm" fontWeight="normal" color="gray.600">
                    Accounts in DollarPlanner are ledgers used to store your transactions.
                    We will never ask for sensitive information such as your bank account password.
                </Text>
            </ModalHeader>
            <ModalBody>
                <AccountCreationForm afterSubmit={() => {
                    onClose();
                    navigate('/accounts');
                }}/>
            </ModalBody>
            <ModalFooter gap="20px">
                <CancelButton
                    onClick={() => {
                        onClose();
                        navigate('/accounts');
                    }}
                    text="Cancel account creation"
                />
                <SubmitButton
                    text="Create account"
                    form="create"
                />
            </ModalFooter>
        </ModalContent>
    </Modal>;
}
