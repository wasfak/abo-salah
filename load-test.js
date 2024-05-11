import http from "k6/http";
import { sleep } from "k6";
import { randomIntBetween } from "https://jslib.k6.io/k6-utils/1.2.0/index.js";

export const options = {
  vus: 80,
  duration: "10s",
};

export default function () {
  http.get("https://ai-trans-omega.vercel.app/api");
  sleep(randomIntBetween(1, 2));
}
