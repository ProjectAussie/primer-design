import { Typography, Grid, TextField } from "@mui/material"
import ChromosomeSelect from "../common/ChromosomeSelect";
import GenomeSelect from "../common/GenomeSelect";
import LocationField from "../common/LocationField";
import TargetLengthField from "../common/TargetLengthField";

const StdForm = ({config, handleConfigNumChange, handleConfigStrChange}) => {
  
  return <Grid container rowSpacing={2} columnSpacing={1}>
    <Grid item xs={12}>
      <Typography variant="h5" component="h2" color="primary">
        General Configurations
      </Typography>
      <Typography variant="h6" component="h3" color="secondary" sx={{fontSize: 15}}>
        Standard Mutation Definition:
      </Typography>
    </Grid>
    <Grid item xs={12}>
      <GenomeSelect
        value={config.genome}
        onChange={handleConfigStrChange}
      />
    </Grid>
    <Grid item xs={12}>
      <ChromosomeSelect
        value={config.chrom}
        onChange={handleConfigStrChange}
      />
    </Grid>
    <Grid item xs = {12}>
      <LocationField
        value={config.loc}
        onChange={handleConfigNumChange}
      />
    </Grid>
    <Grid item xs = {12}>
      <TargetLengthField
        value={config.targetLength}
        onChange={handleConfigNumChange}
      />
    </Grid>
    <Grid item xs={12}>
      <Typography variant="h6" component="h3" color="secondary" sx={{fontSize: 15}}>
        Mutation:
      </Typography>
    </Grid>
    <Grid item xs = {6}>
      <TextField
          label="Normal Sequence"
          variant="outlined"
          placeholder="eg. A"
          name="normalTargetSeq"
          value={config.normalTargetSeq}
          onChange={handleConfigStrChange}
          required
          fullWidth
        />
    </Grid>
    <Grid item xs = {6}>
      <TextField
          label="Variant Sequence"
          variant="outlined"
          placeholder="eg. GT"
          name="variantTargetSeq"
          value={config.variantTargetSeq}
          onChange={handleConfigStrChange}
          required
          fullWidth
        />
    </Grid>
    <Grid item xs={12}>
      <Typography variant="h6" component="h3" color="secondary" sx={{fontSize: 15}}>
        Configurations:
      </Typography>
    </Grid>
    <Grid item xs = {12} sm = {6}>
      <TextField
          label="Number of Primer Pairs"
          variant="outlined"
          placeholder="eg. 2"
          type="number"
          name="numPrimerPairs"
          value={config.numPrimerPairs}
          onChange={handleConfigNumChange}
          required
          fullWidth
        />
    </Grid>
    <Grid item xs = {612} sm = {6}>
      <TextField
          label="Health ID"
          variant="outlined"
          placeholder="eg. LEMP"
          name="healthId"
          value={config.healthId}
          onChange={handleConfigStrChange}
          required
          fullWidth
        />
    </Grid>
  </Grid>
}

export default StdForm