import { Prose } from "@nikolovlazar/chakra-ui-prose";

const code = `
<h1>Database</h1>
<p>
    Section to be completed.
</p>
`;

export default function Database() {
    return <Prose dangerouslySetInnerHTML={{ __html: code }} />;
}
