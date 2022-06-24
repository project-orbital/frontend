import { VStack } from "@chakra-ui/react";
import Hero from "./components/Hero";
import Header from "./components/Header";
import Features from "./components/Features";
import Copyright from "./components/Copyright";
import About from "./components/About";

export default function LandingPage() {
    return (
        <VStack spacing="0">
            <Header />
            <VStack
                w="100%"
                pt="90px"
                h="calc(100vh - 90px)"
                bg="bg"
                spacing="0"
            >
                <Hero />
                <Features />
                <About />
                <Copyright />
            </VStack>
        </VStack>
    );
}
