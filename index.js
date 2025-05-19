#!/usr/bin/env node

import { program } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import degit from 'degit';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Setup the CLI
program
  .name('create-vite-island')
  .description('Create a new Vite Island Architecture project')
  .argument('[directory]', 'Directory to create the project in')
  .option('-y, --yes', 'Skip all prompts and use defaults')
  .option('--no-install', 'Skip package installation')
  .action(async (directory, options) => {
    try {
      // If no directory provided, ask for one unless --yes flag is used
      if (!directory && !options.yes) {
        const answers = await inquirer.prompt([
          {
            type: 'input',
            name: 'directory',
            message: 'Project directory:',
            default: 'my-vite-island',
          },
        ]);
        directory = answers.directory;
      } else if (!directory && options.yes) {
        directory = 'my-vite-island';
      }

      // Create the directory if it doesn't exist
      if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
      }

      console.log(
        chalk.blue('\n🏝️  Creating a new Vite Island Architecture project...\n')
      );

      // Clone the template from GitHub
      const spinner = ora('Downloading template...').start();

      try {
        // Use your correct repo name
        const emitter = degit('jonathanmoore/vite-island');
        await emitter.clone(directory);
        spinner.succeed('Template downloaded successfully!');
      } catch (error) {
        spinner.fail('Failed to download template');
        console.error(chalk.red(error));
        process.exit(1);
      }

      // Install dependencies if not skipped
      if (options.install) {
        const installSpinner = ora('Installing dependencies...').start();
        try {
          execSync('npm install', { cwd: directory, stdio: 'ignore' });
          installSpinner.succeed('Dependencies installed successfully!');
        } catch (error) {
          installSpinner.fail('Failed to install dependencies');
          console.error(
            chalk.red('You can try installing them manually with npm install')
          );
        }
      } else {
        console.log(chalk.yellow('Skipping dependency installation.'));
      }

      console.log(
        chalk.green(`
✅ Vite Island project created successfully in ${chalk.bold(directory)}!

To get started:
  ${chalk.blue(`cd ${directory}`)}
  ${options.install ? '' : chalk.blue('npm install')}
  ${chalk.blue('npm run dev')}

For more information, check out the README.md file in your project.
      `)
      );

      // Explicitly exit the process with success code
      process.exit(0);
    } catch (error) {
      console.error(chalk.red('An unexpected error occurred:'));
      console.error(error);
      process.exit(1);
    }
  });

program.parse();
