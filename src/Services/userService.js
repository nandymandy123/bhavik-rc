import { authApiInstance } from "./apiService";

const storeUserToLocal = (email) => {
  localStorage.setItem("authToken", email);
};

export const loginUser = async (user) => {
  try {
    const { data } = await authApiInstance.get(`users/${user.email}`);

    if (data?.password !== user?.password) {
      return ["Incorrect Password", null];
    }

    storeUserToLocal(data.email);

    return [null, data];
  } catch (error) {
    let err = error?.response ?? error;

    if (err?.status === 404) {
      err = "User Not Exist";
    }

    err = typeof err === "object" ? "Something Went Wrong" : err;

    return [err, null];
  }
};

export const registerUser = async (user) => {
  try {
    const { data } = await authApiInstance.post("users", user);

    storeUserToLocal(data.email);

    return [null, data];
  } catch (error) {
    let err = error?.response?.data ?? error;

    if (err?.includes("duplicate")) {
      err = "User already exists!";
    }

    err = typeof err === "object" ? "Something Went Wrong" : err;

    return [err, null];
  }
};
