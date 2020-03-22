"use strict";

const Path = require("path");
const Fs = require("fs");
const redbird = require("@jchip/redbird");

const proxy = redbird({
  port: 3001,
  secure: true,
  ssl: {
    port: 443,
    key: Path.resolve("certs/dev-proxy.key"),
    cert: Path.resolve("certs/dev-proxy.crt")
  }
});

proxy.register(
  "https://dev.mydomain.com/mitm",
  "https://dev.myserver.com/hello",
  {
    ssl: {
      key: Path.resolve("certs/dev-proxy.key"),
      cert: Path.resolve("certs/dev-proxy.crt")
    },
    changeOrigin: true
  }
);
