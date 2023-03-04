import { Button, Card, Checkbox, FormControl, FormControlLabel, Grid, RadioGroup, TextField, Typography, Radio } from "@material-ui/core";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { authuserStateSelector } from "../../../redux/reducers/authUser/authUser";
import SetupService from "../../service/setup/setup";
export const ThirdPartyIntegration = (props: any) => {
    const { appUser } = useSelector(authuserStateSelector)
    const formData = new FormData();
    const [file, setFile] = useState<any>([]);
    const [fileType, setFileType] = useState<any>("")
    const setup = new SetupService();

    var stationDetails: any;

    if (props && props.getThirdPartyIntegration && props.getThirdPartyIntegration.stationDetails) {
        stationDetails = props.getThirdPartyIntegration.stationDetails
    }

    const [enableIntegration, setEnableIntegration] = useState(false)

    useEffect(() => {
        setEnableIntegration(stationDetails?.enableIntegration)
    }, [stationDetails?.enableIntegration])

    const handleEnableIntegration = () => {
        setEnableIntegration(!enableIntegration);
    }

    const handleChange = (e: any) => {
        var { name, value, checked, files } = e.target;
        let filesArray = [];
        if (name == "enableIntegration" && (checked == true || checked == false)) {
            setEnableIntegration(checked);
        }
        else {
            props.getThirdPartyIntegration.getStationData({ [name]: value })
        }   

        if (files) {
            setFile([]);
            if (files.length != 0) {
                filesArray.push(files[0]);
            }
            setFile(filesArray);
        }
        
    }

    useEffect(() => {
        if(file?.length!=0){
            formData.append('file', file[0]);
            setup.uploadStationDetailsFile(formData);
        }
    },[file])
    

    return (
        <>
            <Grid item xs={12}>
                <Card style={{ padding: "4.55% 4.4% 5.5% 5.4%", border: "1px solid #DDDDDD", borderRadius: "10px",height:'315px'}}>
                    <Typography className="t1">
                        Third Party Integration
                    </Typography>
                    <Grid container style={{ paddingTop: "10px" }}>
                        <Grid item xs={12} style={{ textAlign: "start" }}>
                            <FormControlLabel onClick={handleChange}
                                control={<Checkbox className="intigratinCheckbox" size="small" name="enableIntegration" checked={enableIntegration} />}
                                label={<span className="intigratinCheckboxlabel">Enable Integration</span>}
                            />
                        </Grid>
                    </Grid>
                    <Grid container className="overlapBackground">
                        <Grid className={enableIntegration === false ? "formFields" : ""}>

                        </Grid>
                        <Grid xs={12} style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
                            {enableIntegration === false ? <FormControl component="fieldset" className="btnredioSection">
                                <RadioGroup name="typeOfIntegration" onClick={handleChange} value={stationDetails.typeOfIntegration} className="btnredio">
                                    <FormControlLabel disabled={true} value="" control={<Radio className="intigratinRadio" />} label={<span className="intigratinCheckboxlabel" >Main System</span>} />
                                    <FormControlLabel disabled={true} value="" control={<Radio className="intigratinRadio" />} label={<span className="intigratinCheckboxlabel" >Secondary System</span>} />
                                </RadioGroup>
                            </FormControl>
                                :
                                <FormControl component="fieldset" className="btnredioSection">
                                    <RadioGroup name="typeOfIntegration" onClick={handleChange} value={stationDetails.typeOfIntegration} className="btnredio">
                                        <FormControlLabel value="mainSystem" control={<Radio className="intigratinRadio" checked={stationDetails.typeOfIntegration == "mainSystem"} />} label={<span className="intigratinCheckboxlabel" >Main System</span>} />
                                        <FormControlLabel value="secondarySystem" control={<Radio className="intigratinRadio" checked={stationDetails.typeOfIntegration == "secondarySystem"} />} label={<span className="intigratinCheckboxlabel" >Secondary System</span>} />
                                    </RadioGroup>
                                </FormControl>

                            }

                        </Grid>
                        <Grid>

                            <Typography className="intigratintext">
                                file Location
                            </Typography>
                            <Grid container  >

                                <Grid item xs={6}>
                                    {enableIntegration === false ? <TextField disabled variant="outlined" className="intigrateBox" value="" onChange={handleChange} /> :
                                        <TextField disabled variant="outlined" className="intigrateBox" value={stationDetails.fileLocation} onChange={handleChange} />
                                    }
                                </Grid>
                                <Grid item xs={6}>
                                    {enableIntegration === false ?
                                        <Button
                                            className="browsebtn"
                                            variant="contained"
                                            component="label"
                                            disabled={true}
                                        >
                                            <span className="intigrateButtonLabel">browse</span>
                                            <input
                                                onChange={handleChange}
                                                name="fileLocation"
                                                type="file"
                                                hidden
                                            />
                                        </Button> :
                                        <Button
                                            className="browsebtn"
                                            variant="contained"
                                            component="label"
                                        >
                                            <span className="intigrateButtonLabel">browse</span>
                                            <input
                                                onChange={handleChange}
                                                name="fileLocation"
                                                type="file"
                                                hidden
                                            />
                                        </Button>
                                    }
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                </Card>
            </Grid>
        </>
    )
}