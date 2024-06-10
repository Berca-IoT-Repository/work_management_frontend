import React from "react";

function input({ objValue, onChange, index }) {
  const { label, type, value } = objValue;

  return (
    <div className="form-group">
      <label htmlFor={label}>{label}</label>
      <div className="input">
        <input
          type={type || "text"}
          id={label}
          value={value || ""}
          onChange={(e) => onChange(e, index)}
          className="form-control"
        />
      </div>
    </div>
  );
}

export default input;
