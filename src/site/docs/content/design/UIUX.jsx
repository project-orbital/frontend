import { Prose } from "@nikolovlazar/chakra-ui-prose";

const code = `
<h1>User Interface (UI)</h1>
<p>
    Neither of us has any prior experience in UI design, so we had to do our own research.
</p>
<p>
    We followed <a href="https://hype4academy.gumroad.com/l/designtips" target="_blank">this book</a> by hype4academy
    for guidelines and best practices for UI design.
</p>
<p>
    During the development process, we found that we weren't following some of the best practices and had to
    make the necessary amendments to the UI.
</p>
<p>
    For example, while creating the data deletion modal, we noticed our overuse of dropdowns in places where a group of 
    radio buttons were more appropriate.
</p>

<h2>User Experience (UX)</h2>
<p>
    Likewise, we didn't have a background in UX design, and admittedly we winged it for the most part.
</p>
<p>
    Nonetheless we were able to correct some of the issues we found during the user testing process.
    For more details on this, check out the <a href="/docs/testing/user-testing"/>user testing</a> section.
</p>
<p>
    We were also acutely aware of the need to provide user with feedback on their interactions with the application.
</p>
<p>
    For that reason, we included toasts upon successful actions and errors, as well as minor UI elements such
    as breadcrumbs to keep the user informed of their current location.
</p>
`;

export default function UIUX() {
    return <Prose dangerouslySetInnerHTML={{ __html: code }} />;
}
