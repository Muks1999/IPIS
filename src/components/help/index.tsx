import { Typography } from '@material-ui/core';
import { CardContent } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import React, { useEffect, useState } from 'react';
import { AppHeader } from '../common/app-header';
import "./style.scss";
import HeaderImage from "../../assets/images/helpHeaderImage.svg";
import HelpImage from "../../assets/images/helpQuestion.svg";
import HelpService from '../service/help/helpService';
import HelpModel from '../../model/help/helpModel';
import TrainLogo from "../../assets/images/trainLogo.svg";
import { ResetPassword } from '../passwordChange';
import { authuserStateSelector } from '../../redux/reducers/authUser/authUser';
import { useSelector } from 'react-redux';
export const Helps = () => {
    const [helpData, setHelpData] = useState<HelpModel[]>([]);
    const helpService = new HelpService();

    const { verified } = useSelector(authuserStateSelector);
    const [open, setOpen] = React.useState(false);
    useEffect(() => {
        helpService.getHelpData().then(
            result => {
                setHelpData(result);
            }).catch(error => { alert(error) });
    }, [])

    return (
        <>
            <Grid>
                <ResetPassword />
            </Grid>
            {/* <Grid >
                <AppHeader />
            </Grid> */}
            <Grid container>
                <Typography className='version'>version 0.0.1</Typography>
                <Grid xs={12}>
                <Card className='mainCardCss'>
                    <CardContent >      
                        <Grid container>
                            <Grid xs={12}>
                            <Grid>
                            <img width="100%" src={HeaderImage} className="margineBottomCss"/>
                            <div className='helpTrainLogocss'>
                            <img width="5%" src={TrainLogo} />
                        </div>
                            </Grid>
                            <Grid>
                            <div className='welcomeIntegratedCss'>
                            <span className="headText">Welcome to Integrated Passenger Information System</span >
                            </div> 
                            </Grid>
                            </Grid>
                         
                        </Grid>
                        {/* <img width="100%" src={HeaderImage} style={{ marginBottom: "100px" }} />
                        <div style={{ position: 'absolute', top: 25, left: 30, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
                            <img width="5%" src={TrainLogo} />
                        </div>
                        <div style={{ position: 'absolute', top: 30, left: 120, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
                            <span className="headText">Welcome to Integrated Passenger Information System</span >
                        </div> */}
                        
                        <Grid>
                            <Grid container spacing={3} className="justifyContentCss">
                                <Grid item sm={2}>
                                    <Card className="small-card">
                                        <CardContent className='justifyContentSpace'>
                                            <span className="help-heading-txt">
                                                Online Train
                                            </span>
                                            <br></br>
                                            <span className="help-content">
                                                Grid Control
                                            </span>
                                            <br></br>
                                            <span className="help-content">
                                                Display Board Communication
                                            </span>
                                            <br></br>
                                            <span className="help-content">
                                                Announcement
                                            </span>
                                            <br></br>
                                            <span className="help-content">
                                                Coach Control
                                            </span>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item sm={2}>
                                    <Card className="small-card">
                                        <CardContent >
                                            <span className="help-heading-txt">
                                                Link Status
                                            </span>
                                            <br></br>
                                            <span className="help-content">
                                                Link Check For:
                                            </span>
                                            <br></br>
                                            <span className="help-content">
                                                CDS
                                            </span>
                                            <br></br>
                                            <span className="help-content">
                                                PDC Device
                                            </span>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item sm={2}>
                                    <Card className="small-card">
                                        <CardContent >
                                            <span className="help-heading-txt">
                                                Public Announcement
                                            </span>
                                            <br></br>
                                            <span className="help-content">
                                                Custom Announcement
                                            </span>
                                            <br></br>
                                            <span className="help-content">
                                                Departmental Message
                                            </span>
                                            <br></br>
                                            <span className="help-content">
                                                Special Message
                                            </span>
                                            <br></br>
                                            <span className="help-content">
                                                Message Recording
                                            </span>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item sm={2}>
                                    <Card className="small-card">
                                        <CardContent >
                                            <span className="help-heading-txt">
                                                Messages
                                            </span>
                                            <br></br>
                                            <span className="help-content">
                                                TADB Messages
                                            </span>
                                            <br></br>
                                            <span className="help-content">
                                                New Message
                                            </span>
                                            <br></br>
                                            <span className="help-content">
                                                TV Messages
                                            </span>
                                        </CardContent>
                            </Card>
                                </Grid>
                                <Grid item sm={2}>
                                    <Card className="small-card">
                                        <CardContent >
                                            <span className="help-heading-txt">
                                                Set Up
                                            </span>
                                            <br></br>
                                            <span className="help-content">
                                                Station Entry
                                            </span>
                                            <br></br>
                                            <span className="help-content">
                                                Train Entry
                                            </span>
                                            <br></br>
                                            <span className="help-content">
                                                Dispddddlay Board settings
                                            </span>
                                            <br></br>
                                        <span className="help-content">
                                                Default Message
                                            </span>
                                            <br></br>
                                            <span className="help-content">
                                                Web configuration
                                            </span>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                            <Grid container spacing={3} className="justifyContentCss">
                                <Grid item sm={2}>
                                    <Card className="small-card">
                                        <CardContent >
                                            <span className="help-heading-txt">
                                                Interface
                                            </span>
                                            <br></br>
                                            <span className="help-content">
                                                Device Configuration</span>
                                            <br></br>
                                            <span className="help-content">
                                                CDC Devices</span>
                                            <br></br>
                                            <span className="help-content">
                                                PDC Devices</span>
                                            <br></br>
                                            <span className="help-content">
                                                MLDB and TV, IVD, OVD
                                            </span>
                                            <br></br>

                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item sm={2}>
                                    <Card className="small-card">
                                        <CardContent >
                                            <span className="help-heading-txt">
                                                User Control
                                            </span>
                                            <br></br>
                                            <span className="help-content">
                                                Add and Manage User
                                            </span>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item sm={2}>
                                    <Card className="small-card">
                                        <CardContent >
                                            <span className="help-heading-txt">
                                                Reports
                                            </span>
                                            <br></br>
                                            <span className="help-content">
                                                Generate and Print Reports
                                            </span>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Grid>
                        {/* <br></br>
                        <Grid container >
                            <Grid item xs={6}>
                                <Typography variant="h4"className='marginBottom20'>
                                    Frequently Asked Questions
                                </Typography>
                                {
                                    helpData.map((element, i) =>
                                        <>
                                            <Typography className='fAQ-content'> {element.helpTopic}</Typography>
                                            <Typography className='marginBottom20'>
                                                {element.helpAnswer}
                                            </Typography>
                                        </>

                                    )
                                }
                            </Grid>
                            <Grid item xs={6} >
                                <img src={HelpImage} className="width100"/>
                            </Grid>
                        </Grid> */}
                    </CardContent>
                </Card>
                </Grid>
            </Grid>
        </>
    );
}
