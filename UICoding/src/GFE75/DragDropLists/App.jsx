import DragAndDrop from "./DragDrop";

const initialData = {
  Todo: [
    "Design UI mocks",
    "Set up project repo",
    "Write Unit Tests",
    "Integrate Payments",
  ],
  "In Progress": ["Develop auth flow", "Implement React UI"],
  Completed: ["Set up CI/CD", "Code Review", "Deploy initial version to uat"],
};

function App() {
  return (
    <>
      <DragAndDrop initialState={initialData} />
    </>
  );
}

export default App;
