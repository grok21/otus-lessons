const { build } = require('gluegun')

/**
 * Create the cli and kick it off
 */
async function run(argv) {
  // create a CLI runtime
  const cli = build()
    .brand('e-library')
    .src(__dirname)
    .plugins('./node_modules', { matching: 'e-library-*', hidden: true })
    .plugin(__dirname + '/../node_modules/@lenne.tech/gluegun-menu/dist', {
      commandFilePattern: '*.js',
      extensionFilePattern: '*.js'
    })
    .help() // provides default for help, h, --help, -h
    .version() // provides default for version, v, --version, -v
    .create()
  const toolbox = await cli.run(argv)

  // send it back (for testing, mostly)
  return toolbox
}

module.exports = { run }
