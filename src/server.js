import sirv from "sirv";
import polka from "polka";
import send from "@polka/send-type";
import _ from "lodash";
import compression from "compression";
import * as sapper from "@sapper/server";

import jams from "./mock-db/jams";
import entries from "./mock-db/entries";

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";

const jamIndex = _.keyBy(jams, "id");
const entryByJam = {};
for (const entry of entries) {
  entryByJam[entry.jamId] = [...(entryByJam[entry.jamId] || []), entry];
}

const app = polka();
app.store = { jamIndex, entryByJam };

app
  .get("/api/jams/:id?", ({ params }, res, next) => {
    const { store } = app;
    if (params.id) {
      send(res, 200, store.jamIndex[params.id]);
    }
    send(res, 200, store.jamIndex);
  })
  // post to /jams => create jam
  // put to /jams/:id => update jam
  .get("/api/entries/:jamId?/:id?", ({ params }, res, next) => {
    const { store } = app;
    if (params.jamId) {
      send(res, 200, store.entryByJam[params.jamId]);
    }
    send(res, 200, store.entryByJam);
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
