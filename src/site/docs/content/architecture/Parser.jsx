import { Prose } from "@nikolovlazar/chakra-ui-prose";

const code = `
<h1>Parser</h1>
<p>
    People usually get their bank statements as a PDF file via email or directly from their bank website.
    These are the documents we support at the moment. 
</p>
<p>
    Unfortunately, PDF is not a pleasant format to work with. 
    Unlike HTML where the content of a document is structured in a DOM, no such structure exists for PDFs.
</p>
<p>
    Instead, commands to render text, raster graphics, vector graphics, and other multimedia objects are thrown in 
    token streams with associated coordinates to render them at.
</p>

<h2>Implementation Options</h2>
<p>
    There are 3 methods to get the data out of PDF files.
</p>
<h3>Optical Character Recognition (OCR)</h3>
<p>
    The first method is to use OCR. For example, <a href="https://github.com/tesseract-ocr/tesseract" target="_blank">Tessarect</a>
    is available for C and C++ along with bindings for many other languages.
</p>
<p>
    But OCR doesn’t work out of the box on PDF files — we’d need to render images from them before the OCR engine can work.
    This additional level of indirection is inconvenient, which is why we didn’t go with this method.
</p>
<h3>Table Data Extraction Libraries</h3>
<p>
    The second method is to use a library to liberate data from tables, like 
    <a href="https://github.com/tabulapdf/tabula-java" target="_blank">Tabula</a>.
</p>
<p>
    In fact, Tabula uses OCR to extract the data from tables, which sounds much more convenient than implementing it ourselves…
    but it’s a Java library, and we’re using JavaScript.
</p>
<p>
    Another alternative is <a href="https://aws.amazon.com/textract/" target="_blank">Amazon Textract</a> , 
    but it’s only free for 1000 pages which we would blow through rather quickly.
</p>
<h3>Text Extraction Libraries
<p>
    The last method is to use a library to just extract textual content and use string manipulation 
    in tandem with regex to parse them manually.
</p>
<p>
    This is the method we settled on, having exhausted our options.
    The library we used in our implementation is 
    <a href=https://www.npmjs.com/package/pdf-parse target="_blank">pdf-parse</a>.
</p>
</h3>

<h2>Implementation Details</h2>
<p>
    Users upload their documents to our server and we grab the text from them with the help of pdf-parse.
</p>
<p>
    We could continue to do the parsing in JavaScript (or TypeScript), but we chose to write our parser in
    Rust due to our familiarity with it, its type safety, and its performance.
</p>
<p>
    Compiling Rust to WebAssembly and then integrating it with Node.js is a fairly painless process.
    It’s rather performant too, with benchmarks showing that our parser takes under a millisecond per document.
</p>

<h3>An Aside: Privacy</h3>
<p>
    Bank statements contain a lot of sensitive information, including credit card numbers and addresses.
</p>
<p>
    We redact any sequence of 13-to-16-digit strings, delimited or otherwise, by replacing them with asterisks.
</p>
<p>
    By default, we do not store user information in our database.
    However, users can enable this feature in their account settings if they want to, which allows
    them to synchronize their account across multiple devices.
</p>
`;

export default function Parser() {
    return <Prose dangerouslySetInnerHTML={{ __html: code }} />;
}
