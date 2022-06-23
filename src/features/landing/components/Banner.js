import {
    Center,
    Heading,
    HStack,
    Image,
    Spacer,
    Text,
    VStack,
} from "@chakra-ui/react";
import OrbitalLogo from "../../../common/components/assets/OrbitalLogo.jpeg";

export default function Banner(props) {
    return (
        <Center
            w="100%"
            p="1em 10%"
            justify="space-between"
            bg="gray.500"
            shadow="2xl"
        >
            <HStack>
                <Image borderRadius="full" boxSize="180px" src={OrbitalLogo} />
                <Spacer />
                <VStack>
                    <Heading fontSize="4xl">
                        An Orbital Project @ NUS School of Computing
                    </Heading>
                    <Text>
                        Proudly brought to you by Huang Zhizhou & Jonathan Tay.
                    </Text>
                </VStack>
            </HStack>
        </Center>
    );
}
