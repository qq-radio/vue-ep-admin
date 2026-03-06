const readline = require('readline')
const prettier = require('prettier')
const parserHtml = require('prettier/parser-html')
const parserBabel = require('prettier/plugins/babel')
const parserEstree = require('prettier/plugins/estree')
const parserPostCss = require('prettier/plugins/postcss')
const parserTypescript = require('prettier/plugins/typescript')
const parserMarkdown = require('prettier/plugins/markdown')

module.exports = {
  enquire(question) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })
    return new Promise((resolve) =>
      rl.question(question, (answer) => {
        rl.close()
        resolve(answer)
      }),
    )
  },

  parseVue(content) {
    return prettier.format(content, {
      parser: 'vue',
      plugins: [parserHtml, parserPostCss, parserBabel, parserEstree],
      semi: false,
      singleQuote: true,
    })
  },
  parseTs(content) {
    return prettier.format(content, {
      parser: 'typescript',
      plugins: [parserTypescript, parserEstree],
      semi: false,
      singleQuote: true,
    })
  },
  parseScss(content) {
    return prettier.format(content, {
      parser: 'scss',
      semi: false,
      singleQuote: true,
    })
  },
  parserMd(content) {
    return prettier.format(content, {
      parser: 'markdown',
      plugins: [parserMarkdown],
    })
  },
  cacabToPascal(name) {
    return name
      .split('-')
      .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
      .join('')
  },
}
