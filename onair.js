#!/usr/bin/env node

const fs = require('fs')
const readLastLines = require('read-last-lines')
const axios = require('axios')
const program = require('commander')
const path = require('path')
  const os = require('os');

const DEFAULT_LOG_FILE =
  `${os.homedir()}/Library/Containers/at.obdev.MicroSnitch/Data/Library/Logs/Micro Snitch.log`


const start = () => {
  program
    .option('-l, --logfile <logfile>')
    .requiredOption('-h, --host <host>')
    .requiredOption('-k, --key <key>')

  program.parse(process.argv)

  const filename = path.resolve(program.logfile || DEFAULT_LOG_FILE)

  fs.watch(filename, event => {
    console.log('change occured!', event)
    readLastLines.read(filename, 1).then(async line => {
      console.log(line)
      if (line.includes('became active')) {
        console.log('became active')
        const result = await axios.post(
          `${program.host}/api/states/sensor.on_air`,
          {
            state: true
          },
          {
            headers: {
              authorization: `Bearer ${program.key}`
            }
          }
        )
        console.log('result', result.data)
      } else if (line.includes('became inactive')) {
        console.log('became inactive')
        const result = await axios.post(
          `${program.host}/api/states/sensor.on_air`,
          {
            state: false
          },
          {
            headers: {
              authorization: `Bearer ${program.key}`
            }
          }
        )
        console.log('result', result.data)
      }
    })
  })
}

start()
