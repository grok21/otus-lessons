import { GluegunMenuToolbox } from '@lenne.tech/gluegun-menu';
import { GluegunCommand } from 'gluegun';
//import { prompt } from 'enquirer';



const command: GluegunCommand = {
  name: 'create',
  description: 'you can create book or journal by this command ',
  run: async (toolbox: GluegunMenuToolbox) => {
    const { print } = toolbox
    if (toolbox.fromMenu()) {
      //print.info('Create Mafaka')
      //print.success('Bye')
      
      //toolbox.foo()
      await toolbox.menu.showMenu('create entities');  
    } else {
      print.error('It\'s forbidden!')
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