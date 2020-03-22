const httpProxy = require("http-proxy");

httpProxy
  .createProxyServer({
    target: {
      protocol: "https:",
      host: "www.google.com",
      port: 443
    },
    secure: true,
    changeOrigin: true
  })
  .listen(8000);
