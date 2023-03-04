import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Card, Grid, Modal, Table, TableRow, Typography, TextField} from "@material-ui/core";
import Optiplay from "../../../assets/images/optiPlay.svg";
import { AuthService } from "../../service/user-setting/authService";
import Swal from "sweetalert2";
import { authuserStateSelector } from "../../../redux/reducers/authUser/authUser";
import { Redirect, useHistory } from "react-router-dom";
import ClearIcon from '@material-ui/icons/Clear';
import InputAdornment from "@material-ui/core/InputAdornment";
 import IconButton from "@material-ui/core/IconButton";
 import Visibility from "@material-ui/icons/Visibility";
 import VisibilityOff from "@material-ui/icons/VisibilityOff";

const auth = new AuthService();

export const TrainDataEntryLoginModal = (props: any) => {
  const { isLoginModal, setIsLoginModal, updateSelectedSideBarMenu , trainCheck, setTrainCheck,
  loginModal,setLoginModal} = props
  const {appUser} = useSelector(authuserStateSelector);
  const { errorMessage } = useSelector(
    authuserStateSelector
  );

  const [trainDataError, setTrainDataError] = useState("");
  const [trainDataError2, setTrainDataError2] = useState("");
const history = useHistory()
  const [userInput, setUserInput] = useState({
    username: "",
    password: "",
    showPassword: false,
  });

  const [userNameError, setUserNameError] =
    React.useState<{ username: string }>();
  const [passwordError, setPasswordError] =
    React.useState<{ password: string }>();
  const passwordMessage =
    "Password Should have Minimum 8 characters" +
    "\n" +
    "Atleast 1 Uppercase,Lowercase and Numeric character is mandatory";

  const handleUserName = (event: any) => {
    const {
      target: { value },  
    } = event;
    setUserNameError({ username: "" });
    let emailRegex = new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ).test(value);
    let mobileNoRegex = new RegExp(/^\d*$/).test(value);
    if (userInput.username == "") {
      setUserNameError({ username: "Enter your email or mobile phone number" });
    }
  };
  const handleClickShowPassword = () => {
    setUserInput({
      ...userInput,
      showPassword: !userInput.showPassword,
    });
  };
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const handlePassword = (event: any) => {
    const {
      target: { value },
    } = event;
    setPasswordError({ password: "" });
    let regA = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})").test(
      value
    );
    if (userInput.password == "") {
      setPasswordError({ password: "Enter your password" });
    }
  };

  const handleChange = (e: any) => {
    var { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  };
  const handleCancel = ()=>{
  setTrainCheck(false);
  updateSelectedSideBarMenu("setupMain")
  };

 

  const handleSubmit = () => {
    auth.authenticateTrain(userInput).then((response: any) => {

      if (response && response?.status === 200) {
     
        setIsLoginModal(!isLoginModal)
        setTrainDataError2("")
        setTrainDataError("")
      }
      else {
        setTrainDataError2(response?.message);
        setTrainDataError(response?.errorMsg);
      
     
       
      }
    })
  }

  return (
    <>
      <Modal open={isLoginModal && props.stationData} style={{ height: "750px", left: "23.9%", top: "24.9%", background: "blur" }}>
        <Card className="trainEntryModalStyle">
        <Grid style={{ textAlign: "right" }}> <IconButton onClick={handleCancel}> <ClearIcon style={{ color: "#009688" }} /> </IconButton> </Grid>
          <Grid>
          <span>
                    {trainDataError2 != "" ? <div style={{ color: "red", textAlign: "center"}}> {trainDataError2}</div> : <></>}
                  </span>
                  <span>
                    {trainDataError != "" ? <div style={{ color: "red", textAlign: "center"}}> {trainDataError}</div> : <></>}
                  </span>
                 <br></br> 
            <Typography className="trainEntryModaltext1">Authentication Required</Typography>
            <Typography className="trainEntryModaltext2">
              Please enter your Credentials to edit Train Database
            </Typography>
            <Grid container style={{ paddingTop: "1.5%", paddingBottom: "10%" }}>
              <Grid item xs={7}>
                <Typography className="trainEntryModaltext3">
                  Email ID/ Mobile No.
                </Typography>
                <TextField variant="outlined" className="trainEntryModalTextBOX" required={true} value={userInput.username}
                  error={Boolean(userNameError?.username)}
                  helperText={userNameError?.username}
                  onChange={handleChange} onBlur={handleUserName} name="username" />
                <Typography className="trainEntryModaltext4" >
                  Password
                </Typography>
                <TextField variant="outlined" className="trainEntryModalTextBOX" required={true}
                  error={Boolean(passwordError?.password)}
                  helperText={passwordError?.password}
                  onChange={handleChange} onBlur={handlePassword} name="password"
                  type={userInput.showPassword ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                       className="eyecolor eyesize"
                       onClick={handleClickShowPassword}
                       onMouseDown={handleMouseDownPassword}>
                       {userInput.showPassword ?<VisibilityOff />:<Visibility />}
                      </IconButton>
                    </InputAdornment>
                    )
                  }} />
                <Grid container className="TrainEntryModalGrid3">
                  <Button className="TrainEntryModalLoginBtn"
                    onClick={() => handleSubmit()}
                    style={{position:"relative" , right:"15%" ,top:"25%" }}

                  >
                    Login
                  </Button>

                  <Button style={{position:"relative" , right : "5%", bottom:"10%" }} className="TrainEntryModalLoginBtn" onClick={handleCancel} >
                    Cancel
                  </Button>
                  
                </Grid>
                
                <Grid >
                  {errorMessage != "" ? (
                    <div style={{ textAlign: "center", color: "red" }}>
                      {errorMessage}
                    </div>
                  ) : (
                    <></>
                  )}
                </Grid>
              </Grid>
              <Grid item xs={5} className="trainEntryModalGrid2" >
                <img src={Optiplay} style={{ height: "60%" }} />
              </Grid>
            </Grid>
            <Grid>
              <Typography className="trainEntryModaltext5">
                POWERED BY INNOBIT SYSTEMS
              </Typography>
            </Grid>
          </Grid>
        </Card>
      </Modal>
    </>
  );
};