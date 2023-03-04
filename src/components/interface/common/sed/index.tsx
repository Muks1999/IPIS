import { Grid, Card, CardContent, Typography, FormControl, FormControlLabel, Radio, RadioGroup, Button } from "@material-ui/core"
import "./style.css";
import frwdArrowIcon from "../../../../assets/images/frwdArrowIcon.svg";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateDeviceName, setConfiguration } from "../../../../redux/actions/interface/interface";
import { interfaceStateSelector ,clearState } from "../../../../redux/reducers/interface/interface";
import { useEffect } from "react";
import { EthernetDevice } from "../configuration";
import Swal from "sweetalert2";
import FormState from "../../../../redux/states/formState";
import { authuserStateSelector } from "../../../../redux/reducers/authUser/authUser";

export const SelectEthernetDevice = (props: any) => {
    const {checkMaster} = props;
    const { currentSelectedCdsEthernetDevice, currentSelectedCdsPortNumber, currentSelectedCdsPortName, setConfigData, formState } = useSelector(interfaceStateSelector);
    const [ethernetDevice, setEthernetDevice] = useState("");
    const [ConfigCheck, setConfigCheck] = useState(false);
    const dispatch = useDispatch();
    const { appUser } = useSelector(authuserStateSelector)
    const handleContinue = () => {

        const data: any = {
            deviceName: ethernetDevice
        }
        dispatch(updateDeviceName(data))
    }
    const handleSetConfig = () => {
        setConfigCheck(true)
        dispatch(setConfiguration("setConfiguration"))
    }
    useEffect(() => {
        if (formState.isSuccess === true && setConfigData?.status==200 && ConfigCheck==true) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: `Configuration Set Successfully`,
                showConfirmButton: false,
                allowOutsideClick: false,
                timer: 2000,
            }).then(()=>{
                setConfigCheck(false)
            }
            )
        }
        if(formState.isError == true && formState.loading==false && ConfigCheck==true){
                Swal.fire({
                    position: "center",
                    icon: "warning",
                    title: `Configuration Set Failed!!`,
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    timer: 2000,
                }).then(()=>{
                    setConfigCheck(false)
                }
                ) 
            }
    }, [formState.isError,formState.isSuccess,setConfigData]
    );

    const handleRadioButtons = (e: any) =>{
        setEthernetDevice(e)
    }

    useEffect(() => {
        if (currentSelectedCdsEthernetDevice !== "") {
            console.log(currentSelectedCdsEthernetDevice)
            setEthernetDevice(currentSelectedCdsEthernetDevice)
        }
    }, [currentSelectedCdsEthernetDevice])

    return (
        <>
            <Grid container>
                <Grid item style={{ width: "20.84vw" }} className="Sed">
                    <Card style={{ height: "78%", padding: "20px 11.659%" }}>
                        <CardContent style={{ padding: "0px" }}>
                            <Typography variant="h6" component="p" style={{ fontSize: "14px", paddingBottom: "10px", fontWeight: 500, fontFamily: "roboto", lineHeight: "16px", fontStyle: "normal", color: "#222222" }}>
                               <b>Select Ethernet Device</b>
                            </Typography>
                            <Typography className="Ethernet">
                                Select Ethernet Device to Configure on the selected port
                            </Typography>
                        </CardContent>
                        <CardContent style={{ padding: "0px" }}>
                            <FormControl component="fieldset" style={{ paddingLeft: "1.5px" }}>
                                <RadioGroup
                                    name="radio-buttons-group"
                                    value={ethernetDevice}
                                    onChange={(event) => handleRadioButtons(event.target.value)}>
                                    <FormControlLabel value={!checkMaster ? "cdcSlave" : "cdcMaster"}  control={<Radio />} style={{ color: "black", fontSize: "14px" }}
                                        className="radioButtons f-14" label="Central Data Controller"
                                    />
                                    <FormControlLabel value="pdc" control={<Radio />} className="radioButtons f-14" label="Platform Data Controller"
                                    />
                                    <FormControlLabel value="mldb" control={<Radio />} className="radioButtons f-14" label="Multiline Display Board"
                                    />
                                    <FormControlLabel value="ovd" control={<Radio />} className="radioButtons f-14" label="IVD, OVD and TV "
                                    />
                                    <FormControlLabel value="agdb" control={<Radio />} className="radioButtons f-14" label="At a Glance Display Board"
                                    />
                                      <FormControlLabel value="pfdb" control={<Radio />} className="radioButtons f-14" label="Platform Display Board"
                                    />
                                    
                                </RadioGroup>
                            </FormControl>
                            <Grid style={{ textAlign: "center", paddingTop: "6.35%" }}>
                                <Button variant="contained" size="large" color="primary" className="btn_continue"
                                    onClick={handleContinue}
                                >
                                    Continue <img src={frwdArrowIcon} />
                                </Button>
                            </Grid>
                        </CardContent>
                    </Card>
                    <Card style={{ marginTop: '10px', padding: "20px 11.659%" , minHeight :'10vh'}}>
                        <CardContent style={{ padding: "0px" }}>
                            <Typography variant="h6" component="p" style={{ fontSize: "14px", paddingBottom: "10px", fontWeight: 500, fontFamily: "roboto", lineHeight: "16px", fontStyle: "normal", color: "#222222" }}>
                                Set Configuration
                            </Typography>
                            <Typography className="Ethernet">
                                To finish setting up devices, Click below
                            </Typography>
                        </CardContent>
                        <CardContent style={{ padding: "0px" }}>
                            <Grid style={{ textAlign: "center" }}>
                                <Button variant="contained" size="large" color="primary" className="btn_continue"
                                    onClick={handleSetConfig}
                                >
                                    Continue <img src={frwdArrowIcon} />
                                </Button>
                            </Grid>
                        </CardContent>
                    </Card>
{/* } */}
                </Grid>
            </Grid>
        </>
    )
}