import { GluegunMenuToolbox } from '@lenne.tech/gluegun-menu';
import { prompt } from 'enquirer';

module.exports = {
  name: 'remove-book',
  description: 'you can remove chosen book by this command',
  hidden: true,
  run: async (toolbox: GluegunMenuToolbox) => {
    
    if (toolbox.fromMenu()) {
      console.log('\n');
      console.log(toolbox.books);
      console.log('\n');

      const inputBookIndex = await prompt({
        type: 'input',
        name: 'index',
        message: 'Enter the book index: '
      });

      if (toolbox.books[inputBookIndex['index']]) {
        toolbox.books.splice(inputBookIndex['index'], 1)
        toolbox.print.success(`\nChosen book was removed\n`)
        console.log(toolbox.books);
        console.log('\n');
      } else {
        toolbox.print.error(`\nThere's no book with specified index\n`)
      }
      
      await toolbox.menu.showMenu('');
    } else {
      toolbox.print.error('It\'s forbidden!')
    }
  }
};