import UploadForm from "./UploadForm";
import CancelButton from "../../../../common/components/buttons/CancelButton";
import SubmitButton from "../../../../common/components/buttons/SubmitButton";
import { useDispatch, useSelector } from "react-redux";
import { deleteAllFiles, selectFiles } from "../../state/files";
import { useNavigate } from "react-router-dom";
import Modal from "../../../../common/components/Modal";

export default function UploadModal() {
    const files = useSelector(selectFiles);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleCancel = () => {
        dispatch(deleteAllFiles);
        navigate("../../");
    };

    const handleSubmit = () => {
        navigate("../review");
    };

    return (
        <Modal
            title="Getting your transactions..."
            heading="Upload your bank statements."
            subheading="Your files will be sent to our server to parse your
                        transaction history, but we will not store them."
            cancelButton={
                <CancelButton text="Cancel upload" onClick={handleCancel} />
            }
            submitButton={
                <SubmitButton
                    onClick={handleSubmit}
                    text={`Review selected ${
                        files.left === 1 ? "file" : "files"
                    }`}
                    isDisabled={files.length < 1}
                />
            }
        >
            <UploadForm />
        </Modal>
    );
}
