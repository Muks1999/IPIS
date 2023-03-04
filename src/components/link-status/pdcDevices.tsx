import { Button, Card, CircularProgress, createStyles, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Theme, Typography, withStyles } from "@material-ui/core"
import RefreshIcon from '@material-ui/icons/Refresh';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import { useEffect, useState } from "react";
import { ElementFlags } from "typescript";
import { el } from "date-fns/locale";
import LinkStatusService from "../service/linkStatus/linkStatus";
import { formatDate, formatTime } from "../../common/helperMethods";

const StyledTableRow = withStyles((theme: Theme) =>
    createStyles({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
        },
    }),
)(TableRow);

export const PdcDevice = () => {

    const linkStatus = new LinkStatusService();

    const [array, setArray] = useState<[]>([]);
    const [platformNo, setPlateformNo] = useState("1");
    const [error, setError] = useState("")

    const handleChange = (e: any) => {
        var { value } = e.target;
        setPlateformNo(value)
    }

    const handleSubmit = () => {
        linkStatus.getPdcDevices(platformNo).then((data) => {
            if (data && data?.status === 200) {
                if (data && data?.data) {
                    setArray(data?.data);
                    setError("")
                }
            }
            else {
                setArray([])
                setError(data?.errorMsg)
            }
        })
    }

    const refershButton =() =>{
        setArray([])
        linkStatus.getPdcDevices(platformNo).then((data) => {
            if (data && data?.status === 200) {
                if (data && data?.data) {
                    setArray(data?.data);
                    setError("")
                }
            }
            else {
                setArray([])
                setError(data?.errorMsg)
            }
        })
    }

    useEffect(() => {
        linkStatus.getPdcDevices(platformNo).then((data) => {
            if (data && data?.status === 200) {
                if (data && data?.data) {
                    setArray(data?.data);
                    setError("")
                }
            }
            else {
                setArray([])
                setError(data?.errorMsg)
            }
        })
    }, [platformNo === "1"])

    useEffect(() => {
        pdcDevices()
    }, [array])

    const pdcDevices = () => {
        if (array?.length !== 0) {
            return (
                <TableContainer style={{ maxHeight: "65vh" }}>
                    <Table stickyHeader aria-label="sticky table" className="uniqueName">
                        <TableHead>
                            <TableRow>
                                <TableCell className="cdsTblRow">
                                    PDC device
                                </TableCell >
                                <TableCell className="cdsTblRow">
                                    Port
                                </TableCell>
                                <TableCell className="cdsTblRow">
                                    IP Address
                                </TableCell>
                                <TableCell className="cdsTblRow">
                                    Link
                                </TableCell>
                                <TableCell className="cdsTblRow">
                                    Link Time
                                </TableCell>

                                <TableCell className="cdsTblRow">
                                    Response
                                </TableCell>

                                <TableCell className="cdsTblRow">
                                    Response Time
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className="cdsTblbdy">
                            {array.map((deviceLinkStatus: any, i: any) => {
                                return (
                                    <StyledTableRow>
                                        <TableCell className="tblcolm">{deviceLinkStatus?.deviceType}</TableCell>
                                        <TableCell className="tblcolm">{deviceLinkStatus?.portNumber}</TableCell>
                                        <TableCell className="tblcolm">{deviceLinkStatus?.ipAddress}</TableCell>
                                        <TableCell className="tblcolm">
                                            {deviceLinkStatus?.status !== "Disconnected" ? <CheckBoxOutlineBlankIcon className="CheckboxConnectedStyle"></CheckBoxOutlineBlankIcon> : <CheckBoxOutlineBlankIcon className="CheckboxDisconnectedStyle"></CheckBoxOutlineBlankIcon>}
                                        </TableCell>
                                        <TableCell className="tblcolm">{formatDate(deviceLinkStatus?.linkTime)},{formatTime(deviceLinkStatus?.linkTime)}</TableCell>
                                        <TableCell className="tblcolm">{deviceLinkStatus?.response}</TableCell>
                                        <TableCell className="tblcolm">{formatDate(deviceLinkStatus?.responseTime)},{formatTime(deviceLinkStatus?.responseTime)}</TableCell>
                                    </StyledTableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            )
        }
    }
    return (
        <>
            <Card className="cdsDeviceCardStyle1">

                <Grid className="pdcDeviceCardStyle2">
                   <Grid className="platformselect" container>
                    <Grid  >
                    <Typography className="pdcDeviceText">
                        Select Platform
                    </Typography>
                    </Grid>
                <Grid>
                <select
                        name="platformNo"
                        value={platformNo}
                        className="pdcDeviceSelectStyle"
                        onChange={handleChange}
                    >
                        <option value="" selected>

                        </option>
                        <option value="1">01</option>
                        <option value="2">02</option>
                        <option value="3">03</option>
                        <option value="4">04</option>
                        <option value="5">05</option>
                        <option value="6">06</option>
                        <option value="7">07</option>
                        <option value="8">08</option>
                    </select>
                </Grid>
                <Grid style={{marginLeft:"2%"}}>
                <Button
                        className="CdsCheckButton"
                        variant="contained"
                        onClick={handleSubmit}
                    >
                        <span className="CdsRefreshlabelStyle">check</span>
                    </Button>
                </Grid>
            
                   </Grid>
                 
                  
                    <Button
                        className="CdsRefreshButton"
                        variant="contained"
                        onClick={refershButton}
                    >
                        <RefreshIcon className="CdsRefreshIconStyle" />
                        <span className="CdsRefreshlabelStyle">Refresh</span>
                    </Button>
                </Grid>
                {array?.length === 0 && error === "" ?(<div style={{display:'flex',justifyContent:"center",alignItems:"center", height: '100vh', position: 'relative', top: '300px'}}><Grid style={{ textAlign:"center", height: '100vh'}}>Redirecting...<CircularProgress /></Grid></div>) :
                <Grid>
                    <div>
                        {error != "" ? <div style={{ color: "red", textAlign: "center", justifyContent: "center", fontSize: "24px", position: 'relative', top: '250px' }}> {error}</div> :

                            pdcDevices()}

                    </div>
                </Grid>}
            </Card>
        </>
    )
}