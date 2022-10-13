import { Divider, Grid } from "@mui/material"
import NavigationBar from "../components/common/NavigationBar"
import OrderHistory from "../components/profile/OrderHistory"
import UserConfig from "../components/profile/UserConfig"

const Profile = () => {

  //This default page constructor is code repetitive
  return <Grid container justifyContent="center" alignItems="center" rowSpacing={3}>
    <Grid item xs = {12}>
      <NavigationBar/>
    </Grid>
    <Grid item xs = {11}>
      <OrderHistory/>
    </Grid>
    <Grid item xs = {11}>
      <Divider/>
    </Grid>
    <Grid item xs = {11}>
      <UserConfig/>
    </Grid>
  </Grid>

}

export default Profile