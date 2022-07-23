import { Prose } from "@nikolovlazar/chakra-ui-prose";

const code = `
<h1>Quick Links</h1>
<h2>Deliverables</h2>
<p>
    <a href="" target="_blank">Poster</a>
</p>
<p>
    <a href="" target="_blank">Video</a>
</p>
<p>
    <a href="" target="_blank">Project Log</a>
</p>
<h2>Source Code</h2>
<p>
    We use GitHub to host our source code, which is split into 3 repositories
    under a single organization.
</p>
<p>
    View our 
        <a href="https://github.com/project-orbital/frontend" target="_blank">frontend</a>, our 
        <a href="https://github.com/project-orbital/backend" target="_blank">backend</a>, and our 
        <a href="https://github.com/project-orbital/parser" target="_blank">parser</a> repositories.
</p>
`;

export default function QuickLinks() {
    return <Prose dangerouslySetInnerHTML={{ __html: code }} />;
}
