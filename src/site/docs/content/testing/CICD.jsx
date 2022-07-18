import { Prose } from "@nikolovlazar/chakra-ui-prose";

const code = `
<h1>Continuous Integration (CI)</h1>
<p>
    Section to be completed.
</p>

<h2>Continuous Deployment (CD)</h2>
<p>
    Section to be completed.
</p>
`;

export default function CICD() {
    return <Prose dangerouslySetInnerHTML={{ __html: code }} />;
}
