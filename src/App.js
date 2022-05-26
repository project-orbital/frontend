import {VStack} from "@chakra-ui/react";
import Header from "./components/landing/Header";
import Hero from "./components/landing/Hero";
import FeatureCard from "./components/landing/FeatureCard";
import Footer from "./components/landing/Footer";
import Copyright from "./components/landing/Copyright";

export default function App() {
    return <VStack h="full" w="full" spacing="0px">
        <Header/>
        <Hero
            title="Eye-catching hero header text, in two lines!"
            subtitle="Hero description goes here, it’ll probably
            run longer so that it takes up more than one line. In fact, it might even span three lines!"
        />
        <VStack p="50px 25%" bg="white" spacing="25px">
            <FeatureCard/>
            <FeatureCard/>
            <FeatureCard/>
        </VStack>
        <Footer text="This is a work in progress."/>
        <Copyright/>
    </VStack>
}
