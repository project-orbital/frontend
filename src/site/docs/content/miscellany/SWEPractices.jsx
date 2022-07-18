import { Prose } from "@nikolovlazar/chakra-ui-prose";

const code = `
<h1>Software Engineering Practices</h1>

<h2>Version Control</h2>
<p>
    We use <a href="https://git-scm.com/" target="_blank">Git</a> and 
    <a href="https://github.com/project-orbital" target="_blank">GitHub</a> extensively,
    and protect our <tt>master</tt> and <tt>dev</tt> branches.
</p>
<p>
    Protecting <tt>master</tt> ensures our application is in a deployable state at all times.
    Protecting <tt>dev</tt> encourages work to be done in feature branches and merged through
    pull requests.
</p>
<p>
    To ensure a systematic workflow, we follow our own variant of the
    <a href="https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow" target="_blank">Gitflow</a>
    workflow — one without <tt>release</tt> branches, and with the occasional branch named after ourselves to coordinate work.
</p>

<h2>Code Reviews</h2>
<p>
    Whenever we complete work on a feature branch, we mark the associated pull request (PR) on GitHub as ready for review.
</p>
<p>
    The other team member conducts a code review to provide an additional pair of eyes on the code,
    raising any issues that may have been overlooked.
</p>
<p>
    Once the issues (if any) are resolved, the PR is merged into the <tt>dev</tt> branch.
</p>

<h2>Secrets and Security</h2>
<p>
    We keep our secrets such as private keys in <tt>.env</tt> files and <tt>gitignore</tt> them for security.
    They are not committed to the repository publicly, and are only re-generated on the fly when needed, e.g. for CI/CD.
</p>
<p>
    We also enable Dependabot on GitHub to keep our dependencies up to date
    (and also bring their security vulnerabilities to our attention).
</>

<h2>Testing</h2>
<p>
    We test our frontend, backend, and parser to ensure they are working as expected.
</p>
<p>
    For more details, check out the <a href="/docs/testing/strategy" target="_blank">testing section of our documentation</a>.
</p>

<h2>Continuous Integration and Deployment (CI/CD)</h2>
<p>
    We run our tests during CI with GitHub Actions and also to enforce a uniform code style
    across our codebases.
</p>
<p>
    We also use GitHub Actions for deployment to our Amazon Web Services (AWS) EC2 server instead of
    doing so manually, which is a hassle.
</p>
<p>
    For more details, check out the <a href="/docs/testing/ci-cd" target="_blank">CI/CD section of our documentation</a>.
</p>
`;

export default function SWEPractices() {
    return <Prose dangerouslySetInnerHTML={{ __html: code }} />;
}
