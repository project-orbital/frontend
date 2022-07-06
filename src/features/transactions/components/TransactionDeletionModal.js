import Modal from "../../../common/components/Modal";
import { Button, FormControl, Select } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    deleteTransactionWithID,
    selectTransactionsFromAccount,
} from "../state/transactions";
import { formatDistanceToNow } from "date-fns";
import { Form, Formik } from "formik";

export default function TransactionDeletionModal() {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const accountId = parseInt(params.id);
    const transactions = useSelector(selectTransactionsFromAccount(accountId));

    const SubmitButton = () => {
        return (
            <Button
                type="submit"
                form="delete-transaction"
                h="60px"
                w="100%"
                colorScheme="gray"
            >
                Delete selected transaction
            </Button>
        );
    };

    function handleSubmit(data) {
        dispatch(deleteTransactionWithID(data));
        console.log(data);
        navigate("../");
    }

    return (
        <Modal
            title="Deleting a transaction..."
            heading="Select the transaction you wish to delete."
            subheading="This action cannot be undone!"
            submitButton={<SubmitButton />}
        >
            <Formik initialValues={0} onSubmit={handleSubmit}>
                <Form id="delete-transaction">
                    <FormControl>
                        <Select placeholder="Select option">
                            {transactions.map((tx) => (
                                <option key={tx.id} value={tx.id}>{`#${
                                    tx.id
                                }: ${tx.description} ${formatDistanceToNow(
                                    tx.date,
                                    {
                                        addSuffix: true,
                                    }
                                )}`}</option>
                            ))}
                        </Select>
                    </FormControl>
                </Form>
            </Formik>
        </Modal>
    );
}
