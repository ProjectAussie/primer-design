import {Accordion, AccordionDetails, AccordionSummary, Typography,
FormControl, RadioGroup, FormControlLabel, Radio} from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AdvForm from "./AdvForm";

const AdvFormAccordion = ({config, handleConfigNumChange, presets, preset, handlePresetChange,
  expanded, handleExpandChange}) => {

  const isDisabled = () => preset === presets.default || preset === presets.alternate

  return <Accordion expanded={expanded} onChange={handleExpandChange}>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon/>}
      aria-controls="advanced-config-header"
      id="advanced-config-header">
        <Typography variant="h6" component="h3" color="primary">
          Advanced Configurations
        </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <FormControl>
        <RadioGroup row value={preset} onChange= {handlePresetChange} >
          <FormControlLabel value={presets.default} control={<Radio/>} label="Default"/>
          <FormControlLabel value={presets.alternate} control={<Radio/>} label="Alternate"/>
          <FormControlLabel value={presets.custom} control={<Radio/>} label="Custom"/>
        </RadioGroup>
      </FormControl>
      <AdvForm config={config} handleConfigNumChange={handleConfigNumChange}
        isDisabled={isDisabled}/>
    </AccordionDetails>
  </Accordion>
}

export default AdvFormAccordion