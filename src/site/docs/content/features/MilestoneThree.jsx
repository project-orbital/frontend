import { Prose } from "@nikolovlazar/chakra-ui-prose";

const code = `
<h1>Milestone III</h1>
<p>
    With this milestone, we focused on expanding and polishing existing features, and
    adding more quality-of-life features.
</p>

<h2>TL;DR</h2>
<ul>
    <li>You can now use DollarPlanner across any and all your devices — your data will be there. </li>
    <li>You can now plan a budget in the Plan tab.</li>
    <li>You can now publicly share links to financial literacy resources with the community in the Learn tab.</li>
    <li>You can now delete your account and/or your data, and change your username/password/etc. in the Settings tab.</li>
</ul>

<h2>Changes from Feedback</h2>
<p>
    Section to be completed.
</p>

<h2>New Features</h2>

<h3>Improved Budgeting</h3>
<blockquote>
    TL;DR: You can now use our Budget Planner in the Plan tab.
</blockquote>
<p>
    Section to be completed.
</p>

<h3>Community-contributed Financial Resources</h3>
<blockquote>
    TL;DR: You can now publicly share links to financial literacy resources with the community in the Learn tab.
</blockquote>
<p>
    Section to be completed.
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
<p>
    We had the following features in mind, but alas, we were constrained by the time
    we had for this milestone.
</p>

<h3>Portfolios</h3>
<p>
    We wanted to implement a tab where you could track all your assets, like investments,
    as well as your liabilities.
</p>
<p>
    We also considered supporting a parser for brokerage statements.
</p>
<p>
    Well, those turned out to be a little too ambitious with the limited time we had. Whoops.
</p>

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
`;

export default function MilestoneThree() {
    return <Prose dangerouslySetInnerHTML={{ __html: code }} />;
}
