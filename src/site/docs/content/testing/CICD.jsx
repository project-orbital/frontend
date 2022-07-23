import { Prose } from "@nikolovlazar/chakra-ui-prose";

const code = `
<h1>Continuous Integration (CI)</h1>
<p>
    Our continuous integration pipeline relies on 
    <a href="https://github.com/features/actions" target="_blank">GitHub Actions</a>
    to lint, build, and test our code.
</p>
<p>
    We chose GitHub Actions because GitHub provides unlimited free minutes for their Ubuntu runners,
    which is sufficient for our use case. Other candidates for our CI pipeline were
    <a href="https://www.jenkins.io/" target="_blank">Jenkins</a> and 
    <a href="https://circleci.com/" target="_blank">CircleCI</a>.
</p>
<p>
    You can view our CI workflow script for our 
    <a href="https://github.com/project-orbital/frontend/blob/dev/.github/workflows/ci.yml" target="_blank">frontend</a>  
    and our <a href="https://github.com/project-orbital/backend/blob/dev/.github/workflows/node.js.yml" target="_blank">backend</a>
    repositories.
</p>

<h3>Frontend</h3>
<p>
    First, before a file is even committed, <a href="https://typicode.github.io/husky/#/" target="_blank">Husky</a>
    executes the pre-commit hooks, which uses <a href="https://eslint.org/" target="_blank">ESLint</a> to fix
    any linting errors, and <a href="https://prettier.io/" target="_blank">Prettier</a> to format our code.
</p>
<p>
    We chose ESLint because it's the de-facto JavaScript linter with built-in integration with IntelliJ's WebStorm IDE.
    Neither of us have any opinions on JS code style, so Prettier, with its opinionated defaults, was a good choice.
</p>
<p>
    Second, once a file is pushed or PR'd onto <tt>dev</tt> or <tt>master</tt>, our CI runner builds the frontend.
    This catches any compile-time errors, which ensures our site is always in a working state.
</p>
<p>
    Concurrently, our CI runner starts its own copy of the backend server in order to run the Playwright
    and Jest automated tests. For more details on these tests, check out the 
    <a href="/docs/testing/strategy">Testing Strategy</a> section.
</p>
<p>
    CI must pass before we continue with CD.
</p>

<h3>Backend</h3>
<p>
    The backend CI is largely similar to the frontend CI, so we'll spare repeating you the same details.
</p>
<p>
    The only exception being our document parser — it's written in Rust, not JavaScript, and it's also in a 
    <a href="https://github.com/project-orbital/parser" target="_blank">separate repository</a>.

</p>
<p>
    We treat the parser as a library file and have integrated it as a Git submodule, but it has its
    own CI pipeline which uses Rust's native package manager and test runner
    <a href="https://github.com/rust-lang/cargo/" target="_blank">Cargo</a> to run the unit tests.
</p>

<h2>Continuous Deployment (CD)</h2>
<p>
    We host our application on an <a href="https://aws.amazon.com/ec2/" target="_blank">Amazon Web Services</a> (AWS) 
    EC2 instance.
<p>
</p>
    We're fairly comfortable with our around a Unix shell via SSH, and an EC2 instance is free for a year,
    which is sufficient for our needs.
</p>
<p>
    We considered using <a href="https://www.heroku.com/dynos" target="_blank">Heroku Dynos</a> for our hosting needs,
    but the sleep after 30 minutes of inactivity was a dealbreaker.
</p>
<p>
    <a href="https://vercel.com/" target=_blank>Vercel</a> was an attractive option too, but we felt that
    there was more to learn with AWS, and Orbital was a good opportunity to learn.
</p>
<h3>Configuration</h3>
<p>
    Our CD pipeline is relatively simple, it's nothing more than SSH, Git, and server commands that would otherwise
    be manually executed.
</p>
<p>
    The server uses <a href="https://nginx.org/en/" target="_blank">nginx</a> as a reverse proxy,
    intercepting and serving client requests for our frontend, and <a href="https://pm2.keymetrics.io/" target="_blank">PM2</a>
    to manage our backend Node.js process, with automatic restarts in the event that the backend crashes.
</p>
`;

export default function CICD() {
    return <Prose dangerouslySetInnerHTML={{ __html: code }} />;
}
