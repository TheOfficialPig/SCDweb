import serverless from "serverless-http";
import { createServer } from "../server/index.js";

const handler = serverless(createServer());

export default function (req, res) {
  return handler(req, res);
}
