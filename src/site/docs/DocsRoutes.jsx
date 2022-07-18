import { Route, Routes } from "react-router-dom";
import Sample from "./content/Sample";
import Introduction from "./content/overview/Introduction";
import DocsTemplate from "./DocsTemplate";
import QuickLinks from "./content/overview/QuickLinks";
import TechStack from "./content/overview/TechStack";
import Authentication from "./content/architecture/Authentication";
import Parser from "./content/architecture/Parser";
import Database from "./content/architecture/Database";

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
                <Route path="architecture">
                    <Route path="authentication" element={<Authentication />} />
                    <Route path="database" element={<Database />} />
                    <Route path="parser" element={<Parser />} />
                </Route>
                <Route path="sample" element={<Sample />} />
            </Route>
        </Routes>
    );
}
