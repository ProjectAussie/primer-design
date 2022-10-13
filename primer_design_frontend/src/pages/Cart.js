import { Grid, TableContainer, TableHead,
  TableBody, TableCell, Table, TableRow, Button, Paper, ButtonGroup} from "@mui/material"
import { useEffect, useState } from "react"

import NavigationBar from "../components/common/NavigationBar"
import cart from "../services/cart"

const createData = (id, healthId, genome, chrom, loc, primerPairCount, cartEntry) => {
  return {id, healthId, genome, chrom, loc, primerPairCount, cartEntry}
}

const Cart = () => {
  const [shoppingCart, setShoppingCart] = useState([])
  console.log("Shopping cart", shoppingCart)
  useEffect( () => {
    cart
      .getAll()
      .then( (data) => setShoppingCart(data))
  }, [])

  const rows = shoppingCart.map(
    (cartEntry) => {
      const primerSet = cartEntry.primerSet
      const primerSetStdParams = primerSet.designParameters.standard
      const id = primerSet._id
      const healthId = primerSetStdParams.healthId
      const genome = primerSetStdParams.genome
      const chrom = primerSetStdParams.chrom
      const loc = primerSetStdParams.loc
      const primerPairCount = cartEntry.primerPairIds.length
      return createData(id, healthId, genome, chrom, loc, primerPairCount, cartEntry)
    }
  )

  const handleEntryDelete = (cartEntry) => {
    return () => {
      cart
        .remove(cartEntry._id)
        .then( () => {
          setShoppingCart(shoppingCart.filter( (shoppingCartEntry) => shoppingCartEntry._id !== cartEntry._id))
        })
    }
  }

  const handleDownloadForm = () => {
    cart
      .downloadOrderForm()
  }

  return (
    <Grid container rowSpacing={3} justifyContent="center">
      <Grid item xs = {12}>
        <NavigationBar/>
      </Grid>
      <Grid item xs = {11}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{width:`${100/6}%`}}>Health ID</TableCell>
                <TableCell sx={{width:`${100/6}%`}} align="right">Genome</TableCell>
                <TableCell sx={{width:`${100/6}%`}} align="right">Chromosome</TableCell>
                <TableCell sx={{width:`${100/6}%`}} align="right">Location</TableCell>
                <TableCell sx={{width:`${100/6}%`}} align="right">Primer Pairs</TableCell>
                <TableCell sx={{width:`${100/6}%`}}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map( (row) => {
                return <TableRow
                  key={row.id} //key could potentially not be unique, able to create and
                  //also add from search
                >
                  <TableCell component="th" scope="row">
                    {row.healthId}
                  </TableCell>
                  <TableCell align="right">{row.genome}</TableCell>
                  <TableCell align="right">{row.chrom}</TableCell>
                  <TableCell align="right">{row.loc}</TableCell>
                  <TableCell align="right">{row.primerPairCount}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="error" onClick={handleEntryDelete(row.cartEntry)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs = {12} container justifyContent="center" alignItems="center">
        <ButtonGroup variant="outlined" color="success">
          <Button onClick={handleDownloadForm}>
            Download CSV
          </Button>
          <Button>
            Download T3/T7 CSV
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  )
}

export default Cart