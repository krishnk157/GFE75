import { useState } from "react";

import ModalDialog from "./ModalDialog";

export default function App() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <button onClick={() => setShowModal(true)}>Show Modal</button>
      <ModalDialog
        title="Modal Dialog"
        isOpen={showModal}
        closeModal={() => setShowModal(false)}
      >
        One morning, when Gregor Samsa woke from troubled dreams, he found
        himself transformed in his bed into a horrible vermin. He lay on his
        armour-like back, and if he lifted his head a little he could see his
        brown belly, slightly domed and divided by arches into stiff sections.
      </ModalDialog>
    </div>
  );
}
