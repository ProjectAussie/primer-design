import { Typography, Grid, RadioGroup, Radio, FormControlLabel,
  FormGroup, Switch, Button} from "@mui/material"
import { useEffect, useState } from "react"
import AdvConfigs from "../../data/AdvConfigs"
import AdvForm from "../form/AdvForm"
import configServices from "../../services/config"

const createConfig = (config) => {
  const newConfig = {...AdvConfigs.empty}
  for (const key in config) {
    newConfig[key] = config[key]
  }
  return newConfig
}

const UserConfig = () => {

  const presets = {
    default: 0,
    alternate: 1
  }
  const [preset, setPreset] = useState(0)
  const [checked, setChecked] = useState(false)
  const [config, setConfig] = useState(AdvConfigs.empty)
  const [defaultConfig, setDefaultConfig] = useState({
    type: 'default',
    config: AdvConfigs.empty })
  const [alternateConfig, setAlternateConfig] = useState({
    type: 'alternate',
    config: AdvConfigs.empty})


  useEffect( () => {
    configServices
      .get('default')
      .then( data => {
        const newConfig = createConfig(data.config)
        setDefaultConfig({
          ...data,
          config: newConfig
        })
        setConfig(newConfig)
      })
  }, [])

  useEffect( () => {
    configServices
      .get('alternate')
      .then( data => {
        const newConfig = createConfig(data.config)
        setAlternateConfig({
          ...data,
          config: newConfig
        })
      })
  }, [])

  const handleCheckedChange = () => {
    setChecked(!checked)
  }

  const handleConfigChange = (event) => {
    let value;
    if (event.target.value === "") {
      value = ""
    }
    else {
      value = Number(event.target.value)
    }
    setConfig({...config, [event.target.name]:value})
  }

  const handlePresetChange = (event) => {
    const newPreset = Number(event.target.value)
    setPreset(newPreset)
    if (newPreset === presets.default) {
      setConfig(defaultConfig.config)
    }
    else {
      setConfig(alternateConfig.config)
    }
  }

  const handleSave = (event) => {
    let id
    if (preset === presets.default) {
      id = defaultConfig.id
      configServices
        .update(id, {
          ...defaultConfig,
          config: config
        })
        .then( (newConfig) => {
          setDefaultConfig(newConfig)
        })
    } else {
      id = alternateConfig.id
      configServices
        .update(id, {
          ...alternateConfig,
          config: config
        })
        .then( (newConfig) => setAlternateConfig(newConfig))
    }
  }

  return <Grid container rowSpacing={2}>
    <Grid item xs = {12}>
      <Typography variant="h5" color="primary">
        Your Primer Configurations:
      </Typography>
    </Grid>
    <Grid item xs = {8}>
      <RadioGroup row value={preset} onChange= {handlePresetChange} >
        <FormControlLabel value={presets.default} control={<Radio/>} label="Default"/>
        <FormControlLabel value={presets.alternate} control={<Radio/>} label="Alternate"/>
      </RadioGroup>
    </Grid>
    <Grid item xs = {2} sx = {{display:'flex', justifyContent:'flex-end'}}>
      <FormGroup>
        <FormControlLabel control={
            <Switch checked={checked} onChange={handleCheckedChange} />
          } label="Edit" />
      </FormGroup>
    </Grid>
    <Grid item xs = {2} sx ={{display:'flex', justifyContent:'flex-start'}}>
      <Button variant="contained" onClick={handleSave}> Save </Button>
    </Grid>
    <Grid item xs = {12}>
      <AdvForm config={config} handleConfigNumChange={handleConfigChange}
        isDisabled={() => !checked} />
    </Grid>
  </Grid>
}

export default UserConfig