import { GluegunMenuToolbox } from '@lenne.tech/gluegun-menu';
import { prompt } from 'enquirer';

module.exports = {
  name: 'create-journal',
  description: 'you can create new journal by this command',
  hidden: true,
  run: async (toolbox: GluegunMenuToolbox) => {
    if (toolbox.fromMenu()) {
      const inputTitle = await prompt({
        type: 'input',
        name: 'title',
        message: 'Enter the book journal: '
      });

      const inputPrice = await prompt({
        type: 'input',
        name: 'price',
        message: 'Enter the journal price: '
      });

      toolbox.journals.push({title: inputTitle['title'], price: Number.parseInt(inputPrice['price'])})
      toolbox.print.success(`\nThe journal '${inputTitle['title']}' was created\n`)
      console.log(toolbox.journals);
      console.log('\n');
      await toolbox.menu.showMenu('');
    } else {
      toolbox.print.error('It\'s forbidden!')
    }
  }
};