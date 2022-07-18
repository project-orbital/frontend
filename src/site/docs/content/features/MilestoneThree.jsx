import { Prose } from "@nikolovlazar/chakra-ui-prose";

const code = `
<h1>Milestone III</h1>
<p>
    Section to be completed.
</p>
`;

export default function MilestoneThree() {
    return <Prose dangerouslySetInnerHTML={{ __html: code }} />;
}
