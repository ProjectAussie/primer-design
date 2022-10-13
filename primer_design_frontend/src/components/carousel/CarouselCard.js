import {Card, CardActions, CardContent, Typography,
  Checkbox, Button, Grid} from '@mui/material'
import PrimerSequence from '../common/PrimerSequence'

const CarouselCard = ({primerPair, checked, onChange}) => {
  console.log('Carousel Primer Pair', primerPair)
  const leftPrimerSeq = primerPair.leftPrimer.sequence
  const rightPrimerSeq = primerPair.rightPrimer.sequence
  const primerPairPenalty = primerPair.penalty
  const primerPairProductSize = primerPair.productSize
  
  return <Card>
    <Grid container justifyContent="right">
      <Checkbox checked={checked} onChange={onChange}/>
    </Grid>
    <CardContent>
      <Typography color="text.secondary" variant="body2">
        {`Product Size: ${primerPairProductSize} Base Pairs`}
      </Typography>
      <Typography variant="body1" component="div">
        Left Primer Sequence:
      </Typography>
      <PrimerSequence sequence={leftPrimerSeq}/>
      <Typography variant="body1" component="div">
        Right Primer Sequence:
      </Typography>
      <PrimerSequence sequence={rightPrimerSeq}/>
      <Typography color="text.secondary" variant="body2">
        {`Rating: ${primerPairPenalty}`}
      </Typography>
    </CardContent>
    <CardActions>
      <Button>
        Learn More
      </Button>
    </CardActions>
  </Card>
}

export default CarouselCard