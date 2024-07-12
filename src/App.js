import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import SplitPane from "react-split-pane";
import "./App.css";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatColorTextIcon from "@mui/icons-material/FormatColorText";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import StrikethroughSIcon from "@mui/icons-material/StrikethroughS";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import ChecklistIcon from "@mui/icons-material/Checklist";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import CodeIcon from "@mui/icons-material/Code";
import TableViewIcon from "@mui/icons-material/TableView";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import ImageIcon from "@mui/icons-material/Image";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { IconButton, Tooltip } from "@mui/material";

const App = () => {
  const [markdown, setMarkdown] = useState("");
  const textareaRef = useRef(null);
  const previewRef = useRef(null);

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
    a.download = "document.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="App">
      <div className="toolbar">
        <Tooltip title="Heading">
          <IconButton onClick={() => insertMarkdownSyntax("# ")}>
            <FormatColorTextIcon sx={{ fontSize: "24px" }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Bold">
          <IconButton onClick={() => insertMarkdownSyntax("**bold**")}>
            <FormatBoldIcon sx={{ fontSize: "24px" }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Italic">
          <IconButton onClick={() => insertMarkdownSyntax("*italic")}>
            <FormatItalicIcon sx={{ fontSize: "24px" }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Strikethrough">
          <IconButton onClick={() => insertMarkdownSyntax("~~strikethrough~~")}>
            <StrikethroughSIcon sx={{ fontSize: "24px" }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="List">
          <IconButton onClick={() => insertMarkdownSyntax("- ")}>
            <FormatListBulletedIcon sx={{ fontSize: "24px" }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Numbered List">
          <IconButton onClick={() => insertMarkdownSyntax("1. ")}>
            <FormatListNumberedIcon sx={{ fontSize: "24px" }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Task List">
          <IconButton onClick={() => insertMarkdownSyntax("- [ ] Task")}>
            <ChecklistIcon sx={{ fontSize: "24px" }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Blockquote">
          <IconButton onClick={() => insertMarkdownSyntax("> Blockquote")}>
            <FormatQuoteIcon sx={{ fontSize: "24px" }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Code">
          <IconButton
            onClick={() => insertMarkdownSyntax("```\nCode block\n```")}
          >
            <CodeIcon sx={{ fontSize: "24px" }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Table">
          <IconButton
            onClick={() =>
              insertMarkdownSyntax(
                "| Header 1 | Header 2 |\n| --- | --- |\n| --- | --- |\n| --- | --- |"
              )
            }
          >
            <TableViewIcon sx={{ fontSize: "24px" }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Link">
          <IconButton onClick={() => insertMarkdownSyntax("[link text](url)")}>
            <InsertLinkIcon sx={{ fontSize: "24px" }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Image">
          <IconButton
            onClick={() =>
              insertMarkdownSyntax("![enter image description here](image-url)")
            }
          >
            <ImageIcon sx={{ fontSize: "24px" }} />
          </IconButton>
        </Tooltip>
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
