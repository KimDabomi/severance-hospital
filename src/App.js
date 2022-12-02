import React from "react";
import { Link, Routes, Route } from "react-router-dom";

import StaffSearch from "./pages/staff/StaffSearch";
import MainPage from "./pages/main/MainPage";
import Login from "./components/Login";
import JoinWay  from "./components/JoinWay";
import JoinAccept from "./components/JoinAccept";
import JoinUs  from "./components/JoinUs";

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


function App() {
  return (
    <div>
      <Link to="main_page"></Link>
      <Routes>
        <Route path="/" exapt={true} element={<MainPage />} />

        <Route path='/login' element={<Login />} />
        <Route path='/join_way' element={<JoinWay />} />
        <Route path='/join_accept' element={<JoinAccept />} />
        <Route path='/join_us' element={<JoinUs />} />
        
        {/* 고객의소리 페이지 라우팅*/}
        <Route path='/customer.do' element={<CustomerBoardList />}/>
        <Route path="/suggest.do" element={<CustomerBoardAdd/>}/>
        <Route path="/suggestion/:id" element={<CustomerBoardView/>}/>
        <Route path="/staff" element={<StaffSearch/>}/>

         {/* 의약품검색 페이지 라우팅 */}
         <Route path='/drug.do/*' element={<DrugSearch />}/>
         <Route path='/drug.do/drug/id' element={<DrugInfo />}/>

         {/* 뉴스홈 페이지 라우팅 */}
         <Route path='/news' element={<NewsMain />}/>
         <Route path='/news/media.do' element={<NewsView />}/>
         <Route path='/news/notice.do' element={<NoticeView />}/>
      </Routes>
    </div>
  );
}

export default App;
