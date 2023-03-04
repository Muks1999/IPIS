import { Button, Card, Grid, TextField, Typography } from "@material-ui/core"
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { useEffect, useState } from "react";
import DisplayBoardDiagnoModel from "../../../model/setup/displayBoardDiagnoModel";
import SetupService from "../../service/setup/setup";
import { useSelector } from "react-redux";
import { authuserStateSelector } from "../../../redux/reducers/authUser/authUser";

export const DisplayBoardDigno = (props: any) => {
    const setup = new SetupService();
    const { appUser } = useSelector(authuserStateSelector)
    const [platformNumbers, setPlatformNumbers] = useState<[]>([]);
    const [deviceIdArray, setDeviceIdArray] = useState<any>([]);

    const [displayBoardDiagno, setDisplayBoardDiagno] = useState<DisplayBoardDiagnoModel | any>({
        boardType: "",
        platformNo: 0,
        deviceId: 0,
        testCommand: "",
        sentData: "",
        responseTime: 0,
        receivedData: "",
        createdBy: ""
    })

    

    const range = (start:any, end:any) =>{
        let len = end - start + 1;
        let idArray =[];
        for (let i = 0; i < len; i++){ 
            idArray.push(start + i);
        }
        return(idArray);
    }


    const handleChange = (e: any) => {
        var { name, value } = e.target;
        if (name == "boardType" && value !="") {
            if (value == "mldb") {
                setDeviceIdArray(range(101, 130));
            }
            else if (value == "agdb") {
                setDeviceIdArray(range(131, 160));
            }
            else if (value == "ivd") {
                setDeviceIdArray(range(71, 100));
            }
            else if (value == "ovd") {
                setDeviceIdArray(range(40, 70));
            }
            else if (value == "tv") {
                setDeviceIdArray(range(191, 220));
            }
            else if (value == "pfdb") {
                setDeviceIdArray(range(161, 190));
            }
        }
        setDisplayBoardDiagno({ ...displayBoardDiagno, [name]: value })
        console.log(deviceIdArray.length,"344")
        
    }

    const handleSubmit = () => {
        let DisplayDiagno: any = {
            boardType: displayBoardDiagno.boardType,
            platformNo: displayBoardDiagno.platformNo,
            deviceId: displayBoardDiagno.deviceId,
            testCommand: displayBoardDiagno.testCommand,
            sentData: displayBoardDiagno.sentData,
            responseTime: displayBoardDiagno.responseTime,
            receivedData: displayBoardDiagno.receivedData,
        };
        setup.createDisplayBoardDiagno(DisplayDiagno);
        console.log(DisplayDiagno);

    }

    useEffect(() => {
        setup.getDisplayBoardDiagno().then(resp => {
            if (resp && resp.data && resp.data[0]) {
                setDisplayBoardDiagno(resp.data[0])
                if (resp.data[0].boardType == "mldb") {
                    setDeviceIdArray(range(101, 130));
                }
                else if (resp.data[0].boardType == "agdb") {
                    setDeviceIdArray(range(131, 160));
                }
                else if (resp.data[0].boardType == "ivd") {
                    setDeviceIdArray(range(71, 100));
                }
                else if (resp.data[0].boardType == "ovd") {
                    setDeviceIdArray(range(40, 70));
                }
                else if (resp.data[0].boardType == "tv") {
                    setDeviceIdArray(range(191, 220));
                }
                else if (resp.data[0].boardType == "pfdb") {
                    setDeviceIdArray(range(161, 190));
                }
            }
        })
        
    }, [])

    const getPlatformNumbers = () => {
        setup.getPlatformNumbers().then((response) => {
            if (response && response.status === 200) {
                setPlatformNumbers(response.data);
            }
        })
    }

    useEffect(() => {
        getPlatformNumbers();
    }, []);

    return (
        <>
            <Grid>
                <Card className={appUser.userRole == "ROLE_STATION MASTER" ? "overlapBackground  displayBoard":" displayBoard"}>
                {   appUser.userRole == "ROLE_STATION MASTER" ? <Grid className="stationForm formFields">

                    </Grid>: <></>
                    }
  
                    <Typography ><b>Display Board Diagnostics</b></Typography>
                    <Grid container >
                        <Grid item xs={4} style={{ paddingTop: "20px" }}>
                            <Grid container>
                                <Grid item xs={4} className="boardTypeBoxLabel">
                                    Board Type
                                </Grid>
                                <Grid item xs={6}>
                                    <select
                                        value={displayBoardDiagno.boardType}
                                        className="boardTypeBox"
                                        required={true}
                                        name="boardType"
                                        onChange={handleChange}
                                    >
                                        <option value="">Select</option>
                                        <option value="all">All</option>
                                        <option value="mldb">MLDB</option>
                                        <option value="agdb">AGDB</option>
                                        <option value="ivd">IVD</option>
                                        <option value="ovd">OVD</option>
                                        <option value="tv">TV</option>
                                        <option value="pfdb">PFDB</option>
                                    </select>
                                </Grid>

                            </Grid>
                        </Grid>
                        <Grid item xs={4} style={{ paddingTop: "20px" }}>
                            <Grid container style={{ paddingRight: "10%" }}>
                                <Grid item xs={4} className="boardTypeBoxLabel">
                                    Platform No.
                                </Grid>
                                <Grid item xs={6}>
                                    <select
                                        name="platformNo"
                                        className="boardTypeBox"
                                        required={true}
                                        onChange={handleChange}>
                                        value={displayBoardDiagno.platformNo}
                                        <option value="" selected>
                                            Select
                                        </option>
                                        <option value="all" selected>
                                            All
                                        </option>
                                        {platformNumbers.map((platformNo: any, i: any) => {
                                            return (
                                                <option value={platformNumbers[i]}>{platformNumbers[i]}</option>
                                            )
                                        })}

                                        
                                    </select>
                                </Grid>

                            </Grid>

                        </Grid>
                        <Grid item xs={4} style={{ paddingTop: "20px" }}>
                            <Grid container style={{ paddingRight: "10%" }}>
                                <Grid item xs={4} className="boardTypeBoxLabel">
                                    Device ID
                                </Grid>
                                <Grid item xs={6}>
                                    {displayBoardDiagno.boardType == "" || displayBoardDiagno.boardType == "all"?
                                        <select
                                        disabled
                                        name="deviceId"
                                        className="boardTypeBox">
                                            <option value="" selected>
                                                Select
                                            </option>
                                        </select>
                                    :<select
                                        name="deviceId"
                                        className="boardTypeBox"
                                        required={true}
                                        onChange={handleChange}
                                        value={displayBoardDiagno.deviceId}>
                                        <option value="" selected>
                                            Select
                                        </option>
                                        {deviceIdArray.map((deviceId: any, i: any) => {
                                            return (
                                                <option value={deviceId}>{deviceId}</option>
                                            )
                                        })}
                                    </select>
                                    }
                                </Grid>

                            </Grid>

                        </Grid>
                    </Grid>
                    <Grid container style={{ paddingTop: "20px" }}>
                        <Grid className="testCommand">
                            Test Command
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                size="medium"
                                name="testCommand"
                                value={displayBoardDiagno.testCommand}
                                className="testCommand"
                                variant="outlined"
                                onChange={handleChange}
                                required={true}
                            />
                        </Grid>
                        <Grid item xs={2} style={{ textAlign: "end" }}>
                            {appUser.userRole == "ROLE_STATION MASTER" ?
                                <Button
                                    disabled
                                    type="submit"
                                    className="test1Button"
                                    variant="contained"
                                    onClick={handleSubmit}
                                >
                                    <ArrowForwardIcon className="icon" />
                                    <span className="bttnfont">Send</span>
                                </Button>

                                :
                                <Button
                                    type="submit"
                                    className="test1Button"
                                    variant="contained"
                                    onClick={handleSubmit}
                                >
                                    <ArrowForwardIcon className="icon" />
                                    <span className="bttnfont">Send</span>
                                </Button>
                            }

                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={1} className="setData">
                            Sent Data
                        </Grid>
                        <Grid item xs={11}>
                            <TextField
                                size="small"
                                name="sentData"
                                className="setDatabox"
                                variant="outlined"
                                value={displayBoardDiagno.sentData}
                                onBlur={handleChange}
                            />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={1} className="recivedData">
                        Received Data
                        </Grid>
                        <Grid item xs={11}>
                            <TextField
                                size="small"
                                name="receivedData"
                                className="recivedDataBox"
                                variant="outlined"
                                value={displayBoardDiagno.receivedData}
                                onBlur={handleChange}
                            />
                        </Grid>
                    </Grid>
                    <Grid className="response">
                        Response Time (Second): 10s
                    </Grid>

                </Card>
            </Grid>
        </>
    )
}