import { Card, Grid } from "@material-ui/core"
import { useEffect, useState } from "react"
// import DisplayBoardSettingModel from "../../../model/setup/displayBoardSettingModel"
import { DisplayBoard } from "./displayBoard"
import { DisplayBoardDigno } from "./displayBoardDiagno"
import { DisplayLedTesting } from "./displayLedTesting"
import { useSelector } from "react-redux"
import { authuserStateSelector } from "../../../redux/reducers/authUser/authUser"
import Swal from "sweetalert2"
import SetupService from "../../service/setup/setup";
export const DisplayBoardSetting =(props:any)=>{
    const setup = new SetupService();
    const { appUser } = useSelector(authuserStateSelector)

    useEffect(() => {
        if(props.stationData){
            return;
        }
        else{
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "Please Enter Station Details",
                showConfirmButton: false,
                allowOutsideClick: false,
                timer: 3000
              })
              .then(() => {
                props.updateSelectedSideBarMenu("setupMain");
              })
        }
},[])

        // const getDisplayBoardData = (displayBoardSetting: DisplayBoardSettingModel )=> {
        //     setDisplayBoardSetting(displayBoardSetting)
        //     console.log(displayBoardSetting)
        
        // }

        // const getDisplayLedTesting = (displayBoardSetting: DisplayBoardSettingModel )=> {
        // setDisplayBoardSetting(displayBoardSetting)}

        // const getDisplayBoardDigno = (displayBoardSetting: DisplayBoardSettingModel )=> {
        //     setDisplayBoardSetting(displayBoardSetting)}
        //     console.log(displayBoardSetting)
   
           

    return(
        <>
        <Grid>
        <Card style={{padding:"30px,10px,12px,10px",boxShadow: "0px 0px 12px rgba(0, 0, 0, 0.1)" ,borderRadius: "10px", marginRight: "10px"}}>
        <Grid container>
              {props.stationData ?
              <>
              <Grid item xs={3}>
                  <DisplayBoard  />
              </Grid>
              <Grid item xs={9}>
                  <Grid>
                      <DisplayBoardDigno />
                  </Grid>
                  <Grid>
                        <DisplayLedTesting />  
                  </Grid>
              </Grid></>:<></>}
          </Grid>  
        </Card>
        </Grid>
        </>
    )
}