// This module loads all data records from disk.
import fs from 'node:fs'
import path from 'node:path'
import yaml from 'js-yaml'
import postprocess from './postprocess.js'

export default fs.readdirSync('records').map(file => {
  const record = yaml.load(
    fs.readFileSync(path.join('records', file), 'utf8'),
    { schema: yaml.JSON_SCHEMA }
  )
  postprocess(record)
  return { file, record }
})
