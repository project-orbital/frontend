import { Prose } from "@nikolovlazar/chakra-ui-prose";

const code = `
<h1>Quick Links</h1>
<h2>Deliverables</h2>
<p>
    <a href="https://www.dollarplanner.live" target="_blank">Website</a>
</p>
<p>
    <a href="https://www.figma.com/file/YkXgEg4u2yIucCOqHw7C90/DollarPlanner?node-id=0%3A1" target="_blank">Poster</a>
</p>
<p>
    <a href="" target="_blank">Video</a>
    <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/WaZzBGcaySU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</p>
<p>
    <a href="/docs/miscellany/project-log" target="_blank">Project Log</a>
</p>

<h2>Poster</h2>
<a href="https://www.figma.com/file/YkXgEg4u2yIucCOqHw7C90/DollarPlanner?node-id=0%3A1" target="_blank">
    <img src="https://drive.google.com/uc?id=1GnuPM2DAUFdFIaPAkY5QQxSiNPx20dv8" alt="Poster" />
</a>
    
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
