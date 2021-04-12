import { GluegunMenuToolbox } from '@lenne.tech/gluegun-menu';
import { prompt } from 'enquirer';

module.exports = {
  name: 'update-book',
  description: 'you can update chosen book by this command',
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

      if (toolbox.books[Number.parseInt(inputBookIndex['index'])]) {
        const inputBookTitle = await prompt({
          type: 'input',
          name: 'title',
          message: 'Enter new book title: '
        });
    
        const inputBookPrice = await prompt({
          type: 'input',
          name: 'price',
          message: 'Enter new book price: '
        });
        
        toolbox.books[Number.parseInt(inputBookIndex['index'])]['title'] = inputBookTitle['title']
        toolbox.books[Number.parseInt(inputBookIndex['index'])]['price'] = Number.parseInt(inputBookPrice['price'])
        
        toolbox.print.success(`\nChosen book was updated\n`)
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