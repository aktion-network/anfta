const htmlmin = require('html-minifier')
const pluginRss = require("@11ty/eleventy-plugin-rss");

const now = String(Date.now())

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.addWatchTarget('./styles/tailwind.config.js')
  eleventyConfig.addWatchTarget('./styles/tailwind.css')

  eleventyConfig.addPassthroughCopy({
    './node_modules/alpinejs/dist/cdn.js': './js/alpine.js',
  })
  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("fonts");
  eleventyConfig.addPassthroughCopy("assets");

  eleventyConfig.addShortcode('version', function () {
    return now
  })

  eleventyConfig.addShortcode("addGenerator", () => {
    return `<meta name="generator" content="Eleventy - 11ty - https://11ty.dev - v${require(`@11ty/eleventy/package.json`).version}">`;
  });
  

  eleventyConfig.addTransform('htmlmin', function (content, outputPath) {
    if (
      process.env.ELEVENTY_PRODUCTION &&
      outputPath &&
      outputPath.endsWith('.html')
    ) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      })
      return minified
    }

    return content
  })

}
