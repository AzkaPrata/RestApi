import http from "http";
import { port } from "./data/data.js";
import { server } from "./server/server.js";


server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
