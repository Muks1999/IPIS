import { Button, Card, Checkbox, FormControlLabel, Grid, TextField, Typography } from "@material-ui/core"
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import DisplayLedTestingModel from "../../../model/setup/displayLedTestingModel";
import SetupService from "../../service/setup/setup";
import { useSelector } from "react-redux";
import { authuserStateSelector } from "../../../redux/reducers/authUser/authUser";

export const DisplayLedTesting = (props: any) => {
    const setup = new SetupService();
    const { appUser } = useSelector(authuserStateSelector)
    const [platformNumbers, setPlatformNumbers] = useState<[]>([]);
    const [deviceIdArray, setDeviceIdArray] = useState<any>([]);

    const [displayLedTesting, setDisplayLedTesting] = useState<DisplayLedTestingModel | any>({
        boardType: "",
        deviceId: 0,
        testPattern: "",
        platformNo: 0,
        installationTest: true,
        ledAutoTest: true,
        time: 0,
        createdBy: 0
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
        if (name == "boardType") {
            if (value == "mldb" && value != "") {
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
        setDisplayLedTesting({ ...displayLedTesting, [name]: value })
    }
    const handleSubmit = () => {
        let DisplayLed: any = {
            boardType: displayLedTesting.boardType,
            deviceId: displayLedTesting.deviceId,
            testPattern: displayLedTesting.testPattern,
            platformNo: displayLedTesting.platformNo,
            installationTest: displayLedTesting.installationTest,
            ledAutoTest: displayLedTesting.ledAutoTest,
            time: displayLedTesting.time,
        };
        setup.createDisplayLedTesting(DisplayLed).then((response: any) => {
            if (response && response.status === 200) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `Testing Started Successfully`,
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    timer: 3000,
                });
            }
        });
    }
    useEffect(() => {
        setup.getDisplayLedTesting().then(resp => {
            if (resp && resp.data && resp.data[0]) {
                setDisplayLedTesting(resp.data[0])
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
                    <Typography ><b>Display Board LED Testing</b></Typography>
                    <Grid container>
                        <Grid item xs={4} style={{ paddingTop: "20px" }}>
                            <Grid container>
                                <Grid item xs={4} className="boardTypeBoxLabel">
                                    Board Type
                                </Grid>
                                <Grid item xs={6}>
                                    <select
                                        value={displayLedTesting.boardType}
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
                                <Grid item xs={4} className="boardTypeBoxLabel" >
                                    Platform No.
                                </Grid>
                                <Grid item xs={6}>
                                    <select
                                        name="platformNo"
                                        className="boardTypeBox"
                                        required={true}
                                        onChange={handleChange}>
                                        value={displayLedTesting.platformNo}
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
                                <Grid item xs={4} className="boardTypeBoxLabel" >
                                    Device ID
                                </Grid>
                                <Grid item xs={6}>
                                {displayLedTesting.boardType == "" || displayLedTesting.boardType == "all"?
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
                                        value={displayLedTesting.deviceId}>
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
                    <Grid container>
                        <Grid item xs={8} style={{ display: "flex" }}>


                            <Typography className="testPattern"> Test Pattern</Typography>
                            <TextField
                                // size="small"
                                name="testPattern"
                                value={displayLedTesting.testPattern}
                                className="testPatternBox"
                                variant="outlined"
                                onChange={handleChange}
                                required={true}
                            />


                        </Grid>
                        <Grid item xs={4} style={{ display: "flex" }}>


                            <Typography className="seconds">  Time(In Seconds)</Typography>
                            <TextField
                                // size="small"
                                name="time"
                                value={displayLedTesting.time}
                                className="secondsBox"
                                variant="outlined"
                                onChange={handleChange}
                                required={true}
                            />
                        </Grid>
                    </Grid>
                    <Grid container style={{ paddingLeft: "12%", textAlign: "start", paddingTop: "2.9%" }}>
                        <div style={{ paddingRight: "2.9%" }}><FormControlLabel
                            control={
                                <Checkbox onClick={handleChange}
                                    value={true}
                                    size="small"
                                    name="Installation Test"
                                    style={{ color: "#033733", marginRight: "10px" }}
                                    className="onlineChckBoxs"
                                />
                            }
                            label={<span className="intigratinCheckboxlabel">Installation Test</span>}
                        /></div>
                        <div> <FormControlLabel
                            control={
                                <Checkbox
                                    onClick={handleChange}
                                    value={true}
                                    name="LED Auto Test"
                                    size="small"
                                    style={{ color: "#033733", marginRight: "10px" }}
                                    className="onlineChckBoxs"
                                />
                            }
                            label={<span className="intigratinCheckboxlabel">LED Auto Test</span>}
                        /></div>

                    </Grid>

                    {appUser.userRole == "ROLE_STATION MASTER" ? <></> :

                        <Grid container>
                            <Grid item xs={7}>
                            </Grid>
                            <Grid item xs={5}>
                                <Grid container
                                    style={{
                                        justifyContent: "space-evenly", paddingTop: "3.21%",
                                        paddingBottom: "31px"
                                    }}>
                                    <Button
                                        type="submit"
                                        className="DBStart"
                                        variant="contained"
                                        onClick={handleSubmit}

                                    >
                                        <PlayArrowIcon className="icon" />
                                        <span className="bttnfont">Start</span>
                                    </Button>

                                    <Button
                                        type="reset"
                                        value="Reset"
                                        variant="outlined"
                                        className="DBStop"
                                    >
                                        <StopIcon className="icon" />
                                        <span className="bttnfont">Stop</span>
                                    </Button>
                                </Grid>

                            </Grid>
                        </Grid>
                    }
                </Card></Grid>
        </>
    )
}