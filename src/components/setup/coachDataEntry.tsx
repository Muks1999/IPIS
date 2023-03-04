import { Button, Card, CircularProgress, createStyles, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Theme, Typography, withStyles } from "@material-ui/core"
import { useEffect, useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SetupService from "../service/setup/setup";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { authuserStateSelector } from "../../redux/reducers/authUser/authUser";
import { useHistory } from "react-router-dom";
import { Autocomplete } from "@material-ui/lab";
import KeyboardWrapper from "./KeyboardWrapper";

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
)(TableRow);

export const CoachDataEntry = (props: any) => {
  const history = useHistory();
  const setup = new SetupService();
  const { appUser } = useSelector(authuserStateSelector)
  const [input, setInput] = useState({
    id: 0,
    engCoachName: "",
    hindiCoachName: "",
  });
  const [array, setArray] = useState<[]>([]);
  const [error, setError] = useState("");
  const buttonText = "Add";
  const updateText = "Update";
  const [coachNameArray, setCoachNameArray] = useState<any>([]);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [loading, setLoading] = useState<any>(false);
  const [engNameChange, setEngNameChange] = useState<any>(false);
  useEffect(() => {
    coachData()
  }, [array])

  const [word, setWord] = useState<any>()
  const handleChange = (e: any) => {
    var { name, value } = e.target;
    if(value.match(/^[a-z\d- ]{0,4}$/i) ){
     setInput({ ...input, [name]: value });
     setWord(value);
     setEngNameChange(!engNameChange);
  }
};
  

  const handleAutocomplete = (value: any) => {
    setInput({ ...input, ["engCoachName"]: value });
    setWord(value);
    setEngNameChange(!engNameChange);
  };

  let hindiCoach = "";

  useEffect(() => {
    if (engNameChange || !engNameChange) {
      const hindiKeyboard = [
        {
          name:" ",
          hindiValue: " "
        },
        {
          name: "a",
          hindiValue: "ए"
        },
        {
          name: "b",
          hindiValue: "बी"
        },
        {
          name: "c",
          hindiValue: "सी"
        },
        {
          name: "d",
          hindiValue: "डी"
        },
        {
          name: "e",
          hindiValue: "इ"
        },
        {
          name: "f",
          hindiValue: "एफ"
        },
        {
          name: "g",
          hindiValue: "जी"
        },
        {
          name: "h",
          hindiValue: "एच"
        },
        {
          name: "i",
          hindiValue: "आई"
        },
        {
          name: "j",
          hindiValue: "जे"
        },
        {
          name: "k",
          hindiValue: "के"
        },
        {
          name: "l",
          hindiValue: "एल"
        },
        {
          name: "m",
          hindiValue: "एम"
        },
        {
          name: "n",
          hindiValue: "एन"
        },
        {
          name: "o",
          hindiValue: "ओ"
        },
        {
          name: "p",
          hindiValue: "पी"
        },
        {
          name: "q",
          hindiValue: "क्यू"
        },
        {
          name: "r",
          hindiValue: "आर"
        },
        {
          name: "s",
          hindiValue: "एस"
        },
        {
          name: "t",
          hindiValue: "टी"
        },
        {
          name: "u",
          hindiValue: "यू"
        },
        {
          name: "v",
          hindiValue: "वी"
        },
        {
          name: "w",
          hindiValue: "डबलू"
        },
        {
          name: "x",
          hindiValue: "एक्स"
        },
        {
          name: "y",
          hindiValue: "वाय"
        },
        {
          name: "z",
          hindiValue: "जेड"
        },
        {
          name: "1",
          hindiValue: "1"
        },
        {
          name: "2",
          hindiValue: "2"
        },
        {
          name: "3",
          hindiValue: "3"
        },
        {
          name: "4",
          hindiValue: "4"
        },
        {
          name: "5",
          hindiValue: "5"
        },
        {
          name: "6",
          hindiValue: "6"
        },
        {
          name: "7",
          hindiValue: "7"
        },
        {
          name: "8",
          hindiValue: "8"
        },
        {
          name: "9",
          hindiValue: "9"
        },
        {
          name: "0",
          hindiValue: "0"
        },

      ];
      let array = word?.split("");
      for (let i = 0; i < array?.length; i++) {
        for (let j = 0; j < hindiKeyboard.length;j++){
          if(hindiKeyboard[j].name == array[i].toLowerCase()){
              hindiCoach = hindiCoach + hindiKeyboard[j].hindiValue;
              break;
          }
          else if (array[i] == "-") {
            hindiCoach = hindiCoach + array[i]
            break;
          }
        }
      }
      setInput({ ...input, ["hindiCoachName"]: hindiCoach });
    }
  }, [engNameChange])


  const handleSubmit = () => {
    if (input.id === 0) {
      let CoachName: any = {
        engCoachName: input.engCoachName,
        hindiCoachName: input.hindiCoachName,
      };
      setup.createCoachData(CoachName).then((data: any) => {
        if (data && data.status === 200) {
          setError("");
          Swal.fire({
            position: "center",
            icon: "success",
            title: `Coach added successfully`,
            showConfirmButton: false,
            allowOutsideClick: false,
            timer: 3000,
          })
          setError("");
          getCoachData();
          setInput({
            id: 0,
            engCoachName: "",
            hindiCoachName: "",
          })
        }
        else if (data && data.errorMsg !== "") {
          setError(data.errorMsg);
        }
      });
    }
    else {
      let CoachName: any = {
        id: input.id,
        engCoachName: input.engCoachName,
        hindiCoachName: input.hindiCoachName,
      };
      setup.updateCoachData(CoachName).then((response: any) => {
        if (response && response?.status === 200) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: `Coach updated successfully`,
            showConfirmButton: false,
            allowOutsideClick: false,
            timer: 3000,
          })
          setup.getCoachData().then((data) => {
            if (data && data?.data) {
              setArray(data?.data);
            }
            setInput({
              id: 0,
              engCoachName: "",
              hindiCoachName: "",
            })
          })
        }

      });
    }
  }

 
  const handleEdit = (el: any) => {
    let data: any = {
      id: el,
    }
    setup.getCoachDatasById(data).then((datas) => {
      setInput({
        id: datas?.data?.id,
        engCoachName: datas?.data?.engCoachName,
        hindiCoachName: datas?.data?.hindiCoachName,
      })
    });
  }
  console.log(input)

  const handleDelete = (el: any) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result?.isConfirmed) {
        let data: any = {
          id: el,
        }
        setup.removeCoachData(data).then((datas) => {
          if (datas && datas?.status === 200) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Coach Data deleted successfully',
              showConfirmButton: false,
              allowOutsideClick: false,
              timer: 1500,
            });
            getCoachData();
          }
        })
      }
    })
  }

  const handleCancel = () => {
    setInput({
      id: 0,
      engCoachName: "",
      hindiCoachName: "",
    })
    setError("");
  }

  useEffect(() => {
    if (props.stationData) {
      setLoading(true);
      getCoachData();
    }
    else {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Please Enter Station Details",
        showConfirmButton: false,
        allowOutsideClick: false,
        timer: 3000
      })
        .then(() => {
          props.updateSelectedSideBarMenu("setupMain");
        })
    }
  }, [])

  useEffect(() => {
    setup.getCoachCodes().then((data) => {
      if (data && data?.data) {
        let coachCodes = [];
        for (let i = 0; i < data?.data?.length; i++) {
          coachCodes.push(data?.data[i]?.engCoachName);
        }
        setCoachNameArray(coachCodes);
      }
      else {
        setCoachNameArray([]);
      }
    }
    )
  }, [array])

  const getCoachData = () => {
    setup.getCoachData().then((data) => {
      if (data && data?.data && data?.status == 200) {
        setArray(data.data);
        setLoading(false);
        setDisabled(false);
      }
      else if (data && data?.status != 200) {
        setArray([]);
        setLoading(false);
      }
    }
    )
  }

  const coachData = () => {
    if (array?.length != 0) {
      return (
        array.map((el: any, i: any) => {
          return (
            <StyledTableRow>
              <TableCell className="tblcolm">{i + 1}</TableCell>
              <TableCell className="tblcolm">{el.engCoachName}</TableCell>
              <TableCell className="tblcolm">{el.hindiCoachName}</TableCell>
              {appUser.userRole == "ROLE_STATION MASTER" ? <></>
                :
                <TableCell className="tblcolm">
                  <Button aria-label="edit" style={{ padding: "1px", fontFamily: "Roboto", fontSize: "16px" }} onClick={() => handleEdit(el.id)} >
                    <EditIcon className="stationCodeIconStyle" />
                    <span style={{ paddingLeft: "10px" }}> Edit</span>
                  </Button>
                </TableCell>
              }
              {appUser.userRole == "ROLE_STATION MASTER" ?
                <></>
                :
                <TableCell className="tblcolm">
                  <Button aria-label="Delete" style={{ padding: "1px", fontFamily: "Roboto", fontSize: "16px" }} onClick={() => handleDelete(el.id)}>
                    <DeleteIcon className="stationCodeIconStyle" />
                    <span style={{ paddingLeft: "10px" }}> Delete</span>
                  </Button>
                </TableCell>
              }
            </StyledTableRow>
          )
        })
      )
    }
    else {
      return (
        <TableRow>
          <TableCell colSpan={3} style={{borderBottom:'0px'}}><span className="cdsNoTable">No Data Available</span></TableCell>
        </TableRow>
      )
    }
  }



  return (
    <>
      <Grid>
        <Card style={{ height: "100%", width: "100%" }}>
          <Grid>
            {appUser.userRole == "ROLE_STATION MASTER" ? <></> :
              <Card style={{ padding: "10px", border: "1px solid #DDDDDD", margin: "15px 65px" }}>
                <Typography className="coachentry">
                  <b> New Coach Entry</b>
                </Typography>
                <Grid container>
                  <Grid container sm={12} md={12} lg={6} xl={6} >
                    <Grid item xs={4} className="E-CoachName">
                      English Coach Name <span className="asterisk">*</span>
                    </Grid>
                    
                    <Grid item xs={6}>
                      <Grid>
                        <Autocomplete
                          className="hselectType"
                          freeSolo
                          onChange={(event, value) => handleAutocomplete(value)}
                          disableClearable
                          options={coachNameArray?.map((option: any) => option)}
                          inputValue={input.engCoachName}
                          renderInput={(params: any) => (
                            <TextField
                              value={input.engCoachName}
                              {...params}
                              onChange={handleChange}
                              name="engCoachName"
                              variant="outlined"
                              size="small"
                              className="hautoComplete"
                            />
                          )}
                        />
                      </Grid>

                      <div>
                        {error != "" ? <div style={{ color: "red", textAlign: "center" }}> {error}</div> : <></>}
                      </div>
                    </Grid>
                  </Grid>

                  <Grid container sm={12} md={12} lg={6} xl={6}>
                    <Grid item xs={4} className="H-CoachName">
                      Hindi Coach Name
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        disabled
                        value={input.hindiCoachName}
                        onChange={handleChange}
                        name="engCoachName"
                        variant="outlined"
                        size="small"
                        className="htextField"
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid>

                </Grid>
                <Grid container style={{ justifyContent: "center", marginTop: "50px", paddingBottom: "2.5%" }}>
                  <Button
                    onClick={handleSubmit}
                    type="submit"
                    className="savebutton"
                    variant="contained"
                  >
                    <AddIcon className="icon" type="submit" />
                    <span className="btnfont">{input.id == 0 ? buttonText : updateText}</span>
                  </Button>
                  <Button type="reset" value="Reset" onClick={handleCancel} variant="outlined" className="canclebutton">
                    <CloseIcon className="icon" />
                    <span className="btnfont">Cancel</span>
                  </Button>
                </Grid>
              </Card>
            }
            <Card style={{ padding: "10px", border: "1px solid #DDDDDD", margin: "15px 65px" }}>
              <Typography className="coachentry marginrbottom">
                <b>Exisitng Coach Data</b>
              </Typography>
              <TableContainer style={{ maxHeight: "40vh" }}>
                <Table stickyHeader aria-label="sticky table" className="uniqueName">
                  <TableHead className="tblhead">
                    <TableRow >
                      <TableCell className="tblRow">
                        S.No.
                      </TableCell>
                      <TableCell className="tblRow" >
                        English Coach Name
                      </TableCell>
                      <TableCell className="tblRow" >
                        Hindi Coach Name
                      </TableCell>
                      {appUser.userRole == "ROLE_STATION MASTER" ? <></> :
                        <TableCell colSpan={2} className="tblRow">
                          Actions
                        </TableCell>}
                    </TableRow>
                  </TableHead>
                  {
                    loading ? (<TableRow><TableCell colSpan={3} className="loderIcon"><Grid style={{ textAlign: "center" }}><CircularProgress size={30} /><br />Loading...</Grid></TableCell></TableRow>) :
                      <TableBody className="tblbdy">
                        {coachData()}
                      </TableBody>
                  }

                </Table>
              </TableContainer>
            </Card>
          </Grid>
        </Card>
      </Grid>
    </>
  )
}