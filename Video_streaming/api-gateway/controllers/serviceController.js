const http = require("http");
const { configOptions } = require("../config");

const serviceRegistery = {
  auth: "8081",
  upload: "8082",
  stream: "8083",
};

function service_get(req, res) {
  const { resource } = req.params;

  // Dummy service lookup
  const ms_port = serviceRegistery[resource];
  if (!ms_port) {
    res.status(404).json({ error: `Resource not found` });
  }

  const options = configOptions(resource, ms_port);

  // Now i'm creating a new http request using http.request method
  const request = http.request(options, (response) => {
    let data = "";

    // event emitted when a chunk of data is recieved in response
    response.on("data", (chunk) => {
      data += chunk;
    });

    // event emitted when whole response is recieved
    response.on("end", () => {
      console.log(data);
      res.send(data);
    });
  });

  // If there's error in request
  request.on("error", (err) => {
    console.error(`Error in forwarding request to ${resource}: ${err}`);
    res.status(500).send("Internal server error");
  });

  request.end();
}

module.exports = { service_get };
