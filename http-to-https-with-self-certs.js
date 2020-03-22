"use strict";

const Path = require("path");
const Fs = require("fs");
const httpProxy = require("http-proxy");

httpProxy
  .createProxyServer({
    target: {
      protocol: "https:",
      host: "dev.myserver.com",
      port: 8443,
      ca: Fs.readFileSync(Path.resolve("certs/dev-server.crt"), "utf8")
    },
    secure: true,
    changeOrigin: true
  })
  .listen(3000);
