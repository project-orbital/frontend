import { Prose } from "@nikolovlazar/chakra-ui-prose";

const code = `
<h1>Limitations</h1>

<h2>Parser</h2>
<p>
    We didn't manage to implement an improved parser as promised.
</p>
<p>
    The two of us together have a limited sample of bank statements from DBS, OCBC, and Standard Chartered
    which is insufficient for catching edge cases that we otherwise could with more samples to test on.
</p>
<p>
    We considered crowd-sourcing more bank statements (not from strangers, but from people who could trust us with their data),
    but people are understandably reluctant to share such sensitive data.
</p>
    It also proved too cumbersome to manually redact these bank statements before sharing them with us.
    Seriously, who thought putting uncensored credit card numbers in unencrypted bank statements was a good idea?
</p>
<p>
    We were therefore unable to improve the parser to the extent we initially intended.
</p>
`;

export default function Limitations() {
    return <Prose dangerouslySetInnerHTML={{ __html: code }} />;
}
