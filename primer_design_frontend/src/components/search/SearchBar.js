import SearchFields from "./SearchFields"
import { Grid, Typography, Button} from "@mui/material"
import SearchIcon from '@mui/icons-material/Search'
import DeleteIcon from '@mui/icons-material/Delete'
import { grey } from '@mui/material/colors';


const SearchBar = ({chr, onChrChange, genome, onGenomeChange,
  loc, onLocChange, targetLen, onTargetLenChange, onSearch, onClear}) => {
  
    return <Grid container columnSpacing={1} rowSpacing={1} sx ={{padding: 2, backgroundColor:grey[900], borderRadius:5}}>
      <Grid item xs = {6}>
        <Typography variant="h6" color="primary">
          Search Criteria
        </Typography>
      </Grid>
      <Grid item xs = {6} sx ={{display:'flex', justifyContent:'right', columnGap: 1}}>
        <Button endIcon={<SearchIcon/>} color="success" 
          onClick={onSearch} variant="contained">
          Search
        </Button>
        <Button endIcon={<DeleteIcon/>} color="error" variant="contained"
          onClick={onClear}>
          Clear
        </Button>
      </Grid>
      <Grid item xs = {12}>
        <SearchFields chr={chr} onChrChange={onChrChange} genome={genome}
          onGenomeChange={onGenomeChange} loc={loc} onLocChange={onLocChange}
          targetLen={targetLen} onTargetLenChange={onTargetLenChange} />
      </Grid>
    </Grid>
}

export default SearchBar