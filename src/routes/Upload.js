import {Button, Center, useDisclosure} from "@chakra-ui/react";
import UploadModal from "../components/parser/UploadModal";
import {useState} from "react";
import ReviewModal from "../components/parser/ReviewModal";
import ConfirmCancelModal from "../components/parser/ConfirmCancelModal";

export default function Upload() {
    // === === ===
    // Hooks (states lifted).
    const uploadModal = useDisclosure();
    const reviewModal = useDisclosure();
    const confirmCancelModal = useDisclosure();
    const [files, setFiles] = useState([]);

    return <>
        <Center h="100vh" w="100vw">
            <Button h="60px" onClick={uploadModal.onOpen}>Upload bank statements</Button>
            <UploadModal
                uploadModal={uploadModal}
                reviewModal={reviewModal}
                files={files}
                setFiles={setFiles}/>
            <ReviewModal
                uploadModal={uploadModal}
                reviewModal={reviewModal}
                confirmCancelModal={confirmCancelModal}
                files={files}
                setFiles={setFiles}/>
            <ConfirmCancelModal modal={confirmCancelModal} action={() => {
                reviewModal.onClose();
                setFiles([]);
            }}/>
        </Center>
    </>
}
