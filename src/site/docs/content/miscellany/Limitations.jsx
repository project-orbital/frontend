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
    We were therefore unable to improve the parser to the extent we initially intended, but we do
    agree that it is the most important feature to work on for a future release.
</p>

<h2>Portfolio</h2>

<h3>3rd Party APIs</h3>
<p>
    We originally planned to utilize APIs from third-party services such as IEX to fetch asset data,
    primarily the asset prices which are used in the portfolio page.
</p>
<p>
    We think that this is one of the more important features of the portfolio as it reduces manual data entry,
    and so it would be a great feature for us to implement in a future release.
</p>

<h3>More Portfolio Details, Portfolio-Plan Integration</h3>
<p>
    Our released portfolio is a trimmed down version of the original portfolio we had planned.
</p>
<p>
    For example, we would like to have made the asset and liability cards clickable to view more details,
    such as past orders, and modify them. We would also like to integrate the liabilities with our budget planner
    to allow users to plan their budget around the liabilities, and reminding them to repay on time.
</p>
`;

export default function Limitations() {
    return <Prose dangerouslySetInnerHTML={{ __html: code }} />;
}
