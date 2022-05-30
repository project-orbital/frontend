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
            title="Welcome to DollarPlanner."
            subtitle="DollarPlanner is your one-stop web application to manage and analyze your multiple bank accounts,
                allowing you take charge of your personal finances!"
        />
        <VStack p="50px 25%" bg="white" spacing="25px">
            <FeatureCard
                heading="Convenient."
                body='“I never have to switch between banking apps to check how my various bank accounts are
                    doing again. DollarPlanner is very convenient.”'
                link={`- ${faker.name.findName()}, working adult.`}
            />
            <FeatureCard
                heading="Insightful."
                body='“The analyze feature provides simple yet insightful graphical breakdowns of my asset and investments!”'
                link={`- ${faker.name.findName()}, trader.`}
            />
            <FeatureCard
                heading="Budgeting."
                body='“Overspending is a recurring problem for many students like myself. I like to create and track my
                    budgeting plan on DollarPlanner as I can create plans for varying durations and understand my
                    spending patterns better.”'
                link={`- ${faker.name.findName()}, student.`}
            />
        </VStack>
        <Footer text="This is entire page is a work in progress. Stay tuned!"/>
        <Copyright/>
    </VStack>
}
