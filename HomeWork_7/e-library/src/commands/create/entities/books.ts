import { GluegunMenuToolbox } from '@lenne.tech/gluegun-menu';
import { prompt } from 'enquirer';

module.exports = {
  name: 'create-book',
  description: 'create-descr',
  hidden: true,
  run: async (toolbox: GluegunMenuToolbox) => {
    
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

    toolbox.books.push({title: inputTitle['title'], price: inputPrice['price']})
    toolbox.print.success(`\nThe book '${inputTitle['title']}' was created\n`)
    console.log(toolbox.books);
    console.log('\n');
    await toolbox.menu.showMenu('');
  }
};