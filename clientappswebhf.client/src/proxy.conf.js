const PROXY_CONFIG = [
  {
    context: [
      "/ClientAppsHf",
    ],
    target: "https://localhost:7267",
    secure: false
  }
]

module.exports = PROXY_CONFIG;
