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

export const actions = [
  { icon: <FormatColorTextIcon />, syntax: "# ", text: "Heading" },
  { icon: <FormatBoldIcon />, syntax: "**bold**", text: "Bold" },
  { icon: <FormatItalicIcon />, syntax: "*italic", text: "Italic" },
  {
    icon: <StrikethroughSIcon />,
    syntax: "~~strikethrough~~",
    text: "Strikethrough",
  },
  { icon: <FormatListBulletedIcon />, syntax: "- ", text: "List" },
  { icon: <FormatListNumberedIcon />, syntax: "1. ", text: "Numbered List" },
  { icon: <ChecklistIcon />, syntax: "- [ ] Task", text: "Task List" },
  { icon: <FormatQuoteIcon />, syntax: "> Blockquote", text: "Blockquote" },
  { icon: <CodeIcon />, syntax: "```\nCode block\n```", text: "Code" },
  {
    icon: <TableViewIcon />,
    syntax:
      "| Header 1 | Header 2 |\n| --- | --- |\n| --- | --- |\n| --- | --- |",
    text: "Table",
  },
  { icon: <InsertLinkIcon />, syntax: "[link text](url)", text: "Link" },
  {
    icon: <ImageIcon />,
    syntax: "![enter image description here](image-url)",
    text: "Image",
  },
];
