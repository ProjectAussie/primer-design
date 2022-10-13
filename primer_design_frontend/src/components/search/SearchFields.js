import ChromosomeSelect from '../common/ChromosomeSelect'
import GenomeSelect from '../common/GenomeSelect'
import LocationField from '../common/LocationField'
import TargetLengthField from '../common/TargetLengthField'
import { Grid } from '@mui/material'

const SearchFields = ({chr, onChrChange, genome, onGenomeChange,
  loc, onLocChange, targetLen, onTargetLenChange}) => {
  return <Grid container columnSpacing={1} rowSpacing={1}>
    <Grid item xs = {6}>
      <GenomeSelect value={genome} onChange={onGenomeChange}/>
    </Grid>
    <Grid item xs = {6}>
      <ChromosomeSelect value={chr} onChange={onChrChange}/>
    </Grid>
    <Grid item xs = {6}>
      <LocationField value={loc} onChange={onLocChange}/>
    </Grid>
    <Grid item xs ={6}>
      <TargetLengthField value={targetLen} onChange={onTargetLenChange}/>
    </Grid>
  </Grid>
}

export default SearchFields