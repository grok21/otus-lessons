import { GluegunMenuToolbox } from '@lenne.tech/gluegun-menu';
import { prompt } from 'enquirer';

module.exports = {
  name: 'register',
  description: 'you can create new account by this command',
  hidden: true,
  run: async (toolbox: GluegunMenuToolbox) => {
    
    const inputLogin = await prompt({
      type: 'input',
      name: 'login',
      message: 'Login: '
    });

    const inputPassword = await prompt({
      type: 'input',
      name: 'password',
      message: 'Password: '
    });

    toolbox.users.push({login: inputLogin['login'], password: inputPassword['password']})
    toolbox.print.success(`\nUser '${inputLogin['login']}' created\n`)

    await toolbox.menu.showMenu('');
  }
};