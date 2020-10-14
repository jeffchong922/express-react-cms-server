const logLevel = 0

function info (message) {
  if (logLevel < 1) {
    console.log(`info: ${message}`)
  }
}

function debug (message) {
  if (logLevel < 2) {
    console.log(`debug: ${message}`)
  }
}

function warn (message) {
  if (logLevel < 3) {
    console.log(`debug: ${message}`)
  }
}

function error (message) {
  if (logLevel < 4) {
    console.log(`debug: ${message}`)
  }
}

module.exports = Object.freeze({
  info,
  debug,
  warn,
  error
})