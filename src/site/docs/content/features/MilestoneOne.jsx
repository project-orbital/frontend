import { Prose } from "@nikolovlazar/chakra-ui-prose";

const code = `
<h1>Milestone I</h1>

<h2>New Features</h2>

<h3>Landing Page</h3>
<p>
    We created a basic landing page for our application.
</p>

<h3>User Registration</h3>
<p>
    We created a backend route for user registration, which connects to our MongoDB database.
    Our frontend sign-up page collected the user's first and last name, email, username, and password.
</p>
<p>
    For more details, check out the <a href="/docs/architecture/authentication">Authentication</a> section.
</p>

<h3>User Login</h3>
<p>
    We let our users sign in with their username and password. Users must register and sign in
    before they can access the application.
</p>
<p>
    For more details, check out the <a href="/docs/architecture/authentication">Authentication</a> section.
</p>

<h3>Dashboard</h3>
<p>
    Our app dashboard was relatively primitive during this milestone, displaying only graphs and information
    generated from random data to demonstrate the application's upcoming functionality.
</p>
`;

export default function MilestoneOne() {
    return <Prose dangerouslySetInnerHTML={{ __html: code }} />;
}
