import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { base_url, img_url } from "../../../utils/Constants.js";
import * as NotificationActions from "../../../redux/actions/notificationActions.js";
import MainDatatable from "../../../components/common/MainDatatable.jsx";

const AstrologerNotification = ({ dispatch, astrologerNotificationData }) => {
    console.log(astrologerNotificationData)
    const navigate = useNavigate();

    //* Datatable Column
    const astrologerColumns = [
        { name: 'S.No.', selector: row => astrologerNotificationData?.indexOf(row) + 1, style: { backGroundColor: "#000", paddingLeft: "20px" } },
        { name: 'Title', selector: row => row?.title },
        { name: 'Description', selector: row => row?.description },
        { name: 'Icon', selector: row => <Avatar src={img_url + row.image} style={{ width: 50, height: 50 }} variant="sqaure" />, center: true },
    ];

    useEffect(function () {
        //! Dispatching API for Get Banner 
        dispatch(NotificationActions.getAstrologerNotification());
    }, []);

    return (
        <>
            <MainDatatable data={astrologerNotificationData} columns={astrologerColumns} title={'Astrologer Notification'} url={'/astrologer-notification/add-notification'} />

        </>
    );
};

const mapStateToProps = (state) => ({
    astrologerNotificationData: state.notification.astrologerNotificationData
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(AstrologerNotification);