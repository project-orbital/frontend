import { Route, Routes } from "react-router-dom";
import Introduction from "./content/Introduction";
import DocsTemplate from "./DocsTemplate";

export default function DocsRoutes() {
    return (
        <Routes>
            <Route path="/" element={<DocsTemplate />}>
                <Route path="/" element={<Introduction />} />
            </Route>
        </Routes>
    );
}
