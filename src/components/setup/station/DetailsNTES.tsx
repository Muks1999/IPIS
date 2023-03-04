import { Card, Grid, Typography,Checkbox, FormControlLabel, TextField, } from "@material-ui/core";
import React, { useEffect, useState } from "react";

export const DetailsNTES =(props: any)=>{

    var stationDetails: any;
    const [ntesEnable, setNtesEnable] = useState(false);

    if(props && props.getDetailsNTES && props.getDetailsNTES.stationDetails){
        stationDetails = props.getDetailsNTES.stationDetails
    }

    useEffect(()=>{
        setNtesEnable(stationDetails.ntesUpdateEnable)
    },[stationDetails])

    const handleChange = (e: any) => {
        var { name, value, checked } = e.target;
        if(name==="ntesUpdateEnable"){
            var { checked } = e.target;
            setNtesEnable(checked);
            props.getDetailsNTES.getStationData({ [name]: checked })
        }
        else{
            props.getDetailsNTES.getStationData({ [name]: value })
        }
    }

    return(
        <>
        <Card style={{padding: "10px 33px 15px 30px" ,border:"1px solid #DDDDDD", borderRadius:"10px",height:'340px'}}>
            <Typography className="t1">
                NTES Details
            </Typography>
            <Grid style={{display: "flex", alignItems: "center" ,justifyContent:"flex-start",paddingTop:"15px",paddingLeft:"10px"}}>
                <FormControlLabel onClick={handleChange} 
                    control={
                    <Checkbox className="intigratinCheckbox" size="small" name="ntesUpdateEnable" checked={ntesEnable}/>
                    }
                    label={<span className="intigratinCheckboxlabel"> Enable  NTES Update </span>}
                /> 
            </Grid>
            <Grid container style={{paddingTop:"30px"}}>
                <Grid item xs={8}>
                    <Typography className="intigratinCheckboxlabel2">
                        NTES Update time in Minutes
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    {ntesEnable === false ? <TextField disabled className="DetailsNtesSelect2" type="number" size="small" variant= "outlined" name="ntesUpdateTimeInMin" required={true} onChange={handleChange} value={0}/> 
                    : <TextField className="DetailsNtesSelect2" type="number" size="small" variant= "outlined" name="ntesUpdateTimeInMin" required={true} onChange={handleChange} value={stationDetails.ntesUpdateTimeInMin}/>}
                </Grid>
            </Grid>
            <Grid container style={{paddingTop:"30px"}}>
                <Grid item xs={8}>
                    <Typography className="intigratinCheckboxlabel2">
                        NTES Port Type
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                   {ntesEnable=== false ?  <select disabled className="DetailsNtesSelect" name="ntesPortType" required={true} onChange={handleChange} value={stationDetails.ntesPortType} >
                        <option >Select</option>
                        <option value="serial">Serial</option>
                        {/* <option value="serial"></option>
                        <option value="serial"></option> */}
                    </select> : 
                    <select className="DetailsNtesSelect" name="ntesPortType" required={true} onChange={handleChange} value={stationDetails.ntesPortType} >
                        <option >Select</option>
                        <option value="serial">Serial</option>
                        {/* <option value="serial"></option>
                        <option value="serial"></option> */}
                    </select>}
                </Grid> 
            </Grid>
            <Grid container style={{paddingTop:"30px"}}>
                <Grid item xs={8}>
                    <Typography className="intigratinCheckboxlabel2">
                        Port No.
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    {ntesEnable === false ? 
                    <select disabled className="DetailsNtesSelect" name="portNo" required={true} onChange={handleChange} value={stationDetails.portNo}>
                        <option >Select</option>
                        <option value="3055">3055</option>
                        <option value="3056">3056</option>
                        <option value="3057">3057</option>
                    </select>:<select className="DetailsNtesSelect" name="portNo" required={true} onChange={handleChange} value={stationDetails.portNo}>
                        <option >Select</option>
                        <option value="3055">3055</option>
                        <option value="3056">3056</option>
                        <option value="3057">3057</option>
                    </select>}
                </Grid> 
            </Grid> 
        </Card>
        </>
    )
}