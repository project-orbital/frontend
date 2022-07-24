import { Prose } from "@nikolovlazar/chakra-ui-prose";

// For your own sanity, don't type out tables by hand.
// Use https://www.gdoctohtml.com/ to convert your Google Docs table to HTML.
// The raw HTML can be found in Tools > Source code in the app above.
const code = `
<h1>Project Log</h1>
<h2>Jonathan</h2>
<div>
<table>
<thead>
<tr>
<th>
<p><span><strong>ACTIVITY</strong></span></p>
</th>
<th>
<p><span><strong>DATE</strong></span></p>
</th>
<th>
<p><span><strong>DURATION</strong></span></p>
</th>
</tr>
</thead>
<tbody>
<tr>
<td><span>Milestone 1 documentation &amp; meeting</span></td>
<td><span>9 May</span></td>
<td><span>2 hours</span></td>
</tr>
<tr>
<td><span>React course on Scrimba</span></td>
<td><span>10 - 17 May</span></td>
<td><span>12 hours</span></td>
</tr>
<tr>
<td><span>Mission Control #1 &mdash; React I</span></td>
<td><span>14 May</span></td>
<td><span>2 hours</span></td>
</tr>
<tr>
<td><span>UI mockups with Figma</span></td>
<td><span>18 May</span></td>
<td><span>6 hours</span></td>
</tr>
<tr>
<td><span>User authentication tutorial on YouTube</span></td>
<td><span>19 May</span></td>
<td><span>1 hour</span></td>
</tr>
<tr>
<td><span>MERN stack tutorial on YouTube (w/o Mongo Realm)</span></td>
<td><span>19 May</span></td>
<td><span>2 hours</span></td>
</tr>
<tr>
<td><span>Project GitHub configuration</span></td>
<td><span>20 May</span></td>
<td><span>2 hours</span></td>
</tr>
<tr>
<td><span>CSS Flexbox course on Scrimba</td>
<td><span>20 May</span></td>
<td><span>1 hour</span></td>
</tr>
<tr>
<td><span>Mission Control #1 &mdash; React II</span></td>
<td><span>21 May</span></td>
<td><span>2 hours</span></td>
</tr>
<tr>
<td><span>Milestone 1 sitemap documentation</span></td>
<td><span>23 May</span></td>
<td><span>2 hours</span></td>
</tr>
<tr>
<td><span>User authentication feature</span></td>
<td><span>23, 24 May</span></td>
<td><span>5 hours</span></td>
</tr>
<tr>
<td><span>Landing page construction</span></td>
<td><span>25 May</span></td>
<td><span>2 hours</span></td>
</tr>
<tr>
<td><span>Milestone 1 development plan documentation</span></td>
<td><span>25 May</span></td>
<td><span>3 hours</span></td>
</tr>
<tr>
<td><span>Dashboard construction</span></td>
<td><span>26, 27 May</span></td>
<td><span>6 hours</span></td>
</tr>
<tr>
<td><span>Research, setting up and deploying to AWS EC2 instance</span></td>
<td><span>28 May</span></td>
<td><span>4 hours</span></td>
</tr>
<tr>
<td><span>Milestone 1 DevOps, known issues, development plan documentation</span></td>
<td><span>29 May</span></td>
<td><span>3 hours</span></td>
</tr>
<tr>
<td><span>Hotfixes before milestone 1 deployment</span></td>
<td><span>30 May</span></td>
<td><span>2 hours</span></td>
</tr>
<tr>
<td><span><strong>MILESTONE 1 SUB-TOTAL</strong></span></td>
<td colspan=2><span><strong>55 hours</strong></span></td>
</tr>
<tr>
<td><span>Team meeting</span></td>
<td><span>6 June</span></td>
<td><span>3 hours</span></td>
</tr>
<tr>
<td><span>Set up parser GitHub repository and configure for .wasm compilation target</span></td>
<td><span>7 June</span></td>
<td><span>1 hour</span></td>
</tr>
<tr>
<td><span>Review and experiment with options for Rust crates to handle PDF parsing</span></td>
<td><span>7 June</span></td>
<td><span>4 hours</span></td>
</tr>
<tr>
<td><span>Set up /upload route and implement form for selection and uploading of users&rsquo; bank statements using react-hook-form</span></td>
<td><span>8 June</span></td>
<td><span>6 hours</span></td>
</tr>
<tr>
<td><span>Realize that react-hook-form while performant is needlessly complicated and overkill for our use cases</span></td>
<td><span>9 June</span></td>
<td><span>0 hours</span></td>
</tr>
<tr>
<td><span>Refactor file upload to use Formik instead of react-form-hook</span></td>
<td><span>9 June</span></td>
<td><span>2 hours</span></td>
</tr>
<tr>
<td><span>Team meeting</span></td>
<td><span>9 June</span></td>
<td><span>1 hour</span></td>
</tr>
<tr>
<td><span>Wrangle with axios to implement file uploading from the frontend using multipart/form-data</span></td>
<td><span>10 June</span></td>
<td><span>1 hour</span></td>
</tr>
<tr>
<td><span>Create .wasm bindings with the Node.js backend to handle file parsing</span></td>
<td><span>10 June</span></td>
<td><span>1 hour</span></td>
</tr>
<tr>
<td><span>Create shell script to take care of Rust compilation from the Git parser submodule and&nbsp; start the backend server</span></td>
<td><span>10 June</span></td>
<td><span>1 hour</span></td>
</tr>
<tr>
<td><span>Test Rust and Node.js interoperability (successfully)</span></td>
<td><span>10 June</span></td>
<td><span>1 hour</span></td>
</tr>
<tr>
<td><span>Implement DBS bank statement parser</span></td>
<td><span>10, 11 June</span></td>
<td><span>4 hours</span></td>
</tr>
<tr>
<td><span>Implement JSON serialization from Rust structs</span></td>
<td><span>11 June</span></td>
<td><span>1 hour</span></td>
</tr>
<tr>
<td><span>Update documentation with section on parsing, and overall reformatting</span></td>
<td><span>12 June</span></td>
<td><span>2 hours</span></td>
</tr>
<tr>
<td><span>Implement document redaction in Rust parser</span></td>
<td><span>13 June</span></td>
<td><span>3 hours</span></td>
</tr>
<tr>
<td><span>Fix parser not recognizing thousand separators</span></td>
<td><span>13 June</span></td>
<td><span>1 hour</span></td>
</tr>
<tr>
<td><span>Refactor frontend Table component</span></td>
<td><span>13 June</span></td>
<td><span>2 hours</span></td>
</tr>
<tr>
<td><span>Enable file uploading from the frontend dashboard by creating a button to do so</span></td>
<td><span>14 June</span></td>
<td><span>2 hours</span></td>
</tr>
<tr>
<td><span>Implement transaction table rendering on the frontend dashboard based on upload files</span></td>
<td><span>14 June</span></td>
<td><span>2 hours</span></td>
</tr>
<tr>
<td><span>Fix dashboard resizing on browser zooming</span></td>
<td><span>15 June</span></td>
<td><span>2 hours</span></td>
</tr>
<tr>
<td><span>Team meeting</span></td>
<td><span>15 June</span></td>
<td><span>2 hours</span></td>
</tr>
<tr>
<td><span>Add Dependabot to parser GitHub repository</span></td>
<td><span>15 June</span></td>
<td><span>1 hour</span></td>
</tr>
<tr>
<td><span>Implement CI using GitHub Actions</span></td>
<td><span>15 June</span></td>
<td><span>1 hour</span></td>
</tr>
<tr>
<td><span>Refactor the sidebar to include icons</span></td>
<td><span>16 June</span></td>
<td><span>3 hours</span></td>
</tr>
<tr>
<td><span>Create the Accounts page and implement account creation form</span></td>
<td><span>16 June</span></td>
<td><span>2 hours</span></td>
</tr>
<tr>
<td><span>Implement global accounts state using Redux and finalize the account creation form</span></td>
<td><span>17 June</span></td>
<td><span>3 hours</span></td>
</tr>
<tr>
<td><span>Create the Card, Breadcrumbs, and PageTemplate components to reduce code duplication</span></td>
<td><span>17 June</span></td>
<td><span>2 hours</span></td>
</tr>
<tr>
<td><span>Refactor the dashboard and accounts pages to use the new components above</span></td>
<td><span>17 June</span></td>
<td><span>1 hour</span></td>
</tr>
<tr>
<td><span>Integrate email verification and password reset features</span></td>
<td><span>17 June</span></td>
<td><span>1 hour</span></td>
</tr>
<tr>
<td><span>Configure ESLint, Prettier, and Husky for code style</span></td>
<td><span>19 June</span></td>
<td><span>1 hour</span></td>
</tr>
<tr>
<td><span>Restructure frontend codebase to use the application feature split structure</span></td>
<td><span>19 June</span></td>
<td><span>1 hour</span></td>
</tr>
<tr>
<td><span>Restructure backend codebase to include \`src\` and \`models\` directories</span></td>
<td><span>20 June</span></td>
<td><span>1 hour</span></td>
</tr>
<tr>
<td><span>Fix parser breaking due to overzealous redaction of card details</span></td>
<td><span>20 June</span></td>
<td><span>1 hour</span></td>
</tr>
<tr>
<td><span>Team meeting</span></td>
<td><span>20 June</span></td>
<td><span>2 hours</span></td>
</tr>
<tr>
<td><span>Squash a few bugs</span></td>
<td><span>21 June</span></td>
<td><span>2 hours</span></td>
</tr>
<tr>
<td><span>Research on JWT authentication</span></td>
<td><span>21 June</span></td>
<td><span>4 hours</span></td>
</tr>
<tr>
<td><span>Implement session saving to localStorage using redux-persist</span></td>
<td><span>22 June</span></td>
<td><span>2 hours</span></td>
</tr>
<tr>
<td><span>Change authentication method from localStrategy to JWT</span></td>
<td><span>22 June</span></td>
<td><span>5 hours</span></td>
</tr>
<tr>
<td><span>Fix app routes not requiring authentication, allowing URL bypass</span></td>
<td><span>23 June</span></td>
<td><span>4 hours</span></td>
</tr>
<tr>
<td><span>Team meeting</span></td>
<td><span>24 June</span></td>
<td><span>2 hours</span></td>
</tr>
<tr>
<td><span>Implement dark mode site-wide (beta)</span></td>
<td><span>24 June</span></td>
<td><span>3 hours</span></td>
</tr>
<tr>
<td><span>Implement responsive design site-wide (beta)</span></td>
<td><span>25 June</span></td>
<td><span>2 hours</span></td>
</tr>
<tr>
<td><span>Implement dark mode app-wide (beta)</span></td>
<td><span>25 June</span></td>
<td><span>5 hours</span></td>
</tr>
<tr>
<td><span>Attempt to implement automated code deployment to the AWS EC2 server using AWS CodeDeploy (unsuccessfully)&nbsp;</span></td>
<td><span>26 June</span></td>
<td><span>3 hours</span></td>
</tr>
<tr>
<td><span>Implement automated code deployment to the AWS EC2 server using ssh via GitHub Actions</span></td>
<td><span>26 June</span></td>
<td><span>4 hours</span></td>
</tr>
<tr>
<td><span><strong>MILESTONE 2 SUB-TOTAL</strong></span></td>
<td colspan=2><span><strong>98 hours</strong></span></td>
</tr>
<tr>
    <td>Implement dark mode toggle and preference saving</td>
    <td>6 July</td>
    <td>4 hours</td>
</tr>
<tr>
    <td>Implement rest of Settings page (account deletion, data deletion, profile updating)</td>
    <td>7-8 July</td>
    <td>9 hours</td>
</tr>
<tr>
    <td>Implement data management (eventually coalesced into data synchronization)</td>
    <td>9-11 July</td>
    <td>11 hours</td>
</tr>
<tr>
    <td>Research and set up RTK Query for data synchronization and client-side API request caching</td>
    <td>12 July</td>
    <td>3 hours</td>
</tr>
<tr>
    <td>Implement data synchronization across devices</td>
    <td>12-13 July</td>
    <td>9 hours</td>
</tr>
<tr>
    <td>Create utilities and fix UI issues</td>
    <td>14-16 July</td>
    <td>6 hours</td>
</tr>
<tr>
    <td>Integrate Playwright, Jest (ES6), React Testing Library for testing</td>
    <td>17 July</td>
    <td>4 hours</td>
</tr>
<tr>
    <td>Create documentation pages and move documentation over to the site</td>
    <td>18 July</td>
    <td>7 hours</td>
</tr>
<tr>
    <td>Improve Learn tab UI and help to fix user contributions</td>
    <td>20 July</td>
    <td>4 hours</td>
</tr>
<tr>
    <td>Planning implementation of Portfolio page</td>
    <td>21 July</td>
    <td>1 hour</td>
</tr>
<tr>
    <td>Sprint to implement Portfolio page and REST API endpoints</td>
    <td>22 July</td>
    <td>11 hours</td>
</tr>
<tr>
    <td>Fix outstanding responsive UI issues and dashboard computations post-sprint</td>
    <td>23 July</td>
    <td>3 hours</td>
</tr>
<tr>
    <td>Deploy release candidate 1</td>
    <td>23 July</td>
    <td>0 hours (CD automated)</td>
</tr>
<tr>
    <td>Update documentation for new features and project log</td>
    <td>23 July</td>
    <td>2 hours</td>
</tr>
<tr>
    <td><strong>MILESTONE 3 SUB-TOTAL</strong></td>
    <td colspan=2><strong>74 hours</strong></td>
</tr>
<tr>
    <td><strong>TOTAL</strong></td>
    <td colspan=2><strong>227 hours</strong></td>
</tr>
</tbody>
</table>
</div>

<h2>Zhizhou</h2>
<div>
<table>
<thead>
<tr>
<th>
<p><span><strong>ACTIVITY</strong></span></p>
</th>
<th>
<p><span><strong>DATE</strong></span></p>
</th>
<th>
<p><span><strong>DURATION</strong></span></p>
</th>
</tr>
</thead>
<tbody>
<tr>
<td><span>Milestone 1 documentation &amp; meeting</span></td>
<td><span>9 May</span></td>
<td><span>2 hours</span></td>
</tr>
<tr>
<td><span>Brainstorming and project poster</span></td>
<td><span>9 May</span></td>
<td><span>2 hours</span></td>
</tr>
<tr>
<td><span>Project video</span></td>
<td><span>12 May</span></td>
<td><span>1 hour</span></td>
</tr>
<tr>
<td><span>React course on Scrimba</span></td>
<td><span>22 - 26 May</span></td>
<td><span>12 hours</span></td>
</tr>
<tr>
<td><span>Work review</span></td>
<td><span>24- 28 May</span></td>
<td><span>2 hour</span></td>
</tr>
<tr>
<td><span>Update of project poster and project video</span></td>
<td><span>29 May</span></td>
<td><span>2 hours</span></td>
</tr>
<tr>
<td><span><strong>MILESTONE 1 SUB-TOTAL</strong></span></td>
<td colspan=2><span><strong>21 hours</strong></span></td>
</tr>
<tr>
<tr>
<td><span>Watch Orbital React workshop</span></td>
<td><span>1 - 2 June</span></td>
<td><span>5 hours</span></td>
</tr>
<td><span>Team meeting</span></td>
<td><span>6 June</span></td>
<td><span>3 hours</span></td>
</tr>
<tr>
<td><span>Initial implementation of  email verification feature</span></td>
<td><span>6 - 9 June</span></td>
<td><span>17 hours</span></td>
</tr>
<tr>
<td><span>Team Meeting</span></td>
<td><span>9 June</span></td>
<td><span>2 hours</span></td>
</tr>
<tr>
<tr>
<td><span>Troubleshoot  errors due to the different tech stack used by our team</span></td>
<td><span>14 - 15 June</span></td>
<td><span>6 hours</span></td>
</tr>
<tr>
<tr>
<td><span>Team Meeting</span></td>
<td><span>15 June</span></td>
<td><span>2 hours</span></td>
</tr>
<tr>
<td><span>Finalising email verification feature</span></td>
<td><span>15 - 16 June</span></td>
<td><span>6hours</span></td>
</tr>
<tr>
<td><span>Initial implementation of password reset feature on backend</span></td>
<td><span>16 - 17 June</span></td>
<td><span>4 hours</span></td>
</tr>
<tr>
<td><span>Finalising password reset feature on frontend</span></td>
<td><span>17 June</span></td>
<td><span>4 hours</span></td>
</tr>
<tr>
<td><span>Team Meeting</span></td>
<td><span>20 June</span></td>
<td><span>2 hour</span></td>
</tr>
<tr>
<td><span>Implement Modal abstraction</span></td>
<td><span>20 June</span></td>
<td><span>3 hours</span></td>
</tr>
<tr>
<td><span>Implement Orbital banner and made some UI changes</span></td>
<td><span>21 June</span></td>
<td><span>1 hour</span></td>
</tr>
<tr>
<td><span>Implement Page not Founds</span></td>
<td><span>21 June</span></td>
<td><span>2 hour</span></td>
</tr>
<tr>
<td><span>Implement Learn page</span></td>
<td><span>22 - 23 June</span></td>
<td><span>6 hours</span></td>
</tr>
<tr>
<td><span>Brainstorm and research on “Plan your budget” feature</span></td>
<td><span>23 June</span></td>
<td><span>6 hour</span></td>
</tr>
<tr>
<td><span>Enhance transactions feature to reflect type of transaction and categories of spending</span></td>
<td><span>23 - 24 June</span></td>
<td><span>3 hours</span></td>
</tr>
<tr>
<td><span>Work on Budget Planner feature</span></td>
<td><span>24 June</span></td>
<td><span>3 hours</span></td>
</tr>
<tr>
<td><span>Debug current features</span></td>
<td><span>24 June</span></td>
<td><span>3 hour</span></td>
</tr>
<tr>
<td><span>Team meeting</span></td>
<td><span>24 June</span></td>
<td><span>2 hours</span></td>
</tr>
<tr>
<td><span>Implement Budget Planner feature - Milestone 2 ver.</span></td>
<td><span>26 June</span></td>
<td><span>2 hours</span></td>
</tr>
<tr>
<td><span>Writing documentation</span></td>
<td><span>26 June</span></td>
<td><span>1 hour</span></td>
</tr>
<tr>
<td><span>Edit poster for Milestone 2</span></td>
<td><span>27 June</span></td>
<td><span>1 hour</span></td>
</tr>
<tr>
<td><span>Team meeting</span></td>
<td><span>15 June</span></td>
<td><span>2 hours</span></td>
</tr>
<tr>
<td><span>Video for Milestone 2</span></td>
<td><span>27 June</span></td>
<td><span>1 hour</span></td>
</tr>
<tr>
<tr>
<td><span><strong>MILESTONE 2 SUB-TOTAL</strong></span></td>
<td colspan=2><span><strong>86 hours</strong></span></td>
<tr>
<td><span>Improve Budget Planner feature</span></td>
<td><span>4 - 8 July</span></td>
<td><span>30 hours</span></td>
</tr>
<tr>
<td><span>Implement Learn - Community Contributed feature</span></td>
<td><span>11 - 15 July</span></td>
<td><span>30 hours</span></td>
</tr>
<tr>
    <td><strong>MILESTONE 3 SUB-TOTAL</strong></td>
    <td colspan=2><strong>60 hours</strong></td>
</tr>
<tr>
    <td><strong>TOTAL</strong></td>
    <td colspan=2><strong>167 hours</strong></td>
</tr>
</tr>
</tbody>
</table>
</div>
`;

export default function ProjectLog() {
    return <Prose dangerouslySetInnerHTML={{ __html: code }} />;
}
