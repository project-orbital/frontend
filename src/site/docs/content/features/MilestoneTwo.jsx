import { Prose } from "@nikolovlazar/chakra-ui-prose";

const code = `
<h1>Milestone II</h1>
<p>
    Section to be completed.
</p>
`;

export default function MilestoneTwo() {
    return <Prose dangerouslySetInnerHTML={{ __html: code }} />;
}
