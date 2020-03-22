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
      host: "www.google.com",
      port: 443
    },
    secure: true,
    changeOrigin: true
  })
  .listen(443);
