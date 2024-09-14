import React from "react";
import { Card, CardContent, CardMedia, Typography, Grid, Divider, Avatar, List, ListItem, ListItemText, Box } from "@mui/material";
import { base_url } from "../../../../utils/api-routes";

const Profile = ({ astrologer }) => {
    const { astrologerName, phoneNumber, alternateNumber, gender, email, profileImage, chat_price, call_price, video_call_price, experience, about, city, state, country, zipCode, currency, free_min, rating, avg_rating, skill, mainExpertise, youtubeLink, short_bio, long_bio, follower_count, aadharNumber, dateOfBirth, address, country_phone_code, commission_video_call_price, normal_video_call_price, commission_normal_video_call_price, consultation_price, commission_call_price, commission_chat_price, commission_remark, expertise, account_holder_name, account_number, account_type, account_name, IFSC_code, live_notification, chat_notification, call_notification, workingOnOtherApps, activeBankAcount, wallet_balance, panCard, isVerified, isOnline, chat_status, call_status, video_call_status, today_earnings } = astrologer;

    return (
        <div style={{ padding: "20px", backgroundColor: "#fff", marginBottom: "20px", boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', borderRadius: "15px" }}>
            <Grid container spacing={4}>
                {/* Profile Section */}
                <Grid item xs={12} sm={4}>
                    <CardMedia
                        component="img"
                        height="250"
                        image={`${base_url}/${profileImage}`}
                        alt={astrologerName}
                        style={{ borderRadius: "10px", border: "1px solid #e0e0e0" }}
                    />
                </Grid>
                <Grid item xs={12} sm={8}>
                    <CardContent>
                        <Typography variant="h4" gutterBottom>
                            {astrologerName}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            {short_bio}
                        </Typography>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="body1">
                            <strong>About: </strong>
                            {about}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Experience: </strong> {experience} years
                        </Typography>
                        <Typography variant="body1">
                            <strong>Location: </strong> {city}, {state}, {country} - {zipCode}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Phone: </strong> {phoneNumber} | Alt: {alternateNumber}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Email: </strong> {email}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Gender: </strong> {gender}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Date of Birth: </strong> {new Date(dateOfBirth).toDateString()}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Rating: </strong> {rating} ({avg_rating} avg)
                        </Typography>
                    </CardContent>
                </Grid>

                {/* Pricing Section */}
                <Grid item xs={12}>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h5" gutterBottom>
                        Pricing Information
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography variant="body1"><strong>Chat Price:</strong> {currency} {chat_price}</Typography>
                            <Typography variant="body1"><strong>Call Price:</strong> {currency} {call_price}</Typography>
                            <Typography variant="body1"><strong>Video Call Price:</strong> {currency} {video_call_price}</Typography>
                            <Typography variant="body1"><strong>Consultation Price:</strong> {currency} {consultation_price}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1"><strong>Commission Video Call Price:</strong> {currency} {commission_video_call_price}</Typography>
                            <Typography variant="body1"><strong>Normal Video Call Price:</strong> {currency} {normal_video_call_price}</Typography>
                            <Typography variant="body1"><strong>Commission Call Price:</strong> {currency} {commission_call_price}</Typography>
                            <Typography variant="body1"><strong>Commission Chat Price:</strong> {currency} {commission_chat_price}</Typography>
                        </Grid>
                    </Grid>
                </Grid>

                {/* Skills Section */}
                <Grid item xs={12}>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h5" gutterBottom>
                        Skills & Expertise
                    </Typography>
                    <Box display="flex" flexWrap="wrap">
                        <Box sx={{ flex: 1, minWidth: "250px" }}>
                            <Typography variant="h6" gutterBottom>Skills</Typography>
                            <List dense>
                                {skill.map((skillItem) => (
                                    <ListItem key={skillItem._id}>
                                        <ListItemText primary={skillItem.skill.trim()} />
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                        <Box sx={{ flex: 1, minWidth: "250px" }}>
                            <Typography variant="h6" gutterBottom>Remedies</Typography>
                            <List dense>
                                {expertise.map((exp) => (
                                    <ListItem key={exp._id}>
                                        <ListItemText primary={exp.expertise.trim()} />
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                        <Box sx={{ flex: 1, minWidth: "250px" }}>
                            <Typography variant="h6" gutterBottom>Main Expertise</Typography>
                            <List dense>
                                {mainExpertise.map((mainExp) => (
                                    <ListItem key={mainExp._id}>
                                        <ListItemText primary={mainExp.mainExpertise.trim()} />
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    </Box>
                </Grid>

                {/* Bank Information Section */}
                <Grid item xs={12}>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h5" gutterBottom>
                        Bank Information
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography variant="body1"><strong>Account Holder:</strong> {account_holder_name}</Typography>
                            <Typography variant="body1"><strong>Account Number:</strong> {account_number}</Typography>
                            <Typography variant="body1"><strong>Account Type:</strong> {account_type}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1"><strong>Bank Name:</strong> {account_name}</Typography>
                            <Typography variant="body1"><strong>IFSC Code:</strong> {IFSC_code}</Typography>
                        </Grid>
                    </Grid>
                </Grid>

                {/* Notifications Section */}
                <Grid item xs={12}>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h5" gutterBottom>
                        Notifications
                    </Typography>
                    <Typography variant="body1"><strong>Live Notification:</strong> {live_notification ? "Enabled" : "Disabled"}</Typography>
                    <Typography variant="body1"><strong>Chat Notification:</strong> {chat_notification ? "Enabled" : "Disabled"}</Typography>
                    <Typography variant="body1"><strong>Call Notification:</strong> {call_notification ? "Enabled" : "Disabled"}</Typography>
                </Grid>

                {/* Additional Information */}
                <Grid item xs={12}>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h5" gutterBottom>
                        Additional Information
                    </Typography>
                    <Typography variant="body1"><strong>Pan Card:</strong> {panCard}</Typography>
                    <Typography variant="body1"><strong>Aadhar Card:</strong> {aadharNumber}</Typography>
                    <Typography variant="body1"><strong>Wallet Balance:</strong> {wallet_balance}</Typography>
                    <Typography variant="body1"><strong>Is Verified:</strong> {isVerified ? "Yes" : "No"}</Typography>
                    <Typography variant="body1"><strong>Is Online:</strong> {isOnline ? "Yes" : "No"}</Typography>
                    <Typography variant="body1"><strong>Chat Status:</strong> {chat_status}</Typography>
                    <Typography variant="body1"><strong>Call Status:</strong> {call_status}</Typography>
                    <Typography variant="body1"><strong>Video Call Status:</strong> {video_call_status}</Typography>
                </Grid>

                {/* Earnings Section */}
                {/* <Grid item xs={12}>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h5" gutterBottom>
                        Today's Earnings
                    </Typography>
                    <Typography variant="body1"><strong>Date:</strong> {new Date(today_earnings.date).toDateString()}</Typography>
                    <Typography variant="body1"><strong>Earnings:</strong> {today_earnings.amount}</Typography>
                </Grid> */}
            </Grid>
        </div>
    );
};

export default Profile;



// import React from "react";
// import { Card, CardContent, CardMedia, Typography, Grid, Divider, Avatar, Box, List, ListItem, ListItemText } from "@mui/material";
// import { base_url } from "../../../../utils/api-routes";

// const Profile = ({ astrologer }) => {

//     const { astrologerName, phoneNumber, alternateNumber, gender, email, profileImage, chat_price, call_price, video_call_price, experience, about, city, state, country, zipCode, currency, free_min, rating, avg_rating, skill, mainExpertise, youtubeLink, short_bio, long_bio, follower_count, aadharNumber, dateOfBirth, address, country_phone_code, commission_video_call_price, normal_video_call_price, commission_normal_video_call_price, consultation_price, commission_call_price, commission_chat_price, commission_remark, expertise, account_holder_name, account_number, account_type, account_name, IFSC_code, live_notification, chat_notification, call_notification, workingOnOtherApps, activeBankAcount, wallet_balance, panCard, isVerified, isOnline, chat_status, call_status, video_call_status, today_earnings } = astrologer;

//     return (
//         <div style={{ padding: "20px", backgroundColor: "#fff", marginBottom: "20px", boxShadow: '0px 0px 5px lightgrey', borderRadius: "10px" }}>
//             <Grid container spacing={3}>
//                 {/* Astrologer Profile Image */}
//                 <Grid item xs={12} sm={4}>
//                     <CardMedia style={{ border: "1px solid black" }}
//                         component="img"
//                         height="250"
//                         image={`${base_url}/${profileImage}`} // Assuming the image is served from /uploads
//                         alt={astrologerName}
//                     />
//                 </Grid>

//                 {/* Astrologer Details */}
//                 <Grid item xs={12} sm={8}>
//                     <CardContent>
//                         <Typography variant="h4" gutterBottom>
//                             {astrologerName}
//                         </Typography>
//                         <Typography variant="subtitle1" color="text.secondary">
//                             {short_bio}
//                         </Typography>
//                         <Divider sx={{ my: 1 }} />

//                         <Typography variant="body1">
//                             <strong>About: </strong>
//                             {about}
//                         </Typography>
//                         <Typography variant="body1">
//                             <strong>Experience: </strong>
//                             {experience} years
//                         </Typography>
//                         <Typography variant="body1">
//                             <strong>Location: </strong>
//                             {city}, {state}, {country} - {zipCode}
//                         </Typography>
//                         <Typography variant="body1">
//                             <strong>Phone: </strong>
//                             {phoneNumber} | Alt: {alternateNumber}
//                         </Typography>
//                         <Typography variant="body1">
//                             <strong>Email: </strong>
//                             {email}
//                         </Typography>
//                         <Typography variant="body1">
//                             <strong>Aadhar Number: </strong>
//                             {aadharNumber}
//                         </Typography>
//                         <Typography variant="body1">
//                             <strong>Followers: </strong>
//                             {follower_count}
//                         </Typography>
//                         <Typography variant="body1">
//                             <strong>Rating: </strong> {rating} ({avg_rating} avg)
//                         </Typography>
//                         <Typography variant="body1">
//                             <strong>Gender: </strong> {gender}
//                         </Typography>
//                         <Typography variant="body1">
//                             <strong>Date of Birth: </strong> {new Date(dateOfBirth).toDateString()}
//                         </Typography>
//                         <Typography variant="body1">
//                             <strong>City: </strong> {city}
//                         </Typography>
//                         <Typography variant="body1">
//                             <strong>State: </strong> {state}
//                         </Typography>
//                         <Typography variant="body1">
//                             <strong>Country: </strong> {country || "Not provided"}
//                         </Typography>
//                         <Typography variant="body1">
//                             <strong>Zip Code: </strong> {zipCode}
//                         </Typography>
//                         <Typography variant="body1">
//                             <strong>Country Phone Code: </strong> {country_phone_code}
//                         </Typography>

//                         <Divider sx={{ my: 1 }} />

//                         <Typography variant="h6" gutterBottom>
//                             Pricing Information
//                         </Typography>

//                         <Typography variant="body1">
//                             <strong>Chat Price: </strong> {currency} {chat_price}
//                         </Typography>
//                         <Typography variant="body1">
//                             <strong>Call Price: </strong> {currency} {call_price}
//                         </Typography>
//                         <Typography variant="body1">
//                             <strong>Video Call Price: </strong> {currency} {video_call_price}
//                         </Typography>
//                         <Typography variant="body1">
//                             <strong>Commission Video Call Price: </strong> {currency} {commission_video_call_price}
//                         </Typography>
//                         <Typography variant="body1">
//                             <strong>Normal Video Call Price: </strong> {currency} {normal_video_call_price}
//                         </Typography>
//                         <Typography variant="body1">
//                             <strong>Commission Normal Video Call Price: </strong> {currency} {commission_normal_video_call_price}
//                         </Typography>
//                         <Typography variant="body1">
//                             <strong>Consultation Price: </strong> {currency} {consultation_price}
//                         </Typography>
//                         <Typography variant="body1">
//                             <strong>Commission Call Price: </strong> {currency} {commission_call_price}
//                         </Typography>
//                         <Typography variant="body1">
//                             <strong>Commission Chat Price: </strong> {currency} {commission_chat_price}
//                         </Typography>
//                         <Typography variant="body1">
//                             <strong>Commission Remark: </strong> {commission_remark}
//                         </Typography>
//                     </CardContent>
//                 </Grid>

//                 <Grid item xs={12}>
//                     <Divider sx={{ my: 2 }} />
//                     {/* Skills */}
//                     <Typography variant="h6" gutterBottom>
//                         Skills
//                     </Typography>
//                     <List dense>
//                         {skill.map((skillItem) => (
//                             <ListItem key={skillItem._id}>
//                                 <ListItemText primary={skillItem.skill.trim()} />
//                             </ListItem>
//                         ))}
//                     </List>
//                     <Divider sx={{ marginY: 2 }} />

//                     {/* Expertise */}
//                     <Typography variant="h6" gutterBottom>
//                         Expertise
//                     </Typography>
//                     <List dense>
//                         {expertise.map((exp) => (
//                             <ListItem key={exp._id}>
//                                 <ListItemText primary={exp.expertise.trim()} />
//                             </ListItem>
//                         ))}
//                     </List>
//                     <Divider sx={{ marginY: 2 }} />

//                     {/* Main Expertise */}
//                     <Typography variant="h6" gutterBottom>
//                         Main Expertise
//                     </Typography>
//                     <List dense>
//                         {mainExpertise.map((mainExp) => (
//                             <ListItem key={mainExp._id}>
//                                 <ListItemText primary={mainExp.mainExpertise.trim()} />
//                             </ListItem>
//                         ))}
//                     </List>
//                     <Divider sx={{ marginY: 2 }} />

//                     {/* Bank Info */}
//                     <Typography variant="h6" gutterBottom>
//                         Bank Information
//                     </Typography>
//                     <Typography variant="body1">
//                         <strong>Account Holder Name: </strong> {account_holder_name}
//                     </Typography>
//                     <Typography variant="body1">
//                         <strong>Account Number: </strong> {account_number}
//                     </Typography>
//                     <Typography variant="body1">
//                         <strong>Account Type: </strong> {account_type}
//                     </Typography>
//                     <Typography variant="body1">
//                         <strong>Bank Name: </strong> {account_name}
//                     </Typography>
//                     <Typography variant="body1">
//                         <strong>IFSC Code: </strong> {IFSC_code}
//                     </Typography>
//                     <Divider sx={{ marginY: 2 }} />

//                     {/* Notifications */}
//                     <Typography variant="h6" gutterBottom>
//                         Notifications
//                     </Typography>
//                     <Typography variant="body1">
//                         <strong>Live Notification: </strong> {live_notification ? "Enabled" : "Disabled"}
//                     </Typography>
//                     <Typography variant="body1">
//                         <strong>Chat Notification: </strong> {chat_notification ? "Enabled" : "Disabled"}
//                     </Typography>
//                     <Typography variant="body1">
//                         <strong>Call Notification: </strong> {call_notification ? "Enabled" : "Disabled"}
//                     </Typography>
//                     <Divider sx={{ marginY: 2 }} />

//                     {/* Additional Info */}
//                     <Typography variant="h6" gutterBottom>
//                         Additional Information
//                     </Typography>
//                     <Typography variant="body1">
//                         <strong>Working on Other Apps: </strong> {workingOnOtherApps}
//                     </Typography>
//                     <Typography variant="body1">
//                         <strong>Active Bank Account: </strong> {activeBankAcount}
//                     </Typography>
//                     <Typography variant="body1">
//                         <strong>Wallet Balance: </strong> {wallet_balance}
//                     </Typography>
//                     <Typography variant="body1">
//                         <strong>Pan Card: </strong> {panCard}
//                     </Typography>
//                     <Typography variant="body1">
//                         <strong>Follower Count: </strong> {follower_count}
//                     </Typography>
//                     <Typography variant="body1">
//                         <strong>Is Verified: </strong> {isVerified ? "Yes" : "No"}
//                     </Typography>
//                     <Typography variant="body1">
//                         <strong>Is Online: </strong> {isOnline ? "Yes" : "No"}
//                     </Typography>
//                     <Typography variant="body1">
//                         <strong>Chat Status: </strong> {chat_status}
//                     </Typography>
//                     <Typography variant="body1">
//                         <strong>Call Status: </strong> {call_status}
//                     </Typography>
//                     <Typography variant="body1">
//                         <strong>Video Call Status: </strong> {video_call_status}
//                     </Typography>
//                     <Typography variant="body1">
//                         <strong>Aadhar Number: </strong> {aadharNumber}
//                     </Typography>
//                     <Divider sx={{ marginY: 2 }} />

//                     {/* Earnings */}
//                     <Typography variant="h6" gutterBottom>
//                         Today's Earnings
//                     </Typography>
//                     <Typography variant="body1">
//                         <strong>Date: </strong> {new Date(today_earnings.date).toDateString()}
//                     </Typography>
//                     <Typography variant="body1">
//                         <strong>Earnings: </strong> {today_earnings.earnings}
//                     </Typography>
//                     <Divider sx={{ my: 2 }} />

//                     <Typography variant="h6" gutterBottom>
//                         Bio:
//                     </Typography>
//                     <Typography variant="body1">{long_bio}</Typography>
//                 </Grid>
//             </Grid>
//         </div>
//     );
// };

// export default Profile;
