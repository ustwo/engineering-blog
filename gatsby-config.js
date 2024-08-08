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
    `gatsby-transformer-sharp`,
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/src/content`,
      },
    }
  ]
}
