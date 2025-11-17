import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate
} from 'react-router-dom';

function ContactForm() {
  return (
    <section className="contact-page">
      <h3>🙌 문의하기</h3>
      <form className="contact-form">
        <label>이름<input type="text" name="name" required /></label>
        <label>연락처<input type="text" name="phone" required /></label>
        <label>문의 내용<textarea name="message" rows={5} required></textarea></label>
        <button type="submit">전송</button>
      </form>
      <p style={{marginTop:'20px', fontSize:'.97em'}}>개인정보는 오직 문의를 위해서만 안전하게 사용됩니다.</p>
    </section>
  );
}

// ----- 각 섹션별 컴포넌트 분리 -----

function AboutSection({navigate}) {
  return (
    <section className="hero" id="about">
      <h2>AI와 함께<br/>3시간 만에 직접 만드는 나만의 IT 프로젝트!</h2>
      <p>코딩을 몰라도, 기획부터 디자인, 개발까지.<br/>AI로 빠르고 쉽게 완성하는 원데이 클래스✨</p>
      <button className="cta" onClick={()=>navigate('/contact')}>문의하기</button>
    </section>
  );
}
function CurriculumSection() {
  return (
    <section className="timeline" id="curriculum">
      <h3>🕒 수업 구성</h3>
      <ul>
        <li><b>1시간</b> — AI 툴 사용법/기초 코딩 흐름(실습 위주)</li>
        <li><b>30분</b> — 아이디어 정리 & 설계</li>
        <li><b>1시간 30분</b> — AI와 함께 실제 개발+완성</li>
      </ul>
      <div className="desc">학생 맞춤, 방문 1:1 수업으로 진행합니다!</div>
    </section>
  );
}
function MakeSection({navigate}) {
  return (
    <section className="make" id="make">
      <h3>🎨 만들 수 있는 것들</h3>
      <div className="make-list">
        <button onClick={()=>navigate('/contact')}>🌐 나만의 웹사이트</button>
        <button onClick={()=>navigate('/contact')}>📱 간단한 앱</button>
        <button onClick={()=>navigate('/contact')}>🤖 블로그 자동포스팅</button>
        <button onClick={()=>navigate('/contact')}>✅ 공부 자동화(시간표/할 일)</button>
        <button onClick={()=>navigate('/contact')}>💬 AI 챗봇</button>
        <button onClick={()=>navigate('/contact')}>📔 감정 기록 앱</button>
        <button onClick={()=>navigate('/contact')}>🎮 미니게임</button>
      </div>
      <small>위 예시는 일부! 관심사에 따라 커리큘럼 맞춤 진행 👌</small>
    </section>
  );
}
function PriceSection() {
  return (
    <section className="price" id="price">
      <h3>💰 수강비 (오픈이벤트)</h3>
      <div className="price-box">
        <span>3시간 <b>6만원</b> (1:1 방문)</span>
        <span>시간당 2만원 — 타사대비 훨씬 저렴!</span>
      </div>
      <p className="notice">* 오픈특가 이후 가격 조정 예정</p>
    </section>
  );
}
function TutorSection() {
  return (
    <section className="tutor" id="tutor">
      <h3>🧑‍🏫 튜터 소개</h3>
      <ul>
        <li>중등 수학 강사 6개월</li>
        <li>코더랜드 튜터 4개월</li>
        <li>앱개발 2년차 (서비스 실전 경험)</li>
      </ul>
      <p>지도경험 & IT서비스 개발경력을 모두 갖춰,<br/>학생 눈높이에 딱 맞는 실전형 프로젝트 안내!</p>
    </section>
  );
}

const TABS = [
  { id: 'about', label: '소개' },
  { id: 'curriculum', label: '수업구성' },
  { id: 'make', label: '만드는것' },
  { id: 'price', label: '가격' },
  { id: 'tutor', label: '튜터소개' }
];

function MainPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('about');

  const renderSection = () => {
    switch(activeTab) {
      case 'about': return <AboutSection navigate={navigate} />;
      case 'curriculum': return <CurriculumSection/>;
      case 'make': return <MakeSection navigate={navigate}/>;
      case 'price': return <PriceSection/>;
      case 'tutor': return <TutorSection/>;
      default: return null;
    }
  };

  return (
    <div className="App">
      <header className="header">
        <h1>🧡 바이브 코딩 원데이 클래스</h1>
        <nav className="nav-tabs">
          {TABS.map(tab => (
            <button
              key={tab.id}
              className={activeTab === tab.id ? 'active' : ''}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
          <button className="contact-nav" onClick={()=>navigate('/contact')}>문의</button>
        </nav>
      </header>
      {renderSection()}
      <footer className="footer">© 2025 VibeClass. All rights reserved.</footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />}/>
        <Route path="/contact" element={<ContactForm />}/>
      </Routes>
    </Router>
  );
}

export default App;
