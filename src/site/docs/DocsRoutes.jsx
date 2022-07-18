import { Route, Routes } from "react-router-dom";
import Sample from "./content/Sample";
import Introduction from "./content/overview/Introduction";
import DocsTemplate from "./DocsTemplate";
import QuickLinks from "./content/overview/QuickLinks";
import TechStack from "./content/overview/TechStack";
import Authentication from "./content/architecture/Authentication";
import Parser from "./content/architecture/Parser";
import Database from "./content/architecture/Database";
import MilestoneOne from "./content/features/MilestoneOne";
import MilestoneTwo from "./content/features/MilestoneTwo";
import MilestoneThree from "./content/features/MilestoneThree";
import UIUX from "./content/design/UIUX";
import TestingStrategy from "./content/testing/TestingStrategy";
import UserTesting from "./content/testing/UserTesting";
import SWEPractices from "./content/miscellany/SWEPractices";
import Limitations from "./content/miscellany/Limitations";
import ProejctLog from "./content/miscellany/ProejctLog";

export default function DocsRoutes() {
    return (
        <Routes>
            <Route path="/" element={<DocsTemplate />}>
                <Route path="/" element={<Introduction />} />
                <Route path="overview">
                    <Route path="introduction" element={<Introduction />} />
                    <Route path="quick-links" element={<QuickLinks />} />
                    <Route path="tech-stack" element={<TechStack />} />
                </Route>
                <Route path="features">
                    <Route path="milestone-1" element={<MilestoneOne />} />
                    <Route path="milestone-2" element={<MilestoneTwo />} />
                    <Route path="milestone-3" element={<MilestoneThree />} />
                </Route>
                <Route path="architecture">
                    <Route path="authentication" element={<Authentication />} />
                    <Route path="database" element={<Database />} />
                    <Route path="parser" element={<Parser />} />
                </Route>
                <Route path="design">
                    <Route path="ui-ux" element={<UIUX />} />
                </Route>
                <Route path="testing">
                    <Route path="strategy" element={<TestingStrategy />} />
                    <Route path="user-testing" element={<UserTesting />} />
                </Route>
                <Route path="miscellany">
                    <Route path="swe-practices" element={<SWEPractices />} />
                    <Route path="limitations" element={<Limitations />} />
                    <Route path="project-log" element={<ProejctLog />} />
                </Route>
                <Route path="sample" element={<Sample />} />
            </Route>
        </Routes>
    );
}
