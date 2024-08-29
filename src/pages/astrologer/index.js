import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Avatar, Button, Dialog, DialogContent, Grid, Typography } from "@mui/material";
import { Check, Close, Delete, Edit } from "@mui/icons-material";
import { base_url, img_url } from "../../utils/Constants.js";
import MainDatatable from "../../components/common/MainDatatable.jsx";
import * as AstrologerActions from "../../redux/actions/astrologerActions.js";
import { DayMonthYearWithTime } from "../../utils/commonFunction.js";
import { Colors, useStyles } from "../../assets/styles";
import moment from "moment";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const Astrologer = ({ astrologerListData, dispatch }) => {
    const classes = useStyles();
    const navigate = useNavigate();

    const [state, setState] = useState({ editModalOpen: false, selectedAstro: null });
    const { editModalOpen, selectedAstro } = state;
    const handleEdit = (rowData) => { handleStateChange({ editModalOpen: true, selectedAstro: rowData }) };
    const handleStateChange = (data) => { setState({ ...state, ...data }) };

    //! Handle Chat | Call | Activate Status API Start
    const on_chat_status_change = () => {
        handleStateChange({ editModalOpen: false });
        dispatch(AstrologerActions.updateAstrologerChatStatus({ astrologerId: selectedAstro?._id, chat_status: selectedAstro?.chat_status == "online" ? "offline" : "online" }));
    };

    const on_call_status_change = () => {
        handleStateChange({ editModalOpen: false });
        dispatch(AstrologerActions.updateAstrologerCallStatus({ astrologerId: selectedAstro?._id, call_status: selectedAstro?.call_status == "online" ? "offline" : "online" }));
    };

    const on_activate_status_change = () => {
        handleStateChange({ editModalOpen: false });
        // dispatch(AstrologerActions.updateAstrologerCallStatus({ astrologerId: selectedAstro?._id, active_status: selectedAstro?.active_status == "online" ? "offline" : "online" }));
    };
    //! Handle Chat | Call | Activate Status API End

    //* Datatable Column
    const astrologerColumns = [
        { name: "S.No.", selector: (row, index) => astrologerListData.indexOf(row) + 1, },
        { name: "Name", selector: (row) => row?.astrologerName, },
        { name: "Email", selector: (row) => row.email, width: "190px", },
        { name: "Mobile", selector: (row) => row.phoneNumber, },
        { name: "Experience", selector: (row) => row.experience, },
        { name: "Wallet", selector: (row) => row.wallet_balance.toFixed(2), },
        { name: "Chat Price", selector: (row) => row.chat_price, },
        { name: "Call Price", selector: (row) => row.call_price, },
        { name: "Created Date", selector: (row) => moment(row.createdAt).format("Do MMM YYYY"), width: "160px", },
        {
            name: "Status",
            selector: (row) => (
                <div onClick={() => dispatch(AstrologerActions.verifyUnverifyAstrologer({ isVerified: row.isVerified ? "false" : "true", astrologerId: row?._id }))} style={{ color: !row.isVerified ? Colors.red_a : Colors.greenLight, textAlign: "center", padding: "5px", fontSize: "0.9rem", fontFamily: "Philospher", borderRadius: 5, cursor: "pointer", border: "1px solid rgb(102 102 102 / 0.2)", backgroundColor: "rgb(100 100 100 / 0.2)" }}>
                    {row.isVerified ? "Verified" : "Unverified"}
                </div>
            ),
            width: "130px",
        },
        {
            name: "Action",
            cell: (row) => (
                <div style={{ display: "flex", gap: "20px", alignItems: "center", width: "400px" }}>
                    <Edit onClick={() => navigate("/astrologer/edit-astrologer", { state: { stateData: row } })} sx={{ cursor: "pointer" }} />
                    <Delete onClick={() => dispatch(AstrologerActions.deleteAstrologer({ astrologerId: row._id }))} sx={{ cursor: "pointer" }} />
                    <MoreVertIcon onClick={() => handleEdit(row)} sx={{ cursor: "pointer" }} />
                </div>
            ),
            width: "150px",
        },
    ];

    useEffect(function () {
        //! Dispatching API for Get Astrologer 
        dispatch(AstrologerActions.getAllAstrologer());
    }, []);

    return (
        <>
            <MainDatatable data={astrologerListData} columns={astrologerColumns} title={'List Of Astrologers'} url={'/astrologer/add-astrologer'} />

            <Dialog open={editModalOpen} >
                <DialogContent sx={{ minWidth: "300px", maxWidth: "500px" }}>
                    <Grid item xs={12}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", gap: "10px" }} >
                            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ fontWeight: "600" }}>{selectedAstro?.astrologerName}</Typography>
                            <div onClick={() => handleStateChange({ editModalOpen: false })} style={{ backgroundColor: "grey", color: "#fff", cursor: "pointer", padding: "2px 10px 3px 10px", borderRadius: "30px" }}>x</div>
                        </div>

                        <Grid container spacing={3} >
                            <Grid item xs={5}>Change Chat Status</Grid>
                            <Grid item xs={7}>
                                <Button onClick={() => on_chat_status_change()} style={{ backgroundColor: selectedAstro?.chat_status == "online" ? "green" : "red", color: "#fff", textWrap: "nowrap" }}>Chat Status</Button>
                            </Grid>

                            <Grid item xs={5}>Change Call Status</Grid>
                            <Grid item xs={7}>
                                <Button onClick={() => on_call_status_change()} style={{ backgroundColor: selectedAstro?.call_status == "online" ? "green" : "red", color: "#fff", }}>Call Status</Button>
                            </Grid>

                            {/* <Grid item xs={5}>Active Status</Grid>
                            <Grid item xs={7}>
                                <Button onClick={() => on_activate_status_change()} style={{ backgroundColor: selectedAstro?.active_status == "online" ? "green" : "red", color: "#fff", }} >Activate </Button>
                            </Grid> */}
                        </Grid>
                    </Grid>

                </DialogContent>
            </Dialog>
        </>
    );
};

const mapStateToProps = (state) => ({
    astrologerListData: state.astrologer.astrologerListData,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Astrologer);