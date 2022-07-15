import { useDisclosure } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import CreateBudgetForm from "./CreateBudgetForm";

export default function CreateBudgetModal() {
    const navigate = useNavigate();
    const { onClose } = useDisclosure();

    return (
        <CreateBudgetForm
            afterSubmit={() => {
                onClose();
                navigate("../");
            }}
        />
    );
}
