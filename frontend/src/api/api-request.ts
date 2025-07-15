import axios from "axios";
import { getToken } from "../helpers/auth-storage.helpers";

async function fetchData(url: string, opts: any, isFormData = false): Promise<any> {
  const token = getToken();

  try {
    const response = await axios({
      url: `${import.meta.env.VITE_API_BASE_URL}/${url}`,
      method: opts.method || "GET",
      data: opts.data,
      params: opts.params,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": isFormData ? "multipart/form-data" : "application/json",
      },
    });

    return Promise.resolve(response.data);
  } catch (error: any) {
    return Promise.reject(error.response?.data || error.message);
  }
}

export default fetchData;