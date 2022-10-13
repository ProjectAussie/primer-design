import { TextField } from "@mui/material"

const TargetLengthField = ({value, onChange}) => {
  return <TextField
    label="Target Length"
    type="number"
    variant="outlined"
    placeholder="eg. 1"
    name="targetLength"
    value={value}
    onChange={onChange}
    required
    fullWidth
  />
}

export default TargetLengthField