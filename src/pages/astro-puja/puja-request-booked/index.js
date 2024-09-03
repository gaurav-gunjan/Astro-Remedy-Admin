import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { img_url } from "../../../utils/api-routes";
import logo from '../../../assets/images/logo.png';
import { EditSvg, DeleteSvg } from "../../../assets/svg/index.js";
import MainDatatable from "../../../components/common/MainDatatable.jsx";
import { DayMonthYear } from "../../../utils/common-function";
import * as AstropujaActions from '../../../redux/actions/astropujaActions.js';
import moment from "moment/moment.js";


const PujaRequestBooked = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { astroPujaBookedData: pujaRequestData } = useSelector(state => state.astropujaReducer);
    console.log(pujaRequestData);

    //* Order History DataTable Columns
    const pujaRequestColumns = [
        { name: 'S.No.', selector: row => pujaRequestData.indexOf(row) + 1, style: { backGroundColor: "#000", paddingLeft: "20px" } },
        { name: 'Puja', selector: row => row?.poojaId?.poojaName },
        { name: 'Astrologer', selector: row => row?.astrologerId?.astrologerName },
        { name: 'Customer', selector: row => row?.customerId?.customerName },
        { name: 'Date', selector: row => moment(row?.poojaDate).format("YYYY-MM-DD") },
        { name: 'Time', selector: row => moment(row?.poojaTime).format("hh:mm A") },
        { name: 'Price', selector: row => row?.price },
        {
            name: "Status",
            cell: (row) => (
                <select onClick={(e) => dispatch(AstropujaActions.updateAstroPujaRequest({ orderId: row?._id, status: e.target.value }))} style={{ outline: "none", padding: "5px 8px", border: "1px solid #666666", color: "#666666", borderRadius: "5px", fontFamily: "Philosopher" }}>
                    <option value="">---Select---</option>
                    <option value={'ACCEPTED'}>Accepted</option>
                    <option value={'REJECTED'}>Rejected</option>
                </select>
            ),
            width: "140px",
        },
    ];

    useEffect(() => {
        //! Dispatching API for Getting Order History
        dispatch(AstropujaActions.getAstroPujaBooked())
    }, []);

    return (
        <>
            <MainDatatable data={pujaRequestData} columns={pujaRequestColumns} title={'Booked Puja Requests '} />
        </ >
    );
}

export default PujaRequestBooked;