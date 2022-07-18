import { Prose } from "@nikolovlazar/chakra-ui-prose";

const code = `
<h1>Introduction</h1>
`;

export default function Introduction() {
    return <Prose dangerouslySetInnerHTML={{ __html: code }} />;
}
