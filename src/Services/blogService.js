import axios from "axios";
import { blogApiInstance } from "./apiService";

export const getBlogDetails = async (id) => {
  try {
    let { data } = await blogApiInstance.get(`posts/${id}`);

    console.log(data);

    return [null, data];
  } catch (error) {
    let err = error?.response?.data ?? error;

    err = typeof err === "object" ? "Something Went Wrong" : err;

    return [err, null];
  }
};
