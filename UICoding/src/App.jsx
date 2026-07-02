// import Accordion from "./GFE75/Accordion/Accordion";
// import sections from "./GFE75/Accordion/data";
// import JobsBoard from "./GFE75/JobsBoard/JobsBoard";

import Stepper from "./GFE75/Counter/COunter";
import TimerApp from "./GFE75/MutipleTimers/MultipleTimers";

function App() {
  return (
    <>
      {/* <JobsBoard />
      <Accordion sections={sections} /> */}
      <TimerApp />
      <Stepper
        min={0}
        max={9}
        step={1}
        defaultValue={0}
        onChange={console.log}
      />
    </>
  );
}

export default App;
