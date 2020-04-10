import sirv from "sirv";
import polka from "polka";
import compression from "compression";
import * as sapper from "@sapper/server";

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";

const jams = [
  // pretend this is database data.
  {
    name: "cool jam",
    description: "do something dope",
    timeLimit: 3600,
    startedAt: null,
  },
];

const app = polka() // You can also use Express
  .use(
    compression({ threshold: 0 }),
    sirv("static", { dev }),
    sapper.middleware()
  )
  .listen(PORT, (err) => {
    if (err) console.log("error", err);
  });

app.get("/api/jams", (req, res) => {
  res.end(jams);
});
