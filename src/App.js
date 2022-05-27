import {VStack} from "@chakra-ui/react";
import Header from "./components/landing/Header";
import Hero from "./components/landing/Hero";
import FeatureCard from "./components/landing/FeatureCard";
import Footer from "./components/landing/Footer";
import Copyright from "./components/landing/Copyright";
import {faker} from "@faker-js/faker";

export default function App() {
    return <VStack h="full" w="full" spacing="0px">
        <Header/>
        <Hero
            title="Eye-catching call to action, in two lines!"
            subtitle={faker.lorem.sentences(2)}
        />
        <VStack p="50px 25%" bg="white" spacing="25px">
            <FeatureCard/>
            <FeatureCard/>
            <FeatureCard/>
        </VStack>
        <Footer text="This is entire page is a work in progress. Stay tuned!"/>
        <Copyright/>
    </VStack>
}
