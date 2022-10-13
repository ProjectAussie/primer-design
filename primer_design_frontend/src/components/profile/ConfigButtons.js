
import { FormGroup, FormControlLabel, Switch, Button, Grid } from "@mui/material"

const ConfigButtons = ({checked, handleCheckedChange}) => {

  return <Grid container>
    <Grid item xs = {6} sx ={{display: 'flex', justifyContent:'flex-end'}}>
      <FormGroup>
        <FormControlLabel control={
            <Switch checked={checked} onChange={handleCheckedChange} />
          } label="Edit" />
      </FormGroup>
    </Grid>
    <Grid item xs = {6} sx ={{display: 'flex', justifyContent:'flex-end'}}>
      <Button variant="contained"> Save </Button>
    </Grid>
  </Grid>
}

export default ConfigButtons