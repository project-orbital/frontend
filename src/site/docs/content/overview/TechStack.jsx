import { Prose } from "@nikolovlazar/chakra-ui-prose";

const code = `
<h1>Tech Stack</h1>

<h2>Frontend</h2>
<h3><a href="https://reactjs.org/" target="_blank">React</a></h3>
<blockquote>
    A JavaScript library for building user interfaces.
</blockquote>
<p>
    React allows us to create components which we can re-use throughout our application.
    Many libraries are available in React as well, which makes building our application even easier.
</p>
<h4><a href="https://chakra-ui.com/" target="_blank">Chakra UI</a></h4>
<blockquote>
    A simple, modular and accessible component library that gives you the building blocks 
    you need to build your React applications.
</blockquote>
<p>
    Not everybody likes CSS-in-JS, but the speed at which we can construct UI elements without
    the need to context switch between CSS and JSX files is a huge productivity boon.
</p>
<h4><a href="https://recharts.org/en-US/" target="_blank">Recharts</a></h4>
<blockquote>
    A composable charting library built on React components.
</blockquote>
<p>
    Our visualizations wouldn't look half as good without a good charting library, and with baked-in
    animations, tooltips, and an assortment of charts, Recharts is excellent.
</p>
<h4><a href=https://reactrouter.com/" target="_blank">React Router</a></h4>
<blockquote>
    A lightweight, fully-featured routing library for the React JavaScript library.
</blockquote>
<p>
    As we have created a single-page application, we use React Router to seamlessly connect all our components together.
</p>

<h2>Backend</h2>
<h3><a href="https://nodejs.dev/" target="_blank">Node.js</a></h3>
<blockquote>
    A free, open-sourced, cross-platform JavaScript run-time environment that lets developers write server-side 
    scripts outside of a browser.
</blockquote>
<p>
    Kinda the de-facto standard for a backend, but we would definitely have liked to check out 
    <a href="https://deno.land/" target="_blank">Deno</a> as well, or <a href="https://nextjs.org/" target="_blank">Next.js</a>
    for server-side rendering.
</p>
<h4><a href="https://expressjs.com/" target="_blank">Express</a></h4>
<blockquote>
    A fast, un-opinionated, minimalist web framework for Node.js.
</blockquote>
<p>
    Express lets us create simple and clean RESTful APIs that can be consumed by our frontend.
</p>
<h4><a href="https://www.passportjs.org/" target="_blank">Passport.js</a></h4>
<blockquote>
    An authentication middleware for Node.js. Extremely flexible and modular with many authentication strategies.
</blockquote>
<p>
    So many things can go wrong when writing user authentication, and the abstractions that Passport.js provides
    a safer, publicly-tested, and widely-used way to handle it.
</p>
<h3><a href="https://www.mongodb.com/" target="_blank">MongoDB Atlas</a></h3>
<blockquote>
    An integrated suite of cloud database and data services.
</blockquote>
<p>
    We need a database to store user data, and MongoDB Atlas, being a DBaaS, takes care of our database needs
    without us having to configure a database on our own servers.
</p>
<h4><a href="https://mongoosejs.com/" target="_blank">Mongoose</a></h4>
<blockquote>
    A straight-forward, schema-based solution to model application data with built-in type casting, validation, 
    query building, business logic hooks and more.
</blockquote>
<p>
    Since we're using a NoSQL database, having Mongoose is an additional layer of abstraction that we can use to
    speed up our backend development.
</p>
<h3><a href="https://www.rust-lang.org/" target="_blank">Rust</a></h3>
<p>
    We wrote our document parser in Rust due to its static type system, borrow checker, compile-time checks,
    and prior experience with it.
</p>
<h4><a href="https://github.com/rustwasm/wasm-pack" target="_blank">wasm-pack</a></h4>
<blockquote>
    Building and working with Rust-generated WebAssembly that you can interop with JavaScript.
</blockquote>
<p>
    This is required to compile Rust code to WebAssembly.
</p>
`;

export default function TechStack() {
    return <Prose dangerouslySetInnerHTML={{ __html: code }} />;
}
