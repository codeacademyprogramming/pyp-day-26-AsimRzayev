import React,{useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Link, useParams } from "react-router-dom";
import {roomsInital} from '../redux/states'
import axios from "axios";
import Axios from "axios";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@material-ui/core";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default function ReservationsList() {
    const [rooms, setRooms] = useState(roomsInital)
    Axios({
      method: "GET",
      url: "http://localhost:5000/rooms",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      setRooms(res.data)
     
    });

 
    const classes = useStyles();
    const { id } = useParams();
    const currentRoom = React.useMemo(() => {
        return rooms.find((room) => room.dataId === Number(id));
    }, [id, rooms]);
    const [open, setOpen] = React.useState(false);
   const [name, setName] = React.useState("");
   const [fromData, setFromData] = React.useState('2017-05-24T10:30');
   const [toData, setToData] = React.useState('2017-05-24T10:30');
   const [note, setNote] = React.useState("");
let newID=currentRoom.reservation.length+1;
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    
  const handleAddReserv=()=>{

   
    axios({
        method: 'post',
        url: `http://localhost:5000/rooms/${id}`,
        data: {
            reservedBy: name,
            from: fromData, // Date
            to: toData, // Date
            notes: note
        },
        headers: {
            "Content-Type": "application/json"
          }
      });
    handleClose()
  }
    return (
        <TableContainer component={Paper}>
            <Button
                variant="outlined"
                color="primary"
                onClick={handleClickOpen}
            >
              Add Reservation
            </Button>
          
            <Link style={{marginLeft:"20px"}} id="goBtn" to="/">
              Go Back
            </Link>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Add Reservation</DialogTitle>
                <DialogContent>
                <TextField id="standard-basic"  onChange={(evt)=>setName(evt.target.value)} label="Name" />
                <br/>   <br/>
                    <TextField
                        id="fromDate"
                        label="From"
                        type="datetime-local"
                        defaultValue="2017-05-24T10:30"
                        onChange={(evt)=>setFromData(evt.target.value)}
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <br/>   <br/>
                     <TextField
                        id="ToDate"
                        label="To"
                        type="datetime-local"
                        defaultValue="2017-05-24T10:30"
                        onChange={(evt)=>setToData(evt.target.value)}
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <br/><br/>
                     <TextField id="standard-basic" onChange={(evt)=>setNote(evt.target.value)} label="Note" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddReserv} color="primary">
                     Add
                    </Button>
                </DialogActions>
            </Dialog>
            <Table
                className={classes.table}
                size="small"
                aria-label="a dense table"
            >
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell align="right">RoomId</TableCell>
                        <TableCell align="right">ReservedBy&nbsp;</TableCell>
                        <TableCell align="right">From&nbsp;</TableCell>
                        <TableCell align="right">To&nbsp;</TableCell>
                        <TableCell align="right">Notes&nbsp;</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {currentRoom &&
                        currentRoom.reservation.map((reserv) => (
                            <TableRow key={reserv.id}>
                                <TableCell component="th" scope="row">
                                    {reserv.id}
                                </TableCell>
                                <TableCell align="right">{id}</TableCell>
                                <TableCell align="right">
                                    {reserv.reservedBy}
                                </TableCell>
                                <TableCell align="right">
                                    {reserv.from}
                                </TableCell>
                                <TableCell align="right">{reserv.to}</TableCell>
                                <TableCell align="right">
                                    {reserv.notes}
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
