import { Grid } from "@mui/material"
import NavigationBar from "../components/common/NavigationBar"
import StdForm from "../components/form/StdForm"
import AdvFormAccordion from "../components/form/AdvFormAccordion"
import FormButtons from "../components/form/FormButtons"
import CartNotification from "../components/common/CartNotification"

const Form = ({createPrimers, stdConfig, handleAdvConfigNumChange,
  handleStdConfigStrChange, handleStdConfigNumChange, advConfig, presets,
  advPreset, handleAdvPresetChange, expanded, handleExpandChange, clearForm,
  primersLoading, cartNotificationOpen, setCartNotificationOpen}) => (
  <>
    <CartNotification
      open = {cartNotificationOpen}
      setOpen = {setCartNotificationOpen}
    />
    <form id="primerForm" onSubmit={createPrimers}>
      <Grid container rowSpacing={2} justifyContent="center">
        <Grid item xs = {12}>
          <NavigationBar />
        </Grid>
        <Grid item xs = {10}>
          <StdForm
            config={stdConfig}
            handleConfigStrChange={handleStdConfigStrChange}
            handleConfigNumChange={handleStdConfigNumChange}
          />
        </Grid>
        <Grid item xs ={10}>
          <AdvFormAccordion 
            config={advConfig}
            handleConfigNumChange={handleAdvConfigNumChange}
            presets={presets}
            preset={advPreset}
            handlePresetChange={handleAdvPresetChange}
            expanded={expanded}
            handleExpandChange={handleExpandChange}
          />
        </Grid>
        <Grid item xs = {12}>
          <FormButtons clearForm={clearForm} formLoading={primersLoading}/>
        </Grid>
      </Grid>
    </form>
</>)

export default Form