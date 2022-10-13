import CarouselCard from './CarouselCard'
import { Grid } from '@mui/material'

const CarouselCards = ({primerSet, activeStep, handleCheckChange, checks}) => {
  const firstIndex = activeStep * 2
  const secondIndex = firstIndex + 1
  const primerPair1 = primerSet.primerPairs[firstIndex]
  const primerPair2 = primerSet.primerPairs[secondIndex]
  console.log("Primer Pair 1", primerPair1)

  return <Grid container columnSpacing={2}>
    <Grid item xs={6}>
      <CarouselCard primerPair={primerPair1}
        checked = {Boolean(checks[firstIndex])} onChange={handleCheckChange(firstIndex)}/>
    </Grid>
    <Grid item xs={6}>
      <CarouselCard primerPair={primerPair2}
        checked = {Boolean(checks[secondIndex])} onChange={handleCheckChange(secondIndex)}/>
    </Grid>
  </Grid>
}

export default CarouselCards