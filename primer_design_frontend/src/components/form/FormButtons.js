import {Button, Grid } from "@mui/material"
import Progress from "./Progress"

const FormButtons = ({clearForm, formLoading}) => {
  return <Grid container sx={{mb:2}}>
    <Grid item container sm = {3} justifyContent="center" alignContent="center">
      <Button variant="outlined" color="success" type="submit" form="primerForm">
        Submit
      </Button>
    </Grid>
    <Grid item sm = {6} container justifyContent="center" alignContent="center">
      {formLoading ? <Progress/> : null }
    </Grid>
    <Grid item sm = {3}container justifyContent="center" alignContent="center">
      <Button variant="outlined" color="error" onClick={clearForm}>
        REset
      </Button>
    </Grid>
  </Grid>
}

export default FormButtons