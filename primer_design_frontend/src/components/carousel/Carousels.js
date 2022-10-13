import {Grid, Divider} from "@mui/material"
import Carousel from './Carousel'

const Carousels = ({primerSets, addToCartReset}) => {

  return <Grid container justifyContent="center" alignItems="center" rowSpacing={2}>
    <Grid item xs = {12}>
    {
      primerSets.map( (primerSet, index) => (
        <div key={index}>
          <Divider sx={{mt:2, mb:2, borderBottomWidth:3}}/>
          <Carousel primerSet={primerSet} addToCartReset={addToCartReset}/>
        </div>))
    }
    </Grid>
  </Grid>
}

export default Carousels