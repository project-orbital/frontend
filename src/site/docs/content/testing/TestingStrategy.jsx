import { Prose } from "@nikolovlazar/chakra-ui-prose";

const code = `
<h1>Testing Strategy</h1>

<h2>Unit Testing</h2>
<p>
    We separate our business logic from our reusable components by extracting
    them into utility functions.
<p>
    We have also deliberately separated these reusable components 
    from the major UI components which compose the reusable components.
</p>
<p>
    To illustrate what we mean, the reusable components and utilities are found in <tt>src/common</tt>,
    while the major UI components are found in <tt>src/features/*/components</tt>.
</p>
<p>
    We use <a href="https://jestjs.io/" target="_blank">Jest</a> to test the utility functions.
    The reusable components, separated from business logic, are purely presentational and therefore
    need little testing — visual inspection is sufficient for us (in our opinion). 
</p>
<p>
    In addition, with an internal library of reusable components, from which our UI components 
    are built, we feel more confident about the integrity of our UI.
</p>

<h2>Integration Testing</h2>
<p>
    We use <a href="https://playwright.dev/" target=_blank>Playwright</a> for our integration tests.
    This is where we test our major UI components.
</p>
<p>
    We write tests to simulate what a user would typically do when using each major feature of DollarPlanner,
    e.g. Portfolio, Plan, and use Playwright to carry out the simulation, with the frontend making live API calls to the backend.
</p>
<p>
    We are aware of the benefit of mocking the API responses instead of making live API calls,
    but we feel that the time and effort to do so is disproportionately huge relative to the benefits.
</p>
<p>
    Instead, we created a testing account which our tests run on, and is then reset to a clean state after each test.
</p>

<h2>Automated UI Testing</h2>
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/JXi18mZy_0c" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
`;

export default function TestingStrategy() {
    return <Prose dangerouslySetInnerHTML={{ __html: code }} />;
}
