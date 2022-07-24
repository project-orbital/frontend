import { Prose } from "@nikolovlazar/chakra-ui-prose";

const code = `
<h1>Milestone II</h1>

<h2>New Features</h2>
<h3>Email Verification and Password Reset</h3>
<p>
    We improved our user authentication system with these two essential features.
    For more details, check out the <a href="/docs/architecture/authentication">Authentication</a> section.
</p>
<h3>Financial Literacy Resources</h3>
<p>
    We curated a collection of financial literacy resources for our users,
    which they can peruse in the Learn tab of the application.
</p>
<h3>Account Creation</h3>
<p>
    We let our users create accounts which we use as ledgers to record their transactions.
</p>
<p>
    These accounts mirror those of the bank accounts the user has in real life, and are distinct from the user's
    DollarPlanner account which grants them access to the application.
</p>
<p>
    We also let users give their accounts a nickname to make them easier to identify and recall their purpose.
</p>
<h3>Transaction Creation</h3>
<p>
    We let our users add their transactions to their accounts with manual data entry.
</p>
<p>
    We keep track of the transaction date, amount, balance and description.
    We don't particularly favor this form of manual data entry, so we created an experimental document parser
    to parse the transaction data from bank statements.
</p>
<p>
    For more details, check out the <a href="/docs/architecture/Parser">Parser</a> section.
</p>

<h2>WIP Features</h2>
<h3>Dark Mode</h3>
<p>
    Using the application in the dark meant getting blinded by light, so we rolled out a beta of dark mode
    application-wide.
</p>
<h3>Responsive Design</h3>
<p>
    Our application wasn't usable on mobile devices, but we made the website responsive to screen size in this beta.
</p>
<h3>Budget Planner</h3>
<p>
    We showcased a demo of how our budget planner would work, with the ability to define a budget amount
    and expenditure categories.
</p>
`;

export default function MilestoneTwo() {
    return <Prose dangerouslySetInnerHTML={{ __html: code }} />;
}
