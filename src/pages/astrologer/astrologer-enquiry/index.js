import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Check, Close, Delete, Edit } from "@mui/icons-material";
import MainDatatable from "../../../components/common/MainDatatable.jsx";
import * as AstrologerActions from "../../../redux/actions/astrologerActions.js";
import { Colors, useStyles, } from "../../../assets/styles";
import moment from "moment";
import { DeleteSvg, EditSvg, SwitchOffSvg, SwitchOnSvg } from "../../../assets/svg/index.js";

const AstrologerEnquiry = ({ enquiryAstroData, dispatch }) => {

    console.log("enquiryAstroData", enquiryAstroData);
    const navigate = useNavigate();

    //* Datatable Column
    const astrologerColumns = [
        { name: "S.No.", selector: (row, index) => enquiryAstroData.indexOf(row) + 1, width: "80px", },
        { name: "Name", selector: (row) => row?.astrologerName, },
        { name: "Email", selector: (row) => row.email, width: "250px", },
        { name: "Mobile", selector: (row) => row.phoneNumber, },
        { name: "Wallet", selector: (row) => row.wallet_balance.toFixed(2), },
        // { name: "Experience", selector: (row) => row.experience, },
        // { name: "Chat Price", selector: (row) => row.chat_price, },
        // { name: "Call Price", selector: (row) => row.call_price, },
        { name: "Created Date", selector: (row) => moment(row.createdAt).format("Do MMM YYYY"), width: "140px", },
        { name: 'Status(Enquiry)', selector: row => <div style={{ cursor: 'pointer' }} onClick={() => dispatch(AstrologerActions.updateEnquiryStatus({ astrologerId: row?._id }))}>{row?.isVerified ? <SwitchOnSvg /> : <SwitchOffSvg />}</div>, width: "140px", center: true, },
        {
            name: "Action",
            cell: (row) => (
                <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                    <div onClick={() => navigate("/astrologer/edit-astrologer", { state: { stateData: row } })} style={{ cursor: "pointer" }}><EditSvg /></div>
                    <div onClick={() => dispatch(AstrologerActions.deleteAstrologer({ astrologerId: row._id, type: 'Enquiry' }))} style={{ cursor: "pointer" }}><DeleteSvg /></div>
                </div>
            ),
            center: true,
        },
    ];

    useEffect(function () {
        //! Dispatching API for Get Astrologer 
        dispatch(AstrologerActions.getAstrologerInquiry());
    }, []);

    return (
        <>
            <MainDatatable data={enquiryAstroData} columns={astrologerColumns} title={'Astrologer Enquiry'} />

        </>
    );
};

const mapStateToProps = (state) => ({
    enquiryAstroData: state.astrologer.enquiryAstroData,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(AstrologerEnquiry);