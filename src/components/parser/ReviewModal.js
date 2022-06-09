import {
    Button,
    Checkbox,
    CheckboxGroup,
    FormControl,
    Heading,
    HStack,
    IconButton,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text
} from "@chakra-ui/react";
import {BsFillCaretRightFill} from "react-icons/bs";
import {IoChevronBack} from "react-icons/io5";
import {Controller, useForm} from "react-hook-form";

export default function ReviewModal({uploadModal, reviewModal, confirmCancelModal, files}) {
    // === === ===
    // Hooks.
    const {
        register,
        handleSubmit,
        control,
    } = useForm();

    // === === ===
    // Form buttons (integrated with the modal).
    const BackButton = () => {
        return <IconButton aria-label="Back to uploading"
                           icon={<IoChevronBack/>} mr="10px"
                           onClick={handleBack}/>
    }

    const CancelButton = () => {
        return <Button h="60px" w="100%" colorScheme="red"
                       onClick={handleCancel}>
            Cancel upload
        </Button>
    }

    const SubmitButton = () => {
        return <Button type="submit" h="60px" w="100%" colorScheme="gray" rightIcon={<BsFillCaretRightFill/>}
                       isDisabled={files.length < 1}>
            {`Upload ${files.length} selected ${files.length === 1 ? "file" : "files"}`}
        </Button>
    }

    // === === ===
    // Form handling.
    const handleBack = () => {
        uploadModal.onOpen();
        reviewModal.onClose();
    }

    const handleCancel = () => {
        confirmCancelModal.onOpen();
    }

    const handleSubmitButton = (data) => {
        // TODO: Send a POST request with the data.
        console.log("submitted")
        console.log(data);
        reviewModal.onClose();
    }

    // === === ===
    // Model sub-components.
    const CustomHeader = () => {
        return <ModalHeader>
            <HStack align="center">
                <BackButton/>
                <Heading as="h3" size="md" fontWeight="semibold">
                    Getting your transactions...
                </Heading>
            </HStack>
            <Text fontSize="md" fontWeight="medium" mt="20px">
                Confirm the statements you wish to upload.
            </Text>
            <Text fontSize="sm" fontWeight="normal" color="gray.600">
                If your files are password-protected, you will need to enter their passwords to decrypt
                them below.
                We will not store your passwords.
            </Text>
        </ModalHeader>
    }

    const CustomBodyFormCheckboxes = ({rest}) => {
        return <CheckboxGroup {...rest}>{
            files.map((file, index) => {
                return <Controller
                    control={control} name={file.name} key={index} defaultValue={true}
                    render={({field: {onChange, value, ref}}) => (
                        <HStack justify="space-between" gap="20px">
                            <Checkbox
                                onChange={onChange}
                                ref={ref}
                                isChecked={value}
                                spacing={"20px"}
                            >
                                <Text fontSize="sm" fontWeight="bold"
                                      mt="5px">{`#${index + 1}`}</Text>
                                <Text fontSize="xs" maxW="300px" mb="5px">{file.name}</Text>
                            </Checkbox>
                            <Input id={`pwd${index.toString()}`} size="xs"
                                   placeholder="••••••••" type="password"
                                   {...register("password")}/>

                        </HStack>
                    )}/>
            })
        }</CheckboxGroup>
    }

    const CustomBody = () => {
        return <ModalBody>
            <FormControl>
                <CustomBodyFormCheckboxes/>
            </FormControl>
        </ModalBody>
    }

    const CustomFooter = () => {
        return <ModalFooter mt="20px" gap="20px">
            <CancelButton/>
            <SubmitButton/>
        </ModalFooter>
    }

    // === === ===
    // Modal component.
    return <Modal
        onClose={reviewModal.onClose}
        isOpen={reviewModal.isOpen}
        closeOnOverlayClick={false}
        scrollBehavior="outside"
        size="xl"
        motionPreset="slideInBottom"
    >
        <ModalOverlay/>
        <ModalContent>
            <CustomHeader/>
            <form onSubmit={handleSubmit(handleSubmitButton)}>
                <CustomBody/>
                <CustomFooter/>
            </form>
        </ModalContent>
    </Modal>
}
