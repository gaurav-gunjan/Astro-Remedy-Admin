import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { secondsToHMS } from '../utils/services';
import moment from 'moment';

Font.register({ family: 'Roboto-Black', src: require('../assets/fonts/Roboto-Black.ttf') });
Font.register({ family: 'Roboto-Light', src: require('../assets/fonts/Roboto-Light.ttf') });
Font.register({ family: 'Roboto-Medium', src: require('../assets/fonts/Roboto-Medium.ttf') });
Font.register({ family: 'Roboto-Regular', src: require('../assets/fonts/Roboto-Regular.ttf') });
// Create styles
const styles = StyleSheet.create({
    page: {
        padding: 10,
        borderTopWidth: 8,
        borderTopColor: 'rgb(255,237,202)',
        borderTopStyle: 'solid',
        borderBottomWidth: 8,
        borderBottomColor: 'rgb(255,237,202)',
        borderBottomStyle: 'solid',
    },
    section: {
        marginBottom: 5,
    },
    row1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
        backgroundColor: "#FFF4DF",
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 35,
    },
    column: {
        width: '25%',
        padding: 5,
    },
    bheader: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Spacing elements evenly
        alignItems: 'center', // Align items vertically center
        marginBottom: 20,
    },
    header: {
        marginBottom: 10,
    },
    voon: {
        marginTop: 20,
        marginBottom: 20,
    },
    headernew: {
        marginBottom: 10,
        fontSize: 12,

    },
    text: {
        fontSize: 12,
    },
    textmain: {
        fontSize: 13,
        fontWeight: 'bold',
    },
    text1: {
        fontSize: 14,
        fontWeight: "400",
    },
    footer: {
        marginTop: 20,
        fontSize: 14,
    },
    footertext: {
        marginTop: 10,
        fontSize: 12,
    },
    horizontalLine: {
        marginVertical: 10,
        height: 1,
        backgroundColor: 'black',
    },
    mainborder: {
        margin: 30,

    },
});

// Create Document Component
const MyDocument = ({ data, name }) => {
    return <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.mainborder}>
                <View style={styles.bheader}>
                    <View style={styles.header}>
                        <Text style={{ fontFamily: 'Roboto-Black' }}>AstroRemedy</Text>
                    </View>
                    <View style={styles.headernew}>
                        <Text style={{ fontFamily: 'Roboto-Black', margin: '2px' }}>Tax Invoice</Text>
                        <Text style={{ fontFamily: 'Roboto-Black', margin: '2px' }}>{data?.startTime ? moment(data?.startTime).format('HH:mm:ss A') : 'N/A'}</Text>
                        <Text style={{ margin: '2px' }}><b>Transaction Id:</b>{data?.transactionId}</Text>
                        
                        {/* Txn Id */}
                        {/* <Text style={{ margin: '2px' }}>{data?.transactionId} </Text> */}
                        {/* <Text style={{ margin: '2px' }}>Txn Id: {'x'.repeat(data?.transactionId.length - 5) + data?.transactionId?.slice(-5)}</Text> */}
                    </View>
                </View>
                <View style={styles.header}>
                    <Text style={{ fontFamily: 'Roboto-Black' }}>To</Text>
                    <View style={styles.horizontalLine} />
                    <Text style={{ fontFamily: 'Roboto-Light', fontSize: "12" }}>{data?.customerDetails?.customerName}</Text>
                    <Text style={{ fontFamily: 'Roboto-Light', fontSize: "12" }}>{data?.customerDetails?.email}</Text>
                </View>

                <View style={styles.row1}>
                    <View style={styles.column}>
                        <Text style={styles.text1}>Description</Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.text1}>Duration (MM:SS) </Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.text1}>PRICE</Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.text1}>TOTAL </Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text style={styles.text}>{name}</Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.text}>{secondsToHMS(data?.durationInSeconds)}</Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.text}>{data?.callPrice ? data?.callPrice : data?.chatPrice}</Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={{ fontFamily: 'Roboto-Black', fontSize: '12' }}>{data?.totalCallPrice ? data?.totalCallPrice?.toFixed(2) : data?.totalChatPrice?.toFixed(2)}</Text>
                    </View>
                </View>

                <View style={styles.header}>
                    <Text style={{ fontFamily: 'Roboto-Regular', fontSize: "12", margin: '2px', textAlign: 'center' }}>If you have any concerns, please connect our Customer Support through Website or Mobile Application.</Text>
                    <Text style={{ fontFamily: 'Roboto-Regular', fontSize: "12", textAlign: 'center', margin: '2px' }}>We will be glad to assist !</Text>
                    <Text style={{ fontFamily: 'Roboto-Medium', fontSize: "18", textAlign: 'center', margin: '2px' }}>Thank You ! </Text>
                </View>
                <View style={styles.horizontalLine} />
                <View style={styles.voon}>
                    <Text style={{ fontFamily: 'Roboto-Regular', fontSize: "12", margin: '5px', textAlign: 'center' }}>Registered Address: Navaratri Enterprises</Text>
                    <Text style={{ fontFamily: 'Roboto-Regular', fontSize: "12", margin: '5px', textAlign: 'center' }}>GSTIN: 05AATFN2979AIZ2</Text>
                    <Text style={{ fontFamily: 'Roboto-Regular', fontSize: "12", margin: '5px', textAlign: 'center' }}>This is a computer generated invoice, no signatures are required</Text>
                </View>
            </View>
        </Page>
    </Document>
};

export default MyDocument;
