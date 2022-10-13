import { Typography, Grid, TextField} from "@mui/material"

const AdvForm = ({config, handleConfigNumChange, isDisabled}) => {
    
    return <Grid container rowSpacing={2} columnSpacing={1}>
      <Grid item xs={12}>
        <TextField
          type="number"
          label="Source Sequence Length"
          name="sourceSeqLength"
          value={config.sourceSeqLength}
          variant="outlined"
          onChange={handleConfigNumChange}
          disabled= {isDisabled()}
          fullWidth
          />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" component="h3" color="secondary" sx={{fontSize: 15}}>
          Primer Configurations:
        </Typography>
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          type="number"
          label="Primer Optimal Size"
          name="primerOptSize"
          value={config.primerOptSize}
          variant="outlined"
          onChange={handleConfigNumChange}
          disabled= {isDisabled()}
          fullWidth
          />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          type="number"
          label="Primer Minimum Size"
          name="primerMinSize"
          value={config.primerMinSize}
          variant="outlined"
          onChange={handleConfigNumChange}
          disabled= {isDisabled()}
          fullWidth
          />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          type="number"
          label="Primer Maximum Size"
          name="primerMaxSize"
          value={config.primerMaxSize}
          variant="outlined"
          onChange={handleConfigNumChange}
          disabled= {isDisabled()}
          fullWidth
          />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          type="number"
          label="Primer Max Tm"
          name="primerMaxTm"
          value={config.primerMaxTm}
          variant="outlined"
          onChange={handleConfigNumChange}
          disabled= {isDisabled()}
          fullWidth
          />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          type="number"
          label="Primer Optimum Tm"
          name="primerOptTm"
          value={config.primerOptTm}
          variant="outlined"
          onChange={handleConfigNumChange}
          disabled= {isDisabled()}
          fullWidth
          />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          type="number"
          label="Primer Minimum Tm"
          name="primerMinTm"
          value={config.primerMinTm}
          variant="outlined"
          onChange={handleConfigNumChange}
          disabled= {isDisabled()}
          fullWidth
          />
      </Grid>
      <Grid item xs={12}>
        <TextField
          type="number"
          label="Primer GC Clamp"
          name="primerGcClamp"
          value={config.primerGcClamp}
          variant="outlined"
          onChange={handleConfigNumChange}
          disabled= {isDisabled()}
          fullWidth
          />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" component="h3" color="secondary" sx={{fontSize: 15}}>
          Product Configurations:
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          type="number"
          label="Product Minimum Size"
          name="productMinSize"
          value={config.productMinSize}
          variant="outlined"
          onChange={handleConfigNumChange}
          disabled= {isDisabled()}
          fullWidth
          />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          type="number"
          label="Product Maximum Size"
          name="productMaxSize"
          value={config.productMaxSize}
          variant="outlined"
          onChange={handleConfigNumChange}
          disabled= {isDisabled()}
          fullWidth
          />
      </Grid>
    </Grid>
}

export default AdvForm