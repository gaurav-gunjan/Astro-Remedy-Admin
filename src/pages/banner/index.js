import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Avatar, Switch } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { base_url, img_url } from "../../utils/api-routes";
import * as BannerActions from "../../redux/actionsssssss/bannerActions.js";
import MainDatatable from "../../componentsssss/common/MainDatatable.jsx";

const Banner = ({ dispatch, appBannerData }) => {
    const navigate = useNavigate();
    const [activeId, setActiveId] = useState(null);

    // Handle Switch change
    const handleChange = (id) => (event) => {
        if (event.target.checked) {
            setActiveId(id);
        } else {
            if (activeId === id) {
                setActiveId(null);
            }
        }
    };

    //* Datatable Columns
    const bannerColumns = [
        {
            name: 'S.No.',
            selector: (row, index) => index + 1,
            style: { color: "grey", paddingLeft: "20px" }
        },
        { name: 'Title', selector: row => row?.title },
        { name: 'Redirect Page', selector: row => row?.redirectTo },
        { name: 'Redirect Url', selector: row => row?.redirectionUrl?.slice(0, 15) + '...' },
        {
            name: 'Banner',
            selector: row => <Avatar src={img_url + row.bannerImage} style={{ width: 50, height: 50 }} variant="rounded" />
        },
        {
            name: 'Status', cell: row => { row?.status ? <div>Active</div> : <div>Inactive</div> }
        },
        {
            name: 'Action',
            cell: row => (
                <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                    <Edit sx={{ cursor: "pointer" }} onClick={() => navigate('/banner/add-banner', { state: { stateData: row } })} />
                    <Delete sx={{ cursor: "pointer" }} onClick={() => dispatch(BannerActions.deleteBanners(row))} />
                </div>
            )
        }
    ];

    useEffect(() => {
        //! Dispatching API for Get Banner 
        dispatch(BannerActions.getAppBanners());
    }, [dispatch]);

    return (
        <>
            <MainDatatable
                data={appBannerData}
                columns={bannerColumns}
                title={'Banner'}
                url={'/banner/add-banner'}
                addButtonActive={appBannerData ? appBannerData.length < 10 : true}
                buttonMessage="Maximum 10 banners are allowed."
            />
        </>
    );
};

const mapStateToProps = (state) => ({
    appBannerData: state.banners.appBannerData
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Banner);
