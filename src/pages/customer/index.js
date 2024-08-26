import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import { Check, Close, Delete, Edit } from "@mui/icons-material";
import { base_url, img_url } from "../../utils/Constants.js";
import MainDatatable from "../../Components/common/MainDatatable.jsx";
import * as CustomerActions from "../../redux/Actions/customerActions.js";
import { DayMonthYearWithTime } from "../../utils/commonFunction.js";
import { Colors, useStyles, } from "../../assets/styles.js";
import moment from "moment/moment.js";

const Customer = ({ customerListData, dispatch }) => {
    const classes = useStyles();
    const navigate = useNavigate();

    //* Datatable Column
    const customerColumns = [
        { name: "S.No.", selector: (row) => customerListData.indexOf(row) + 1, },
        { name: "Customer Name", selector: (row) => row?.customerName, },
        { name: "Contact", selector: (row) => row?.phoneNumber, },
        { name: "Email", selector: (row) => row?.email, width: "200px" },
        { name: "Wallet", selector: (row) => parseFloat(row?.wallet_balance.toFixed(2)), },
        { name: "Registration Time", selector: (row) => moment(row?.createdAt).format("DD-MM-YYYY, HH:mm A"), width: "200px" },
        { name: "Last Login Time", selector: (row) => moment(row?.updatedAt).format("DD-MM-YYYY, HH:mm A"), width: "200px" },
        {
            name: "Status",
            cell: (row) => (
                <div onClick={() => dispatch(CustomerActions.banCustomer({ customerId: row._id, customerName: row?.customerName, status: row?.banned_status }))} className={classes.tableAction} style={{ color: row.banned_status ? Colors.red_a : Colors.greenLight, textAlign: "center", padding: "5px", fontSize: "0.9rem", fontFamily: "Philospher", borderRadius: 5, cursor: "pointer", border: "1px solid rgb(102 102 102 / 0.2)", backgroundColor:"rgb(100 100 100 / 0.2)" }}>
                    {row?.banned_status ? <Close style={{fontSize:"0.9rem"}} /> : <Check style={{fontSize:"0.9rem"}} />} <div>{!!row?.banned_status ? "Banned" : "Unbanned"}</div>
                </div>
            ),
            width: "200px",
        },
        {
            name: "Action",
            cell: (row) => (
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    {/* <Info sx={{ cursor: "pointer" }} onClick={() => handleViewInfo(row)} />  */}
                    <Edit sx={{ cursor: "pointer" }} onClick={() => navigate('/customer/edit-customer', { state: { stateData: row } })} />
                    <Delete sx={{ cursor: "pointer" }} onClick={() => dispatch(CustomerActions.deleteCustomer({ customerId: row._id, customerName: row?.customerName }))} />
                </div>
            ),
        },
    ];

    useEffect(function () {
        //! Dispatching API for Get Customer 
        dispatch(CustomerActions.getAllCustomer());
    }, []);

    return (
        <>
            <MainDatatable data={customerListData} columns={customerColumns} title={'Customer'} url={'/customer/add-customer'} />

        </>
    );
};

const mapStateToProps = (state) => ({
    customerListData: state.customer.customerListData,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Customer);