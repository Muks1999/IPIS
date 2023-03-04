import { Card, Grid, Table, TableRow, Typography } from "@material-ui/core";
import Optiplay from "../../assets/images/optiPlay.svg";
import Raillogo from "../../assets/images/Indian-Railways.svg";
import InnobitSystemsLogo from "../../assets/images/innobit_systems.svg";

export const SetupMain = () => {
  return (
    <>
      <Grid>
        <Card style={{padding:"9.5% 29.85% 1% 29.85%" , margin:"0px 10px"}}>
          <Grid>
            <Typography
              style={{
                textAlign: "center",
                fontSize: "24px",
                fontFamily: "Roboto",
              }}
            >
              Select a menu item to explore more options
            </Typography>
          </Grid>
          <Grid style={{paddingTop:"11.15%"}} >
            <Table>
              <TableRow>
                <img src={Optiplay} className="optistyle" />
                <img src={Raillogo} className="railstyle" />
              </TableRow>
            </Table>
          </Grid>
          <Grid>
            <Typography
              style={{
                textAlign: "center",
                fontSize: "21px",
                fontFamily: "Roboto",
                textTransform: "capitalize",
                paddingTop:"8.1%"
              }}
            >
              INTEGRATED PASSENGER INFORMATION SYSTEM
            </Typography>
          </Grid>
          <Grid container style={{ alignItems: "center",textAlign:"center" ,display:"flex",justifyContent:"center" ,paddingTop:"36.9%"}}>
              <img src={InnobitSystemsLogo} />
              <Typography style={{ fontSize: "12px", paddingLeft: "10px",fontFamily:"Roboto" }}>
                POWERED BY INNOBIT SYSTEMS
              </Typography>
          </Grid>
        </Card>
      </Grid>
    </>
  );
};
