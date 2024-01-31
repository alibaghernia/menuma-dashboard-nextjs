import axiosPkg from "axios";

const baseURL = process.env.BACKEND_BASEURL;
if (!baseURL) {
  console.error("Check Backend Baseurl");
  process.exit(1);
}

const axios = axiosPkg.create({
  baseURL,
});

export default axios;
