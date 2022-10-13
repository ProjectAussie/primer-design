
import { useEffect, useState } from "react"
import primerServices from "../services/primers"
import configServices from "../services/config"
import Pick from "./Pick"
import Form from "./Form"

import AdvConfigs from "../data/AdvConfigs"

// TODO: delete, load configs from some JSON/data file
const configForTest = {
  genome:'canFam3',
  chrom:'chr4',
  loc:39182836,
  targetLength:1,
  normalTargetSeq:'A',
  variantTargetSeq:'T',
  numPrimerPairs:2,
  healthId:'stc_2_size'
}

const emptyStdConfig = {
  genome:'',
  chrom:'',
  loc:'',
  targetLength:'',
  normalTargetSeq:'',
  variantTargetSeq:'',
  numPrimerPairs:'',
  healthId:''
}

//store these two in JSON, extract from JSON

const createAdvConfig = (config) => {
  const newConfig = {...AdvConfigs.empty}
  for (const key in config) {
    newConfig[key] = config[key]
  }
  return newConfig
}

const Create = () => {
  const [defaultAdvConfig, setDefaultAdvConfig] = useState(AdvConfigs.empty)
  const [alternateAdvConfig, setAlternateAdvConfig] = useState(AdvConfigs.empty)

  const [stdConfig, setStdConfig] = useState(configForTest)

  const clearStdConfig = () => setStdConfig(emptyStdConfig)

  const [advConfig, setAdvConfig] = useState(AdvConfigs.empty)

  useEffect(() => {
    configServices
      .get('default')
      .then( data => {
          const newConfig = createAdvConfig(data.config)
          setDefaultAdvConfig(newConfig)
          setAdvConfig(newConfig)
      })
  }, [])

  useEffect( () => {
    configServices
      .get('alternate')
      .then( data => {
        const newConfig = createAdvConfig(data.config)
        setAlternateAdvConfig(newConfig)
    })
  }, [])


  const handleChange = (set, state, isNumber) => {
    return (event) => {
      let value;
      if (event.target.value==='') {
        value = ''
      }
      else if(isNumber) {
        value = Number(event.target.value)
      }
      else {
        value=event.target.value
      }
      set({ ...state, [event.target.name]: value })
    }
  }

  const handleStdConfigNumChange = handleChange(setStdConfig, stdConfig, true)
  const handleStdConfigStrChange = handleChange(setStdConfig, stdConfig, false)
  const handleAdvConfigNumChange = handleChange(setAdvConfig, advConfig, true)

  const presets = {
    default: 0,
    alternate: 1,
    custom: 2
  }

  const [advPreset, setAdvPreset] = useState(presets.default)

  const handleAdvPresetChange = (event) => {
    const newState = Number(event.target.value)
    setAdvPreset(newState)
    if (newState === presets.default){
      setAdvConfig(defaultAdvConfig)
    }
    else if (newState === presets.alternate){
      setAdvConfig(alternateAdvConfig)
    }
    else{
      setAdvConfig(AdvConfigs.empty)
    }
  }

  const [expanded, setExpanded] = useState(false)

  const handleExpandChange = () => {
    setExpanded(!expanded)
  }

  const [primersLoading, setPrimersLoading] = useState(false)

  const clearForm = () => {
    setAdvPreset(presets.default)
    setDefaultAdvConfig()
    clearStdConfig()
  }

  const [primerReportOpen, setPrimerReportOpen] = useState(false)
  const [primerSet, setPrimerSet] = useState({})
  const [primersLoaded, setPrimersLoaded] = useState(false)

  const [cartNotificationOpen, setCartNotificationOpen] = useState(false)
  
  const addToCartReset = () => {
    clearForm()
    setPrimersLoaded(false)
    setCartNotificationOpen(true)
  }

  const createPrimers = (event) => {
    event.preventDefault()
    setPrimersLoading(true)
    primerServices
      .create({standard: stdConfig, advanced: advConfig})
      .then((data) => {
        setPrimersLoading(false)
        setPrimerReportOpen(true)
        setPrimersLoaded(true)
        setPrimerSet(data)
      })
      .catch((error) => console.log("Failed"))
  }

  const handlePrimerReportClose = () => {
    setPrimerReportOpen(false)
  }

  return primersLoaded ? (
  <Pick
    primerReportOpen={primerReportOpen} handlePrimerReportClose={handlePrimerReportClose}
    primersLoaded={primersLoaded} primerSet={primerSet} addToCartReset={addToCartReset}
  /> ): (
  <Form
    createPrimers={createPrimers} stdConfig={stdConfig} handleAdvConfigNumChange={handleAdvConfigNumChange}
    handleStdConfigStrChange={handleStdConfigStrChange} handleStdConfigNumChange={handleStdConfigNumChange}
    advConfig={advConfig} presets={presets} advPreset={advPreset} handleAdvPresetChange={handleAdvPresetChange}
    expanded={expanded} handleExpandChange={handleExpandChange} clearForm={clearForm}
    primersLoading={primersLoading} cartNotificationOpen={cartNotificationOpen}
    setCartNotificationOpen = {setCartNotificationOpen}
  /> )
}

//After primers created, dialog window that says View new primers OR Close
export default Create