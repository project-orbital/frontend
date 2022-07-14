import { Button } from "@chakra-ui/react";
import { BsFillCaretLeftFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { deleteAllFiles } from "../../state/files";
import { useDispatch } from "react-redux";
import Modal from "../../../../common/components/Modal";

export default function ConfirmCancelModal() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // === === ===
    // Action handling.
    const handleNoCancel = () => {
        navigate("../");
    };

    const handleActualCancel = () => {
        dispatch(deleteAllFiles());
        navigate("../../");
    };

    // === === ===
    // Modal buttons.
    const NoCancelButton = () => {
        return (
            <Button
                h="60px"
                w="100%"
                colorScheme="gray"
                leftIcon={<BsFillCaretLeftFill />}
                onClick={handleNoCancel}
            >
                No, don't cancel
            </Button>
        );
    };

    const ActualCancelButton = () => {
        return (
            <Button
                h="60px"
                w="100%"
                colorScheme="red"
                onClick={handleActualCancel}
            >
                Yes, cancel upload
            </Button>
        );
    };

    // === === ===
    // Modal component.
    return (
        <Modal
            size="lg"
            title="Cancel file uploading"
            heading="Are you sure you want to cancel getting transactions from your bank statements?"
            subheading="You will lose all your current selections."
            cancelButton={<NoCancelButton />}
            submitButton={<ActualCancelButton />}
        />
    );
}
