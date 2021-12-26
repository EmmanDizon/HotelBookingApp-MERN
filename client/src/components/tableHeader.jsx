import React from "react";

const TableHeader = ({ columns }) => {
  return (
    <thead>
      <tr>
        {columns.map((column) => {
          return <th key={column.path}>{column.title}</th>;
        })}
      </tr>
    </thead>
  );
};

export default TableHeader;
