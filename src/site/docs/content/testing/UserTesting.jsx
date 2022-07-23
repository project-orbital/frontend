import { Prose } from "@nikolovlazar/chakra-ui-prose";

const code = `
<h1>User Testing</h1>
<p>
    Section to be completed.
</p>
`;

export default function UserTesting() {
    return <Prose dangerouslySetInnerHTML={{ __html: code }} />;
}
