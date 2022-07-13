import { Box, FormControl, Input, Text, VStack } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { addFiles, selectFiles } from "../state/files";

/**
 * This component is a "fake" form in the sense that we're not actually using react-hook-form,
 * and rather just using a form input to grab the file(s) and save it in state.
 * There's probably a way to use react-hook-form but using state is easier to understand.
 */
export default function UploadForm() {
    const files = useSelector(selectFiles);
    const dispatch = useDispatch();

    // === === ===
    // File drag-and-drop target & click to upload.
    const FileInput = () => {
        return (
            <FormControl>
                <Box
                    h="100%"
                    w="100%"
                    p="20px"
                    mb="20px"
                    border="2px dashed gray"
                    borderRadius="10px"
                >
                    <VStack p="8" align="center" spacing="1">
                        <Text fontSize="lg" fontWeight="bold">
                            {files.length < 1
                                ? "Drop your files here."
                                : files.length === 1
                                ? "1 file selected."
                                : `${files.length} files selected.`}
                        </Text>
                        <Text fontWeight="light">
                            {files.length < 1
                                ? "Or click to upload."
                                : "Click or drag to upload more files."}
                        </Text>
                    </VStack>
                    <Input
                        h="100%"
                        w="100%"
                        position="absolute"
                        top="0"
                        left="0"
                        opacity="0" // Hides the ugly "Browse" button.
                        type="file"
                        accept=".pdf"
                        multiple={true}
                        onChange={(e) => dispatch(addFiles(e.target.files))}
                    />
                </Box>
            </FormControl>
        );
    };

    // === === ===
    // Form component.
    return (
        <form>
            <VStack gap="20px">
                <FileInput name="file" />
            </VStack>
        </form>
    );
}
