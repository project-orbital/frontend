import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text} from "@chakra-ui/react";
import UploadForm from "./UploadForm";
import {BsFillCaretRightFill} from "react-icons/bs";

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
    // Modal buttons (integrated with form handling).
    const CancelButton = () => {
        return <Button h="60px" w="100%" colorScheme="red"
                       onClick={handleCancel}>
            Cancel upload
        </Button>
    }

    const SubmitButton = () => {
        return <Button type="submit" h="60px" w="100%" colorScheme="gray" rightIcon={<BsFillCaretRightFill/>}
                       onClick={handleSubmit}
                       isDisabled={files.length < 1}>
            {`Review selected ${files.length === 1 ? "file" : "files"}`}
        </Button>
    }

    // === === ===
    // Modal component.
    return <Modal
        onClose={uploadModal.onClose}
        isOpen={uploadModal.isOpen}
        closeOnOverlayClick={false}
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
                <CancelButton/>
                <SubmitButton/>
            </ModalFooter>
        </ModalContent>
    </Modal>
}
