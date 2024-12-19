import React from "react";
import ReactQuill from "react-quill";

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline"],
    ["link"],
    ["image"],
    ["blockquote"],
    [{ align: [] }],
    [{ direction: "rtl" }],
    ["clean"],
  ],
};

const Editer = ({ value, onChange }) => {
  return (
    <ReactQuill
      modules={modules}
      className="h-64 rounded-lg"
      value={value}
      onChange={onChange}
    />
  );
};

export default Editer;
