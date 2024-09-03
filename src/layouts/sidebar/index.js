import { NavLink } from "react-router-dom";
import { FaHome, } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { BiAbacus, BiUser, BiUserPlus } from "react-icons/bi";
import { BiCog } from "react-icons/bi";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import logo from "../../assets/images/logo.png";
import SidebarMenu from "../../components/features/SidebarMenu";
import "../../assets/styles/sidebar.css";

import { connect } from "react-redux";
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import VideocamIcon from '@mui/icons-material/Videocam';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import HistoryIcon from '@mui/icons-material/History';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CallIcon from '@mui/icons-material/Call';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import AddLinkIcon from '@mui/icons-material/AddLink';
import AddCardIcon from '@mui/icons-material/AddCard';
import MedicationIcon from '@mui/icons-material/Medication';
import LightbulbCircleIcon from '@mui/icons-material/LightbulbCircle';
import FluorescentIcon from '@mui/icons-material/Fluorescent';
import PreviewIcon from '@mui/icons-material/Preview';
import ReviewsIcon from '@mui/icons-material/Reviews';
import RateReviewIcon from '@mui/icons-material/RateReview';
import RedeemIcon from '@mui/icons-material/Redeem';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import DescriptionIcon from '@mui/icons-material/Description';
import AppShortcutIcon from '@mui/icons-material/AppShortcut';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import CampaignIcon from '@mui/icons-material/Campaign';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';


const routes = [
  {
    path: "/",
    name: "Dashboard",
    icon: <FaHome size={24} />,
  },
  {
    name: "Astrologer",
    icon: <GroupsIcon />,
    subRoutes: [
      {
        path: "/astrologer",
        name: " List Of Astrologers",
        icon: <PersonIcon />,
      },
      {
        path: "/astrologer-live-history",
        name: "Astrologer Live History",
        icon: <VideocamIcon />,
      },
      {
        path: "/astrologer-enquiry",
        name: "Astrologer Enquiry",
        icon: <PersonIcon />,
      },
    ],
  },
  {
    path: "/customer",
    name: "Customer",
    icon: <PersonPinIcon />,
  },
  {
    path: "/banner",
    name: "Banner",
    icon: <ViewCarouselIcon />,
  },
  {
    path: "/recharge",
    name: "Recharge",
    icon: <TextSnippetIcon />,
  },
  {
    name: "Astro Mall",
    icon: <LightbulbCircleIcon />,
    subRoutes: [
      {
        path: "/astro-mall/category",
        name: "Category",
        icon: <FluorescentIcon />,
      },
      {
        path: "/astro-mall/product",
        name: "Product",
        icon: <FluorescentIcon />,
      },
      {
        path: "/astro-mall/order-history",
        name: "Order History",
        icon: <FluorescentIcon />,
      },
    ],
  },
  {
    name: "Astro Puja",
    icon: <LightbulbCircleIcon />,
    subRoutes: [
      {
        path: "/astro-puja/puja",
        name: "Puja",
        icon: <FluorescentIcon />,
      },
      {
        path: "/astro-puja/puja-request",
        name: "Puja Request",
        icon: <FluorescentIcon />,
      },

      {
        path: "/astro-puja/puja-request-accepted",
        name: "Puja Request Accepted",
        icon: <FluorescentIcon />,
      },
      {
        path: "/astro-puja/puja-request-rejected",
        name: "Puja Request Rejected",
        icon: <FluorescentIcon />,
      },
      {
        path: "/astro-puja/puja-request-booked",
        name: "Puja Request Booked",
        icon: <FluorescentIcon />,
      },
      {
        path: "/astro-puja/puja-history",
        name: "Puja History",
        icon: <FluorescentIcon />,
      },
    ],
  },
  {
    name: "Notification",
    icon: <NotificationsNoneIcon />,
    subRoutes: [
      {
        path: "/customer-notification",
        name: "Customer Notification",
        icon: <FaceRetouchingNaturalIcon />,
      },
      {
        path: "/astrologer-notification",
        name: "Astrologer Notification",
        icon: <AcUnitIcon />,
      },
    ],
  },
  {
    path: "/skill",
    name: "Skill",
    icon: <AddLinkIcon />,
  },
  {
    path: "/remedies",
    name: "Remedies",
    icon: <MedicationIcon />,
  },
  {
    name: "Expertise",
    icon: <LightbulbCircleIcon />,
    subRoutes: [
      {
        path: "/expertise",
        name: "Expertise",
        icon: <FluorescentIcon />,
      },
      {
        path: "/main-expertise",
        name: "Main Expertise",
        icon: <FluorescentIcon />,
      }
    ],
  },
  {
    path: "/history",
    name: "History",
    icon: <HistoryIcon />,
    subRoutes: [
      {
        path: "/history/chat-history",
        name: "Chat History",
        icon: <ChatBubbleOutlineIcon />,
      },
      {
        path: "/history/call-history",
        name: "Call History",
        icon: <CallIcon />,
      },
    ],
  },
  {
    path: "/gift",
    name: "Gift",
    icon: <RedeemIcon />,
  },
  {
    path: "/review",
    name: "Review",
    icon: <PreviewIcon />,
  },
  {
    path: "/astro-blog",
    name: "AstroBlog",
    icon: <RateReviewIcon />,
  },
  {
    path: "/pages",
    name: "Pages",
    icon: <DescriptionIcon />,
    subRoutes: [
      {
        path: "/pages/terms-and-conditions",
        name: "Terms and Conditions",
        icon: <BiAbacus />,
      },
      {
        path: "/pages/privacy-policy",
        name: "Privacy Policy",
        icon: <BiAbacus />,
      },
      {
        path: "/displayHowToUse",
        name: "How to use- ScreenShots",
        icon: <BiAbacus />,
      },
      {
        path: "/displayHowToUseVideos",
        name: "How to use - Videos",
        icon: <BiAbacus />,
      },
    ],
  },
  {
    path: "/reports/admin-earning",
    name: "Admin Earning",
    icon: <ReportGmailerrorredIcon />,
  },
  {
    path: "/language",
    name: "Language",
    icon: <BiAbacus />,
  },
  {
    path: "/announcement",
    name: "Announcement",
    icon: <CampaignIcon fontSize="30px" />,
  },
];

