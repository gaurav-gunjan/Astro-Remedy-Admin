import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DeepSearchSpace } from "../../utils/common-function/index.js";
import MainDatatable from "../../components/datatable/MainDatatable.jsx";
import DatatableHeading from "../../components/datatable/DatatableHeading.jsx";
import { DeleteSvg, EditSvg, SwitchOffSvg, SwitchOnSvg, ViewSvg } from "../../assets/svg/index.js";
import * as CustomerActions from "../../redux/actions/customerAction";

const Customer = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { customerData } = useSelector(state => state?.customerReducer);
    const [searchText, setSearchText] = useState('');
    const filteredData = DeepSearchSpace(customerData, searchText);

    //* Datatable Column
    const columns = [
        { name: "S.No.", selector: (row) => customerData.indexOf(row) + 1, width: "80px", },
        { name: "Customer Name", selector: (row) => row?.customerName ? row?.customerName : 'N/A', },
        { name: "Contact", selector: (row) => row?.phoneNumber, },
        { name: "Email", selector: (row) => row?.email ? row?.email : 'N/A', width: "200px" },
        { name: "Wallet", selector: (row) => parseFloat(row?.wallet_balance.toFixed(2)), },
        { name: "Registration Time", selector: (row) => moment(row?.createdAt).format("DD-MM-YYYY"), width: "150px", center: true },
        { name: "Last Login Time", selector: (row) => moment(row?.updatedAt).format("DD-MM-YYYY"), width: "150px", center: true },
        { name: 'Status', selector: row => <div style={{ cursor: 'pointer' }} onClick={() => dispatch(CustomerActions.changeCustomerBannedUnbannedStatus({ customerId: row?._id, customerName: row?.customerName, status: row?.banned_status }))}>{!row?.banned_status ? <SwitchOnSvg /> : <SwitchOffSvg />}</div>, width: "140px", center: true, },
        {
            name: 'Action',
            cell: row => <div style={{ display: "flex", gap: "20px", alignItems: "center" }} >
                <div onClick={() => navigate("/customer/view-customer", { state: { stateData: row } })} style={{ cursor: "pointer" }}><ViewSvg /></div>
                <div onClick={() => navigate("/customer/edit-customer", { state: { stateData: row } })} style={{ cursor: "pointer" }}><EditSvg /></div>
                <div onClick={() => dispatch(CustomerActions.deleteCustomerById({ customerId: row._id, customerName: row?.customerName }))} style={{ cursor: "pointer" }}><DeleteSvg /></div>
            </div>,
            width: "200px", center: true,
        },
    ];

    useEffect(function () {
        //! Dispatching API for Get Customer
        dispatch(CustomerActions.getCustomer());
    }, []);

    return (
        <>
            <div style={{ padding: "20px", backgroundColor: "#fff", marginBottom: "20px", boxShadow: '0px 0px 5px lightgrey', borderRadius: "10px" }}>
                <DatatableHeading title={'Customer'} data={customerData} url={'/customer/add-customer'} />

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "20px", alignItems: 'center', marginBottom: "20px", backgroundColor: "#fff" }}>
                    <input type='search' value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder='Search your data...' style={{ padding: '5px 10px', borderRadius: '5px', border: '1px solid #ccc', boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '250px', fontSize: '15px', outline: 'none', }} />
                </div>

                <MainDatatable columns={columns} data={filteredData} />
            </div>
        </>
    )
};

export default Customer;