import axios from "axios";

const exporAxiosOperation = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
export default exporAxiosOperation;
