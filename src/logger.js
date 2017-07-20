/* eslint-disable no-console */
const chalk = require('chalk')
const cheerio = require('cheerio')
const logSymbols = require('log-symbols')
const escapeGoat = require('escape-goat')

exports.blank = () => {
  console.log('')
}

const tab = (msg, count = 1) => {
  const tabs = []

  for (let i = 0; i < count; i++) {
    tabs.push('    ')
  }

  return `${tabs.join('')}${msg}`
}

exports.tab = tab

exports.underline = msg => {
  console.log(tab(`${chalk.underline.white(msg)}`))
}

exports.title = msg => {
  console.info(tab(chalk.bgBlue(`>>> ${msg} <<<`)))
}

exports.info = msg => {
  console.info(tab(`${logSymbols.info} ${chalk.cyan(msg)}`))
}

exports.error = data => {
  const isObject = typeof data === 'object'
  const message = isObject ? `${data.message}` : data

  console.error(tab(`${logSymbols.error} ${message}`))

  if (isObject && data.snippet) {
    console.info(tab(`${logSymbols.info} ${data.snippet}`))
  }
}

// Error log for theme-check
exports.error2 = data => {
  const $ = cheerio.load(data.message)
  $('strong').each((i, el) => {
    $(el).replaceWith(() => chalk.magenta(escapeGoat.unescape($(el).text())))
  })

  $('a').each((i, el) => {
    $(el).replaceWith(() => chalk.underline.blue($(el).attr('href')))
  })

  const message = escapeGoat.unescape($('body').html())
  console.error(tab(`${logSymbols[data.type]} ${message}`))
}

exports.done = msg => {
  console.log(tab(`${logSymbols.success} ${chalk.green(msg)}`))
}
