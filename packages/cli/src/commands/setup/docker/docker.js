import { recordTelemetryAttributes } from '@redwoodjs/cli-helpers'

export const command = 'docker'

export const description = 'Setup dockerfiles for your RedwoodJS project'

export const builder = (yargs) => {
  yargs.option('force', {
    alias: 'f',
    default: false,
    description: 'Overwrite existing configuration',
    type: 'boolean',
  })
  yargs.option('verbose', {
    alias: 'v',
    default: false,
    description: 'Print more logs',
    type: 'boolean',
  })
  yargs.option('docker-compose', {
    default: true,
    description: 'Whether a docker-compose.yml file should be generated',
    type: 'boolean',
  })
}

export const handler = async (options) => {
  recordTelemetryAttributes({
    command: 'setup docker',
    force: options.force,
    verbose: options.verbose,
    dockerCompose: options.dockerCompose,
  })
  const { handler } = await import('./dockerHandler.js')
  return handler(options)
}
