import React from "react";
import { Link, Routes, Route } from "react-router-dom";

import StaffSearch from "./pages/staff/StaffSearch";
import MainPage from "./pages/main/MainPage";
import Login from "./pages/Login/Login";
import FindId from "./pages/Login/FindId"
import FindIdEmail from "./pages/Login/FindIdEmail";
import FindPassword from "./pages/Login/FindPassword"
import FindPasswordEmail from "./pages/Login/FindPasswordEmail";
import JoinWay  from "./pages/Join/JoinWay";
import JoinAccept from "./pages/Join/JoinAccept";
import JoinAcceptGlobal from "./pages/Join/JoinAcceptGlobal";
import JoinCertificate from "./pages/Join/JoinCertificate";
import JoinUs  from "./pages/Join/JoinUs";
import JoinComplete from "./pages/Join/JoinComplete";
import JoinAlready from "./pages/Join/JoinAlready"

//고객의소리
import CustomerBoardList from './pages/CustomerBoard/CustomerBoardList';
import CustomerBoardAdd from './pages/CustomerBoard/CustomerBoardAdd';
import CustomerBoardView from './pages/CustomerBoard/CustomerBoardView';

//의약품검색
import DrugSearch from './pages/DrugSearch/DrugSearch';
import DrugInfo from './pages/DrugSearch/DrugInfo';

//뉴스홈
import NewsMain from './pages/NewsHome/NewsMain';
import NewsView from './pages/NewsHome/NewsView';
import NoticeView from './pages/NewsHome/NoticeView';

// 의료인 정보
import StaffProfile from "./pages/staff/StaffProfile";

// 진료 예약
import AppointmentMain from "./pages/Appointment/AppointmentMain";

// 사이트맵
import AllMenu from './pages/SiteMap/SiteMap';

function App() {
  return (
    <div>
      <Link to="main_page"></Link>
      <Routes>
        <Route path="/" exapt={true} element={<MainPage />} />
        <Route path="/all_menu" element={<AllMenu />} />

        <Route path='/login' element={<Login />} />
        <Route path='/find_id' element={<FindId />} />
        <Route path='/find_id_email' element={<FindIdEmail />} />
        <Route path='/find_password' element={<FindPassword />} />
        <Route path='/find_password_email' element={<FindPasswordEmail />} />
        <Route path='/join_way' element={<JoinWay />} />
        <Route path='/join_accept' element={<JoinAccept />} />
        <Route path='/join_accept_global' element={<JoinAcceptGlobal />} />
        <Route path='/join_certificate' element={<JoinCertificate />} />
        <Route path='/join_us' element={<JoinUs />} />
        <Route path='/join_complete' element={<JoinComplete />} />
        <Route path='/join_already' element={<JoinAlready />} />
        
        {/* 고객의소리 페이지 라우팅*/}
        <Route path='/customer.do' element={<CustomerBoardList />}/>
        <Route path="/suggest.do" element={<CustomerBoardAdd/>}/>
        <Route path="/suggestion/:id" element={<CustomerBoardView/>}/>
        <Route path="/staff" element={<StaffSearch/>}/>
        <Route path="/staff/*" element={<StaffProfile/>}/>

         {/* 의약품검색 페이지 라우팅 */}
         <Route path='/drug.do/*' element={<DrugSearch />}/>
         <Route path='/drug.do/drug/id' element={<DrugInfo />}/>

         {/* 뉴스홈 페이지 라우팅 */}
         <Route path='/news' element={<NewsMain />}/>
         <Route path='/news/media.do' element={<NewsView />}/>
         <Route path='/news/notice.do' element={<NoticeView />}/>

         {/* 진료 예약 */}
         <Route path='/appointment_main/*' element={<AppointmentMain />}/>
      </Routes>
    </div>
  );
}

export default App;
