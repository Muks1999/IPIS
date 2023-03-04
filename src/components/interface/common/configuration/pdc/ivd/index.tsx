import {
    Button,
    Card,
    Checkbox,
    FormControlLabel,
    Grid,
    TextField,
    Typography,
  } from "@material-ui/core";
import { useState } from "react";
import DoneIcon from "@material-ui/icons/Done";
import ClearIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch, useSelector } from "react-redux";
import { interfaceStateSelector } from "../../../../../../redux/reducers/interface/interface";
import { IvdOvdTvPost,DeleteDevices, fetchDevicesDetails, updateDeviceName, updatePortName, fetchDevices, updateSubPortName, updatePdcChildDeviceName, fetchPdcDetails } from "../../../../../../redux/actions/interface/interface";
import { useEffect } from "react";
import InterfaceService from "../../../../../service/interface/interfaceService";
import Swal from "sweetalert2";
import { Messages } from "../../../../../../constants/messages";
import { authuserStateSelector } from "../../../../../../redux/reducers/authUser/authUser";

  export const IVDpdc = (props: any) => {
    const {platformNumbers}= props;
    const dispatch = useDispatch();
    const { currentSelectedPdcEthernetDevice, currentSelectedPdcPortNumber, pdcData, ivdState, ivdMessage, deleteState,formState } = useSelector(interfaceStateSelector)
    const { appUser } = useSelector(authuserStateSelector)
    const [interfaceInput, setInterfaceInput] = useState({
      id:0,
      portNumber: 0,
      deviceName: "",
      deviceType: "",
      ipAddress1: "192",
      ipAddress2: "168",
      ipAddress3: "",
      ipAddress4: "",
      noOfLines: 2,
      messageLine:"",
      enableMsgLine: [1,2],
      platformNo:"",
    });
    const[submit, setSubmit] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const [noOfLinesArray,setNoOfLinesArray]=useState<any>([])
  const [linesCheck,setLinesCheck]=useState<boolean>(false)
  const handleChange = (e: any) => {
    var { name, value } = e.target;
    if(name=="noOfLines"){
      setInterfaceInput({ ...interfaceInput, [name]: parseInt(value) })
      setLinesCheck(true)
    }
    else{
      setInterfaceInput({ ...interfaceInput, [name]: value })
    }
  };
    const handleChecked = (e: any, index: any) => {
      var { name, value, checked } = e.target;
      let msgLineArray = [];
      if (!checked) {
        noOfLinesArray[index] = false;
      }
      else {
        noOfLinesArray[index] = true;
      }
      for (let i = 0; i < noOfLinesArray.length; i++) {
        if (noOfLinesArray[i] == true) {
          msgLineArray.push(i + 1)
        }
      }
      setInterfaceInput({ ...interfaceInput, [name]: msgLineArray });
    }

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
  };


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
    }).then(()=>{
      const data: any = {
        portNumber: interfaceInput.portNumber,
        portName: "CDS"
    };
    dispatch(updateSubPortName(data))
    const data1: any = {
        deviceName: "CDS"
    };
    dispatch(updatePdcChildDeviceName(data1))
    }).then(()=>{
      dispatch(fetchDevicesDetails(pdcData?.id))
    })
  }
},[deleteState,deleted])


useEffect(() => {
  if (linesCheck == true) {
    let array:any = new Array(interfaceInput.noOfLines);
    let enableArray:any=[];
    for (let i = 0; i < array?.length; i++) {
      array[i] = true;
      enableArray.push(i+1);
    }
    setNoOfLinesArray(array)
    setInterfaceInput({...interfaceInput,["enableMsgLine"]:enableArray});
    setLinesCheck(false);
  } else {
    let checkArray:any = new Array(interfaceInput.noOfLines).fill(false);
    for (let i = 0; i < checkArray?.length; i++) {
      for (let j = 0; j < interfaceInput.enableMsgLine?.length; j++) {
        if (i+1 == interfaceInput.enableMsgLine[j]) {
          checkArray[i] = true;
          break;
        }
      }
    }
    setNoOfLinesArray(checkArray);
  }								
}, [interfaceInput.noOfLines])

