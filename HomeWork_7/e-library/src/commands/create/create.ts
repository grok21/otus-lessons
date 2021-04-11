import { GluegunMenuToolbox } from '@lenne.tech/gluegun-menu';
import { GluegunCommand } from 'gluegun';
//import { prompt } from 'enquirer';



const command: GluegunCommand = {
  name: 'create',
  description: 'create command',
  run: async (toolbox: GluegunMenuToolbox) => {
    const { print } = toolbox
    if (toolbox.fromMenu()) {
      print.info('Create Mafaka')
      print.success('Bye')
      
      toolbox.foo()
      await toolbox.menu.showMenu();  
    } else {
      print.error('It\'s forbidden!')
    }
  }
}

module.exports = command