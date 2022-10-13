import { MobileStepper, Button } from "@mui/material"
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'

const CarouselStepper = ({activeStep, handleNext, handleBack}) => {
  return <MobileStepper
    variant="dots"
    steps={5} //could be variable later on
    activeStep={activeStep}
    nextButton= {
      <Button disabled={activeStep === 4} onClick={handleNext}>
        Next
        <KeyboardArrowRight/>
      </Button>
    }
    backButton = {
      <Button disabled={activeStep === 0} onClick={handleBack}>
        <KeyboardArrowLeft/>
        Back
      </Button>
    }
    position="static"
  />
}

export default CarouselStepper