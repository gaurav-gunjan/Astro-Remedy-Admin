import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Avatar, Switch } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { base_url, img_url } from "../../utils/api-routes";
import * as BannerActions from "../../redux/actions/bannerActions.js";
import MainDatatable from "../../components/common/MainDatatable.jsx";
import { DeleteSvg, EditSvg, SwitchOffSvg, SwitchOnSvg } from "../../assets/svg/index.js";

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
        { name: 'S.No.', selector: (row, index) => index + 1, width: '80px' },
        { name: 'Title', selector: row => row?.title, width: '180px' },
        { name: 'Redirect Page', selector: row => row?.redirectTo, width: '170px' },
        { name: 'Redirect Url', selector: row => row?.redirectionUrl?.slice(0, 50) + '...', width: '280px' },
        { name: 'Banner', selector: row => <Avatar src={img_url + row.bannerImage} style={{ width: 50, height: 50 }} variant="rounded" />, center: true },
        { name: 'Status', selector: row => <div onClick={() => dispatch(BannerActions?.changeBannerStatus({ bannerId: row?._id }))} style={{ cursor: 'pointer' }}>{row?.status == 'active' ? <SwitchOnSvg /> : <SwitchOffSvg />}</div>, center: true },
        {
            name: 'Action',
            cell: row => <div style={{ display: "flex", gap: "20px", alignItems: "center" }} >
                <div onClick={() => navigate('/banner/add-banner', { state: { stateData: row } })} style={{ cursor: "pointer" }}><EditSvg /></div>
                {/* <div onClick={() => dispatch(BannerActions.deleteBanners(row))} style={{ cursor: "pointer" }}><DeleteSvg /></div> */}
            </div>,
            width: "100px", center: true,
        },
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
