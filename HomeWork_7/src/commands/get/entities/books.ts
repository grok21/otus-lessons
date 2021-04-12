import { GluegunMenuToolbox } from '@lenne.tech/gluegun-menu';

module.exports = {
  name: 'get-books-list',
  description: 'you can print the list of all created books by this command',
  hidden: true,
  run: async (toolbox: GluegunMenuToolbox) => {
    console.log('\nAvailable books:\n');
    console.log(toolbox.books);
    console.log('\n');
    await toolbox.menu.showMenu('');
  }
};