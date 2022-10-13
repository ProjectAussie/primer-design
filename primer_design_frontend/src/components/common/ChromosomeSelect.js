import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const ChromosomeSelect = ({value, onChange}) => {
  return <FormControl fullWidth>
    <InputLabel required placeholder="chr1" id="chromosome-select-label">Chromosome</InputLabel>
    <Select
      labelId="chromosome-select-label"
      id="chromosome-select"
      label="Chromosome"
      name="chrom"
      value={value}
      onChange={onChange}
      required
    >
      {Array.from(Array(38)).map((_, index) => {
        const chr = "chr" + (index + 1);
        return <MenuItem  key={chr} value={chr}> {chr} </MenuItem>
      })}
    </Select>
  </FormControl>
}

export default ChromosomeSelect