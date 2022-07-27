import { Prose } from "@nikolovlazar/chakra-ui-prose";

const code = `
<h1>Milestone III</h1>

<h2>TL;DR</h2>
<ul>
    <li><strong>[Portfolio]</strong> You can now record your assets and liabilities in the Portfolio tab.</li>
    <li><strong>[Plan]</strong> You can now plan a budget in the Plan tab.</li>
    <li><strong>[Learn]</strong> You can now publicly share links to financial literacy resources with the community in the Learn tab.</li>
    <li><strong>[Settings]</strong> You can now delete your account and/or your data, and change your username/password/etc. in the Settings tab.</li>
    <li><strong>[Data Synchronization]</strong> You can now use DollarPlanner across all your devices — your data will be there. </li>
    <li><strong>[Responsive Design]</strong> You can now use DollarPlanner on any device, regardless of screen size.</li>
    <li><strong>[Going Forward]</strong> Please read our <a href="/docs/miscellany/limitations/">Limitations</a> section for our assessment of features for future releases.</li>
</ul>

<h2>Changes from Feedback</h2>
<p>
    @Diamond Hands, Crowded Cow, Budgie, modtree, and our adviser Rayner:
</p>
<p>
    Thanks for your feedback and comments on the previous release!
    We'd like to address the following suggestions:
</p>
<blockquote>
    [Account] balance could be different after another transaction.</br> - Diamond Hands</br></br>
    Seems like an interesting decision to ask the user to record the balance in their bank account after every transaction, would be good to elaborate on why such a decision was made.</br> - Rayner
</blockquote>
<p>
    We've updated the accounts to automatically compute your balance for each transaction, as long as one transaction has a balance specified.</li>
</p>
<blockquote>
    The poster is simple, but should have more detail on how the tech stacks are used.</br> - Crowded Cow
</blockquote>
<p>
    We've updated documentation with this information.
    Check out the new <a href="/docs/overview/tech-stack">tech stack</a> section.
</p>
<blockquote>
    There doesn't seem to be any way to parse a pdf file after building the rust project.</br> - modtree
</blockquote>
<p>
    The parser actually takes in a string of text extracted by the backend, so the Rust project
    doesn't handle any PDF files directly. We looked into several pdf crates, but all of them are either
    severely lacking in documentation (pdf), or too low level (lopdf).
</p>
<blockquote>
    Do note that the mode resets upon refreshing the page so you might want to store the state in the localstorage or profile data.</br> - Rayner
</blockquote>
<p>
    We've updated the dark mode toggle in Settings to store a user's dark mode preference in the database, which is then
    retrieved after signing in. We rely on Chakra UI's color mode hook for persistence between page refreshes and tabs
    on the website.
</p>

<h2>New Features</h2>

<h3>Assets and Liabilities</h3>
<blockquote>
    TL;DR: You can now record your assets and liabilities in the Portfolio tab, and view your asset allocation on the dashboard.</br>
</blockquote>
<p>
    We've updated our Portfolio page to allow you to record assets and liabilities.
</p>
<p>
    Buy and sell orders can also be recorded for each asset, giving you greater insight into each of your assets
    with stats such as your average purchase price for an asset.
</p>
<p>
    Asset classes are also a great way to group relevant assets together, and we take this information to the dashboard,
    where your asset allocation is shown in a pie chart.
</p>
<p>
    You can also record your repayments of your outstanding liabilities to track your progress toward eliminating them.
</p>

<h3>Improved Budgeting</h3>
<blockquote>
    TL;DR: You can now use our Budget Planner in the Plan tab.
</blockquote>
<p>
All of us know the importance of budget planning. A user can set a timeframe and a budgeted amount to create a budget plan. 
For Milestone 3, made two key improvements for this feature.
</p>
<p>
We fully utilise visual aids (circular progress bar, pie chart & table) to present relevant information neatly to the user.
</p>
<p>
Do you have to create spending transactions for the budget planner? Nope. 
Your spending transactions across all the accounts you have in DollarPlanner will be imported here 
and used to track your budget.
</p>

<h3>Community-contributed Financial Resources</h3>
<blockquote>
    TL;DR: You can now publicly share links to financial literacy resources with the community in the Learn tab.
</blockquote>
<p>
This is a feature that we are very excited about because users can have excellent resources on financial literacy that they want to share! 
</p>
<p>
To do so, they simply have to submit a form and the page will be updated with the post.
</p>
<p>
On top of that, we have implemented Like, Unlike and Report functionalities that make the feature more complete.
</p>

<h3>Data Synchronization</h3>
<blockquote>
    TL;DR: You can now use DollarPlanner across all your devices.
</blockquote>
<p>
    We needed a way for our users to use DollarPlanner across multiple devices.
</p>
<p>
    Any changes made on one device should be be reflected on all their devices.
    This meant that we have to store user data in our database and not just <tt>localStorage</tt>.
</p>
<p>
    But this comes at the cost of privacy, which we value, and we know some of our users will too.
</p>
<p>
    To that end, we elected to let our users delete their account data anytime they want.
    More on that next.
</p>

<h3>Account and Data Management</h3>
<blockquote>
    TL;DR: You can now delete your account and/or your data, and change your username/password.
</blockquote>
<p>
    Not everyone will use DollarPlanner forever. Consequently, we let our users delete their DollarPlanner
    account at any time.
</p>
<p>
    Or, perhaps, users may no longer want to store their data in our database, and want to delete it.
    We let them do this, erasing their data from our database thoroughly and permanently.
</p>
<p>
    As a bonus, users can now edit their profile information, e.g. username, and change their password from
    within the application.
</p>

<h3>Settings</h3>
<blockquote>
    TL;DR: You can now go to Settings to toggle dark mode, data synchronization, and manage your account.
</blockquote>
<p>
    The two features above are inherently user settings, and we needed a place for users to customize
    them to their preference.
</p>
<p>
    Therefore, we created the Settings page.
</p>
<p>
    We're also aware that customizing those settings is inherently destructive, so we made
    it mandatory for users to confirm their intent by entering their password.
</p>

<h2>Completed Features</h2>

<h3>Dark Mode</h3>
<blockquote>
    TL;DR: Dark mode is now supported throughout DollarPlanner.
</blockquote>
<p>
    We released a beta version of dark mode in the previous milestone.
</p>
<p>
    We've since combed through our application to fix any unexpected light elements,
    and also changed the dark mode toggle icon to be more intuitive.
</p>

<h3>Responsive Design</h3>
<blockquote>
    TL;DR: You can now use DollarPlanner on any phone, tablet, or desktop.
</blockquote>
<p>
    We launched a preview of the responsive design in the previous milestone
    for the website only.
</p>
<p>
    We've since redesigned the UI elements throughout our application to better fit
    mobile and tablet screen sizes.
</p>

<h2>Scrapped Features</h2>

<h3>Improved Document Parser</h3>
<p>
    We wanted to expand support for statements from more banks, and improve the parser for existing
    bank statements, but time wasn't the only factor at play here.  
</p>
<p>
    We ran out of examples of statements which we could test our parser on, which meant some of the
    most critical issues with the parser still elude us.
</p>
<p>
    For more details, see the <a href="/docs/miscellany/limitations">Limitations</a> section.
</p>

<h3>App Theming</h3>
<p>
    This feature had the lowest priority among all the features we had in mind, due to its purely aesthetic nature,
    and also as suggested by our adviser.
</p>
<p>
    In the end, we scrapped it for time.
</p>
`;

export default function MilestoneThree() {
    return <Prose dangerouslySetInnerHTML={{ __html: code }} />;
}
