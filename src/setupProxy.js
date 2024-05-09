const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://demo-front.probatix.de",
      changeOrigin: true,
    })
  );
};
