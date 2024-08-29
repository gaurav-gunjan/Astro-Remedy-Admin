import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Check, Close, Delete, Edit } from "@mui/icons-material";
import { base_url, img_url } from "../../../utils/Constants.js";
import MainDatatable from "../../../components/common/MainDatatable.jsx";
import * as AstrologerActions from "../../../redux/actions/astrologerActions.js";
import { DayMonthYearWithTime } from "../../../utils/common-function";
import { Colors, useStyles, } from "../../../assets/styles";
import moment from "moment";

const AstrologerEnquiry = ({ enquiryAstroData, dispatch }) => {

    console.log("enquiryAstroData",enquiryAstroData);
    const navigate = useNavigate();

    //* Datatable Column
    const astrologerColumns = [
        { name: "S.No.", selector: (row, index) => enquiryAstroData.indexOf(row) + 1, },
        { name: "Name", selector: (row) => row?.astrologerName, },
        { name: "Email", selector: (row) => row.email, width: "190px", },
        { name: "Mobile", selector: (row) => row.phoneNumber, },
        { name: "Experience", selector: (row) => row.experience, },
        { name: "Wallet", selector: (row) => row.wallet_balance.toFixed(2), },
        { name: "Chat Price", selector: (row) => row.chat_price, },
        { name: "Call Price", selector: (row) => row.call_price, },
        { name: "Created Date", selector: (row) => moment(row.createdAt).format("Do MMM YYYY"), width: "160px", },
        {
            name: 'Verify',
            selector: row => <div onClick={() => dispatch(AstrologerActions.updateEnquiryStatus({ astrologerId: row?._id }))} style={{ color: !row.isVerified ? Colors.red_a : Colors.greenLight, textAlign: "center", padding: 5, fontSize: "1.2rem", fontFamily: "Philospher", borderRadius: 5, cursor: "pointer" }} >
                {row.isVerified ? "Verified" : "Unverified"}
            </div>,
            width: "130px",
        },
        {
            name: "Action",
            cell: (row) => (
                <div style={{ display: "flex", gap: "20px", alignItems: "center", width: "400px" }}>
                    <Edit onClick={() => navigate("/astrologer/edit-astrologer", { state: { stateData: row } })} sx={{ cursor: "pointer" }} />
                    <Delete onClick={() => dispatch(AstrologerActions.deleteAstrologer({ astrologerId: row._id }))} sx={{ cursor: "pointer" }} />
                </div>
            ),
            width: "150px",
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