module.exports = function loadCommand(commandName, moduleName) {
  console.log('commandName', commandName);
  console.log('moduleName', moduleName);
  const isNotFoundError = err => {
    return err.message.match(/Cannot find module/)
  }
  try {
    return require(moduleName);
  } catch (err) {
    if (isNotFoundError(err)) {
      try {
        return require('import-global')(moduleName)
      } catch (err2) {
        if (isNotFoundError(err2)) {
          const chalk = require('chalk');
          const hasYarn = () => false;
          const installCommand = hasYarn() ? `yarn global add` : `npm install -g`
          console.log()
          console.log(
            `  Command ${chalk.cyan(`vue ${commandName}`)} requires a global addon to be installed.\n` +
            `  Please run ${chalk.cyan(`${installCommand} ${moduleName}`)} and try again.`
          );
          console.log();
          process.exit(1);
        } else {
          throw err2
        }
      }
    } else {
      throw err
    }
  }
}
