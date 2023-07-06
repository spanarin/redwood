import fs from 'fs'
import path from 'path'

import { Listr } from 'listr2'

import { errorTelemetry } from '@redwoodjs/telemetry'

import { getPaths, writeFile } from '../../../lib'
import c from '../../../lib/colors'

export const handler = async ({ force, verbose, dockerCompose }) => {
  const tasks = new Listr(
    [
      {
        title: 'Adding Dockerfile...',
        task: () => {
          const targetPath = path.join(getPaths().base, 'Dockerfile')
          const templatePath = path.join(
            __dirname,
            'templates',
            'Dockerfile.template'
          )
          const templateContent = fs.readFileSync(templatePath, {
            encoding: 'utf-8',
            flag: 'r',
          })
          writeFile(targetPath, templateContent, { overwriteExisting: force })
        },
      },
      {
        title: 'Adding docker-compose.yml...',
        skip: () => !dockerCompose,
        task: () => {
          const targetPath = path.join(getPaths().base, 'docker-compose.yml')
          const templatePath = path.join(
            __dirname,
            'templates',
            'docker-compose.yml.template'
          )
          const templateContent = fs.readFileSync(templatePath, {
            encoding: 'utf-8',
            flag: 'r',
          })
          writeFile(targetPath, templateContent, { overwriteExisting: force })
        },
      },
    ],
    {
      rendererOptions: { collapseSubtasks: false },
      renderer: verbose ? 'verbose' : 'default',
    }
  )

  try {
    await tasks.run()
  } catch (e) {
    errorTelemetry(process.argv, e.message)
    console.error(c.error(e.message))
    process.exit(e?.exitCode || 1)
  }
}
