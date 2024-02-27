import createClient from "openapi-fetch";
import { paths, operations } from "./api-types";

const client = createClient<paths>({ baseUrl: "http://localhost:8080/" });

export { client };
