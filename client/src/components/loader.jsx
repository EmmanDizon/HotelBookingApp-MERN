import PropagateLoader from "react-spinners/PropagateLoader";

function Loader() {
  return (
    <div style={{ marginTop: "150px" }}>
      <div className="sweet-loading text-center">
        <PropagateLoader color="#81ecec" loading={true} css="" size={15} />
      </div>
    </div>
  );
}

export default Loader;
