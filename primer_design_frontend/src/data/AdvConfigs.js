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
  productMaxSize:600,
  primerMaxTm:'',
  primerOptTm:'',
  primerMinTm:'',
  primerGcClamp:''
}

const empty = {
  sourceSeqLength:'',
  primerOptSize:'',
  primerMinSize:'',
  primerMaxSize:'',
  productMinSize:'',
  productMaxSize:'',
  primerMaxTm:'',
  primerOptTm:'',
  primerMinTm:'',
  primerGcClamp:''
}

const AdvConfigs = {
  standard,
  alternate,
  empty
}

export default AdvConfigs