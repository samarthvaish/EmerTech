const Express = require("express");
const axios = require("axios");
const cors = require("cors");
const userJson = require("./user.json");

const app = Express();

app.use(cors());
app.get("/", (req, res) => {
  try {
    res.status(200).json(userJson);
  } catch (err) {
    console.log(err);
    res.status(500).send("internal server error");
  }
});

app.get("/userWithIP", async (req, res) => {
  try {
    let IPs = await axios.get("http://localhost:8080/allIPs");
    IPs = IPs.data;
    const userWithIP = [];
    userJson.forEach((user) => {
      const userIp = IPs.find((ip) => {
        return user.id == ip.id;
      });
      const name = user.first_name + user.last_name || "unknow";
      if (userIp) {
        userWithIP.push({ user: name, ip_address: userIp.ip_address });
      } else {
        userWithIP.push({ user: name, ip_address: "" });
      }
    });
    res.status(200).json(userWithIP);
  } catch (err) {
    console.log(err);
    res.status(500).send("internal server error");
  }
});

app.listen(8000, () => {
  console.log("server is running");
});
// const userFile = fs.readFileSync("../user.json");
