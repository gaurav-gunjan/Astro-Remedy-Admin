// pages/astro-mall/order-history/index.js

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { img_url } from '../../../utils/api-routes';
import logo from '../../../assets/images/logo.png';
import { EditSvg, DeleteSvg } from '../../../assets/svg/index.js';
import MainDatatable from '../../../components/common/MainDatatable.jsx';
import * as AstromallActions from '../../../redux/actions/astromallAction.js';
import { DayMonthYear } from '../../../utils/common-function';

const OrderHistory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orderHistoryData = useSelector(state => state.astromallReducer.orderHistoryData);

  //* Order History DataTable Columns
  const orderHistoryColumns = [
    { name: 'S.No.', selector: (row, index) => index + 1, width: '80px' },
    { name: 'Customer Name', selector: row => row?.customerId?.customerName },
    { name: 'Date', selector: row => row?.createdAt ? DayMonthYear(row?.createdAt) : 'N/A' },
    { name: 'Image', cell: row => <img src={row?.image ? img_url + row?.image : logo} alt="Profile" style={{ width: '50px', height: '50px', borderRadius: '50%' }} /> },
    { name: 'Status', selector: row => row?.status },
    {
      name: "Change Status",
      cell: (row) => (
        <select onClick={(e) => dispatch(AstromallActions.changeOrderStatus({ orderId: row?._id, status: e.target.value }))} style={{ outline: "none", padding: "5px 8px", border: "1px solid #666666", color: "#666666", borderRadius: "5px", fontFamily: "Philosopher" }}>
          <option value="">---Select---</option>
          <option value={'INITIATED'}>Initiated</option>
          <option value={'ACCEPTED'}>Accepted</option>
          <option value={'PACKED'}>Packed</option>
          <option value={'REJECTED'}>Rejected</option>
          <option value={'OUT_FOR_DELIVERY'}>Out for delivery</option>
          <option value={'DELIVERED'}>Delivered</option>
          <option value={'CANCELLED'}>Cancelled</option>
        </select>
      ),
      width: "180px",
    },
    // {
    //   name: 'Action',
    //   cell: row => (
    //     <div style={{ display: "flex", gap: "20px", alignItems: "center", paddingRight: "15px" }} >
    //       <div onClick={() => dispatch(AstromallActions.deleteAstromallProduct({ productId: row?._id }))} style={{ cursor: "pointer" }}><DeleteSvg /></div>
    //     </div >
    //   ),
    //   right: true
    // },
  ];

  useEffect(() => {
    //! Dispatching API for Getting Order History
    dispatch(AstromallActions.getOrderHistory());
  }, [dispatch]);

  return (
    <>
      {orderHistoryData && <MainDatatable data={orderHistoryData} columns={orderHistoryColumns} title={'Mall Order History'} />}
    </>
  );
}

export default OrderHistory;