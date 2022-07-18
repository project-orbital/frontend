import { Prose } from "@nikolovlazar/chakra-ui-prose";

const code = `
<h1>Testing Strategy</h1>
<p>
    Section to be completed.
</p>
`;

export default function TestingStrategy() {
    return <Prose dangerouslySetInnerHTML={{ __html: code }} />;
}
