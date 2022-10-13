import { TextField } from "@mui/material"

const LocationField = ({value, onChange}) => {
  return <TextField
    label="Location"
    type="number"
    variant="outlined"
    placeholder="eg. 123"
    name="loc"
    value={value}
    onChange={onChange}
    required
    fullWidth
  />
}

export default LocationField