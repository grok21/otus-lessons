import { GluegunMenuToolbox } from '@lenne.tech/gluegun-menu';
import { GluegunCommand } from 'gluegun';

const command: GluegunCommand = {
  name: 'remove',
  description: 'you can remove book or journal by this command ',
  run: async (toolbox: GluegunMenuToolbox) => {
    if (toolbox.fromMenu()) {
      if (toolbox.isAuthorized) { 
        await toolbox.menu.showMenu('remove entities');
      } else {
        toolbox.print.error('\nFirstly you have to authorize!!!\n')
        await toolbox.menu.showMenu('');
      }
    } else {
      toolbox.print.error('It\'s forbidden!')
    }
  }
}

module.exports = command