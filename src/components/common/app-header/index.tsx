import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { AppBar, Box, Button } from "@material-ui/core";
import Optiplay from "../../../assets/images/optiPlay.svg";
import Raillogo from "../../../assets/images/Indian-Railways.svg";
import GreenStatus from "../../../assets/images/EllipseGreen.svg";
import "./style.scss";
import { MenuBar } from "./menuBar";
import { useDispatch, useSelector } from "react-redux";
import { authuserStateSelector } from "../../../redux/reducers/authUser/authUser";
import { logout } from "../../../redux/actions/authUser/authUser";
import { useHistory, useLocation } from "react-router-dom";
import { isClassStaticBlockDeclaration } from "typescript";
import { Socket } from '../socket';
import { Redirect } from "react-router-dom";
import { AuthService } from "../../service/user-setting/authService";
import OnlineTrainService from "../../service/onlineTrain/onlineTrain";
import PublicAnnouncementServices from "../../service/publicAnnouncement/publicAnnouncementServices";

import Swal from "sweetalert2";

export const AppHeader = () => {

  const authService = new AuthService();

  const { isLoggedIn, formState, refreshToken,authToken, appUser } = useSelector(authuserStateSelector);
  const location = useLocation();
  const dispatch = useDispatch();
  const NTESStatus = () => {
    const [status, setStatus] = React.useState(0);
  }
  const [stationNames, setStationName] = useState<any>();
  const[appUserName, setAppUserName] = useState("")
  const {firstName} = appUser;
  const publicAnnoucementSVC = new PublicAnnouncementServices();
  const onlineTrainService = new OnlineTrainService();
  const [playing, setPlaying] = useState("");
  const [playPause, setPlayPause] = useState<boolean>(false);
  const history = useHistory();
  const getStationName = () => {
    authService.getStationName().then((result) =>{
      if(result?.status === 200){
        setStationName(result.data);  
      }
    })
  }
  useEffect(()=> {
    getStationName();
  }, [])
  
  const handleClick = () => {  
    console.log(stationNames, "fdvhfdv");
      history.push("/help");
  }

  

  // const [date] = useState(Date);
  const [logoutCall, setLogoutCall] = useState(false)
  const handleLogout = () => {
    setLogoutCall(true)
    var logOut = {
      authToken:authToken
    }
    ///stop voice 
    if(publicAnnoucementSVC.stopAnnouncement()== publicAnnoucementSVC.stopAnnouncement()){
      publicAnnoucementSVC.stopAnnouncement().then((resp) => {
        if (resp?.status === 200) {
          dispatch(logout(logOut));  
         }
         else {
           Swal.fire({
             position: "center",
             icon: "error",
             title: "Error occured",
             showConfirmButton: false,
             showCloseButton: true
     
           })
          
         }
      });
    }
  else{
    onlineTrainService.stop().then((response) => {
      if (response?.status === 200) {
       dispatch(logout(logOut));  
      }
      else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Error occured",
          showConfirmButton: false,
          showCloseButton: true
  
        })
       
      }
    })
  }
  
  };

useEffect(()=>{
  if(appUser.userRole == "ROLE_SUPER ADMIN"){
        setAppUserName("Super Admin")
      }else if(appUser.userRole == "ROLE_STATION MASTER"){
        setAppUserName("Station Master")
      }else if(appUser.userRole == "ROLE_OPERATOR"){
        setAppUserName("Operator")
      }else if(appUser.userRole== "ROLE_ADMIN"){
        setAppUserName("Admin")
      }
},[appUser.userRole])
  // const handleUserName = ()=>{
  //   if(appUser.userRole == "ROLE_SUPER ADMIN"){
  //     setAppUserName("Super Admin")
  //   }
  // }

  const splitDate = (dateObj: string): string => {
    var loginDate = new Date(dateObj);
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    var date = month[loginDate.getMonth()] + ' ' + loginDate.getDate() + ',' + loginDate.getFullYear() + '-' + loginDate.getHours() + ':' + ('0'+loginDate.getMinutes()).slice(-2) + ':' + loginDate.getSeconds();
    return date;
  }
  const [currentTimestamp,setCurrentTimestamp] =useState<any>(null)
  useEffect(() => {
    setInterval(() => {
      let date= Date()
      setCurrentTimestamp(splitDate(date));
    }, 1000)
  })

  return (
    <>   
         <AppBar className="headerFixed">
        <Grid container className="Mainheader MainheaderCss">
          <Grid xs={6}>
          <Grid container spacing={2}>
           <Grid xs={2}>
            <Grid> 
           <img src={Optiplay}/>
           </Grid>
           </Grid>
           <Grid xs={2} className="rainwayLogo">
            <Grid className="imgraillogo"> 
           <img src={Raillogo}/>
           </Grid>
             </Grid>
             <Grid xs={8}>
             <div className="paddingTop20">
              <span className="appheader_heading"> INTEGRATED PASSENGER INFORMATION SYSTEM </span>
              <span className="appheader_subtitle" >INDIAN RAILWAYS</span>
              <span className="appheader_subtitles">{stationNames?.stationName}{`(${stationNames?.stationCode})`}</span>
            </div>
            </Grid>
          </Grid>
          </Grid>
         <Grid xs={6} className="btnloginUserName">
         <Grid container className="justifyContentEnd">
         <Grid className="btnlogout">
          <Grid item className="socketMainCss">
            <Grid className="socketMainCss2">
              <Socket />
              </Grid>
          </Grid>
          <Grid className="userName">
        <span  id="profileImage" onClick={handleClick}>SA</span>
              <div className="profileImageText" >{appUser.firstName} ({appUserName}) </div>
          </Grid>
          <Grid>
         <Button className="log_out_btn logOutButton" variant="outlined" onClick={handleLogout}>Logout</Button>
         </Grid>
      
         </Grid>
         </Grid>
          </Grid>
        </Grid>
        

        <Grid container className="ntesConnectedMainCss">
          <Grid item lg={4} md={4} className="ntesConnectedsCss" spacing={1} >
            <Grid className="appHeadText"> NTES connected STATUS </Grid>
          </Grid >
          <Grid item lg={4} md={4} className="appHeadText textAlingCenter">connected ethernet device 0 of 5</Grid >
          <Grid item lg={4} md={4} className="appHeadText appHeadTextData" spacing={1}>{currentTimestamp}</Grid >
        </Grid>
        <Grid container className="lastCssforHeader">
          <MenuBar />
        </Grid>
      </AppBar>
    </>
  );
};
