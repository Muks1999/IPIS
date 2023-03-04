import {
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
// import shadows from "@material-ui/core/styles/shadows";
import WebConfigurationModel from "../../model/setup/webConfiguration";
import SetupService from "../service/setup/setup";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { authuserStateSelector } from "../../redux/reducers/authUser/authUser";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const setup = new SetupService();

export const WebConfig = (props:any) => {
  const { appUser } = useSelector(authuserStateSelector)
  const [enableWebUpload, setEnableWebUpload] = useState(false)
  const [webConfiguration, setwebConfiguration] = useState<WebConfigurationModel | any>({
    id: 0,
    ftpAddress: "",
    username: "",
    password: "",
    directoryName: "",
    enableWebUpload: enableWebUpload,
    connectivity: "",
    showPassword: false,
  });
  const [error, setError] = useState("")



  useEffect(() => {
    setEnableWebUpload(webConfiguration?.enableWebUpload)
  }, [webConfiguration?.enableWebUpload])

  useEffect(() => {
    if(props.stationData){
      getWebConfigurationData();
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
const handleClickShowPassword = () => {
  setwebConfiguration({
    ...webConfiguration,
    showPassword: !webConfiguration.showPassword,
  });
};
const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
  event.preventDefault();
};
  useEffect(() => {
    if (enableWebUpload === false) {
      setwebConfiguration(
        {
          id: 0,
          ftpAddress: "",
          username: "",
          password: "",
          directoryName: "",
          connectivity: "",
        }
      )
    }
  }, [])

  const handleEnableIntegration = () => {
    setEnableWebUpload(!enableWebUpload);
  }



  const handleChange = (e: any) => {
    var { name, value } = e.target;
    setwebConfiguration({ ...webConfiguration, [name]: value });
    console.log({ ...webConfiguration, [name]: value })
  };

  const handleChecked = (e: any) => {
    var { name, checked } = e.target;
    setwebConfiguration({ ...webConfiguration, [name]: checked });
    console.log({ ...webConfiguration, [name]: checked })
  };

  const getWebConfigurationData=() => {
    setup.getWebConfiguration().then(resp => {
      if (resp && resp.data && resp.data[0]) {
        setwebConfiguration(resp.data[0])
        console.log(resp.data[0])
      }
    })
  }

  const handleSubmit = () => {
    setup.createWebConfiguration(webConfiguration).then(data => {
      if (data.status === 200 && data.data && enableWebUpload === true) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Data Saved Successfully`,
          showConfirmButton: false,
          allowOutsideClick: false,
          timer: 3000,
        }).then((willSubmitted) => {
          if (willSubmitted) {
            setwebConfiguration(data.data);
          }
        })
        setError("")
      }
      else  {
        setError(data.errorMsg);
      }



    }
    )
  };



  const handleCancel = () => {
    setwebConfiguration({
      ftpAddress: "",
      username: "",
      password: "",
      directoryName: "",
      enableWebUpload: false,
      connectivity: "",
    });
    setError("")
  }

  return (
    <>
      <Grid>
        <Card style={{ paddingTop: "6.5%", paddingBottom: "6.8%", paddingLeft: "28.69%", paddingRight: "28.69%" }} className="webConfigGridStyle">
          <Grid>
            <Card className={appUser.userRole == "ROLE_STATION MASTER" ? "overlapBackground  webConfigGridStyle2 webConfig":" webConfigGridStyle2 webConfig"}>
            {   appUser.userRole == "ROLE_STATION MASTER" ? <Grid className="stationForm formFields">

            </Grid>: <></>
            }
              <Typography
                className="WebConfigText1"
              >
                Web Configuration
              </Typography>
              <Typography
                className="WebConfigText2"
              >
                Conifgure settings to upload Data on Cloud servers
              </Typography>
              <FormControlLabel onClick={handleChecked}
                control={
                  <Checkbox
                    size="small"
                    name="enableWebUpload"
                    checked={enableWebUpload}
                    onClick={handleEnableIntegration}
                    style={{ color: "#033733", margin: "20px" }}
                    className="onlineChckBoxs"
                  />
                }
                label={<span className="WebConfigCheckBoxLable">Enable Web Upload</span>}
                className="WebConfigCheckBox"
              />
              <RadioGroup row name="connectivity" className="radiostyle" onClick={handleChange} value={webConfiguration.connectivity}>
                {<FormControlLabel
                  control={enableWebUpload === false ?
                    <Radio
                      name="connectivity"
                      value=""
                      size="small"
                      style={{ color: "#033733", marginRight: "20px" }}
                    /> : <Radio
                      name="connectivity"
                      value="Internet"
                      size="small"
                      style={{ color: "#033733", marginRight: "20px" }}
                    />
                  }
                  label={
                    <span
                      style={{
                        fontSize: "14px",
                        fontFamily: "Roboto",
                        marginRight: "25px",
                      }}
                    >
                      Internet
                    </span>
                  }
                />
                }
                {<FormControlLabel

                  control={enableWebUpload === false ?
                    <Radio
                      name="connectivity"
                      value=""
                      size="small"
                      style={{ color: "#033733", marginRight: "20px" }} />
                    :
                    <Radio
                      name="connectivity"
                      value="GPRS"
                      size="small"
                      style={{ color: "#033733", marginRight: "20px" }} />

                  }
                  label={
                    <span style={{ fontSize: "14px", fontFamily: "Roboto" }}>
                      GPRS
                    </span>
                  }
                />}

              </RadioGroup>
              <br />
              <Grid container style={{ paddingTop: "26px", display: "flex", justifyContent: "flex-start" }}>
                <Grid item lg={4} xs={3} className="webConfigtext3">
                  FTP Address<sup className="asterisk">*</sup>
                  {/* <span className="asterisk">*</span> */}
                </Grid>

                {
                  <Grid item lg={8} xs={9}>
                    {enableWebUpload === false ?
                      <TextField disabled
                        size="small"
                        className="webConfigtextBoxstyle"
                        variant="outlined"
                        name="ftpAddress"
                        required={true}
                        value=""
                        onChange={handleChange}
                      /> :
                      <TextField
                        size="small"
                        className="webConfigtextBoxstyle"
                        variant="outlined"
                        name="ftpAddress"
                        required={true}
                        value={webConfiguration.ftpAddress}
                        onChange={handleChange}
                      />
                    }



                  </Grid>
                }

                <Grid item lg={4} xs={3} className="webConfigtext3">
                  Username<sup className="asterisk">*</sup>
                </Grid>
                {<Grid item lg ={8} xs={9}>
                  {enableWebUpload === false ? <TextField disabled
                    className="webConfigtextBoxstyle"
                    size="small"
                    variant="outlined"
                    name="username"
                    required={true}
                    value=""
                    onChange={handleChange}
                  /> :
                    <TextField
                      className="webConfigtextBoxstyle"
                      size="small"
                      variant="outlined"
                      name="username"
                      required={true}
                      value={webConfiguration.username}
                      onChange={handleChange}
                    />


                  }

                </Grid>}

                <Grid item lg={4} xs={3} className="webConfigtext3">
                  Password<sup className="asterisk">*</sup>
                </Grid>
                {<Grid item lg={8} xs={9}>
                  {enableWebUpload === false ? <TextField disabled
                    className="webConfigtextBoxstyle"
                    size="small"
                    variant="outlined"
                    name="password"
                    type="password"
                    required={true}
                    value=""
                    onChange={handleChange}
                  /> :
                    <TextField
                      className="webConfigtextBoxstyle"
                      size="small"
                      variant="outlined"
                      name="password"
                      type={webConfiguration.showPassword ? 'text' : 'password'}
                      required={true}
                      value={webConfiguration.password}
                      onChange={handleChange}
                      InputProps={{
                        endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                          className="eyecolor eyesize"
                           onClick={handleClickShowPassword}
                           onMouseDown={handleMouseDownPassword}>
                           {webConfiguration.showPassword ?<VisibilityOff />:<Visibility />}
                          </IconButton>
                        </InputAdornment>
                        )
                      }}
                    />
                  }
                </Grid>}
                <Grid item lg={4} xs={3} className="webConfigtext3">
                  Directory Name<sup className="asterisk">*</sup>
                </Grid>
                {
                  <Grid item lg={8} xs={9}>
                    {enableWebUpload === false ? <TextField disabled
                      className="webConfigtextBoxstyle"
                      size="small"
                      variant="outlined"
                      name="directoryName"
                      required={true}
                      value=""
                      onChange={handleChange}
                    /> :
                      <TextField
                        className="webConfigtextBoxstyle"
                        size="small"
                        variant="outlined"
                        name="directoryName"
                        required={true}
                        value={webConfiguration.directoryName}
                        onChange={handleChange}                       
                      />
                    }

                  </Grid>
                }
              </Grid>
              {appUser.userRole == "ROLE_STATION MASTER" ? <></>
                :
                <Grid
                  container
                  style={{ justifyContent: "center", paddingTop: "30px", marginLeft:"7%"}}
                >
                  {/* <span> */}
                  <Grid xs={9}>
                    {error != "" ? <div style={{ color: "red", textAlign: "center" }}> {error}</div> : <></>}
                    </Grid>
                  {/* </span> */}
                  <div>
                    <Button
                      onClick={handleSubmit}
                      type="submit"
                      className="Save"
                      variant="contained"
                    >
                      <DoneIcon className="icon" />
                      <span className="bttnfont">Save</span>
                    </Button>
                    <Button
                      type="reset"
                      value="Reset"
                      onClick={handleCancel}
                      variant="outlined"
                      className="Cancle"
                    >
                      <CloseIcon className="icon" />
                      <span className="bttnfont">Cancel</span>
                    </Button>
                  </div>
                </Grid>
              }
            </Card>
          </Grid>
        </Card>
      </Grid>    </>
  );
};