useEffect(()=>{
  if(pdcData.platformNo){
  setInterfaceInput({...interfaceInput , ["ipAddress3"] : pdcData?.platformNo[0],["platformNo"]:pdcData?.platformNo[0]})
  }
}, [pdcData.platformNo])


    const handleSubmit = () => {
    let inter: any = {
      id:interfaceInput.id,
      portNumber: currentSelectedPdcPortNumber,
      deviceType: currentSelectedPdcEthernetDevice,
      deviceName: interfaceInput.deviceName,
      ipAddress: `${interfaceInput.ipAddress1}.${interfaceInput.ipAddress2}.${interfaceInput.ipAddress3}.${interfaceInput.ipAddress4}`,
      noOfLines: interfaceInput.noOfLines,
      messageLine: interfaceInput.messageLine,
      platformNo: [interfaceInput.platformNo],
      enableMsgLine: interfaceInput.enableMsgLine
  };
  dispatch(IvdOvdTvPost(inter))
  setSubmit(true)
    };

    useEffect(() => {
      if(ivdState.isSuccess == true && submit == true){
        dispatch(fetchDevicesDetails(pdcData?.id));
        setSubmit(false);
      }
    },[ivdState,submit])

    const handleCancel = () => {
      setInterfaceInput({
     id:0,
      portNumber: 0,
      deviceName: "",
      deviceType: "",
      ipAddress1: "",
      ipAddress2: "",
      ipAddress3: "",
      ipAddress4: "",
      noOfLines: 2,
      messageLine:"",
      enableMsgLine: [1,2],
      platformNo:"",
      })
  }

    useEffect(()=>{
      if(pdcData && pdcData.children){
        let detail:any = pdcData.children.find((port: any) => port.portNumber === currentSelectedPdcPortNumber);
        console.log(detail,"detail")
        if(detail && detail.id){
          dispatch(fetchPdcDetails(detail.id))
        }
      }
    },[currentSelectedPdcPortNumber])

    useEffect(()=>{
      if(formState.isSuccess == true){
      if(pdcData && pdcData.children){
        let detail:any = pdcData.children.find((port: any) => port.portNumber === currentSelectedPdcPortNumber);
        console.log(detail,"detail")
        if(detail && detail.deviceType ==="ivd" && detail.detail && currentSelectedPdcPortNumber === detail.portNumber){
          let ipAddress = detail.detail.ipAddress.split(".");
          setInterfaceInput({
            id:detail.id,
            portNumber: detail.portNumber,
            deviceName: detail.detail.deviceName,
            deviceType: detail.deviceType,
            ipAddress1: ipAddress[0], 
            ipAddress2: ipAddress[1],
            ipAddress3: ipAddress[2],
            ipAddress4: ipAddress[3],
            noOfLines: detail.detail.noOfLines,
            messageLine:detail.detail.messageLine,
            enableMsgLine: detail.detail.enableMsgLine,
            platformNo:detail.detail.platformNo,
          })
        }
      }}
    },[formState,currentSelectedPdcPortNumber])

    useEffect(()=>{
      if(ivdState.isSuccess === true && submit === true)
      {
        Swal.fire({
            position: "center",
            icon: "success",
            title: `${Messages.FORM_SUBMITTED_SUCESSFULLY}`,
            showConfirmButton: false,
            allowOutsideClick: false,
            timer: 3000,
          })
      }
  },[ivdState])

    return (
      <>
        <Grid container>
          <Grid item xs={12}>

            <Card  style={{ padding: "20px 5.535%",   border: "1px solid rgb(221, 221, 221)", height:'410px' }} className={appUser.userRole == "ROLE_STATION MASTER" ? "overlapBackground ivdCard":"ivdCard"}>
            {/* {appUser.userRole == "ROLE_STATION MASTER" ?
              <Grid style={{ color: "red", display: "flex", justifyContent: "center", fontSize: "22px" }}>*view only</Grid>
              : <></>
            } */}
              {   appUser.userRole == "ROLE_STATION MASTER" ? <Grid className="stationForm formFields">

</Grid>: <></>
}
              <Typography component="p" className="confHedPdc">
              <b>Configuration Settings</b>
              </Typography>
              <Grid container>
                <Grid item xs={5} className="ivdSubItem">
                  IVD IP Address<sup className="asterisk">*</sup>
                </Grid>
                <Grid item xs={7}>
                  <Grid className="ivdGrid">
                    <TextField disabled className="ivdBoxStyle mr-10" variant="outlined" name="ipAddress1" required={true} value={interfaceInput.ipAddress1} onChange={handleChange}/>
                    <TextField disabled className="ivdBoxStyle mr-10" variant="outlined" name="ipAddress2" required={true} value={interfaceInput.ipAddress2} onChange={handleChange}/>
                    <TextField disabled className="ivdBoxStyle mr-10" variant="outlined" name="ipAddress3" required={true} value={interfaceInput.ipAddress3} onChange={handleChange}/>
                    <TextField className="ivdBoxStyle" variant="outlined" name="ipAddress4" required={true} value={interfaceInput.ipAddress4} onChange={handleChange}/>
                  </Grid>
                </Grid>
                <Grid item xs={5} className="ivdSubItem">
                  IVD Name
                </Grid>
                <Grid item xs={7} className="ivdTextBoxpdc">
                  <TextField size="small" className="ivdTextFieldValue" variant="outlined" name="deviceName" value={interfaceInput.deviceName} onChange={handleChange} />
                </Grid>
                <Grid item xs={5} className="ivdSubItem">
                  Select Platform
                </Grid>
                <Grid item xs={7} className="ivdTextBoxpdc">
                <select disabled name="platformNo" className="ivdTextFieldValue h-40" required={true} value={interfaceInput.platformNo} onChange={handleChange} >
                  <option >Select</option>
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
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
                <option value={9}>9</option>
                <option value={10}>10</option>
                </select>
              </Grid>
              <Grid item xs={5} className="ivdSubItem">
                Message Line
              </Grid>
              <Grid item xs={7} className="ivdTextBoxpdc">
                <select className="ivdTextFieldValue h-40" required={true} name="messageLine" value={interfaceInput.messageLine} onChange={handleChange} >
                  <option> Select </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="none">None</option>
                </select>
              </Grid>
              <Grid item xs={5} className="ivdSubItem">
                Enable IVD Line
              </Grid>
                <Grid item xs={7} className="ivdTextBoxpdc">
                  {
                    noOfLinesArray?.map((el: any, i: any) => {
                      return <FormControlLabel onChange={(e) => handleChecked(e, i)}
                        control={
                          <Checkbox key={el} className="pr-20"
                            name="enableMsgLine" required={true} value={i + 1}
                            size="small"
                            checked={noOfLinesArray[i]}
                            style={{ color: "#033733" }}
                          />
                        }
                        label={<span>{i + 1}</span>}
                      />
                    })
                  }
                </Grid>
            </Grid>
            <Grid>
            <div>
                {(ivdState.isError === true && ivdMessage != "" && submit == true) ? <div style={{ color:"red", textAlign:"center" }}> {ivdMessage}</div> : <></>}
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
              {interfaceInput.id !== 0 ? <Button type="submit" onClick={handleDelete} variant="outlined" className="ivdDeleteBtn">
                <DeleteIcon className="deleteIcon" />
                Delete
              </Button> : <Button disabled type="submit" onClick={handleDelete} variant="outlined" className="ivdDeleteBtn">
                <DeleteIcon className="deleteIcon" />
                Delete
              </Button>}
            </div>
  }
          </Card>
        </Grid>
      </Grid>
    </>
  );
};
