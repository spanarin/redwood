import { hideBin } from 'yargs/helpers'
import yargs from 'yargs/yargs'

import { command, description, builder } from '../commands/up'
import { handler } from '../commands/upHandler'

yargs(hideBin(process.argv))
  // @ts-expect-error not sure why TS is complaining here, builder can be a function.
  .command(command, description, builder, handler)
  .parse()
