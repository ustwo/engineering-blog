module.exports = {
  headers: [
    {
      source: `/*`,
      headers: [
        {
          key: `X-Frame-Options`,
          value: `DENY`,
        },
        {
          key: `Content-Security-Policy`,
          value: `frame-ancestors 'none'`,
        }
      ]
    }
  ],
  plugins: [
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`,
      },
    },
  ]
}
