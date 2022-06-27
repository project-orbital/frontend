import { Button, Center, useDisclosure } from "@chakra-ui/react";
import UploadModal from "../../account/components/UploadModal";
import { useState } from "react";
import ReviewModal from "../../account/components/ReviewModal";
import ConfirmCancelModal from "../../account/components/ConfirmCancelModal";

export default function UploadButton() {
    // === === ===
    // Hooks (states lifted).
    const uploadModal = useDisclosure();
    const reviewModal = useDisclosure();
    const confirmCancelModal = useDisclosure();
    const [files, setFiles] = useState([]);

    return (
        <>
            <Center w="100%">
                <Button h="60px" w="100%" onClick={uploadModal.onOpen}>
                    Upload bank statements
                </Button>
                <UploadModal
                    uploadModal={uploadModal}
                    reviewModal={reviewModal}
                    files={files}
                    setFiles={setFiles}
                />
                <ReviewModal
                    uploadModal={uploadModal}
                    reviewModal={reviewModal}
                    confirmCancelModal={confirmCancelModal}
                    files={files}
                    setFiles={setFiles}
                />
                <ConfirmCancelModal
                    modal={confirmCancelModal}
                    action={() => {
                        reviewModal.onClose();
                        setFiles([]);
                    }}
                />
            </Center>
        </>
    );
}
