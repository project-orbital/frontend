import { Prose } from "@nikolovlazar/chakra-ui-prose";

const code = `
<h1>User Interface (UI)</h1>
<p>
    Section to be completed.
</p>

<h2>User Experience (UX)</h2>
<p>
    Section to be completed.
</p>
`;

export default function UIUX() {
    return <Prose dangerouslySetInnerHTML={{ __html: code }} />;
}
