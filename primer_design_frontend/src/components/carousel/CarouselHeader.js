import { Grid, Typography, Button, TextField, ButtonGroup } from "@mui/material"

const CarouselHeader = ({primerSet, handleAddToCart, handleClearChecks, selections,
  handleAutoSelect, handleSelectionsChange}) => {

  const healthId = primerSet.designParameters.standard.healthId
  const genome = primerSet.designParameters.standard.genome
  const chrom = primerSet.designParameters.standard.chrom
  const loc = primerSet.designParameters.standard.loc

  return <Grid container columnSpacing={1} sx={{mb:2}}>
    <Grid item xs = {4}>
      <TextField
        id="number-select"
        type="number"
        min={1}
        max={3}
        value={selections}
        sx ={{maxWidth: 170}}
        onChange={handleSelectionsChange}
        InputProps={{
          endAdornment: <Button onClick={handleAutoSelect}>Auto select </Button>
        }}
      />
    </Grid>
    <Grid item xs={4}>
      <Typography variant="h5" textAlign="center" color="primary">
        {`Primers for ${healthId}`}
      </Typography>
      <Typography variant="body2" textAlign="center" color="secondary">
        {`${genome}, ${chrom}, ${loc}`}
      </Typography>
    </Grid>
    <Grid item xs = {4} sx = {{display:'flex', justifyContent:'flex-end'}}>
      <ButtonGroup orientation="vertical">
        <Button variant="outlined" color="success" onClick={handleAddToCart}>
          Add to Cart
        </Button>
        <Button variant="outlined" color="error" onClick={handleClearChecks}>
          Clear
        </Button>
      </ButtonGroup>
    </Grid>
  </Grid>
}

export default CarouselHeader