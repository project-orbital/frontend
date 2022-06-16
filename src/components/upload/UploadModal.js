import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text} from "@chakra-ui/react";
import UploadForm from "./UploadForm";
import CancelButton from "../buttons/CancelButton";
import SubmitButton from "../buttons/SubmitButton";

export default function UploadModal({uploadModal, reviewModal, files, setFiles}) {
    // === === ===
    // Form handling.
    const handleCancel = () => {
        setFiles([]);
        uploadModal.onClose();
    }

    const handleSubmit = () => {
        uploadModal.onClose();
        reviewModal.onOpen();
    }

    // === === ===
    // Modal component.
    return <Modal
        onClose={uploadModal.onClose}
        isOpen={uploadModal.isOpen}
        closeOnOverlayClick={false}
        isCentered
        size="xl"
        motionPreset="slideInBottom"
    >
        <ModalOverlay/>
        <ModalContent>
            <ModalHeader>
                Getting your transactions...
                <Text mt="20px" fontSize="md" fontWeight="medium">
                    Upload your bank statements.
                </Text>
                <Text fontSize="sm" fontWeight="normal" color="gray.600">
                    Your files will be sent to our server to parse your transaction history, but we will not store them.
                </Text>
            </ModalHeader>
            <ModalBody>
                <UploadForm files={files} setFiles={setFiles}/>
            </ModalBody>
            <ModalFooter gap="20px">
                <CancelButton
                    text='Cancel upload'
                    onClick={handleCancel}
                />
                <SubmitButton
                    onClick={handleSubmit}
                    text={`Review selected ${files.length === 1 ? "file" : "files"}`}
                    isDisabled={files.length < 1}
                />
            </ModalFooter>
        </ModalContent>
    </Modal>
}
