import { Prose } from "@nikolovlazar/chakra-ui-prose";

const code = `
<h1>User Testing</h1>

<h2>Changes from Findings</h2>
<h3>Language</h3>
<p>
    Some of our users found some of the terminology used in the application
    to be confusing.
</p>
<p>
    For example, our use of "accounts" to refer to a user's bank accounts
    conflicted with our duplicate use of "account" to refer to their own
    DollarPlanner account.
</p>
<p>
    <strong>
        Outcome: We replaced our use of "account" to mean
        the user account with the phrase "user account" or "DollarPlanner account".
    </strong>
</p>

<h3>Dark Mode Icon</h3>
<a href="https://drive.google.com/uc?id=1ER4MSBALLv4obfsu4CL8EpFwGLCxKLjQ">
    <img src="https://drive.google.com/uc?id=1ER4MSBALLv4obfsu4CL8EpFwGLCxKLjQ" alt="various dark mode icons">
</a>
<p>
    Some of our testers (especially more senior ones) found the the rightmost icon for the dark mode toggle 
    to be unintuitive.
</p>
<p>
    <strong>
        Outcome: We changed the dark mode toggle icon to the sun and moon icons.
    </strong>
</p>

<h3>Decimal Precision</h3>
<p>
    We initially set all of our decimal precision to 2 places, but we found that some of our users
    wanted to add assets with more precision, like Bitcoin, where 0.001 BTC is a non-negligible amount.
</p>
<p>
    <strong>
        Outcome: We increased the precision of non-monetary values to 4 decimal places.
    </strong>
</p>

<h3>Cards</h3>
<a href="https://drive.google.com/uc?id=1Etl9G8453rcjjKbG0mBVrtAOPJhN7HiZ">
    <img src="https://drive.google.com/uc?id=1Etl9G8453rcjjKbG0mBVrtAOPJhN7HiZ" alt="no transactions card">
</a>
<p>
    Our initial design for this had the button "Go to account" to guide the user to the account page
    where they could add transactions and more, but we found that users would rather be able to add transactions
    directly from the card.
</p>
<p>
    <strong>
        Outcome: We updated the card to the design you see above, and also added contrasting colors
        to distinguish the two similar buttons.
    </strong>
</p>

<h2>Other Findings</h2>
<ul>
    <li>Dislike for graphs vertically aligned to the top — resolved by vertically centering graphs.</li>
    <li>Horizontal overflow of page content due to browser CSS inconsistency — resolved by using universally supported CSS.</li>
    <li>
        Use of different devices for sign up (laptop) and email verification (phone), which meant
        the email verification screen would still show as "pending" even after the user had verified their
        account from their phone — <strong>not resolved due to lack of time and relatively involved solution versus benefit.</strong>
    </li>
    <li>
        Expectation of cards to be clickable for more details on the landing page — <strong>not resolved due to documentation
        serving the same purpose.</strong>    
    </li>
    <li>
        Wanted more details for assets and liabilities, e.g. by clicking on asset card to see more details — 
        <strong>not resolved due to lack of time</strong>, see <a href="/docs/miscellany/limitations">Limitations</a> section.  
    </li>
</ul>
`;

export default function UserTesting() {
    return <Prose dangerouslySetInnerHTML={{ __html: code }} />;
}
