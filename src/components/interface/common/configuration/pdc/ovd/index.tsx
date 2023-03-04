import {
    Button,
    Card,
    Checkbox,
    FormControlLabel,
    Grid,
    TextField,
    Typography,
  } from "@material-ui/core";
  import { useEffect, useState } from "react";
  import DoneIcon from "@material-ui/icons/Done";
  import ClearIcon from "@material-ui/icons/Close";
  import DeleteIcon from "@material-ui/icons/Delete";
  import { useDispatch, useSelector } from "react-redux";
  import { interfaceStateSelector } from "../../../../../../redux/reducers/interface/interface";
  import { DeleteDevices, fetchDevices, fetchDevicesDetails, IvdOvdTvPost, updateDeviceName, updatePortName } from "../../../../../../redux/actions/interface/interface";
  import Swal from "sweetalert2";
  import { Messages } from "../../../../../../constants/messages";
  import { authuserStateSelector } from "../../../../../../redux/reducers/authUser/authUser";
  
  export const OVDpdc = (props: any) => {
    const {platformNumbers}= props;
    const dispatch = useDispatch();
    const { appUser } = useSelector(authuserStateSelector)
    const { currentSelectedCdsEthernetDevice, currentSelectedCdsPortNumber, cdsData, ovdState, ovdMessage, deleteState,formState } = useSelector(interfaceStateSelector)
    const [interfaceInput, setInterfaceInput] = useState({
      id: 0,
      portNumber: "",
      deviceName: "",
      deviceType: "",
      ipAddress1: "",
      ipAddress2: "",
      ipAddress3: "",
      ipAddress4: "",
      noOfLines: 0,
      messageLine: "",
      enableMsgLine: "",
      platformNo: "",
      noOfLine1: "",
      noOfLine2: "",
      noOfLine3: "",
    });
    const[submit, setSubmit] = useState(false);
    const [deleted, setDeleted] = useState(false);
  
  
    useEffect(() => {
      if (cdsData && cdsData.children) {
        let detail: any = cdsData.children.find((port: any) => port.portNumber === currentSelectedCdsPortNumber);
        if(detail && detail.id){
          dispatch(fetchDevicesDetails(detail.id))
        }
      }
    }, [currentSelectedCdsPortNumber])
  
  
    useEffect(() => {
      if(formState.isSuccess == true){
      if (cdsData && cdsData.children) {
        let detail: any = cdsData.children.find((port: any) => port.portNumber === currentSelectedCdsPortNumber);
       if (detail && detail.deviceType ==="ovd" && detail.detail && currentSelectedCdsPortNumber === detail.detail.portNumber) {
          console.log(detail, "detail")
          let ipAddress = detail.detail.ipAddress.split(".");
          setInterfaceInput({
            id: detail.id,
            portNumber: detail.portNumber,
            deviceName: detail.detail.deviceName,
            deviceType: detail.deviceType,
            ipAddress1: ipAddress[0],
            ipAddress2: ipAddress[1],
            ipAddress3: ipAddress[2],
            ipAddress4: ipAddress[3],
            noOfLines: detail.detail.noOfLines,
            messageLine: detail.detail.messageLine,
            enableMsgLine: "",
            platformNo: detail.detail.platformNo,
            noOfLine1: detail.detail.enableMsgLine[0],
            noOfLine2: detail.detail.enableMsgLine[1],
            noOfLine3: detail.detail.enableMsgLine[2],
          })
        }
      }}
    }, [formState,currentSelectedCdsPortNumber])
  
    const handleDelete = () => {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.isConfirmed) {
          let data: any = {
            id: interfaceInput.id,
          };
          dispatch(DeleteDevices(data))
          setDeleted(true)
        }
      })
    }
  
  useEffect(() => {
    if(deleteState.isSuccess == true && deleted == true){
      Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Port Data Deleted Successfully',
          showConfirmButton: false,
          allowOutsideClick: false,
          showCloseButton: false,
          timer:2000
      })
        .then(() => {
          let data: any = {
            portNumber: currentSelectedCdsPortNumber,
            portName: "CDS"
          };
          dispatch(updatePortName(data))
          const data1: any = {
            deviceName: "CDS"
          };
          dispatch(updateDeviceName(data1))
        })
        .then(() => {
          dispatch(fetchDevices())
          setInterfaceInput({
            id: 0,
            portNumber: "",
            deviceName: "",
            deviceType: "",
            ipAddress1: "",
            ipAddress2: "",
            ipAddress3: "",
            ipAddress4: "",
            noOfLines: 0,
            messageLine: "",
            enableMsgLine: "",
            platformNo: "",
            noOfLine1: "",
            noOfLine2: "",
            noOfLine3: "",
          })
          
      })
    }
  },[deleteState,deleted])
  
    const handleChange = (e: any) => {
      var { name, value } = e.target;
      setInterfaceInput({ ...interfaceInput, [name]: value });
    };
  
    const handleSubmit = () => {
        let inter: any = {
          id: interfaceInput.id,
          portNumber: `${currentSelectedCdsPortNumber}`,
          deviceType: "ovd",
          deviceName: interfaceInput.deviceName,
          ipAddress: `${interfaceInput.ipAddress1}.${interfaceInput.ipAddress2}.${interfaceInput.ipAddress3}.${interfaceInput.ipAddress4}`,
          noOfLines: interfaceInput.noOfLines,
          messageLine: interfaceInput.messageLine,
          platformNo: [interfaceInput.platformNo],
          enableMsgLine: [interfaceInput.noOfLine1, interfaceInput.noOfLine2, interfaceInput.noOfLine3]
        };
        dispatch(IvdOvdTvPost(inter))
        setSubmit(true)
    };
  
    useEffect(() => {
      if (ovdState.isSuccess === true && submit === true) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${Messages.FORM_SUBMITTED_SUCESSFULLY}`,
          showConfirmButton: false,
          allowOutsideClick: false,
          timer: 3000,
        }).then(() => {
          dispatch(fetchDevices());
          // const data: any = {
          //   portNumber: interfaceInput.portNumber,
          //   portName: interfaceInput.deviceType
          // };
          // dispatch(updatePortName(data))
          // const data1: any = {
          //   deviceName: interfaceInput.deviceType
          // };
          // dispatch(updateDeviceName(data1))
          // setSubmit(false);
        });
      }
    }, [ovdState])
  
    const handleCancel = () => {
      setInterfaceInput({
      id: 0,
      portNumber: "",
      deviceName: "",
      deviceType: "",
      ipAddress1: "",
      ipAddress2: "",
      ipAddress3: "",
      ipAddress4: "",
      noOfLines: 0,
      messageLine: "",
      enableMsgLine: "",
      platformNo: "",
      noOfLine1: "",
      noOfLine2: "",
      noOfLine3: "",
      })
  }
  
  
    // useEffect(() => {
    //   setenableSubmit(true);
    // }, [interfaceInput]);
  
    return (
      <>
        <Grid container>
          <Grid item xs={12}>
            <Card style={{ padding: "20px 5.535%"}}  className={appUser.userRole == "ROLE_STATION MASTER" ? "overlapBackground ivdCard":"ivdCard"}>
  
            {/* {appUser.userRole == "ROLE_STATION MASTER" ?
                <Grid style={{ color: "red", display: "flex", justifyContent: "center", fontSize: "22px" }}>*view only</Grid>
                : <></>
              } */}
             {  
              appUser.userRole == "ROLE_STATION MASTER" ? <Grid className="stationForm formFields">
  
            </Grid>: <></>
            }
              <Typography component="p" className="confHedPdc">
              <b>Configuration Settings</b>
              </Typography>
              <Grid container>
                <Grid item xs={5} className="ivdSubItem">
                  OVD IP Address<sup className="asterisk">*</sup>
                </Grid>
                <Grid item xs={7}>
                  <Grid className="ivdGrid">
                    <TextField disabled className="ivdBoxStyle mr-10" variant="outlined" name="ipAddress1" required={true} value="192" onChange={handleChange} />
                    <TextField disabled className="ivdBoxStyle mr-10" variant="outlined" name="ipAddress2" required={true} value="168" onChange={handleChange} />
                    <TextField className="ivdBoxStyle mr-10" variant="outlined" name="ipAddress3" required={true} value={interfaceInput.ipAddress3} onChange={handleChange} />
                    <TextField className="ivdBoxStyle" variant="outlined" name="ipAddress4" required={true} value={interfaceInput.ipAddress4} onChange={handleChange} />
                  </Grid>
                </Grid>
                <Grid item xs={5} className="ivdSubItem">
                  OVD Name
                </Grid>
                <Grid item xs={7} className="ivdTextBoxpdc">
                  <TextField size="small" className="ivdTextFieldValue" variant="outlined" name="deviceName" value={interfaceInput.deviceName} onChange={handleChange} />
                </Grid>
                <Grid item xs={5} className="ivdSubItem">
                  Select Platform
                </Grid>
                <Grid item xs={7} className="ivdTextBoxpdc">
                  <select name="platformNo" className="ivdTextFieldValue h-40" required={true} value={interfaceInput.platformNo} onChange={handleChange} >
                    <option>Select</option>
                    {platformNumbers?.map((platformNo: any, i: any) => {
                      return (
                        <option value={platformNo}>
                          {platformNo}
                        </option>
                      );
                    })}
                  </select>
                </Grid>
                <Grid item xs={5} className="ivdSubItem">
                  No. of Lines
                </Grid>
                <Grid item xs={7} className="ivdTextBoxpdc">
                  <select className="ivdTextFieldValue h-40" required={true} name="noOfLines" value={interfaceInput.noOfLines} onChange={handleChange} >
                    <option value="1">1</option>
                    <option value="2">2 </option>
                    <option value="3">3</option>
                  </select>
                </Grid>
                <Grid item xs={5} className="ivdSubItem">
                  Message Line
                </Grid>
                <Grid item xs={7} className="ivdTextBoxpdc">
                  <select className="ivdTextFieldValue h-40" required={true} name="messageLine" value={interfaceInput.messageLine} onChange={handleChange} >
                    <option> Select </option>
                    <option value="none">None</option>
                  </select>
                </Grid>
                <Grid item xs={5} className="ivdSubItem">
                  Enable OVD Line
                </Grid>
                <Grid item xs={7} className="ivdTextBoxpdc">
                  <Grid item xs={2}>
                    <FormControlLabel style={{ marginLeft: "-4px" }} value={interfaceInput.noOfLine1} onChange={handleChange}
                      control={
                        <Checkbox className="pr-20"
                          size="small"
                          style={{ color: "#033733" }}
                          name="noOfLine1"
                          value="1"
                          checked={interfaceInput.noOfLine1 === "1"}
                        />
                      }
                      label={1}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <FormControlLabel value={interfaceInput.noOfLine1} onChange={handleChange}
                      control={
                        <Checkbox className="pr-20"
                          size="small"
                          style={{ color: "#033733" }}
                          name="noOfLine2"
                          value="2"
                          checked={interfaceInput.noOfLine1 === "2"}
                        />
                      }
                      label={2}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <FormControlLabel value={interfaceInput.noOfLine1} onChange={handleChange}
                      control={
                        <Checkbox className="pr-20"
                          size="small"
                          style={{ color: "#033733" }}
                          name="noOfLine3"
                          value="3"
                          checked={interfaceInput.noOfLine1 === "3"}
                        />
                      }
                      label={3}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid>
              <div>
                  {(ovdState.isError === true && ovdMessage != "" && submit == true) ? <div style={{ color:"red", textAlign:"center" }}> {ovdMessage}</div> : <></>}
              </div>
              </Grid>
              {appUser.userRole == "ROLE_STATION MASTER" ? <></> :
              <div style={{ paddingTop: "10px", display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
                <Button onClick={handleSubmit} type="submit" className="ivdSaveBtn" variant="outlined">
                  <DoneIcon className="SaveIcon" style={{ display: "inherit" }} />
                  Save
                </Button>
                <Button type="reset" value="Reset" variant="outlined" className="ivdCancelBtn" onClick={handleCancel}>
                  <ClearIcon className="clearIcon" />
                  Cancel
                </Button>
                {interfaceInput.id !== 0 ? <><Button type="submit" onClick={handleDelete} variant="outlined" className="ivdDeleteBtn">
                  <DeleteIcon className="deleteIcon" />
                    Delete
                  </Button></>:
                  <><Button disabled type="submit" onClick={handleDelete} variant="outlined" className="ivdDeleteBtn">
                    <DeleteIcon className="deleteIcon" />
                      Delete
                  </Button></>}
              </div>}
            </Card>
          </Grid>
        </Grid>
      </>
    )
  }