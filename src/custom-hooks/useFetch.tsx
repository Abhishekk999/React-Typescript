import apiUtil from "../utils/api";

export default function useFetch() {
  return {
    post: apiUtil.post,
    get: apiUtil.get,
    put: apiUtil.put,
    delete: apiUtil.delete,
  };
}
