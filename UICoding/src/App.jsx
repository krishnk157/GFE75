import Accordion from "./GFE75/Accordion/Accordion";
import sections from "./GFE75/Accordion/data";
import JobsBoard from "./GFE75/JobsBoard/JobsBoard";

function App() {
  return (
    <>
      <JobsBoard />
      <Accordion sections={sections} />
    </>
  );
}

export default App;
