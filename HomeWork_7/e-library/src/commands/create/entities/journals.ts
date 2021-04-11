import { GluegunMenuToolbox } from '@lenne.tech/gluegun-menu';

module.exports = {
  name: 'create-journal',
  description: 'create-descr',
  hidden: true,
  run: async (toolbox: GluegunMenuToolbox) => {
    await toolbox.menu.showMenu('');
  }
};