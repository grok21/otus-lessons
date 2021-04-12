import { GluegunMenuToolbox } from '@lenne.tech/gluegun-menu';
import { prompt } from 'enquirer';

module.exports = {
  name: 'remove-journal',
  description: 'you can remove chosen journal by this command',
  hidden: true,
  run: async (toolbox: GluegunMenuToolbox) => {
    
    if (toolbox.fromMenu()) {
      console.log('\n');
      console.log(toolbox.journals);
      console.log('\n');

      const inputjournalIndex = await prompt({
        type: 'input',
        name: 'index',
        message: 'Enter the journal index: '
      });

      if (toolbox.journals[inputjournalIndex['index']]) {
        toolbox.journals.splice(inputjournalIndex['index'], 1)
        toolbox.print.success(`\nChosen journal was removed\n`)
        console.log(toolbox.journals);
        console.log('\n');
      } else {
        toolbox.print.error(`\nThere's no journal with specified index\n`)
      }
      await toolbox.menu.showMenu('');
    } else {
      toolbox.print.error('It\'s forbidden!')
    }
  }
};