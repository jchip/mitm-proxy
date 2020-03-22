"use strict";

const Path = require("path");
const Fs = require("fs");
const es = require("electrode-server");

es({
  connection: {
    port: 8443,
    tls: {
      key: Fs.readFileSync(Path.resolve("certs/dev-server.key")),
      cert: Fs.readFileSync(Path.resolve("certs/dev-server.crt"))
    }
  },
  plugins: {
    setupRoutes: {
      register(server) {
        server.route({
          method: "get",
          path: "/hello",
          handler: () => {
            return "hello world";
          }
        });
      }
    }
  }
});
