import { Prose } from "@nikolovlazar/chakra-ui-prose";

const code = `
<h1>Authentication</h1>
<p>
    We chose to wrote our own user authentication system, following OWASP's recommendations 
    for authentication systems.
</p>
<p>
    OWASP is a nonprofit foundation that works to improve the security of software. Their
    <a href="https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html" target=_blank>cheatsheet</a>
    proved to be an excellent resource.
</p>
<h3>Password Handling</h3>
<p>
    As recommended by OWASP, user passwords must be of at least 8 characters.
</p>
<p>
    Passwords are never stored in plaintext, and are hashed with the <a href="https://www.wikiwand.com/en/Bcrypt" target="_blank"/>bcrypt</a>
    algorithm, which has salting built-in and is resistant to rainbow table and brute force attacks.
</p>
<h3>Email Verification</h3>
<p>
    We have also implemented our own email verification system to ensure that users are who they claim to be.
    This also allows us to implement the password reset system, which is not possible otherwise.
</p>
<p>
    We generate unique links for each user verification, and send them an email with the link to verify their email address.
    Links are also generated with a timeout to ensure that stale links are not usable forever.
</p>
<h3>Password Reset</h3>
<p>
    Similar to email verification, requests are sent via email to users who request a password reset.
    Links are also created with a timeout and unique to each request.
</p>

<h2>Authorization</h2>
<p>
    Authentication is the process by which users are verified, while authorization verifies the resources to
    which a user has access to.
</p>

<h3>JSON Web Token (JWT)</h3>
<blockquote>
    JWT is an open standard that defines a compact and self-contained way for 
    securely transmitting information between parties as a JSON object. 
    This information can be verified and trusted because it is digitally signed.
</blockquote>
<p>
    Once users have successfully authenticated, they are provided a JWT which is saved as an HTTP-only cookie,
    again following OWASP's recommendations.
</p>
<p>
    We do not store JWTs in <tt>localStorage</tt> as they are vulnerable to cross-site scripting (XSS) attacks.
</p>
<p>
    Our JWTs are configured to expire after a week, refreshing with every login, to ensure that credentials are not valid forever.
    The JWT cookie is also removed whenever a user logs out.
</p>
<h3>API Requests</h3>
<p>
    All requests to our API are authenticated with the JWT sent in the cookie.
</p>
<p>
    This ensures that only registered users can access the API, and also provides a means of determining
    the user's identity based on the JWT payload.
</p>
<p>
    We also check that the JWTs we receive are not tampered with by validating their digital signature.
</p>
`;

export default function Authentication() {
    return <Prose dangerouslySetInnerHTML={{ __html: code }} />;
}
