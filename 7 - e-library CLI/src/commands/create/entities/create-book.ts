import { GluegunMenuToolbox } from '@lenne.tech/gluegun-menu';
import { prompt } from 'enquirer';

module.exports = {
  name: 'create-book',
  description: 'you can create new book by this command',
  hidden: true,
  run: async (toolbox: GluegunMenuToolbox) => {
    
    if (toolbox.fromMenu()) {  
      const inputTitle = await prompt({
        type: 'input',
        name: 'title',
        message: 'Enter the book title: '
      });
    
      const inputPrice = await prompt({
        type: 'input',
        name: 'price',
        message: 'Enter the book price: '
      });
    
      toolbox.books.push({title: inputTitle['title'], price: Number.parseInt(inputPrice['price'])})
      toolbox.print.success(`\nThe book '${inputTitle['title']}' was created\n`)
      console.log(toolbox.books);
      console.log('\n');
      await toolbox.menu.showMenu('');
    } else {
      toolbox.print.error('It\'s forbidden!')
    }
  }
};