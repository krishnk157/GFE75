import { useState } from "react";

function FileObject({ file }) {
  const [expanded, setExpanded] = useState(false);
  const { children, name } = file;

  const isDirectory = Boolean(children);

  return (
    <li className="file-item">
      <button
        className={[
          "file-item-button",
          isDirectory && "file-item-button--directory",
        ]
          .filter(Boolean)
          .join(" ")}
        onClick={() => {
          if (!isDirectory) {
            return;
          }
          setExpanded(!expanded);
        }}
      >
        <span>{name}</span> {isDirectory && <>[{expanded ? "-" : "+"}]</>}
      </button>
      {children && children.length > 0 && expanded && (
        <FileExplorer fileList={children} />
      )}
    </li>
  );
}

export default function FileExplorer({ fileList }) {
  const directories = fileList.filter((item) => item.children);
  directories.sort((a, b) => a.name.localeCompare(b.name));

  const nonDirectories = fileList.filter((item) => !item.children);
  nonDirectories.sort((a, b) => a.name.localeCompare(b.name));

  const items = [...directories, ...nonDirectories];
  return (
    <div>
      <ul className="file-list">
        {items.map((file) => (
          <FileObject key={file.id} file={file} />
        ))}
      </ul>
    </div>
  );
}
