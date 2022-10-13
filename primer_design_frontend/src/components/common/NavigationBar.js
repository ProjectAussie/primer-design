import {AppBar, Button, ButtonGroup, Toolbar, Typography} from '@mui/material';
import { useNavigate } from "react-router-dom";

const NavigationBar = () => {
  const navigate = useNavigate()
  const routeChange = (newRoute) => {
    return () => navigate(newRoute)
  }

  return <AppBar position='static'>
    <Toolbar sx={{alignItems:'center', gap:5}}>
      <Typography color='primary' variant="h5" component="h1" sx={{flexGrow:1}}>
          embark
      </Typography>
      <ButtonGroup variant='contained'>
      <Button>Docs</Button>
        <Button onClick={routeChange('/search')}>Search</Button>
        <Button onClick={routeChange('/')}>Create</Button>
        <Button onClick={routeChange('/cart')}>Cart</Button>
        <Button onClick={routeChange('/profile')}>Profile</Button>
      </ButtonGroup>
    </Toolbar>
  </AppBar>
}

export default NavigationBar