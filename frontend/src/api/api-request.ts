import axios from "axios";
import { getAuthToken } from "../helpers/auth-storage.helpers";

export async function apiRequest(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  data?: any,
  params?: Record<string, any>,
  isFormData = false
): Promise<any> {
  const config = {
    baseURL: import.meta.env.VITE_API_BASE_URL,
    url: endpoint,
    method,
    headers: {
      Authorization: `Bearer ${getAuthToken() || ""}`,
      "Content-Type": isFormData ? "multipart/form-data" : "application/json"
    },
    ...(data && { data }),
    ...(params && { params })
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || error.message;
    } else {
      throw error;
    }
  }
}