import ReportDialog from "../components/form/ReportDialog"
import {Grid} from "@mui/material"
import NavigationBar from "../components/common/NavigationBar"
import Carousels from "../components/carousel/Carousels"

const Pick = ({primerReportOpen, handlePrimerReportClose, primersLoaded,
  primerSet, addToCartReset}) => {    
    return <>
      <ReportDialog open={primerReportOpen} handleClose={handlePrimerReportClose}
      numberPrimerPairs={primersLoaded ? primerSet.primerPairs.length : 0}/>
      <Grid container rowSpacing={2} justifyContent="center">
        <Grid item xs = {12}>
          <NavigationBar />
        </Grid>
        <Grid item xs = {11}>
          <Carousels primerSets={[primerSet]} addToCartReset={addToCartReset}/>
        </Grid>
      </Grid>
    </>
}

export default Pick