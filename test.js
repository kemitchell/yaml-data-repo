// This module validates the JSON Schema and data records.
import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import fs from 'node:fs'
import records from './load.js'
import tape from 'tape'
import yaml from 'js-yaml'

const ajv = new Ajv({ allErrors: true })
addFormats(ajv)

const schema = yaml.load(fs.readFileSync('schema.yml', 'utf8'), { schema: yaml.JSON_SCHEMA })

tape('schema', test => {
  test.assert(ajv.validateSchema(schema), 'valid JSON Schema')
  test.end()
})

const validate = ajv.compile(schema)

tape('records conform to schema', test => {
  for (const { file, record } of records) {
    validate(record)
    test.deepEqual(validate.errors, null, file)
  }
  test.end()
})
