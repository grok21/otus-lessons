import { GluegunMenuToolbox } from '@lenne.tech/gluegun-menu';
import { prompt } from 'enquirer';

module.exports = {
  name: 'update-journal',
  description: 'you can update chosen journal by this command',
  hidden: true,
  run: async (toolbox: GluegunMenuToolbox) => {
    
    if (toolbox.fromMenu()) {
      console.log('\n');
      console.log(toolbox.journals);
      console.log('\n');

      const inputJournalIndex = await prompt({
        type: 'input',
        name: 'index',
        message: 'Enter the journal index: '
      });

      if (toolbox.journals[Number.parseInt(inputJournalIndex['index'])]) {
        const inputJournalTitle = await prompt({
          type: 'input',
          name: 'title',
          message: 'Enter new journal title: '
        });
    
        const inputJournalPrice = await prompt({
          type: 'input',
          name: 'price',
          message: 'Enter new journal price: '
        });
        
        toolbox.journals[Number.parseInt(inputJournalIndex['index'])]['title'] = inputJournalTitle['title']
        toolbox.journals[Number.parseInt(inputJournalIndex['index'])]['price'] = Number.parseInt(inputJournalPrice['price'])
        
        toolbox.print.success(`\nChosen journal was updated\n`)
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