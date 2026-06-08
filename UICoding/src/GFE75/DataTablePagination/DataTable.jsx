import { useState } from "react";
import users from "./data/users";

const PAGE_SIZE_OPTIONS = [
  {
    value: 5,
    label: "Show 5",
  },
  {
    value: 10,
    label: "Show 10",
  },
  {
    value: 20,
    label: "Show 20",
  },
];

export default function DataTable() {
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0].value);
  const [currPage, setCurrPage] = useState(0);

  const totalItems = users.length;

  const startIndex = currPage * pageSize;
  const endIndex = startIndex + pageSize;
  const data = users.slice(startIndex, endIndex);

  const lastPage = Math.ceil(totalItems / pageSize) - 1;

  return (
    <div>
      <table>
        <thead>
          <tr>
            {[
              { label: "ID", key: "id" },
              { label: "Name", key: "name" },
              { label: "Age", key: "age" },
              { label: "Occupation", key: "occupation" },
            ].map(({ label, key }) => (
              <th key={key}>{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(({ id, name, age, occupation }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{name}</td>
              <td>{age}</td>
              <td>{occupation}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="table-controls">
        <select
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setCurrPage(0);
          }}
          value={pageSize}
        >
          {PAGE_SIZE_OPTIONS.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="page-btn-controls">
          <button
            disabled={currPage === 0}
            onClick={() => setCurrPage((prev) => prev - 1)}
          >
            Prev
          </button>
          <span>
            Page {currPage + 1} of {lastPage + 1}
          </span>
          <button
            disabled={currPage === lastPage}
            onClick={() => setCurrPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
