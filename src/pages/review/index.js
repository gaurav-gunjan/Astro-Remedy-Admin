import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { EditSvg, DeleteSvg } from "../../assets/svg/index.js";
import MainDatatable from "../../components/common/MainDatatable.jsx";
import * as ReviewActions from "../../redux/actions/reviewsActions.js";
import { Colors } from "../../assets/styles";
import ViewModal from "../../components/modal/ViewModal.jsx";
import moment from "moment/moment.js";

const Review = ({ astrologersReviews, dispatch }) => {
    const navigate = useNavigate();

    const [text, setText] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const openModal = (text) => {
        setModalIsOpen(true);
        setText(text);
    };
    const closeModal = () => setModalIsOpen(false);

    //* Category DataTable Columns
    const categoryColumns = [
        { name: 'S.No.', selector: row => astrologersReviews.indexOf(row) + 1, style: { backGroundColor: "#000", paddingLeft: "20px" }, width: "80px" },
        { name: 'Customer', selector: row => row?.customer?.customerName },
        { name: 'Astrologer', selector: row => row?.astrologer?.astrologerName },
        { name: 'Rating', selector: row => row.ratings },
        { name: 'Comment', selector: row => row?.comments ? <div style={{ cursor: "pointer" }} onClick={() => openModal(row?.comments)}>{row.comments}</div> : 'N/A' },
        { name: 'Date', selector: row => moment(row.createdAt).format('DD MMM YYYY') },
        {
            name: "Status",
            cell: (row) => <div onClick={() => dispatch(ReviewActions.updateAstrologerReviewStatus({ status: row.is_verified ? "Verified" : "Unverified", reviewId: row?._id }))} style={{ color: row?.is_verified ? Colors?.greenLight : Colors?.red_a, textAlign: "center", padding: "5px 8px", fontFamily: "Philospher", borderRadius: 5, cursor: "pointer", border: "1px solid rgb(102 102 102 / 0.2)", backgroundColor: "rgb(100 100 100 / 0.2)" }}>{row.is_verified ? "Verified" : "Unverified"}</div>
        },
        {
            name: 'Action',
            cell: row => <div style={{ display: "flex", gap: "20px", alignItems: "center" }} >
                <div onClick={() => navigate('/review/edit-review', { state: { stateData: row } })} style={{ cursor: "pointer" }}><EditSvg /></div>
                <div onClick={() => dispatch(ReviewActions.deleteAstrologerReivew(row?._id))} style={{ cursor: "pointer" }}><DeleteSvg /></div>
            </div >,
            width: "180px"
        },
    ];

    useEffect(() => {
        //! Dispatching API for Getting Review
        dispatch(ReviewActions.getAstrologersReviews())

    }, []);

    return (
        <>
            <MainDatatable data={astrologersReviews} columns={categoryColumns} title={'Review'} url={'/review/add-review'} />

            <ViewModal openModal={modalIsOpen} text={text} title={'Rating'} handleCloseModal={closeModal} />
        </>
    );
}

const mapStateToProps = (state) => ({
    astrologersReviews: state.review.astrologersReviews,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Review);