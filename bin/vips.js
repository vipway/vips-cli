#!/usr/bin/env node

const program = require('commander');
const chalk = require('chalk');
const semver = require('semver');
const requiredVersion = require('../package.json').engines.node;
const loadCommand = require('../lib/util/loadCommand');
const fetchRemotePreset = require('../lib/util/fetchRemotePreset')

if (!semver.satisfies(process.version, requiredVersion)) {
  console.log(chalk.red(
    `You are using Node ${process.version}, but this version of vue-cli ` +
    `requires Node ${requiredVersion}.\nPlease upgrade your Node version.`
  ))
  process.exit(1)
}

program
  .version(require('../package.json').version)
  .option('-i, --init <template> <app-name>', '初始化项目文件夹');

program
  .command('init <template> <app-name>')
  .description('generate a project from a remote template (legacy API, requires @vue/cli-init)')
  .action(() => {
    const params = process.argv.slice(process.argv.indexOf('init') + 1);
    fetchRemotePreset(params[0],params[1]);
  })

program
  .command('*')
  .action(function (env) {
    console.log('deploying "%s"', env);
  });
  
// add some useful info on help
program.on('--help', () => {
  console.log()
  console.log(`  Run ${chalk.cyan(`vips <command> --help`)} for detailed usage of given command.`)
  console.log()
})

program.commands.forEach(c => c.on('--help', () => console.log()))
program.parse(process.argv);