import Modal from "../../../../common/components/Modal";
import { Image, Text, VStack } from "@chakra-ui/react";
import DBS from "../../assets/dbs.png";

export default function DisclaimerModal() {
    return (
        <Modal
            hasBackButton
            title="Experimental feature!"
            heading="If the app crashes, clear your browser's cache and offline data, then refresh the page."
            subheading="We've done extensive testing to ensure the parser fails gracefully instead of crashing, but unlike text, bank statements are a very uncontrollable input."
            cancelText="Back to safety"
            submitText="Continue"
            submitLink="../upload-files"
        >
            <VStack align="start">
                <Text>
                    Currently we only support statements from the following
                    banks:
                </Text>
                <Image src={DBS} height="100px" objectFit="contain" />
                <Text fontWeight="bold" pt="20px">
                    To reiterate, if the app crashes, clear your browser's cache
                    and offline data, then refresh the page.
                </Text>
                <Text>
                    We've done extensive testing to ensure the parser fails
                    gracefully instead of crashing, but unlike text, bank
                    statements are a very uncontrollable input.
                </Text>
            </VStack>
        </Modal>
    );
}
