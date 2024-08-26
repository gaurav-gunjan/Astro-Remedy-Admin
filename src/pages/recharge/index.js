import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { api_url, base_url, img_url } from "../../utils/Constants.js";
import MainDatatable from "../../Components/common/MainDatatable.jsx";
import { DayMonthYear, OnlyTime } from "../../utils/commonFunction.js";
import axios from "axios";
import { Delete, Edit } from "@mui/icons-material";
import * as RechargeActions from '../../redux/Actions/rechargeActions.js';
import { Colors } from "../../assets/styles.js";
import moment from "moment";

const Recharge = ({ dispatch, rechargePlanData }) => {
    const navigate = useNavigate();

    //* Datatable Column
    const astrologerColumns = [
        { name: "S.No.", selector: (row, index) => rechargePlanData.indexOf(row) + 1, },
        { name: "Amount", selector: (row) => row?.amount },
        { name: "Extra Percentage Amount", selector: (row) => row?.percentage },
        { name: "Start Date", selector: (row) => row?.startDate && moment(row?.startDate).format("DD-MM-YYYY"), },
        { name: "End Date", selector: (row) => row?.endDate && moment(row?.endDate).format("DD-MM-YYYY"), },
        {
            name: "Status",
            cell: (row) => <div onClick={() => dispatch(RechargeActions.updateRechargePlanStatus({ status: row.recharge_status == "Active" ? "Inactive" : "Active", rechargePlanId: row?._id }))} style={{ color: row?.recharge_status == "Active" ? Colors?.greenLight : Colors?.red_a, textAlign: "center", padding: "5px 8px", fontFamily: "Philospher", borderRadius: 5, cursor: "pointer",  border: "1px solid rgb(102 102 102 / 0.2)", backgroundColor:"rgb(100 100 100 / 0.2)" }}>{row.recharge_status}</div>
        },
        {
            name: "Action",
            cell: (row) => <Delete onClick={() => dispatch(RechargeActions.deleteRechargePlan({ rechargePlanId: row?._id }))} sx={{ cursor: "pointer" }} />
        },
    ];

    useEffect(() => {

        dispatch(RechargeActions.getRechargePlan())
    }, []);

    return (
        <>
            <MainDatatable data={rechargePlanData} columns={astrologerColumns} title={'Recharge'} url={'/recharge/add-recharge'} />

        </>
    );
};

const mapStateToProps = (state) => ({
    rechargePlanData: state.recharge.rechargePlanData,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Recharge);