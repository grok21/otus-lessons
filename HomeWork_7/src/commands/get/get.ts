import { GluegunMenuToolbox } from '@lenne.tech/gluegun-menu';
import { GluegunCommand } from 'gluegun';

const command: GluegunCommand = {
  name: 'get',
  description: 'you can get the list of all existing books or journals by this command',
  run: async (toolbox: GluegunMenuToolbox) => {
    const { print } = toolbox
    if (toolbox.fromMenu()) {
      await toolbox.menu.showMenu('get entities');  
    } else {
      print.error('It\'s forbidden!')
    }
  }
}

module.exports = command