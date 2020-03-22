"use strict";

const Path = require("path");
const Fs = require("fs");
const httpProxy = require("http-proxy");

httpProxy
  .createProxyServer({
    ssl: {
      key: Fs.readFileSync(Path.resolve("certs/dev-proxy.key"), "utf8"),
      cert: Fs.readFileSync(Path.resolve("certs/dev-proxy.crt"), "utf8")
    },
    target: {
      protocol: "https:",
      host: "dev.myserver.com",
      port: 8443,
      ca: Fs.readFileSync(Path.resolve("certs/dev-server.crt"), "utf8")
    },
    secure: true,
    changeOrigin: true
  })
  .listen(443);
