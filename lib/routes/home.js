/**
 * 
 * ©2016-2017 EdgeVerve Systems Limited (a fully owned Infosys subsidiary),
 * Bangalore, India. All Rights Reserved.
 * 
 */
'use strict';
const _ = require('lodash');
const chalk = require('chalk');
const fullname = require('fullname');
const inquirer = require('inquirer');
const namespaceToName = require('oe-environment').namespaceToName;
const globalConfigHasContent = require('../utils/global-config').hasContent;
const util = require('util');
require('../utils/print-logo');

module.exports = app => {
  
  const defaultChoices = [
    {
      name: 'Find some help',
      value: 'help'
    }, {
      name: 'Search/Build a Starter App',
      value: {
        method: 'package',
        type: 'starter'
      }
    }, {
      name: 'Search/Experience a Concept',
      value: {
        method: 'package',
        type: 'concept'
      }
    }, {
      name: 'Get me out of here!',
      value: 'exit'
    }];

  if (globalConfigHasContent()) {
    defaultChoices.splice(defaultChoices.length - 1, 0, {
      name: 'Clear global config',
      value: 'clearConfig'
    });
  }

  return fullname().then(name => {
    const userName = name ? `'Hello ${name.split(' ')[0]}! ` : '\'Hello! ';

    return inquirer.prompt([{
      name: 'whatNext',
      type: 'list',
      message: `${userName}What would you like to do?`,
      choices: _.flatten([
        defaultChoices
      ])
    }]).then(answer => {
      // console.log(util.inspect(answer));
      if (answer.whatNext.method === 'run') {
        app.navigate('run', answer.whatNext.generator);
        return;
      }
      if (answer.whatNext.method === 'package') {
        app.navigate('packages', answer.whatNext.type);
        return;
      }
      if (answer.whatNext === 'exit') {
        return;
      }

      app.navigate(answer.whatNext);
    });
  });
};