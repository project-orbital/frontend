import { Center, HStack, Image, Text, VStack } from "@chakra-ui/react";
import OrbitalLogo from "../../../common/components/assets/OrbitalLogo.jpeg";

export default function Banner() {
    return (
        <Center w="100%" pt="40px" bg="bg-light">
            <HStack>
                <Image borderRadius="full" boxSize="180px" src={OrbitalLogo} />
                <VStack px="40px">
                    <Text fontSize="4xl" fontWeight="bold">
                        An Orbital Project @ NUS School of Computing
                    </Text>
                    <Text>
                        Proudly brought to you by Huang Zhizhou & Jonathan Tay.
                    </Text>
                </VStack>
            </HStack>
        </Center>
    );
}
