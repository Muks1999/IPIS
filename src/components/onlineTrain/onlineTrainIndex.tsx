import { Grid, Card, Table, TableHead, TableBody, TableRow, TableCell, withStyles, createStyles, Theme, Typography, Button, Checkbox, Modal, IconButton, CircularProgress, TextField, TableContainer } from "@material-ui/core";
import { AppHeader } from "../common/app-header";
import "./onlineTrainStyle.css";
import pauseBtn from "../../assets/images/pauseBtn.svg";
import playBtn from "../../assets/images/playBtn.svg";
import addBtn from "../../assets/images/add.svg";
import removeBtn from "../../assets/images/remove.svg";
import arrowBackWard from "../../assets/images/chevron_left.svg";
import arrowForWard from "../../assets/images/chevron_right.svg";
import refresh from "../../assets/images/sync.svg";
import checkBtn from "../../assets/images/check.svg";
import addTrainDataBtn from "../../assets/images/control_point.svg";
import ArrowDown from "../../assets/images/ArrowDown.svg";
import ArrowUp from "../../assets/images/Vector.svg";
import deleteIcon from "../../assets/images/delete.svg";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postOnlineTrainData, deleteOnlineTrainData, getData, updateOnlineTrainData } from "../../redux/actions/onlineTrain/onlineTrain";
import { onlineTrainListSelector } from "../../redux/reducers/onlineTrain/onlineTrain";
import ClearIcon from '@material-ui/icons/Clear';
import OnlineTrainModel from "../../model/onlineTrain/onlineTrain";
import Swal from "sweetalert2";
import { OnlineTrainDataEntry } from "./OnlineTrainDataEntry";
import OnlineTrainService from "../service/onlineTrain/onlineTrain";
import stopBtn from "../../assets/images/pause_circle_outline (2).svg"
import SetupService from "../service/setup/setup";
import { useHistory } from "react-router-dom";
import WarnUnsavedChanges from "../common/modal/warnUnsaveModal";
import {
  SortableContainer,
  SortableElement,
  SortableHandle
} from "react-sortable-hoc";
import arrayMove from "array-move";
import { WarnUnSave, WarnUnsaveStateSelector } from "../../redux/reducers/warnUnsaveReducer/warnUnsave";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd"
const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
)(TableRow);

