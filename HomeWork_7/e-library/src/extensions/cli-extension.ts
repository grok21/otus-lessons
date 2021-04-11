import { GluegunToolbox } from 'gluegun'

module.exports = (toolbox: GluegunToolbox) => {
  toolbox.foo = () => {
    toolbox.print.info('called foo extension')
  }

  toolbox.users = []
  toolbox.isAuthorized = false
  
  toolbox.books = []
  toolbox.journals = []
}
