import { Prose } from "@nikolovlazar/chakra-ui-prose";

const code = `
<h1>Database</h1>
<p>
    We use <a href="https://www.mongodb.com/atlas" target="_blank">MongoDB Atlas</a> as our NoSQL database solution.
</p>
<p>
    Our database schemas are relatively simple, with only one-to-one and one-to-many relationships.
    We use embedded documents to model the former and separate collections for the latter.
</p>

<h2>Database Schema</h2>

<h3>Users</h3>
<p>
    We hash and salt user passwords before storing them in the database.
    For more details, check out the <a href="/docs/architecture/authentication">Authentication</a> section.
</p>
<table>
<thead>
<tr>
    <th>Key</th>
    <th>Type</th>
</tr>
</thead>
<tbody>
<tr>
    <td><em>_id</em></td>
    <td>ObjectId</td>
</tr>
<tr>
    <td>firstName</td>
    <td>String</td>
</tr>
<tr>
    <td>lastName</td>
    <td>String</td>
</tr>
<tr>
    <td>email</td>
    <td>String</td>
</tr>
<tr>
    <td>username</td>
    <td>String</td>
</tr>
<tr>
    <td>password</td>
    <td>String</td>
</tr>
<tr>
    <td>verified</td>
    <td>Boolean</td>
</tr>
<tr>
    <td>createdAt</td>
    <td>Date</td>
</tr>
<tr>
    <td>preferences</td>
    <td>Preferences</td>
</tr>
</tbody>
</table>

<h3>Preferences</h3>
<p>
    There is a one-to-one relationship between a user account and their preferences.
    We store the user's preferences in the database as an embedded document in the Users collection.
</p>
<table>
<thead>
<tr>
    <th>Key</th>
    <th>Type</th>
</tr>
</thead>
<tbody>
<tr>
    <td><em>_id</em></td>
    <td>ObjectId</td>
</tr>
<tr>
    <td>prefersDarkMode</td>
    <td>Boolean</td>
</tr>
<tr>
    <td>allowsDataStorage</td>
    <td>Boolean</td>
</tr>
</tbody>
</table>

<h3>Accounts</h3>
<p>
    This refers to the accounts that users create within the application, and not the user accounts.
</p>
<p>
    There is a one-to-many relationship between a user account and the accounts that they can create.
    We store accounts as a separate collection.
</p>
<table>
<thead>
<tr>
    <th>Key</th>
    <th>Type</th>
</tr>
</thead>
<tbody>
<tr>
    <td><em>_id</em></td>
    <td>ObjectId</td>
</tr>
<tr>
    <td><em>user_id</em></td>
    <td>ObjectId</td>
</tr>
<tr>
    <td>createdAt</td>
    <td>Date</td>
</tr>
<tr>
    <td>name</td>
    <td>String</td>
</tr>
<tr>
    <td>nickname</td>
    <td>String</td>
</tr>
</tbody>
</table>

<h3>Transactions</h3>
<p>
    There is a one-to-many relationship between an account and the transactions that it can store.
    We store transactions as a separate collection.
</p>
<p>
    We also store the user ID in a transaction so that we can retrieve all of a user's transactions
    without having to query the accounts collection.
</p>
<table>
<thead>
<tr>
    <th>Key</th>
    <th>Type</th>
</tr>
</thead>
<tbody>
<tr>
    <td><em>_id</em></td>
    <td>ObjectId</td>
</tr>
<tr>
    <td><em>user_id</em></td>
    <td>ObjectId</td>
</tr>
<tr>
    <td><em>account_id</em></td>
    <td>ObjectId</td>
</tr>
<tr>
    <td>createdAt</td>
    <td>Date</td>
</tr>
<tr>
    <td>date</td>
    <td>Date</td>
</tr>
<tr>
    <td>amount</td>
    <td>Decimal128</td>
</tr>
<tr>
    <td>balance</td>
    <td>Decimal128</td>
</tr>
<tr>
    <td>name</td>
    <td>String</td>
</tr>
<tr>
    <td>category</td>
    <td>String</td>
</tr>
<tr>
    <td>description</td>
    <td>String</td>
</tr>
</tbody>
</table>
`;

export default function Database() {
    return <Prose dangerouslySetInnerHTML={{ __html: code }} />;
}