export const OnlineTrain = () => {
  const setup = new SetupService();
  let history = useHistory();
  const onlineTrainService = new OnlineTrainService();
  const {isDirty} = useSelector(WarnUnsaveStateSelector)
  const [showOnlineTrain, setShowOnlineTrain] = useState<boolean>(false);
  const dispatch = useDispatch();
  const currentObj: OnlineTrainModel | any = {}
  const [allCoachNames, setAllCoachNames] = useState<any>([]);
  const [platformNumbers, setPlatformNumbers] = useState<any>([]);

  const { onlineTrain, slctdBoardType, formState } = useSelector(onlineTrainListSelector);
  const [trainCoachDetail, setTrainCoachDetail] = useState(currentObj);

  const [playing, setPlaying] = useState<boolean>(false);
  const [playPause, setPlayPause] = useState<boolean>(false);
  const [repeatAnnouncement, setRepeatAnnouncement] = useState("1");
  const [lateCheck, setLateCheck] = useState<any>(null);
  const [coaches ,setCoaches] = useState<any>(trainCoachDetail?.coaches);
  const [disabledClass,setDisabledClass] = useState<any>("");
  const inputRef = useRef<any>(null);
  useEffect(() => {
    dispatch(getData())
    setInterval(() => {
      dispatch(getData())
    }, 60000);

  }, [])
  const [displayBoardCheck, setDisplayBoardCheck] = useState(false)
  useEffect(() => {
    setTrainCoachDetail(onlineTrain[0])
  }, [onlineTrain?.length > 0])

  useEffect(() => {
    setCoaches(trainCoachDetail?.coaches)
  }, [trainCoachDetail?.coaches ])

  const handleClick = (data: string) => {
    setDisplayBoardCheck(true)
    dispatch(postOnlineTrainData(data))
  }

  useEffect(()=>{
    if(playPause){
     dispatch(WarnUnSave(true))
    }else {
      dispatch(WarnUnSave(false))    
    }
  }, [playPause])


  useEffect(()=>{
    if(trainCoachDetail){
      setDisabledClass("disabled")
    }
    else{
      setDisabledClass("");
    }
  })

  useEffect(() => {
    setup.getStationDetails().then((response) => {
        if (response && response?.status === 200) {
            if (response && response?.data) {
                if (response?.data?.length != 0) {
                  setShowOnlineTrain(true)
                }
                else {
                  setShowOnlineTrain(false)
                    Swal.fire({
                        position: "center",
                        icon: "warning",
                        title: "Please Enter Station Details",
                        showConfirmButton: false,
                        allowOutsideClick: false,
                        timer: 3000
                    }).then(() => {
                        history.push("/setup");
                    })
                }
            }
        }
    })
}, [])


  useEffect(() => {
    let handler = (event: any) => {
      if (inputRef?.current && !inputRef?.current?.contains(event.target)) {
        setLateCheck(null);
        if (onlineTrainObj?.late) {
          dispatch(updateOnlineTrainData(onlineTrainObj))
          setTimeout(() => {
            dispatch(getData())
          }, 2000)
          setOnlineTrainObj({});
        }
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const handleLateClick = (index: any) => {
    setLateCheck(index)
  }


  useEffect(() => {
    if (formState?.isSuccess === true && slctdBoardType?.status == 200 && displayBoardCheck == true) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: `Data clear Successfully`,
        showConfirmButton: false,
        allowOutsideClick: false,
        timer: 2000,
      }).then(() => {
        setDisplayBoardCheck(false)
      }
      )
    }
    if (formState?.isSuccess === true && slctdBoardType?.status == 200 && displayBoardCheck == true) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "data transfer successfully",
        showConfirmButton: false,
        allowOutsideClick: false,
        timer: 2000,
      }).then(() => {
        setDisplayBoardCheck(false)
      }
      )
    }
    else if (formState?.isSuccess === true && slctdBoardType?.status == 400 && displayBoardCheck == true) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: `${slctdBoardType?.errorMsg}`,
        showConfirmButton: false,
        allowOutsideClick: false,
        timer: 2000,
      }).then(() => {
        setDisplayBoardCheck(false)
      }
      )
    }

    if (formState?.isError == true && formState?.loading == false && displayBoardCheck == true) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: `Data Transferred Failed!!`,
        showConfirmButton: false,
        allowOutsideClick: false,
        showCloseButton: true
      }).then(() => {
        setDisplayBoardCheck(false)
      }
      )
    }
  }, [formState?.isError, formState?.isSuccess, slctdBoardType]
  );
  const handleChange = (e: any, onlineTrainData: any) => {
    var { name, value } = e.target;
    const onlineTrainObj = { ...onlineTrainData, [name]: value };
    dispatch(updateOnlineTrainData(onlineTrainObj))
    setTimeout(() => {
      dispatch(getData())
    }, 2000)
  }

  const [onlineTrainObj, setOnlineTrainObj] = useState<any>({});
  const handleLateChange = (e: any, onlineTrainData: any) => {
    var { name, value } = e?.target;
    setOnlineTrainObj({ ...onlineTrainData, [name]: value });
  }


  const handleChecked = (e: any, onlineTrainData: any) => {
    var { name, checked } = e.target;
    const onlineTrainObj = { ...onlineTrainData, [name]: checked };
    dispatch(updateOnlineTrainData(onlineTrainObj))
    setTimeout(() => {
      dispatch(getData())
    }, 2000)
  }
  const handleRefresh = () => {
    dispatch(getData())
  }

  const coachDetail = (onlineTrainData: any) => {
    const selectedObj = onlineTrain[onlineTrain?.findIndex((item: any) => { return item.trainNumber === onlineTrainData?.trainNumber })]
    setTrainCoachDetail(selectedObj)
  }

  const handleCoachChange = (e: any, onlineTrainData: any, index: number) => {
    var { name, value } = e.target;
    const objModify = JSON.parse(JSON.stringify(trainCoachDetail))
    objModify[name][index] = value
    setTrainCoachDetail({ ...objModify })
    
  }
  // console.log(trainCoachDetail,252)

  const handleCoachAdd = (onlineTrainData: any) => {
   
    const objModify = JSON.parse(JSON.stringify(trainCoachDetail))
    if(objModify.coaches?.length< 32){
      objModify.coaches?.push(`C${objModify.coaches?.length + 1}`)
      setTrainCoachDetail({ ...objModify })
    }
    else{
      Swal.fire({
        position: "center",
        icon: "warning",
        title: `Maximum coach limit has been reached`,
        showConfirmButton: false,
        allowOutsideClick: false,
        timer: 2000,
      })
    }
    
  }


  const handleReverse = (onlineTrainData: any) => {
    const objModify = JSON.parse(JSON.stringify(trainCoachDetail))
    objModify.coaches?.reverse()
    setTrainCoachDetail({ ...objModify })
  }


  const handleCoachRemove = (onlineTrainData: any) => {
    const objModify = JSON.parse(JSON.stringify(trainCoachDetail))
    objModify.coaches?.pop();
    setTrainCoachDetail({ ...objModify })
  }

  const handleConfirm = () => {
    dispatch(updateOnlineTrainData(trainCoachDetail))
    Swal.fire({
      position: "center",
      icon: "success",
      title: `coach updated Successfully`,
      showConfirmButton: false,
      allowOutsideClick: false,
      timer: 2000,
    })
    setTimeout(() => {
      dispatch(getData())
    }, 2000)
  }


  const handleDelete = (el: any) => {
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
          trainNumber: el,
        }
        dispatch(deleteOnlineTrainData(data))
        setTimeout(() => {
          dispatch(getData())
        }, 2000)
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Train  Deleted  successfully`,
          showConfirmButton: false,
          allowOutsideClick: false,
          timer: 3000,
        })
      }
    }).catch(() => {
    })
  }

  

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleCancel = () => setOpen(false);

  const [trainStatus, setTrainStatus] = useState<any>([]);

  const getTrainStatus = () => {
    onlineTrainService.getTrainStatus().then((data: any) => {
      if (data?.status === 200) {
        setTrainStatus(data?.data)
      } else {
        setTrainStatus("Please select Train Status");
      }
      // console.log(trainStatus)
    })
  }
  useEffect(() => {
    getTrainStatus();
  }, []);



  const play = () => {
    setPlayPause(true)
    setPlaying(true)
    onlineTrainService.play(repeatAnnouncement).then((resp) => {
      if(resp && resp?.status == 200 ){
        if (resp?.data?.data && resp?.status == 200) {
            Swal.fire({
                position: "center",
                icon: "warning",
                title: `Not found Audio Device to Play.`,
                showConfirmButton: false,
                allowOutsideClick: false,
                timer: 3000,
            }).then(() => {
                handleStop();
                setPlayPause(false);
            })
        }
        else{
            handleStop();
            setPlayPause(false);
        }
    }
    else if(resp?.status != 200){
        Swal.fire({
            position: "center",
            icon: "warning",
            title: `Some Error Found.`,
            showConfirmButton: false,
            allowOutsideClick: false,
            timer: 3000,
        }).then(() => {
            handleStop();
        })
    }

    })
  }
  const handleStop = () => {
    setPlayPause(false)
    
    // console.log("stop");
    onlineTrainService.stop().then((response) => {

      if (response?.status === 200) {
        setPlaying(false);
        setPlayPause(false);
      }
      else {
        setPlaying(true);
      }

    })
  }

  const pause = () => {
    setPlayPause(false)
    onlineTrainService.pause().then((response) => {
    })
  }

  const getAllCoachNames = () => {
    onlineTrainService.getAllCoachNames().then((data) => {
      if (data?.status === 200) {
        setAllCoachNames(data?.data);
      } else {
        setAllCoachNames([]);
      }
    })
  }
  useEffect(() => {
    getAllCoachNames();
  }, []);

  const getPlatformNumbers = () => {
    onlineTrainService.getPlatforms().then((data) => {
      if (data?.status === 200) {
        setPlatformNumbers(data?.data);
      } 
    })
  }
  useEffect(() => {
    getPlatformNumbers();
  }, []);

  const Handle = SortableHandle((props: any) => (
    <div className="coachNameNo" tabIndex={props.tabIndex}>
    C{props.dataaa + 1}
  </div>
  ));

  const SortableItem = SortableElement((props: any) => {
    const { value: item, value2: item2 } = props;
    // console.log(item2, 450)
    // console.log(item, 451)
    return (
      <>
        <div
          className="coachDetailBox">
          <div>
            {props.shouldUseDragHandle && <Handle dataaa={item} />}
            <select name="coaches" className="coachDetail" required={true}
              value={item2}
              onChange={(e) => { handleCoachChange(e, trainCoachDetail, item) }}>
              <option value="" selected>Select</option>
              {allCoachNames?.map((coachNames: any, i: any) => {
                return (
                  <option value={allCoachNames[i]}
                    disabled={trainCoachDetail?.coaches?.some((selectCoach: any) => selectCoach == allCoachNames[i])} >{allCoachNames[i]}</option>

                )
              })}
            </select>
          </div>
        </div>
      </>
    );
  });

  
  function array_move(arr : any, old_index :any, new_index : any) {
    if (new_index >= arr.length) {
      var k = new_index - arr.length + 1;
      while (k--) { 
        arr.push(undefined);
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing
  };

  const onSortEnd = (props : any) => {
    const myarray = [...coaches]
    const final = array_move(myarray, props.oldIndex, props.newIndex)
    setTrainCoachDetail({...trainCoachDetail,["coaches"]:final })
    setCoaches(final)

  };
// console.log(572,coaches)

  const SortableList = SortableContainer((props: any) => {
    const { items, ...restProps } = props;
    return (
      <div className="daysNameItem pl-10 pr-10">
        {items && items.map((item: any, index: any) => (
          <SortableItem
            key={`item-${index}`}
            index={index}
            value={index}
            value2={item}
            {...restProps}
          />
        ))}
      </div>
    );
  });





  return (
    <>
      <Grid container>
        <Grid item xs={10} className="pr-5">
            <TableContainer className="bgtable" style={{ maxHeight: "80vh" }}>
              <Table stickyHeader aria-label="sticky table" className="tableHeadData cardBoxShadow">
                <TableHead>
                  <TableRow className="thead">
                    <TableCell className=" rowStyle tableHeadDataFirstChild">S.No</TableCell>
                    <TableCell className=" rowStyle tableHeadData w-90">Train No.</TableCell>
                    <TableCell className=" rowStyle tableHeadData w-220">Train Name</TableCell>
                    <TableCell className=" rowStyle tableHeadData w-80"> A/D </TableCell>
                    <TableCell className=" rowStyle tableHeadData w-220"> Train Status </TableCell>
                    <TableCell className=" rowStyle tableHeadData w-80"> STA </TableCell>
                    <TableCell className=" rowStyle tableHeadData w-80"> STD </TableCell>
                    <TableCell className=" rowStyle tableHeadData w-80"> Late </TableCell>
                    <TableCell className=" rowStyle tableHeadData w-80"> ETA </TableCell>
                    <TableCell className=" rowStyle tableHeadData w-80"> ETD </TableCell>
                    <TableCell className=" rowStyle tableHeadData w-80"> Pf.No. </TableCell>
                    <TableCell className=" rowStyle tableHeadData w-80"> TD </TableCell>
                    <TableCell className=" rowStyle tableHeadData w-80"> CGDB </TableCell>
                    <TableCell className=" rowStyle tableHeadData w-160"> Announcement </TableCell>
                    <TableCell className=" rowStyle tableHeadDataLastChild"> Delete </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
          {formState?.loading == true ? (<TableRow><TableCell colSpan={15} style={{justifyContent: "center", alignItems: "center", height: '50vh' }}><Grid style={{ textAlign: "center" }}><CircularProgress /></Grid></TableCell></TableRow>) :
          onlineTrain?.length != 0 ?
                  onlineTrain?.map((onlineTrainData: any, i: any) => {
                    return (
                      <StyledTableRow className="onlineTrainTable">
                        <TableCell className="alt1 alternate2" onClick={() => { coachDetail({ ...onlineTrainData }) }} id="trainIndexID">{i + 1}</TableCell>
                        <TableCell className="alt1 alternate2" onClick={() => { coachDetail({ ...onlineTrainData }) }} id="trainNumber">{onlineTrainData?.trainNumber}</TableCell>
                        <TableCell className="alt1 alternate2" onClick={() => { coachDetail({ ...onlineTrainData }) }} id="trainName">{onlineTrainData?.trainName}</TableCell>
                        <TableCell className="alt1 alternate3 p-0">
                          <select className="selectData" name="arrDep" value={onlineTrainData?.arrDep} onChange={(e) => { handleChange(e, onlineTrainData) }}>
                            <option value="A">A</option>
                            <option value="D">D</option>
                          </select>
                        </TableCell>

                        <TableCell className="alt1 p-0">
                          <select className="selectRunStatus" name="trainStatus" value={onlineTrainData?.trainStatus} onChange={(e) => { handleChange(e, onlineTrainData) }}>
                           
                                { onlineTrainData?.arrDep=="A" ?
                                <><option value="Cancelled">Cancelled</option> 
                                <option value="Has Arrived On">Has Arrived On</option> 
                                <option value="Indefinite Late">Indefinite Late</option> 
                                <option value="Is Arriving On">Is Arriving On</option> 
                                <option value="Platform Change">Platform Change</option> 
                                <option value="Running Late">Running Late</option> 
                                <option value="Running Right Time">Running Right Time</option> 
                                <option value="Terminated">Terminated</option> 
                                <option value="Will Arrive Shortly">Will Arrive Shortly</option></>
:
                               <> <option value="Cancelled">Cancelled</option> 
                                <option value="Diverted">Diverted</option> 
                                <option value="Has Left">Has Left</option> 
                                <option value="Is On Platform">Is On Platform</option> 
                                <option value="Is Ready To Leave">Is Ready To Leave</option> 
                                <option value="Platform Change">Platform Change</option> 
                                <option value="Rescheduled">Rescheduled</option> 
                                <option value="Running Right Time">Running Right Time</option> 
                                <option value="Scheduled departure">Scheduled departure</option></> }

                             
                          </select>
                        </TableCell>
                        <TableCell className="alt1 alternate4" id="sta">{onlineTrainData?.sta}</TableCell>
                        <TableCell className="alt1 alternate4" id="std">{onlineTrainData?.std}</TableCell>
                        {onlineTrainData?.trainStatus == "Running Late" ? (lateCheck != i) ?
                          <TableCell className="alt1 alternate5" id="late"
                            onClick={() => handleLateClick(i)}
                          >{onlineTrainData?.late}</TableCell> :
                          <TableCell className="alt1 alternate5" id="late">

                            <TextField
                              size="small"
                              name="late"
                              defaultValue={onlineTrainData?.late}
                              ref={inputRef}
                              onChange={(e: any) => handleLateChange(e, onlineTrainData)}
                            />
                          </TableCell>: <TableCell aria-disabled className="alt1 alternate5" id="late"
                          ></TableCell> 
                        }

                        <TableCell className="alt1 alternate4" id="eta">{onlineTrainData?.eta}</TableCell>
                        <TableCell className="alt1 alternate4" id="etd">{onlineTrainData?.etd}</TableCell>
                        <TableCell className="alt1 p-0">
                        <select className="selectData" name="platformNo" value={onlineTrainData?.platformNo} onChange={(e) => { handleChange(e, onlineTrainData) }}>
                          {platformNumbers?.map((platformNo: any, i : any) => {
                            return (
                              <option value={platformNumbers[i]}>{platformNumbers[i]}</option>
                            )
                          })}
    
                          
                        </select>
                      </TableCell>
                        <TableCell className="alt1">
                          <Checkbox name="td" checked={onlineTrainData?.td} onChange={(e) => { handleChecked(e, onlineTrainData) }} size="small" className="onlineChckBoxs" inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                        </TableCell>
                        <TableCell className="alt1">
                          <Checkbox name="cgdb" checked={onlineTrainData?.cgdb} onChange={(e) => { handleChecked(e, onlineTrainData) }} size="small" className="onlineChckBoxs" inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                        </TableCell>
                        <TableCell className="alt1">
                          <Checkbox name="announcement" checked={onlineTrainData?.announcement} onChange={(e) => { handleChecked(e, onlineTrainData) }} size="small" className="onlineChckBoxs" inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                        </TableCell>
                        <TableCell className="alt1" onClick={() => handleDelete(onlineTrainData?.trainNumber)}>
                          <img src={deleteIcon} className="linkHover" />
                        </TableCell>
                      </StyledTableRow>
                    )
                  }):<TableRow>
                  <TableCell colSpan={15} style={{borderBottom:'0px'}}><span className="cdsNoTable">No Data Available</span></TableCell>
              </TableRow>}
                </TableBody>
              </Table>
            </TableContainer>
          <Table>
            <TableHead>
              <TableRow className="tableBottom cardBoxShadow">
                <TableCell className="bottomHed linkHover" onClick={handleOpen}><div className="displayContent"><img src={addTrainDataBtn} className="pr-22" />Click to Add new Train Data</div></TableCell>
                <Modal open={open} style={{ display: "flex", justifyContent: "center", paddingTop: "4%", background: "blur", overflowY: "scroll" }} >
                  <Card className="onlineTrainModalStyle">
                    <Grid className="modalHed coachControlHeader">
                      <div>
                        <div className="modalHeading">Train Entry</div>
                        <div className="modalText">Enter the data for New Train</div>
                      </div>
                      <IconButton onClick={handleCancel}>
                        <ClearIcon className="clearIconStyle" />
                      </IconButton>
                    </Grid>
                    <Grid container className="trainEntryForm" style={{ overflowY: "auto", height: "80%" }}>
                      <OnlineTrainDataEntry handleCancel={handleCancel} handleRefresh={handleRefresh} />
                    </Grid>
                  </Card> 
                </Modal>
              </TableRow>
            </TableHead>
          </Table>

          <Card className="mt-10 coachDetailCard">
            <Table className="">
              <TableHead>
                <TableRow style={{position:'sticky',top:'0'}}>
                  <div className="coachHedTable">
                    <div className="displayStyle">
                      <img style={{ paddingRight: "4px" }} src={ArrowUp} />
                      <TableCell className="coachDetailHedText" id="frontEnd">{trainCoachDetail?.frontEnd}</TableCell>
                    </div>
                    <div className="p-10">
                      <TableCell className="coachDetailHedText pl-25 pr-25">Train No.</TableCell>
                      <TableCell className="coachDetailHedText pl-25 pr-25">{trainCoachDetail?.trainNumber}</TableCell>
                    </div>
                    <div className="p-10">
                      <TableCell className="coachDetailHedText pl-25 pr-25">Train Name</TableCell>
                      <TableCell className="coachDetailHedText pl-25 pr-25">{trainCoachDetail?.trainName}</TableCell>
                    </div>
                    <div className="p-10">
                      <TableCell className="coachDetailHedText pl-25 pr-25">Platform No</TableCell>
                      <TableCell className="coachDetailHedText pl-25 pr-25">{trainCoachDetail?.platformNo}</TableCell>
                    </div>
                    <div className="displayStyle">
                      <TableCell className="coachDetailHedText">{trainCoachDetail?.backEnd}</TableCell>
                      <img style={{ paddingLeft: "4px" }} src={ArrowDown} />
                    </div>
                  </div>
                </TableRow>
                <TableRow className="borderTopRow">
                  <Grid item xs={12}>
                    
                        <SortableList
                  shouldUseDragHandle={true}
                  useDragHandle
                  axis="xy"
                  items={coaches?.length > 0 && coaches}
                  onSortEnd={onSortEnd}
                />
                  </Grid>
                </TableRow>
              </TableHead>
            </Table>
          </Card>
        </Grid>
        <Grid item xs={2} className="pl-5">
          <Card className="refCard mb-10">
            <Typography className="refHed">Refresh the Online Train List</Typography>
            <Button className="refBtn bghover" onClick={() => { handleRefresh() }}>
              <img src={refresh} className="pr-8" />Refresh
            </Button>
          </Card>

          <Card className="tddbCard mb-10">
            
            <Typography className="tddbHed">Transfer Data to Display Boards</Typography>
            <Typography className="tddbText">Transfer Train Arrival/ Departure Data to Display Boards</Typography>
            <Button disabled={formState?.loading} className="tddbBtn" onClick={() => handleClick("displayTadb")}>
              TADD
            </Button>
            <Typography  className="tddbText">Transfer Data to Coach Guidance Display Boards</Typography>
            <Button disabled={formState?.loading} className="tddbBtn" onClick={() => handleClick("displayCgdb")}>
              CGDB
            </Button>
            <Typography className="tddbText">Clear Current Data from CGDB</Typography>
            <Button disabled={formState?.loading} className="tddbBtn mb-0" onClick={() => handleClick("clearCgs")}>
              CGS
            </Button>
          </Card>

          <Card className="announceCard mb-15">
            <span className="tddbHed">Announcements</span>
            <Typography className="announceBlock">
              <div className="tddbText paddAnnounce">Repeat Announcement</div>
              <select className="selectAnnounce" name="repeatAnnouncement" value={repeatAnnouncement} onChange={(e) => { setRepeatAnnouncement(e.target.value); handleStop() }}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </Typography>
            <div className="pt-21 displayStyle">
              {playPause ? <img src={pauseBtn} className="pl-10 pr-10 linkHover" onClick={pause} /> : <img src={playBtn} className="pl-10 pr-10 linkHover" onClick={play} />}
              {playing ?
                <img src={stopBtn} className="pr-10 linkHover" onClick={handleStop} /> :
                <img src={stopBtn} className="disabled pr-10 linkHover" />
              }
            </div>
          </Card>

          <Card className="coachControlCard">
            <Typography className="tddbHed">Coach Controls</Typography>
            <div className="coachControlBlock pt-3 pb-8">
              <Button className={`addCoachBtn mr-8 ${!trainCoachDetail ? "disabled": ""}`}  onClick={() => { handleCoachAdd(trainCoachDetail) }}>
                <img src={addBtn} className="pr-8" />Add Coach
              </Button>
              <Button className={`addCoachBtn ml-8 ${!trainCoachDetail ? "disabled": ""}`} onClick={() => { handleCoachRemove(trainCoachDetail) }}>
                <img src={removeBtn} className="pr-8" />Remove Coach</Button>
            </div>
            <div className="coachControlBlock coachNextPrev pt-8 pb-9">
              <Button className={`addCoachBtn btnNext mr-8 w-70 ${!trainCoachDetail ? "disabled": ""}`}>
                <img src={arrowBackWard} />
              </Button>
              <Button className={`refBtn mr-8 ${!trainCoachDetail ? "disabled": ""}`} onClick={() => { handleReverse(trainCoachDetail) }}>
                <img src={refresh} className="pr-8" />Reverse
              </Button>
              <Button className={`refBtn  mr-8 btnrefres webView ${!trainCoachDetail ? "disabled": ""}`} style={{display:'none'}}>
                <img src={refresh} className="pr-8" />
              </Button>
              <Button className={`addCoachBtn btnPrev ${!trainCoachDetail ? "disabled": ""}`} >
                <img src={arrowForWard} />
              </Button>
            </div>
            <div className="pt-9">
              <Button className={`addCoachBtn w-100 ${!trainCoachDetail ? "disabled": ""}`}  onClick={() => { handleConfirm() }}>
                <img src={checkBtn} className="pr-7" />Confirm</Button>
            </div>
          </Card>
        </Grid>
      </Grid>
      <WarnUnsavedChanges
        ignorePrompt={false}
        navigateOnCancel={true}
        title="Are you sure ?"
        content="You want to stop the announcement and exit this page !"
        cancelBtnText="Cancel"
        confirmBtnText="confirm"
        isDirty={isDirty}
        handleStop={handleStop}
        playPause={playPause}
      />
    </>
  );
};