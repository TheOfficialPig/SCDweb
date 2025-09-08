import serverless from "serverless-http";
import { createServer } from "../dist/server/production.mjs";

const handler = serverless(createServer());

export default function (req, res) {
  return handler(req, res);
}
