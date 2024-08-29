import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { base_url, img_url } from "../../utils/Constants.js";
import * as BannerActions from "../../redux/actions/bannerActions.js";
import MainDatatable from "../../components/common/MainDatatable.jsx";

const Banner = ({ dispatch, appBannerData }) => {
    console.log(appBannerData)
    const navigate = useNavigate();

    //* Datatable Column
    const bannercolumns = [
        { name: 'S.No.', selector: row => appBannerData.indexOf(row) + 1, style: { backGroundColor: "#000", paddingLeft: "20px" } },
        { name: 'Title', selector: row => row?.title },
        { name: 'Redirect Page', selector: row => row?.redirectTo },
        { name: 'Redirect Url', selector: row => row?.redirectionUrl?.slice(0, 15) + '...' },
        { name: 'Banner', selector: row => <Avatar src={img_url + row.bannerImage} style={{ width: 50, height: 50 }} variant="rounded" /> },
        {
            name: 'Action',
            cell: row => <div style={{ display: "flex", gap: "20px", alignItems: "center" }} >
                <Edit sx={{ cursor: "pointer" }} onClick={() => navigate('/banner/add-banner', { state: { stateData: row } })} />
                <Delete sx={{ cursor: "pointer" }} onClick={() => dispatch(BannerActions.deleteBanners(row))} />
            </div>,
        }
    ];

    useEffect(function () {
        //! Dispatching API for Get Banner 
        dispatch(BannerActions.getAppBanners());
    }, []);

    return (
        <>
            <MainDatatable data={appBannerData} columns={bannercolumns} title={'Banner'} url={'/banner/add-banner'} addButonActive={appBannerData ? appBannerData.length < 10 : true} buttonMessage="Maximum 10 banners are allowed." />

        </>
    );
};

const mapStateToProps = (state) => ({
    appBannerData: state.banners.appBannerData
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Banner);




