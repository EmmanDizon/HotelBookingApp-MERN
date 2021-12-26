import React from "react";
import http from "../components/service/httpService";
import _ from "lodash";

const TableBody = ({ data, columns }) => {
  const deleteRoom = async (id) => {
    const result = (await http.post("/api/room/delete_room", { _id: id })).data;
  };
  const renderCell = (data, column) => {
    if (column.path) return _.get(data, column.path).toString();
    return (
      <div className="row">
        <div className="col-md-3">
          <p style={{ border: "none", cursor: "pointer" }}>
            <i
              className="fa fa-trash"
              title="Delete"
              onClick={() => deleteRoom(data._id)}
            ></i>
          </p>
        </div>
        <div className="col-md-3">
          <p style={{ border: "none", cursor: "pointer" }}>
            <i className="fa fa-pencil-square-o " title="Edit"></i>
          </p>
        </div>
      </div>
    );
  };

  const createKey = (data, column) => {
    return data._id + (column.path || column.key);
  };

  return (
    <tbody>
      {data.map((item) => (
        <tr key={item._id}>
          {columns.map((column) => (
            <td
              className={
                item.status && item.status === "booked"
                  ? "booked"
                  : item.status === "Cancelled"
                  ? "cancelled"
                  : ""
              }
              key={createKey(item, column)}
            >
              {renderCell(item, column)}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
