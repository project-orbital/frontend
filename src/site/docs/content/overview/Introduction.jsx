import { Prose } from "@nikolovlazar/chakra-ui-prose";

const code = `
<h1>Introduction</h1>
<p>
    DollarPlanner aims to simplify the process of managing your finances by
    centralizing all of your financial information in one place.
</p>
<p>
    With DollarPlanner, you can easily track your expenses, plan
    a budget, and keep tabs on all your bank accounts.
</p>
<p>
    Visit us at <a href="https://www.dollarplanner.live" target="_blank"/>https://www.dollarplanner.live</a>.
</p>
<h2>Motivation</h2>
<p>
    Creating accounts at financial institutions has never been easier.
    Today, the average person has 
    <a 
        href="https://tradingeconomics.com/singapore/bank-accounts-per-1000-adults-wb-data.html"
        target="_blank"
    >
        more than 2 bank accounts.
    </a>
</p>
<p>
    Owning more accounts with different banks is a great way to reap different
    benefits and rewards, but this comes at the cost of higher cognitive load.
</p>
<p>
    To keep track of your transactions and balances, you have to go through the
    hassle of recalling your various passwords, logging into each bank account,
    and then manually consolidating your transactions in a spreadsheet.
</p>
<p>
    But what if we could do all this more efficiently, and more?
</p>
<h2>
    Solution
</h2>
<p>
    That's where DollarPlanner shines. Let manual data entry be a thing of the
    past.
</p>
<p>
    With our advanced document parser, you can easily import your transactions
    from a bank statement.
</p>
<p>
    You can also create as many accounts in DollarPlanner as you have bank 
    accounts, all under a single user account.
</p>
<p>   
    We also let you consolidate
    all your accounts and assets in a single interface, where you can analyze and
    visualize various metrics, such as your net worth and asset allocation.
</p>
`;

export default function Introduction() {
    return <Prose dangerouslySetInnerHTML={{ __html: code }} />;
}
