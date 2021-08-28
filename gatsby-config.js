/* eslint-disable prefer-object-spread */

module.exports = {
  siteMetadata: {
    title: `Sosyomatch`,
    description: `Gerçek ve Dijital Dünyanın Yaşam Sanatı.`,
    siteUrl: `https://www.sanatkafa.com`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/src/assets`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `SanatKafa`,
        short_name: `SanatKafa`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#000000`,
        display: `standalone`,
        icon: `${__dirname}/src/assets/favicon-512x512.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        baseUrl: `vnh.523.myftpupload.com`,
        protocol: `https`,
        hostingWPCOM: false,
        useACF: true,
        verboseOutput: true,
        includedRoutes: [
          `**/categories`,
          `**/posts`,
          `**/pages`,
          `**/media`,
          `**/tags`,
          `**/taxonomies`,
          `**/users`,
          `**/menus`,
        ],
      },
    },
    {
      resolve: `gatsby-plugin-mailchimp`,
      options: {
        endpoint: `https://sosyomatch.us18.list-manage.com/subscribe/post?u=f88d62f398faacc03cf933bd3&amp;id=c15d31cb84`,
      },
    },
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-slug`,
    `gatsby-plugin-catch-links`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-166328289-1`,
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site: wordpressPage(slug: {eq: "homepage"}) {
              siteMetadata: yoast {
                title
                description: metadesc
                siteUrl: canonical
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allWordpressPost } }) => {
              return allWordpressPost.edges.map((edge) => {
                return Object.assign({}, edge.node.author, {
                  title: edge.node.title,
                  description: edge.node.excerpt,
                  url: `${site.siteMetadata.siteUrl}/${edge.node.slug}`,
                  guid: edge.node.id,
                  creator: edge.node.author.name,
                  date: edge.node.date,
                });
              });
            },
            query: `
              {
                allWordpressPost(sort: {fields: date, order: DESC}) {
                  edges {
                    node {
                      id
                      title
                      excerpt
                      author {
                        name
                      }
                      slug
                      date
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: 'SanatKafa',
            match: '^/post/',
            link: 'https://sanatkafa.com/',
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/sitemap.xml`,
        exclude: [`/homepage`],
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://www.sanatkafa.com',
        sitemap: 'https://www.sanatkafa.com/sitemap.xml',
        policy: [
          {
            userAgent: '*',
            allow: '/',
          },
        ],
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};

/* eslint-enable prefer-object-spread */
