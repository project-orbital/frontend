import { Prose } from "@nikolovlazar/chakra-ui-prose";

const code = `
<h1>Milestone I</h1>
<p>
    Section to be completed.
</p>
`;

export default function MilestoneOne() {
    return <Prose dangerouslySetInnerHTML={{ __html: code }} />;
}
