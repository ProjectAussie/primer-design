import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const GenomeSelect = ({value, onChange}) => {
  return <FormControl fullWidth>
    <InputLabel required id="genome-select-label">Genome</InputLabel>
    <Select
      labelId="genome-select-label"
      id="genome-select"
      label="Genome"
      name="genome"
      value={value}
      onChange={onChange}
      required
    >
      <MenuItem value={"canFam3"} defaultChecked>canFam3</MenuItem>
    </Select>
  </FormControl>
}

export default GenomeSelect