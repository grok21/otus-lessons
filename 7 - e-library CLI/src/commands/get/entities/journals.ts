import { GluegunMenuToolbox } from '@lenne.tech/gluegun-menu';

module.exports = {
  name: 'get-journals-list',
  description: 'you can print the list of all created journals by this command',
  hidden: true,
  run: async (toolbox: GluegunMenuToolbox) => {
    console.log('\nAvailable journals:\n');
    console.log(toolbox.journals);
    console.log('\n');
    await toolbox.menu.showMenu('');
  }
};