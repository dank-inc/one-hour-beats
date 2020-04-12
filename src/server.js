import sirv from "sirv";
import polka from "polka";
import compression from "compression";
import * as sapper from "@sapper/server";

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";

const app = polka()
  .get("/api/jams/:id?", (req, res, next) => {
    if (req.params.id) {
      res.end(`getting jam: ${req.params.id}`);
    }
    res.end(`getting all jams`);
  })
  // post to /jams => create jam
  // put to /jams/:id => update jam
  .get("/api/entries/:id?", (req, res, next) => {
    if (req.params.id) {
      res.end(`getting jam: ${req.params.id}`);
    }
    res.end(`getting all jams`);
  })
  // post to /entries => create entry
  // put to /entries/:id => update entry *milestone 2
  // CRUD /users *milestone 1
  .use(
    compression({ threshold: 0 }),
    sirv("static", { dev }),
    sapper.middleware()
  )
  .listen(PORT, (err) => {
    if (err) console.log("error", err);
  });
