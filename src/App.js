import "./App.css";
import { HashRouter as Router, Route, Routes } from "react-router-dom";

import Dashboard from "./pages/dashboard/Dashboard";
import PrivateRoute from "./utils/private-routes";
import Login from "./pages/login/Login";

import ChatHistory from "./pages/history/ChatHistory";
import CallHistory from "./pages/history/CallHistory";
import UsersGiftHistory from "./pages/history/UsersGiftHistory";
import DisplayHowToUseVideos from "./pages/pages/DisplayHowToUseVideos";
import AddHowToUseVideo from "./pages/pages/AddHowToUseVideo";
import DisplayHowToUse from "./pages/pages/DisplayHowToUse";
import AddHowToUse from "./pages/pages/AddHowToUse";
import AdminEarning from "./pages/reports/AdminEarning";
import ReceiptSummary from "./pages/reports/ReceiptSummary";

import SaleSummary from "./pages/reports/SaleSummary";
import ChatSummary from "./pages/history/ChatSummary";

//! Astrologer
import Astrologer from "./pages/astrologer";
import AstrologerLiveHistory from "./pages/astrologer/astrologer-live-history";
import AstrologerEnquiry from "./pages/astrologer/astrologer-enquiry";
import AddAstrologer from "./pages/astrologer/add-astrologer";

//! Customer
import Customer from "./pages/customer";
import AddCustomer from "./pages/customer/add-customer";

//! Banner 
import Banner from "./pages/banner";
import AddBanner from "./pages/banner/add-banner";

//! Recharge 
import Recharge from "./pages/recharge";
import AddRecharge from "./pages/recharge/add-recharge";

//! Astro-Mall
import AstroMallCategory from "./pages/astro-mall/category";
import AstroMallAddCategory from "./pages/astro-mall/category/add-category";
import AstroMallProduct from "./pages/astro-mall/product";
import AstroMallAddProduct from "./pages/astro-mall/product/add-product";
import AstroMallOrderHistory from "./pages/astro-mall/order-history";

//! Astro-Puja     
import AstroPujaPuja from "./pages/astro-puja/puja";
import AstroPujaAddPuja from "./pages/astro-puja/puja/add-puja";
import AstroPujaPujaRequest from "./pages/astro-puja/puja-request";
import AstroPujaAddPujaRequest from "./pages/astro-puja/puja-request/add-puja-request";
import AstroPujaPujaHistory from "./pages/astro-puja/puja-history";
import AstroPujaPujaRequestAccepted from "./pages/astro-puja/puja-request-accepted";
import AstroPujaPujaRequestRejected from "./pages/astro-puja/puja-request-rejected";
import AstroPujaPujaRequestBooked from "./pages/astro-puja/puja-request-booked";

//! Notification 
import CustomerNotification from "./pages/notification/customer-notification";
import AstrologerNotification from "./pages/notification/astrologer-notification";
import AddNotification from "./pages/notification/add-notification";

//! Skill 
import Skill from "./pages/skill";
import AddSkill from "./pages/skill/add-skill";

//! Remedies 
import Remedies from "./pages/remedies";
import AddRemedies from "./pages/remedies/add-remedies";

//! Gift 
import Gift from "./pages/gift";
import AddGift from "./pages/gift/add-gift";

//!Review 
import Review from "./pages/review";
import AddReview from "./pages/review/add-review";

//! Astroblog 
import Astroblog from "./pages/astro-blog";
import AddAstroblog from "./pages/astro-blog/add-astro-blog";

//! Language 
import Language from "./pages/language";
import AddLanguage from "./pages/language/add-language";

//! Announcement 
import Announcement from "./pages/announcement";
import AddAnnouncement from "./pages/announcement/add-announcement";

//! Expertise 
import Expertise from "./pages/expertise";
import AddExpertiseNew from "./pages/expertise/add-expertise";
import MainExpertise from "./pages/expertise/main-expertise";
import AddMainExpertiseNew from "./pages/expertise/main-expertise/add-main-expertise";
import { useEffect } from "react";

