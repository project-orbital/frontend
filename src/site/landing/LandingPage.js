import Hero from "./components/Hero";
import Features from "./components/Features";
import Copyright from "./components/Copyright";
import About from "./components/About";
import { VStack } from "@chakra-ui/react";
import Navbar from "../../common/components/navbar/Navbar";

export default function LandingPage() {
    return (
        <VStack spacing="0" bg="bg">
            <Navbar isFloating hasSignInButton hasSignUpButton />
            <VStack minH="100vh" spacing="0" pt="max(90px, 5%)">
                <Hero />
                <Features />
                <About />
                <Copyright />
            </VStack>
        </VStack>
    );
}
