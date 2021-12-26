import TableBody from "../components/tableBody";
import TableHeader from "../components/tableHeader";

const Table = ({ className, columns, data }) => {
  return (
    <table className={className}>
      <TableHeader columns={columns} />
      <TableBody data={data} columns={columns} />
    </table>
  );
};

export default Table;
