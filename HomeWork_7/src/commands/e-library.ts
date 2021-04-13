import { GluegunCommand } from 'gluegun'

const command: GluegunCommand = {
  name: 'e-library',
  run: async toolbox => {
    const { print } = toolbox
    print.info('\nWelcome to the e-library\nYou can create, remove and update books and journals here\nOf course, you can also print appropriate lists\nBut firstly you have to authorize...\n')
    await toolbox.menu.showMenu('');
  }
}

module.exports = command
