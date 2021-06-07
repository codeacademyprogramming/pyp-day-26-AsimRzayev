import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Link, useParams } from "react-router-dom";
import {typeConst} from '../redux/constants'
import {getReserv} from '../redux/action'
import {connect} from 'react-redux'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@material-ui/core";
import { useDispatch } from "react-redux";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const ReservationsList=({reservs,getReserv})=> {
 
    
    const [reservations, setReservations] = useState([]);
    const { id } = useParams();
    const dispatch=useDispatch();
    
    useEffect(() => {
     getReserv(id)
    setReservations(reservs)
    }, [id,getReserv,reservs])
    
    const classes = useStyles();


    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState("");
    const [fromData, setFromData] = React.useState("2017-05-24T10:30");
    const [toData, setToData] = React.useState("2017-05-24T10:30");
    const [note, setNote] = React.useState("");


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddReserv = () => {
        const reserv={
            username:name,
            from:fromData,
            to:toData,
            note:note
        }
     
        dispatch({ type: typeConst.ADD_RESERV, payload: {id,reserv} })
        handleClose();
    };

    return (
        <TableContainer component={Paper}>
            <Button
                variant="outlined"
                color="primary"
                onClick={handleClickOpen}
            >
                Add Reservation
            </Button>

            <Link style={{ marginLeft: "20px" }} id="goBtn" to="/">
                Go Back
            </Link>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    Add Reservation
                </DialogTitle>
                <DialogContent>
                    <TextField
                        id="name"
                        onChange={(evt) => setName(evt.target.value)}
                        label="Name"
                    />
                    <br /> <br />
                    <TextField
                        id="fromDate"
                        label="From"
                        type="datetime-local"
                        defaultValue="2017-05-24T10:30"
                        onChange={(evt) => setFromData(evt.target.value)}
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <br /> <br />
                    <TextField
                        id="ToDate"
                        label="To"
                        type="datetime-local"
                        defaultValue="2017-05-24T10:30"
                        onChange={(evt) => setToData(evt.target.value)}
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <br />
                    <br />
                    <TextField
                        id="standard-basic"
                        onChange={(evt) => setNote(evt.target.value)}
                        label="Note"
                    />
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
                 {reservations &&
                        reservations.map((reserv) => (
                            <TableRow key={reserv._id}>
                                <TableCell component="th" scope="row">
                                    {reserv._id}
                                </TableCell>
                                <TableCell align="right">{reserv.roomid}</TableCell>
                                <TableCell align="right">
                                    {reserv.username}
                                </TableCell>
                                <TableCell align="right">
                                    {reserv.from}
                                </TableCell>
                                <TableCell align="right">{reserv.to}</TableCell>
                                <TableCell align="right">
                                    {reserv.note}
                                </TableCell>
                            </TableRow>
                        ))} 
                </TableBody>
            </Table>
        </TableContainer>
    );
}

const mapStateProps=state=>{
    return{
        reservs:state
    }
}
export default connect(mapStateProps,{getReserv})(ReservationsList)