import { Route, Routes } from "react-router-dom";
import Sample from "./content/Sample";
import Introduction from "./content/Introduction";
import DocsTemplate from "./DocsTemplate";

export default function DocsRoutes() {
    return (
        <Routes>
            <Route path="/" element={<DocsTemplate />}>
                <Route path="/" element={<Introduction />} />
                <Route path="sample" element={<Sample />} />
            </Route>
        </Routes>
    );
}
