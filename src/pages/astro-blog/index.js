import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { img_url } from "../../utils/Constants.js";
import logo from '../../assets/images/logo.png';
import { EditSvg, DeleteSvg } from "../../assets/svg/index.js";
import MainDatatable from "../../components/common/MainDatatable.jsx";
import * as SkillActions from "../../redux/actions/skillsActions.js";
import { connect } from "react-redux";
import { Avatar } from "@mui/material";
import { DayMonthYear } from "../../utils/common-function";
import * as AddAstroBlog from "../../redux/actions/astroBlogActions.js";

const Astroblog = ({ dispatch, blogData }) => {
    console.log(blogData)
    const navigate = useNavigate();

    //* Category DataTable Columns
    const categoryColumns = [
        { name: 'S.No.', selector: row => blogData.indexOf(row) + 1, style: { backGroundColor: "#000", paddingLeft: "20px" } },
        { name: 'Title', selector: row => row?.title },
        { name: 'Description', selector: row => <div dangerouslySetInnerHTML={{ __html: row?.description }}></div> },
        { name: 'Created By', selector: row => row?.created_by },
        { name: 'Image', cell: row => <Avatar src={row?.image ? img_url + row?.image : logo} alt="Profile" style={{ width: '50px', height: '50px', borderRadius: '50%' }} /> },
        { name: 'Date', selector: row => DayMonthYear(row?.createdAt) },
        {
            name: 'Action',
            cell: row => <div style={{ display: "flex", gap: "20px", alignItems: "center" }} >
                <div onClick={() => navigate('/astro-blog/edit-astro-blog', { state: { stateData: row } })} style={{ cursor: "pointer" }}><EditSvg /></div>
                <div onClick={() => dispatch(AddAstroBlog.deleteAstroBlog(row))} style={{ cursor: "pointer" }}><DeleteSvg /></div>
            </div >,
            width: "180px"
        },
    ];

    useEffect(() => {
        //! Dispatching API for Getting Skill
        dispatch(AddAstroBlog.getAstroBlog())
    }, []);

    return (
        <>
            <MainDatatable data={blogData} columns={categoryColumns} title={'Astroblog'} url={'/astro-blog/add-astro-blog'} />

        </ >
    );
}

const mapStateToProps = (state) => ({
    blogData: state.blogs.blogData,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Astroblog);