function App() {

  useEffect(() => {
    const handleWheel = (e) => {
      if (document.activeElement.type === 'number') {
        e.preventDefault();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    // Set min attribute and enforce non-negative values
    const numberInputs = document.querySelectorAll('input[type="number"]');
    numberInputs.forEach((input) => {
      input.setAttribute('min', '0');

      input.addEventListener('input', () => {
        if (input.value < 0) {
          input.value = 0;
        }
      });
    });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      numberInputs.forEach((input) => {
        input.removeEventListener('input', () => {
          if (input.value < 0) {
            input.value = 0;
          }
        });
      });
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<PrivateRoute />}>
          <Route index element={<Dashboard />} />
          <Route path="*" element={<div style={{ color: "#000", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "80vh" }}>Not Found</div>} />

          {/* Astrologer */}
          <Route path="/astrologer" element={<Astrologer />} />
          <Route path="/astrologer-live-history" element={<AstrologerLiveHistory />} />
          <Route path="/astrologer-enquiry" element={<AstrologerEnquiry />} />
          <Route path="/astrologer/add-astrologer" element={<AddAstrologer mode="Add" />} />
          <Route path="/astrologer/edit-astrologer" element={<AddAstrologer mode="Edit" />} />

          {/* Customer */}
          <Route path="/customer" element={<Customer />} />
          <Route path="/customer/add-customer" element={<AddCustomer mode="Add" />} />
          <Route path="/customer/edit-customer" element={<AddCustomer mode="Edit" />} />

          {/* Banner */}
          <Route path="/banner" element={<Banner />} />
          <Route path="/banner/add-banner" element={<AddBanner />} />

          {/* Recharge */}
          <Route path="/recharge" element={<Recharge />} />
          <Route path="/recharge/add-recharge" element={<AddRecharge />} />

          {/* Astro-Mall */}
          <Route path="/astro-mall/category" element={<AstroMallCategory />} />
          <Route path="/astro-mall/category/add-category" element={<AstroMallAddCategory />} />
          <Route path="/astro-mall/product" element={<AstroMallProduct />} />
          <Route path="/astro-mall/product/add-product" element={<AstroMallAddProduct />} />
          <Route path="/astro-mall/order-history" element={<AstroMallOrderHistory />} />

          {/* Astro-Puja */}
          <Route path="/astro-puja/puja" element={<AstroPujaPuja />} />
          <Route path="/astro-puja/puja/add-puja" element={<AstroPujaAddPuja />} />
          <Route path="/astro-puja/puja-request" element={<AstroPujaPujaRequest />} />
          <Route path="/astro-puja/puja-request/add-puja-request" element={<AstroPujaAddPujaRequest />} />
          <Route path="/astro-puja/puja-history" element={<AstroPujaPujaHistory />} />
          <Route path="/astro-puja/puja-request-accepted" element={<AstroPujaPujaRequestAccepted />} />
          <Route path="/astro-puja/puja-request-rejected" element={<AstroPujaPujaRequestRejected />} />
          <Route path="/astro-puja/puja-request-booked" element={<AstroPujaPujaRequestBooked />} />

          {/* Notification */}
          <Route path="/customer-notification" element={<CustomerNotification />} />
          <Route path="/customer-notification/add-notification" element={<AddNotification type="Customer" />} />
          <Route path="/astrologer-notification" element={<AstrologerNotification />} />
          <Route path="/astrologer-notification/add-notification" element={<AddNotification type="Astrologer" />} />

          {/* Skill */}
          <Route path="/skill" element={<Skill />} />
          <Route path="/skill/add-skill" element={<AddSkill mode="Add" />} />
          <Route path="/skill/edit-skill" element={<AddSkill mode="Edit" />} />

          {/* Remedies */}
          <Route path="/remedies" element={<Remedies />} />
          <Route path="/remedies/add-remedies" element={<AddRemedies mode="Add" />} />
          <Route path="/remedies/edit-remedies" element={<AddRemedies mode="Edit" />} />

          {/* Expertise */}
          <Route path="/expertise" element={<Expertise />} />
          <Route path="/expertise/add-expertise" element={<AddExpertiseNew mode="Add" />} />
          <Route path="/expertise/edit-expertise" element={<AddExpertiseNew mode="Edit" />} />

          <Route path="/main-expertise" element={<MainExpertise />} />
          <Route path="/main-expertise/add-main-expertise" element={<AddMainExpertiseNew mode="Add" />} />
          <Route path="/main-expertise/edit-main-expertise" element={<AddMainExpertiseNew mode="Edit" />} />

          {/* Gift */}
          <Route path="/gift" element={<Gift />} />
          <Route path="/gift/add-gift" element={<AddGift mode="Add" />} />
          <Route path="/gift/edit-gift" element={<AddGift mode="Edit" />} />

          {/* Review */}
          <Route path="/review" element={<Review />} />
          <Route path="/review/add-review" element={<AddReview mode="Add" />} />
          <Route path="/review/edit-review" element={<AddReview mode="Edit" />} />

          {/* Astroblog */}
          <Route path="/astro-blog" element={<Astroblog />} />
          <Route path="/astro-blog/add-astro-blog" element={<AddAstroblog mode="Add" />} />
          <Route path="/astro-blog/edit-astro-blog" element={<AddAstroblog mode="Edit" />} />

          {/* Language */}
          <Route path="/language" element={<Language />} />
          <Route path="/language/add-language" element={<AddLanguage mode="Add" />} />
          <Route path="/language/edit-language" element={<AddLanguage mode="Edit" />} />

          {/* Announcement */}
          <Route path="/announcement" element={<Announcement />} />
          <Route path="/announcement/add-announcement" element={<AddAnnouncement mode="Add" />} />
          <Route path="/announcement/edit-announcement" element={<AddAnnouncement mode="Edit" />} />


          <Route path="/history/ChatHistory" element={<ChatHistory />} />
          <Route path="/history/CallHistory" element={<CallHistory />} />
          <Route path="/history/UsersGiftHistory" element={<UsersGiftHistory />} />

          <Route path="/displayHowToUseVideos" element={<DisplayHowToUseVideos />} />
          <Route path="/AddHowToUseVideo" element={<AddHowToUseVideo />} />
          <Route path="/displayHowToUse" element={<DisplayHowToUse />} />

          <Route path="/AddHowToUse" element={<AddHowToUse />} />
          <Route path="/adminEarning" element={<AdminEarning />} />
          <Route path="/receiptSummary" element={<ReceiptSummary />} />

          <Route path="/saleSummary" element={<SaleSummary />} />
          <Route path="chatSummary" element={<ChatSummary />} />
        </Route>

        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
