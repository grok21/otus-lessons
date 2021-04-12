import { GluegunMenuToolbox } from '@lenne.tech/gluegun-menu';
import { GluegunCommand } from 'gluegun';

const command: GluegunCommand = {
  name: 'create',
  description: 'you can create book or journal by this command ',
  run: async (toolbox: GluegunMenuToolbox) => {
    
    if (toolbox.fromMenu()) {
      if (toolbox.isAuthorized) { 
        await toolbox.menu.showMenu('create entities');
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


/*
module.exports = {
  name: 'create',
  description: 'you can create book or journal using',
  hidden: true,
  run: async (toolbox: GluegunMenuToolbox) => {
    await toolbox.menu.showMenu('create entities');
  }
};
*/