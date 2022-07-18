import { Prose } from "@nikolovlazar/chakra-ui-prose";

const code = `
<h1>Software Engineering Practices</h1>
<p>
    Section to be completed.
</p>
`;

export default function SWEPractices() {
    return <Prose dangerouslySetInnerHTML={{ __html: code }} />;
}
