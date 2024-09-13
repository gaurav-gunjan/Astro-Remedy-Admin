import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { base_url, img_url } from '../../../utils/api-routes';
import { Avatar, Box, Grid, Tab, Tabs } from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';
import GiftHistory from './gift-history';
import ChatHistory from './chat-history';
import Review from './review';
import Transaction from './transaction';
import CallHistory from './call-history';
import LiveHistory from './live-history';
import PoojaHistory from './puja-history';

const ViewAstrologer = () => {
    const navigate = useNavigate();
    const location = useLocation();
    let stateData = location.state && location.state.stateData;
    const { astrologerName, profileImage, email, phoneNumber, wallet_balance } = stateData;
    console.log("State Data ::: ", stateData);

    const tabHead = ['Chat', 'Call', 'Live', 'Gift', 'Review', 'Puja', 'Transaction',];
    const [activeTabHead, setActiveTabHead] = useState(0);
    const handleChange = (event, newValue) => setActiveTabHead(newValue);

    return (
        <>
            <div style={{ padding: "20px", backgroundColor: "#fff", marginBottom: "20px", boxShadow: '0px 0px 5px lightgrey', borderRadius: "10px" }}>

                <Grid container spacing={2} sx={{ alignItems: 'center', padding: "20px 30px" }}>
                    <Grid item xs={12} md={4}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                            <Avatar src={base_url + profileImage} style={{ width: 100, height: 100, borderRadius: "50%" }} variant="rounded" />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <div style={{ fontWeight: 'bold' }}>{astrologerName}</div>
                                <div>{phoneNumber}</div>
                            </div>
                        </div>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <div style={{ fontWeight: "bold", fontSize: '18px' }}>Contact Details</div>
                            <div>{email}</div>
                            <div>location,Noida,Delhi</div>
                            <div>Wallet : {wallet_balance?.toFixed(2)}</div>
                        </div>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <div style={{ fontWeight: "bold", fontSize: '18px' }}>Details</div>
                            <div>Birth Date : </div>
                            <div>Birth Time : </div>
                            <div>Birth Place : </div>
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
                {activeTabHead == 0 && <div><ChatHistory /></div>}
                {activeTabHead == 1 && <div><CallHistory /></div>}
                {activeTabHead == 2 && <div><LiveHistory /></div>}
                {activeTabHead == 3 && <div><GiftHistory /></div>}
                {activeTabHead == 4 && <div><Review /></div>}
                {activeTabHead == 5 && <div><PoojaHistory /></div>}
                {activeTabHead == 6 && <div><Transaction /></div>}
            </div>
        </>
    )
}

export default ViewAstrologer;