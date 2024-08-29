import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { EditSvg, DeleteSvg } from "../../assets/svg/index.js";
import MainDatatable from "../../components/common/MainDatatable.jsx";
import * as PagesActions from "../../redux/actions/pagesActions.js";

const Announcement = ({ announcementData, dispatch }) => {
    console.log(announcementData)
    const navigate = useNavigate();

    //* Category DataTable Columns
    const categoryColumns = [
        { name: 'S.No.', selector: row => announcementData.indexOf(row) + 1, style: { backGroundColor: "#000", paddingLeft: "20px" } },
        { name: 'Description', selector: row => <div dangerouslySetInnerHTML={{ __html: row?.description }}></div> },
        {
            name: 'Action',
            cell: row => <div style={{ display: "flex", gap: "20px", alignItems: "center" }} >
                <div onClick={() => navigate('/announcement/edit-announcement', { state: { stateData: row } })} style={{ cursor: "pointer" }}><EditSvg /></div>
                <div onClick={() => dispatch(PagesActions.deleteAnnouncement(row._id))} style={{ cursor: "pointer" }}><DeleteSvg /></div>
            </div >,
            width: "180px"
        },
    ];

    useEffect(() => {
        //! Dispatching API for Getting Announcement
        dispatch(PagesActions.getAllAnouncement())
    }, []);

    return (
        <>
            <MainDatatable data={announcementData} columns={categoryColumns} title={'Announcement'} url={'/announcement/add-announcement'} />

        </ >
    );
}

const mapStateToProps = (state) => ({
    announcementData: state.pages.announcementData
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Announcement);