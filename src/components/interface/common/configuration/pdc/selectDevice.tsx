import { Button, Card, CardContent, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography } from "@material-ui/core"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PdcAttatchedDevices } from ".";
import frwdArrowIcon from "../../../../../assets/images/frwdArrowIcon.svg";
import { updatePdcChildDeviceName } from "../../../../../redux/actions/interface/interface";
import { interfaceStateSelector } from "../../../../../redux/reducers/interface/interface";

export const SelectDevice = (props:any) => {
    const dispatch = useDispatch();
    const { currentSelectedPdcEthernetDevice } = useSelector(interfaceStateSelector);
    const [ethernetDevice, setEthernetDevice] = useState("");

    const handleContinue = () =>{
        if (ethernetDevice != "") {
            let data: any = {
                deviceName: ethernetDevice
            };
            dispatch(updatePdcChildDeviceName(data))
        }
    }

    useEffect(() => {
        if (currentSelectedPdcEthernetDevice !== "") {
            console.log(currentSelectedPdcEthernetDevice)
            setEthernetDevice(currentSelectedPdcEthernetDevice)
        }
    }, [currentSelectedPdcEthernetDevice])

    return (
        <>
            <Grid item  >
                <Card style={{ height: "450px", border: "1px solid #DDDDDD", width: "16.6vw", paddingLeft:"6%"}} >
                    <CardContent style={{ padding: "10.4%    13.85%" }}>
                        <Typography style={{ fontSize: "14px", paddingBottom: "10.4%", fontWeight: 500, fontFamily: "roboto", lineHeight: "16px", fontStyle: "normal", color: "#222222" }}>
                            Select Zigbee device over PDC
                        </Typography>
                        <Grid >
                            <FormControl component="fieldset" >
                                <RadioGroup
                                    name="radio-buttons-group"
                                    onChange={event => setEthernetDevice(event.target.value)}
                                >
                                    <FormControlLabel value="cgdb" control={<Radio checked={ethernetDevice === 'cgdb'}/>}
                                        style={{ color: "black", fontSize: "10px", fontFamily: "Roboto" }}
                                        className="radioButtons f-14" label="Coach Guidance Display Board"
                                    />
                                    <FormControlLabel value="pfdb" control={<Radio checked={ethernetDevice === 'pfdb'}/>}
                                        style={{ color: "black", fontSize: "10px", fontFamily: "Roboto" }}
                                        className="radioButtons f-14" label="Platform Display Board"
                                    />
                                      <FormControlLabel value="mldb" control={<Radio checked={ethernetDevice === 'mldb'}/>}
                                        style={{ color: "black", fontSize: "10px", fontFamily: "Roboto" }}
                                        className="radioButtons f-14" label="Multiline Display Board"
                                    />
                                     <FormControlLabel value="ivd" control={<Radio checked={ethernetDevice === 'ivd'}/>}
                                        style={{ color: "black", fontSize: "10px", fontFamily: "Roboto" }}
                                        className="radioButtons f-14" label="IVD"
                                    />
                                     <FormControlLabel value="tvDisplay" control={<Radio checked={ethernetDevice === 'tvDisplay'}/>}
                                        style={{ color: "black", fontSize: "10px", fontFamily: "Roboto" }}
                                        className="radioButtons f-14" label="TV"
                                    />
                                     <FormControlLabel value="agdb" control={<Radio checked={ethernetDevice === 'agdb'}/>}
                                        style={{ color: "black", fontSize: "10px", fontFamily: "Roboto" }}
                                        className="radioButtons f-14" label="At a Glance Display Board"/>
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid style={{ textAlign: "center", paddingTop: "11.35%" }}>
                            <Button variant="contained" size="large" color="primary" className="btn_continue"
                                onClick={handleContinue}
                            >
                                Continue <img src={frwdArrowIcon} />
                            </Button>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </>
    )
}
