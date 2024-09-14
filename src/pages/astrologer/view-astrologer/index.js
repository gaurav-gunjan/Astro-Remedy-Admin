import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Box, Grid, Tab, Tabs } from '@mui/material';
import GiftHistory from './gift-history';
import ChatHistory from './chat-history';
import Review from './review';
import Transaction from './transaction';
import CallHistory from './call-history';
import LiveHistory from './live-history';
import PoojaHistory from './puja-history';
import Profile from './profile';
import { base_url } from '../../../utils/api-routes';
import * as AstrologerActions from '../../../redux/actions/astrologerAction'

const ViewAstrologer = () => {
    const navigate = useNavigate();
    const location = useLocation();
    let stateData = location.state && location.state.stateData;
    console.log(stateData)
    const dispatch = useDispatch();
    const { astrologerByIdData } = useSelector(state => state?.astrologerReducer);
    console.log(astrologerByIdData)
    const { astrologerName, profileImage, email, phoneNumber, wallet_balance } = astrologerByIdData;

    const tabHead = ['Profile', 'Chat', 'Call', 'Live', 'Gift', 'Review', 'Puja', 'Transaction',];
    const [activeTabHead, setActiveTabHead] = useState(0);
    const handleChange = (event, newValue) => setActiveTabHead(newValue);

    useEffect(() => {
        //! Dispatching API For Get Astrologer By ID 
        dispatch(AstrologerActions.getAstrologerById({ astrologerId: stateData?._id }))
    }, []);

    return (
        <>
            <div style={{ padding: "20px", backgroundColor: "#fff", marginBottom: "20px", boxShadow: '0px 0px 5px lightgrey', borderRadius: "10px" }}>

                <Grid container spacing={2} rowGap={5} sx={{ alignItems: 'center', padding: "20px 30px" }}>
                    <Grid item xs={12} md={4}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                            <Avatar src={base_url + profileImage} style={{ width: 100, height: 100, borderRadius: "50%", border: '1px solid' }} variant="rounded" />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <div style={{ fontWeight: 'bold' }}>{astrologerName}</div>
                                <div>{phoneNumber}</div>
                            </div>
                        </div>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', borderLeft: '1px solid', paddingLeft: "20px" }}>
                            <div style={{ fontWeight: "bold", fontSize: '18px' }}>Contact Details</div>
                            <div>{email}</div>
                            <div>location,Noida,Delhi</div>
                            <div>Wallet : {wallet_balance?.toFixed(2)}</div>
                        </div>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', borderLeft: '1px solid', paddingLeft: "20px" }}>
                            <div style={{ fontWeight: "bold", fontSize: '18px' }}>Details</div>
                            <div>Birth Date : </div>
                            <div>Total Earning : {wallet_balance?.toFixed(2)}</div>
                        </div>
                    </Grid>
                </Grid>

                {/* <div style={{ display: 'flex', alignItems: 'center', gap: '30px', justifyContent: 'center', fontSize: "18px", padding: "20px 0", borderBottom: '1px dashed', borderTop: '1px dashed' }}>
                    {tabHead?.map((value, index) => {
                        return <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '30px', height: "100%" }}>
                            <div style={{ cursor: "pointer", borderBottom: `2px solid ${activeTabHead == value ? 'black' : 'transparent'}`, fontWeight: `${activeTabHead == value ? 'bold' : 'normal'}` }} onClick={() => setActiveTabHead(value)} key={index} >{value}</div>
                            <div style={{ borderRight: '1px solid', height: "20px" }}></div>
                        </div>
                    })}
                </div> */}
            </div >

            <div style={{ display: 'flex', justifyContent: 'center', padding: "20px 0", }}>
                <Box sx={{ width: '100%', flexGrow: 1, bgcolor: 'background.paper', maxWidth: { xs: '85vw', md: '57vw' }, alignSelf: 'center' }}>
                    <Tabs value={activeTabHead} onChange={handleChange} variant="scrollable" scrollButtons={true} sx={{ gap: "50px" }}>
                        {tabHead?.map((value, index) => <Tab key={index} label={value} />)}
                    </Tabs>
                </Box>
            </div>

            <div style={{ padding: "20px 0" }}>
                {activeTabHead == 0 && <div><Profile astrologer={astrologerByIdData} /></div>}
                {activeTabHead == 1 && <div><ChatHistory astrologerId={stateData?._id} /></div>}
                {activeTabHead == 2 && <div><CallHistory /></div>}
                {activeTabHead == 3 && <div><LiveHistory /></div>}
                {activeTabHead == 4 && <div><GiftHistory /></div>}
                {activeTabHead == 5 && <div><Review /></div>}
                {activeTabHead == 6 && <div><PoojaHistory /></div>}
                {activeTabHead == 7 && <div><Transaction /></div>}
            </div>
        </>
    )
}

export default ViewAstrologer;