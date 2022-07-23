import { Prose } from "@nikolovlazar/chakra-ui-prose";

const code = `
<h1>Limitations</h1>
<p>
    Section to be completed.
</p>

<h2>Problems Encountered</h2>
<p>
    Section to be completed.
</p>
`;

export default function Limitations() {
    return <Prose dangerouslySetInnerHTML={{ __html: code }} />;
}
