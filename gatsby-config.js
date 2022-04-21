require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: "Codentity Portfolio",
  },
  plugins: [
    {
      resolve: "gatsby-source-wordpress",
      options: {
        url: `${process.env.API_URL}/graphql`,
        useACF: true,
      },
    },
    "gatsby-plugin-sass",
    `gatsby-plugin-image`,
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-transformer-sharp`,
      options: {
        defaults: {
          formats: [`auto`, `webp`, `avif`],
          placeholder: `blurred`,
          quality: 70,
          breakpoints: [750, 1080, 1366, 1920],
          backgroundColor: `transparent`,
        }
      }
    }, // Needed for dynamic images
  ],
};
