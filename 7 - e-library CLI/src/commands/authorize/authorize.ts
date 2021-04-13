import { GluegunMenuToolbox } from '@lenne.tech/gluegun-menu';
import { prompt } from 'enquirer';

module.exports = {
  name: 'authorize',
  description: 'you can authorize by this command',
  hidden: true,
  run: async (toolbox: GluegunMenuToolbox) => {
    
    const inputLogin = await prompt({
      type: 'input',
      name: 'login',
      message: 'Login: '
    });

    const user = toolbox.users.find(user => user['login'] === inputLogin['login'])
    
    if (user) {
      const inputPassword = await prompt({
        type: 'input',
        name: 'password',
        message: 'Password: '
      });

      console.log('Input: ' + inputPassword['password']);
      console.log('User: ' + user['password']);
      
      
      if (inputPassword['password'] === user['password']) {
        toolbox.isAuthorized = true
        toolbox.print.success('\nSuccess! Now you are authorized\n')
      } else {
        toolbox.print.error('\nError! Incorrect password\n')
      }
    } else {
      toolbox.print.error('\nError! User with this login doesn\'t exist\n')
    }
    await toolbox.menu.showMenu('');
  }
};