import {Box, FormControl, Heading, Input, Text, VStack} from "@chakra-ui/react";

/**
 * This component is a "fake" form in the sense that we're not actually using react-hook-form,
 * and rather just using a form input to grab the file(s) and save it in state.
 * There's probably a way to use react-hook-form but using state is easier to understand.
 *
 * @param files lifted state of all files currently selected
 * @param setFiles setter for the files
 */
export default function UploadForm({files, setFiles}) {
    // === === ===
    // File drag-and-drop target & click to upload.
    const FileInput = () => {
        return <FormControl>
            <Box h="100%" w="100%" p="20px" mb="20px" border="2px dashed gray" borderRadius="10px">
                <VStack p="8" align="center" spacing="1">
                    <Heading fontSize="lg" color="gray.700" fontWeight="bold">
                        {files.length < 1 ? "Drop your files here." : files.length === 1 ? "1 file selected." : `${files.length} files selected.`}
                    </Heading>
                    <Text fontWeight="light">
                        {files.length < 1 ? "Or click to upload." : "Click or drag to upload more files."}
                    </Text>
                </VStack>
                <Input
                    h="100%" w="100%" position="absolute" top="0" left="0"
                    opacity="0" // Hides the ugly "Browse" button.
                    type="file" accept=".pdf" multiple={true}
                    onChange={e => setFiles(currentFiles => [...currentFiles, ...e.target.files])}
                />
            </Box>
        </FormControl>
    };

    // === === ===
    // Form component.
    return <form>
        <VStack gap="20px">
            <FileInput name="file"/>
        </VStack>
    </form>
}
