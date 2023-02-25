// Config options to forward the request to the appropriate microservice
configOptions = (path, port) => {
    const options = {
      hostname: "localhost",
      path: `/${path}`,
      port: port,
      method: "GET",
    };
  
    return options;
  };
  
  module.exports = { configOptions };
  