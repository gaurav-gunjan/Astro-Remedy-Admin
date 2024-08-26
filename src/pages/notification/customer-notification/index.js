import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { base_url, img_url } from "../../../utils/Constants.js";
import * as NotificationActions from "../../../redux/Actions/notificationActions.js";
import MainDatatable from "../../../Components/common/MainDatatable.jsx";

const CustomerNotification = ({ dispatch, customerNotificationData }) => {
    console.log(customerNotificationData)
    const navigate = useNavigate();

    //* Datatable Column
    const customerColumns = [
        { name: 'S.No.', selector: row => customerNotificationData?.indexOf(row) + 1, style: { backGroundColor: "#000", paddingLeft: "20px" } },
        { name: 'Title', selector: row => row?.title },
        { name: 'Description', selector: row => row?.description },
        { name: 'Icon', selector: row => <Avatar src={img_url + row.image} style={{ width: 50, height: 50 }} variant="sqaure" />, center: true },
    ];

    useEffect(function () {
        //! Dispatching API for Get Banner 
        dispatch(NotificationActions.getCustomerNotification());
    }, []);

    return (
        <>
            <MainDatatable data={customerNotificationData} columns={customerColumns} title={'Customer Notification'} url={'/customer-notification/add-notification'} />

        </>
    );
};

const mapStateToProps = (state) => ({
    customerNotificationData: state.notification.customerNotificationData,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(CustomerNotification);