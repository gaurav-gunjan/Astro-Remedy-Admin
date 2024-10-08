import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { img_url } from "../../utils/api-routes";
import logo from '../../assets/images/logo.png';
import { EditSvg, DeleteSvg } from "../../assets/svg/index.js";
import MainDatatable from "../../components/common/MainDatatable.jsx";
import { connect } from "react-redux";
import { Avatar } from "@mui/material";
import { DayMonthYear } from "../../utils/common-function";
import * as AddAstroBlog from "../../redux/actions/astroBlogActions.js";
import ViewModal from "../../components/modal/ViewModal.jsx";

const Astroblog = ({ dispatch, blogData }) => {
    console.log(blogData)
    const navigate = useNavigate();

    const [description, setDescription] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const openModal = (description) => {
        setModalIsOpen(true);
        setDescription(description);
    };
    const closeModal = () => setModalIsOpen(false);

    //* Category DataTable Columns
    const categoryColumns = [
        { name: 'S.No.', selector: row => blogData.indexOf(row) + 1, style: { backGroundColor: "#000", paddingLeft: "20px" } },
        { name: 'Title', selector: row => row?.title },
        // { name: 'Category', selector: row => row?.blogCategory },
        { name: "Description", selector: row => row?.description ? <div style={{ cursor: "pointer" }} onClick={() => openModal(row?.description)}><div dangerouslySetInnerHTML={{ __html: row?.description.toString().slice(0, 50) }}></div></div> : 'N/A', width: '300px' },
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

            <ViewModal openModal={modalIsOpen} description={description} title={'Description'} handleCloseModal={closeModal} />
        </ >
    );
}

const mapStateToProps = (state) => ({
    blogData: state.blogs.blogData,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Astroblog);