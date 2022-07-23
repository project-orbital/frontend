import { Prose } from "@nikolovlazar/chakra-ui-prose";

const code = `
<h1>Testing Strategy</h1>

<h2>Unit Testing</h2>
<p>
    We use <a href="https://jestjs.io/" target="_blank">Jest</a> to test our frontend reusable 
    components and utility functions. We have deliberately separated these from our
    major UI components, so that we can test the two groups separately.
</p>
<p>
    To illustrate what we mean, the reusable components and utilities are found in <tt>src/common</tt>,
    while the major UI components are found in <tt>src/features/*/components</tt>.
</p>
<p>
    This separation of concerns allows us to maintain a well-tested internal library of reusable components,
    from which our UI components can be built, and as a result we feel more confident about the integrity of our UI.
</p>

<h2>Integration Testing</h2>
<p>
    We use <a href="https://playwright.dev/" target=_blank>Playwright</a> to test our backend API.
</p>
<p>
    We write tests for each of our API endpoints, and Playwright tests each of them in isolation.
</p>

<h2>System Testing</h2>
<p>
    We use <a href="https://playwright.dev/" target=_blank>Playwright</a> to conduct end-to-end tests.
</p>
<p>
    We write tests to simulate what a user would typically do when using DollarPlanner, and use Playwright to
    carry out the simulation.
</p>
<p>
    As a basic example, one of our tests simulates a user signing in to their account, creating new accounts
    within the application, adding a few transactions to each of those accounts, and checking out their dashboard
    before signing out.
</p>
`;

export default function TestingStrategy() {
    return <Prose dangerouslySetInnerHTML={{ __html: code }} />;
}
