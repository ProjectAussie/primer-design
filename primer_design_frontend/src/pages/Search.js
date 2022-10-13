import { Grid } from "@mui/material"
import NavigationBar from "../components/common/NavigationBar"
import SearchBar from "../components/search/SearchBar"
import { useState } from "react"
import Carousels from "../components/carousel/Carousels"
import primerServices from "../services/primers"
import CartNotification from "../components/common/CartNotification"

const Search = () => {
  const [chr, setChr] = useState('')
  const [genome, setGenome] = useState('')
  const [loc, setLoc] = useState('')
  const [targetLen, setTargetLen] = useState('')
  const [primerSets, setPrimerSets] = useState([])
  const [cartNotificationOpen, setCartNotificationOpen] = useState(false)

  const onStrChange = (setter) => {
    return (event) => {
      setter(event.target.value)
    }
  }

  const onNumChange = (setter) => {
    return (event) => {
      const value = Number(event.target.value)
      setter(value)
    }
  }

  const onSearch = () => {
    primerServices
      .get(genome, chr, loc, targetLen)
      .then( data => setPrimerSets(data))
  }

  const onClear = () => {
    setPrimerSets([])
    setChr('')
    setGenome('')
    setLoc('')
    setTargetLen('')
  }

  const onAddToCart = () => {
    onClear()
    setCartNotificationOpen(true)
  }


  return <>
    <CartNotification
      open={cartNotificationOpen}
      setOpen={setCartNotificationOpen}
    />
    <Grid container rowSpacing={3} columnSpacing={1} justifyContent="center">
      <Grid item xs={12}>
        <NavigationBar />
      </Grid>
      <Grid item xs = {11}>
        <SearchBar chr={chr} onChrChange={onStrChange(setChr)} genome={genome}
          onGenomeChange={onStrChange(setGenome)} loc={loc} onLocChange={onNumChange(setLoc)}
          targetLen={targetLen} onTargetLenChange = {onNumChange(setTargetLen)} 
          onSearch = {onSearch} onClear={onClear}/>
      </Grid>
      <Grid item xs = {11}>
        <Carousels primerSets={primerSets} addToCartReset={onAddToCart}/>
      </Grid>
    </Grid>
  </>
}

export default Search