import { Card,FormControl, FormControlLabel, Grid, Radio, RadioGroup,Typography } from "@material-ui/core";

export const DeviceSystem = (props: any)=>{

    var stationDetails;

    if(props && props.getDeviceSystem && props.getDeviceSystem.stationDetails){
        stationDetails = props.getDeviceSystem.stationDetails
    }

    const handleChange = (e: any) => {
        var { name, value } = e.target;
        props.getDeviceSystem.getStationData({ [name]: value })
    }

    return(
        <>
            <Grid item xs={12}>
                <Card style={{padding: "3.6% 55.29% 2.15% 5.3%",border:"1px solid #DDDDDD", borderRadius:"10px"}}>
                    <Typography className="t1">
                        Device Systems
                    </Typography>
                    <Grid style={{display: "flex", alignItems: "center" ,justifyContent:"flex-start"}}>
                        <FormControl component="fieldset" >
                            <RadioGroup name="deviceSchema" onClick={handleChange} value = {stationDetails.deviceSchema}>
                                <FormControlLabel style={{paddingTop:"9%"}} value="IPBasedDevices" control={<Radio className="intigratinRadio" />} label={<span className="intigratinCheckboxlabel" >IP Based Devices</span>}/>
                                <FormControlLabel style={{paddingTop:"9%"}} value="IDBasedDevices" control={<Radio className="intigratinRadio" />} label={<span className="intigratinCheckboxlabel" >ID based Devices</span>}/>
                            </RadioGroup>
                    </FormControl>
                    </Grid>
                </Card>
            </Grid>
        </>
    )
}