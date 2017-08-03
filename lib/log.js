const chalk = require('chalk');

module.exports = {
  log(message) {
    console.log(message);
  },
  warn(message) {
    this.log(chalk.yellow.bold(message));
  },
  error(message) {
    this.log(chalk.red.bold(message));
  },
};