const inputAnimation = {
  hidden: {
    width: 0,
    padding: 0,
    transition: {
      duration: 0.2,
    },
  },
  show: {
    width: "140px",
    padding: "5px 15px",
    transition: {
      duration: 0.2,
    },
  },
};

const showAnimation = {
  hidden: {
    width: 0,
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
  show: {
    opacity: 1,
    width: "auto",
    transition: {
      duration: 0.5,
    },
  },
};

const SideBar = ({ children, dispatch, isSidebarOpen }) => {
  const [hiddenSidebarWidth, setHiddenSidebarWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 991) setHiddenSidebarWidth(65);
      else setHiddenSidebarWidth(0);
    };

    // Attach the event listener
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <motion.div
        animate={{
          width: isSidebarOpen ? "250px" : `${hiddenSidebarWidth}px`,
          transition: {
            // duration: 0.5,
            // type: "spring",
            // damping: 10,
          },
        }}
        className={`sidebar`}
      >
        {isSidebarOpen ? (

          <div className="top_section">
            <img className="logo_section" src={logo} style={{ width: 80, height: 80 }} />
          </div>
        ) : (
          <div className="top_section132" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <img src={logo} style={{ width: 30, height: 30 }} />
          </div>
        )}
        <section className="routes">
          {routes.map((route, index) => {
            if (route.subRoutes) {
              return (
                <SidebarMenu
                  route={route}
                  key={index}
                  showAnimation={showAnimation}
                />
              );
            }

            return (
              <div key={index} className="side_Bar">
                <NavLink
                  to={route.path}
                  className="link"
                  activeclassname="active"
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isSidebarOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              </div>
            );
          })}
        </section>
      </motion.div>
    </>
  );
};

const mapStateToProps = state => ({
  isSidebarOpen: state.dashboard.isSidebarOpen
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
