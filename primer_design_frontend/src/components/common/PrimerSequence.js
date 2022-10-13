import { Typography, Grid} from "@mui/material" 

const PrimerSequence = ({sequence}) => {
  const seq = sequence.split('')

  const coloredSeq = seq.map( (char, i) => {
    let backgroundColor
    switch(char) {
      case "A":
      case "a":
        backgroundColor="blue"
        break
      case "T":
      case "t":
        backgroundColor="yellow"
        break
      case "G":
      case "g":
        backgroundColor="green"
        break
      case "C":
      case "c":
        backgroundColor="red"
        break
      default:
        throw new Error('Give string is not a sequence')
    }

    return <Grid item key={i} xs = {0.5} sx={{minWidth: 20}}>
      <Typography color="black" backgroundColor={backgroundColor}
        textAlign="center" fontWeight="bold" mb={1}>
        {char}
      </Typography>
    </Grid>
  })

  return <Grid container>
    {coloredSeq}
    </Grid>
}

export default PrimerSequence