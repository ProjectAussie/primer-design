const axios = require('axios').default

const config_url = 'http://localhost:3001/api/config'

const standard = {
  sourceSeqLength:750,
  primerOptSize:20,
  primerMinSize:19,
  primerMaxSize:25,
  productMinSize:300,
  productMaxSize:600,
  primerMaxTm:64,
  primerOptTm:62,
  primerMinTm:59,
  primerGcClamp:2
}

const alternate = {
  sourceSeqLength:750,
  primerOptSize:20,
  primerMinSize:19,
  primerMaxSize:25,
  productMinSize:300,
  productMaxSize:600
}

axios
  .post(config_url, {
    type: 'default',
    config: standard
  })

axios
  .post(config_url, {
    type: 'alternate',
    config: alternate
  })