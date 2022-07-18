import { Prose } from "@nikolovlazar/chakra-ui-prose";

const code = `
<h1>Project Log</h1>
<h2>Jonathan</h2>
<p>
    Section to be completed.
</p>

<h2>Zhizhou</h2>
<p>
    Section to be completed.
</p>
`;

export default function ProejctLog() {
    return <Prose dangerouslySetInnerHTML={{ __html: code }} />;
}
