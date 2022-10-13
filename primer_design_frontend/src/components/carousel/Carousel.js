import { Grid } from '@mui/material'
import { useState } from 'react'
import cart from '../../services/cart'

import CarouselCards from './CarouselCards'
import CarouselHeader from './CarouselHeader'
import CarouselStepper from './CarouselStepper'

const Carousel = ({primerSet, addToCartReset}) => {

    const [checks, setChecks] = useState({})
    const [activeStep, setActiveStep] = useState(0)
    const [selections, setSelections] = useState(2)
    console.log('Carousel primer set', primerSet)

    const handleNext = () => {
      setActiveStep(activeStep+1)
    }
    
    const handleBack = () => {
      setActiveStep(activeStep-1)
    }

    const handleCheckChange = (index) => {
      return (event) => {
        const newChecks = {...checks}
        newChecks[index] = Boolean(event.target.checked)
        setChecks(newChecks)
      }
    }

    const handleAddToCart = async () => {
      const primerPairIds = []
      for (const index in checks) {
        const primerPair = primerSet.primerPairs[index]
        primerPairIds.push(primerPair._id)
      }

      if (primerPairIds.length !== 0) {
        const shoppingCartEntry = {
          primerSet: primerSet,
          primerPairIds: primerPairIds
        }
        await cart.create(shoppingCartEntry)
        addToCartReset()
      }
    }

    const handleClearChecks = () => {
      setChecks({})
    }
    
    const handleSelectionsChange = (event) => {
      const value = event.target.value
      setSelections(value === "" ? value : Number(value) )
    }

    const checkIndices = (indices) => {
      const newChecks = {}
      indices.forEach((index) => newChecks[index] = true)
      console.log(newChecks)
      setChecks(newChecks)
    }

    const uniquePrimerPairs = (count) => {
      const primerPairs = primerSet.primerPairs
      const indices = []
      const usedLeftSequences = []
      const usedRightSequences = []
      primerPairs.forEach( (primerPair, index) => {
        const leftPrimerSeq = primerPair.leftPrimer.sequence
        const rightPrimerSeq = primerPair.rightPrimer.sequence
        if ((!usedLeftSequences.includes(leftPrimerSeq)) &&
          (!usedRightSequences.includes(rightPrimerSeq))) {
            indices.push(index)
            usedLeftSequences.push(leftPrimerSeq)
            usedRightSequences.push(rightPrimerSeq)
          }
      })

      if (indices.length < count) {
        return indices
      }
      else {
        return indices.slice(0, count)
      }
    }

    const handleAutoSelect = () => {
      console.log('here')
      console.log(selections)
      switch (selections){
        case 1:
          checkIndices([0])
          console.log('case 1')
          break
        case 2:
        case 3:
          const indices = uniquePrimerPairs(3)
          checkIndices(indices)
          break
        default:
          break
      }
    } //use effect, run this computation before

    return (
      <Grid container>
        <Grid item xs = {12}>
          <CarouselHeader primerSet={primerSet} handleAddToCart={handleAddToCart}
            handleClearChecks={handleClearChecks} selections={selections} 
            handleAutoSelect={handleAutoSelect}
            handleSelectionsChange={handleSelectionsChange}/>
        </Grid>
        <Grid item xs ={12}>
          <CarouselCards primerSet={primerSet} activeStep={activeStep}
            handleCheckChange={handleCheckChange} checks={checks}/>
        </Grid>
        <Grid item xs = {12}>
          <CarouselStepper activeStep={activeStep} handleNext={handleNext}
            handleBack={handleBack} />
        </Grid>
      </Grid>
    )
}

export default Carousel