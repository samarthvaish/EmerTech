const Express = require("express");
const IPJons = require("./IPs.json");

const app = Express();

app.get("/allIPs", (req, res) => {
  res.status(200).json(IPJons);
});

app.get("/:id", (req, res) => {
  let { id } = req.params;
  id = Number(id);
  try {
    const ipAddr = IPJons.find((ip) => {
      return id === ip.id;
    });
    if (ipAddr) {
      res.status(200).send(ipAddr);
    } else {
      res.status(400).send("ip not found");
    }
  } catch (err) {
    res.status(500).send("internal server err");
  }
});

app.listen(8080, () => {
  console.log("server is running");
});
