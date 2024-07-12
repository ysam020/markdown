import React, { useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import SplitPane from "react-split-pane";
import "./App.css";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { IconButton, Tooltip } from "@mui/material";
import { actions } from "./data/actions";

const App = () => {
  const [markdown, setMarkdown] = useState("");
  const textareaRef = useRef(null);

  const handleMarkdownChange = (e) => {
    setMarkdown(e.target.value);
  };

  const insertMarkdownSyntax = (syntax) => {
    setMarkdown((prevMarkdown) => `${prevMarkdown}\n\n${syntax}`);
    textareaRef.current.focus();
  };

  const handleCheckboxChange = (index) => {
    const lines = markdown.split("\n");
    lines[index] = lines[index].startsWith("- [ ]")
      ? lines[index].replace("- [ ]", "- [x]")
      : lines[index].replace("- [x]", "- [ ]");
    setMarkdown(lines.join("\n"));
  };

  const Checkbox = ({ checked, index, children }) => (
    <div className="task-list-item">
      <input
        type="checkbox"
        checked={checked}
        onChange={() => handleCheckboxChange(index)}
      />
      <span>{children}</span>
    </div>
  );

  const components = {
    li: ({ node, ...props }) => {
      if (
        node.children &&
        node.children[0] &&
        node.children[0].type === "element" &&
        node.children[0].tagName === "input"
      ) {
        const { checked } = node.children[0].properties;
        const lineIndex = markdown.split("\n").findIndex((line) =>
          line.includes(
            node.children
              .slice(1)
              .map((child) => child.value)
              .join(" ")
              .trim()
          )
        );
        return (
          <Checkbox checked={checked} index={lineIndex}>
            {node.children.slice(1).map((child, i) => (
              <span key={i}>{child.value}</span>
            ))}
          </Checkbox>
        );
      }
      return <li {...props} />;
    },
    ul: ({ node, ...props }) => {
      const isTaskList = node.children.some(
        (child) =>
          child.children &&
          child.children[0] &&
          child.children[0].type === "element" &&
          child.children[0].tagName === "input"
      );
      if (isTaskList) {
        return <div {...props} />;
      }
      return <ul {...props} />;
    },
  };

  const generateMarkdownFile = () => {
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Readme.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="App">
      <div className="toolbar">
        {actions.map((action, index) => (
          <Tooltip key={index} title={action.text}>
            <IconButton onClick={() => insertMarkdownSyntax(action.syntax)}>
              {action.icon}
            </IconButton>
          </Tooltip>
        ))}

        <Tooltip title="Download MD File">
          <IconButton onClick={generateMarkdownFile}>
            <FileUploadIcon sx={{ fontSize: "24px" }} />
          </IconButton>
        </Tooltip>
      </div>
      <SplitPane split="vertical" minSize={50} defaultSize="50%">
        <textarea
          ref={textareaRef}
          className="markdown-input"
          value={markdown}
          onChange={handleMarkdownChange}
        />
        <div className="markdown-preview">
          <ReactMarkdown
            children={markdown}
            remarkPlugins={[remarkGfm]}
            components={components}
          />
        </div>
      </SplitPane>
    </div>
  );
};

export default App;
