import { Button, Card, Grid, TextField, Typography } from "@material-ui/core"
import { DisplayBoardSetting } from "."
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import { useEffect, useState } from "react";
import DisplayBoardSettingModel from "../../../model/setup/displayBoardSettingModel"
import SetupService from "../../service/setup/setup";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { authuserStateSelector } from "../../../redux/reducers/authUser/authUser";



export const DisplayBoard = (props: any) => {

    const setup = new SetupService();
    const { appUser } = useSelector(authuserStateSelector)
    const [error1, setError1]= useState("");
    const [displayBoardSetting, setDisplayBoardSetting] = useState<DisplayBoardSettingModel | any>({
        boardType: "",
        displayTime: 0,
        effect: "",
        speed: "",
        letterSize: "",
        characterGap: 0,
        pageChangeTime: 0,
        createdBy: ""
     
    })

    const handleChange = (e: any) => {
        console.log("display board")
         var { name, value } = e.target;
         setDisplayBoardSetting({...displayBoardSetting, [name]: value })
    }

    const handleSubmit = () => {
        let DisplayBoard: any = {
            boardType: displayBoardSetting.boardType,
            displayTime: displayBoardSetting.displayTime,
            effect:displayBoardSetting.effect,
            speed:displayBoardSetting.speed,
            letterSize: displayBoardSetting.letterSize,
            characterGap: displayBoardSetting.characterGap,
            pageChangeTime: displayBoardSetting.pageChangeTime,
        };
        setup.createDisplayBoardSetting(DisplayBoard).then((response)=>{
            if(response && response.status ===200){
                setError1("")
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `Setting updated successfully`,
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    timer: 3000,
                })
               
            }
        
        else if(response && response.errorMsg!==""){
            setError1(response)
            console.log(setError1);
        }
      
        });
       console.log(DisplayBoard);
      }
      
      const handleCancel=()=>{
        setDisplayBoardSetting({boardType: "",
        displayTime: 0,
        effect: "",
        speed: "",
        letterSize: "",
        characterGap: 0,
        pageChangeTime: 0,
        createdBy: ""})
        setError1("")
      }

      useEffect(() => {
        setup.getDisplayBoardSetting().then(resp=>{
            if(resp && resp.data && resp.data[0]){
                setDisplayBoardSetting(resp.data[0])
                console.log(resp.data[0])
            }
        //   setDisplayBoardSetting({ 
        //     // boardType: resp.data[0].boardType,
        //     displayTime: resp.data[0].displayTime,
        //     // effect: resp.data[0].effect,
        //     // speed: resp.data[0].speed,
        //     // letterSize: resp.data[0].letterSize,
        //     // characterGap: resp.data[0].characterGap,
        //     pageChangeTime: resp.data[0].pageChangeTime,
        //     // createdBy: resp.data[0].createdBy
        //   })
        })
      },[]);

    return (
        <>
            <Grid>
           
                <Card style={{marginRight:"10px",border:"1px solid #DDDDDD",margin:"10px"}}  className="overlapBackground">
                {   appUser.userRole == "ROLE_STATION MASTER" ?     <Grid className="stationForm formFields">

                </Grid>: <></>
                }
                    <Typography style={{ paddingLeft: "5.82%", paddingTop: "5.06%",paddingBottom:"30px" }} ><b>Display Board Settings</b></Typography>
                    <Grid container >
                        <Grid item xs={5} className="DBtext">
                            Board Type
                        </Grid>
                        <Grid item xs={7}>
                            <select
                                value={displayBoardSetting.boardType}
                                className="DBselectBox"
                                name="boardType"
                                onChange={handleChange}
                            >
                                <option value="">Select</option>
                                <option value="mldb">MLDB</option>
                                <option value="agdb">AGDB</option>
                                <option value="ivd">IVD</option>
                                <option value="ovd">OVD</option>
                                <option value="tv">TV</option>
                                <option value="pfdb">PFDB</option>
                            </select>
                        </Grid>
                        <Grid item xs={5} className="DBtext">
                            Display Time Out(Min)<sup className="asterisk">*</sup>
                        </Grid>
                        <Grid item xs={7} >
                            <TextField
                                type="number"
                                size="small"
                                value={displayBoardSetting.displayTime}
                                name="displayTime"
                                variant="outlined"
                                className="DBselectBox2"
                                onChange={handleChange}
                            />
                        </Grid>


                        <Grid item xs={5} className="DBtext">
                            Effect
                        </Grid>
                        <Grid item xs={7}>
                            <select
                                className="DBselectBox"
                                name="effect"
                                onChange={handleChange}
                                value={displayBoardSetting.effect}
                            
                            >
                                <option value="">Select</option>
                                <option value="Reserved">Reserved</option>
                                <option value="Curtain Left to Right">Curtain Left to Right</option>
                                <option value="Curtain Top to Bottom">Curtain Top to Bottom</option>
                                <option value="Curtain Bottom to Top">Curtain Bottom to Top</option>
                                <option value="Typing Left to Right">Typing Left to Right</option>
                                <option value="Running Right to Left">Running Right to Left</option>
                                <option value="Running Top to Bottom">Running Top to Bottom</option>
                                <option value="Running Bottom to Top">Running Bottom to Top</option>
                                <option value="Flashing">Flashing</option>
                                <option value="Stable">Stable</option>
                            </select>
                        </Grid>
                        <Grid item xs={5} className="DBtext">
                            Speed
                        </Grid>
                        <Grid item xs={7}>
                            <select
                                className="DBselectBox"
                                name="speed"
                                value={displayBoardSetting.speed}
                                onChange={handleChange}
                            >
                                <option value="">Select</option>
                                <option value="Lowest">Lowest</option>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                                <option value="Highest">Highest</option>
                            </select>
                        </Grid>
                        <Grid item xs={5} className="DBtext">
                            Letter Size
                        </Grid>
                        <Grid item xs={7}>
                            <select
                                className="DBselectBox"
                                name="letterSize"
                                onChange={handleChange}
                                value={displayBoardSetting.letterSize}
                            >
                                <option value="">Select</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="10">10</option>
                                <option value="12">12</option>
                                <option value="14">14</option>
                                <option value="16">16</option>
                            </select>
                        </Grid>
                        <Grid item xs={5} className="DBtext">
                            Character Gap
                        </Grid>
                        <Grid item xs={7}>
                            <select
                                className="DBselectBox"
                                name="characterGap"
                                onChange={handleChange}
                                value={displayBoardSetting.characterGap}
                                
                            >
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value ="2">2</option>
                            </select>
                        </Grid>
                        <Grid item xs={5} className="DBtext">
                            Page Change Time(Sec)<sup className="asterisk">*</sup>
                        </Grid>
                        <Grid item xs={7} >
                            <TextField
                                type="number"
                                size="small"
                                value={displayBoardSetting.pageChangeTime}
                                name="pageChangeTime"
                                variant="outlined"
                                className="DBselectBox2"
                                onChange={handleChange}

                            />
                        </Grid>
                    </Grid>
                    {appUser.userRole == "ROLE_STATION MASTER" ?<></>:
                    <Grid container
                        style={{ justifyContent: "space-evenly", paddingTop: "15.16%", paddingBottom: "54%" ,marginRight:"10px" }}>
                         
                        <Button
                            type="submit"
                            className="DBSave"
                            variant="contained"
                            onClick={handleSubmit}
                        >
                            <DoneIcon className="icon" />
                            <span className="bttnfont">Save</span>
                        </Button>

                        <Button
                            type="reset"
                            value="Reset"
                            variant="outlined"
                            className="DBCancle"
                            onClick={handleCancel} 

                        >
                            <CloseIcon className="icon" />
                            <span className="bttnfont">Cancel</span>
                        </Button>
                        <span>
                        {error1 != "" ? <div style={{ color: "red", textAlign: "center" }}> {error1}</div>: <></>}
                      </span>
                    </Grid>
                    }
                </Card>

            </Grid>
     </>
    )
}