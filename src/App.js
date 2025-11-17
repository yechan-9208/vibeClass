import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate
} from 'react-router-dom';

// ----- 모달 문의폼 구현 -----
function ModalContactForm({ onClose }) {
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [sending, setSending] = React.useState(false);
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    if(!name.trim() || !phone.trim() || !message.trim()) {
      setError('모든 항목을 입력해주세요.');
      return;
    }
    setSending(true);
    try {
      const res = await fetch('https://script.google.com/macros/s/AKfycbxyVZ3GTEwIE5jUrqzNpTI-KelNNniCsnAqChsw09AMFDBnI9rlnkKUEhcf9ktoVPTOTA/exec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, message }),
      });
      if(res.ok) {
        setSuccess('문의가 정상적으로 등록되었습니다! 빠른 시일 내 답변드리겠습니다.');
        setName(''); setPhone(''); setMessage('');
      } else {
        setError('전송에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (err) {
      setError('전송에 실패했습니다. 인터넷 연결을 확인해주세요!');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-contact" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <section className="contact-page-modal">
          <h3>🙌 문의하기</h3>
          <form className="contact-form" onSubmit={handleSubmit}>
            <label>
              이름
              <input type="text" name="name" value={name} onChange={e => setName(e.target.value)} required />
            </label>
            <label>
              연락처
              <input type="text" name="phone" value={phone} onChange={e => setPhone(e.target.value)} required />
            </label>
            <label>
              문의 내용
              <textarea name="message" rows={5} value={message} onChange={e => setMessage(e.target.value)} required></textarea>
            </label>
            <button type="submit" disabled={sending}>전송</button>
          </form>
          <p style={{marginTop:'13px', fontSize:'.95em'}}>개인정보는 오직 문의를 위해서만 안전하게 사용됩니다.</p>
          {error && <div className="form-msg form-error">{error}</div>}
          {success && <div className="form-msg form-success">{success}</div>}
        </section>
      </div>
    </div>
  );
}

// ----- 각 섹션별 컴포넌트 분리 -----

function CurriculumSection() {
  return (
    <section className="timeline" id="curriculum">
      <h3>🕒 수업 구성</h3>
      <ul>
        <li><b>1시간</b><br/><span>AI 툴 사용법/기초 코딩 흐름<br/>(실습 위주)</span></li>
        <li><b>30분</b><br/><span>아이디어 정리 &<br/>간단 설계</span></li>
        <li><b>1시간 30분</b><br/><span>AI와 함께<br/>실제 개발+완성</span></li>
      </ul>
      <div className="desc">학생 맞춤, 방문 1:1 수업으로 진행합니다!</div>
    </section>
  );
}
function MakeSection({openContact}) {
  const [selectedMake, setSelectedMake] = React.useState(null);
  const handleSelect = (type) => setSelectedMake(type);
  return (
    <section className="make" id="make">
      <h3>🎨 만들 수 있는 것들</h3>
      <div className="make-list">
        <button onClick={()=>handleSelect('website')}>🌐 나만의 웹사이트</button>
        <button onClick={()=>handleSelect('app')}>📱 간단한 앱</button>
        <button onClick={()=>handleSelect('blog')}>🤖 블로그 자동포스팅</button>
        <button onClick={()=>handleSelect('study')}>✅ 공부 자동화(시간표/할 일)</button>
        <button onClick={()=>handleSelect('chatbot')}>💬 AI 챗봇</button>
        <button onClick={()=>handleSelect('diary')}>📔 감정 기록 앱</button>
        <button onClick={()=>handleSelect('game')}>🎮 미니게임</button>
      </div>
      <small>원하는 항목을 눌러보세요! 관심사별로 기능·설계 맞춤 진행 👌</small>
      {/* 선택 상세 영역 */}
      <div className="make-detail">
        {selectedMake==='website' && (
          <div className="make-web-detail">
            <h4>🌐 나만의 웹사이트</h4>
            <div className="web-preview">
              <img src="/logo192.png" alt="vibeclass preview" width="66" style={{float:'left',marginRight:12}}/>
              <div style={{overflow:'hidden'}}>
                <strong>이 사이트처럼, 나만의 이력/포트폴리오/클래스 랜딩페이지를 <br className="mbr"/>AI와 단 3시간만에 직접 만듭니다.</strong><br/>
                (실제 예시: <a href="#" style={{color:'#2a69a8'}} rel="noopener noreferrer">바이브코딩 클래스 홈페이지</a>)<br/>
                디자인 설계·실습, 도메인 연결, 실제 배포까지 직접 경험할 수 있습니다!
              </div>
            </div>
          </div>
        )}
        {selectedMake && selectedMake!=='website' && (
          <div className="make-other-detail">아직 이 항목 예시는 준비중입니다.<br/>클래스에서 원하는 서비스를 직접 구현해볼 수 있습니다!</div>
        )}
      </div>
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

function WhatSection() {
  return (
    <section className="what-section">
      <div className="qabox">
        <div className="q">❓ <b>바이브코딩이 뭔가요?</b></div>
        <div className="a">💡 바이브코딩은 코드가 아닌 자연어(우리가쓰는 말)로 AI 도구를 적절히 사용하는 방식입니다.<br className="mbr"/> 저와의 클래스는 누구나 실습 중심으로 프로젝트를 완성하는 원데이 실전 교육 방식입니다.<br/><br/>복잡한 이론 없이, 실제 결과물을 만드는 성취감과<br className="mbr"/>AI 시대의 개발역량을 모두 키울 수 있도록 돕습니다.</div>
      </div>
      <div className="warnbox">
        <div className="warn-title">⚠️ 참고사항</div>
        <div className="warn-body">
          <blockquote>
            바이브 코딩 클래스는 “코드”를 직접 작성하는 것이 아니라,<br className="mbr"/>
            AI와의 대화(프롬프트)로 원하는 결과를 만드는 방식입니다!<br/><br/>
            이 때문에 수업은 ‘기획자’ 또는 ‘프로젝트 관리자’ 적인 부분위주로 수업이 진행되고,<br className="mbr"/>
            필요에 따라 약간의 코드 수업이 추가되어<br className="mbr"/>
            <b>“AI를 활용해 실제 결과물을 만들어내는 실습”</b>에 초점을 맞춥니다.
          </blockquote>
        </div>
      </div>
    </section>
  );
}

const TABS = [
  { id: 'what', label: '바이브코딩이뭔가요' },
  { id: 'curriculum', label: '수업구성' },
  { id: 'make', label: '만들 수 있는 것들' },
  { id: 'price', label: '가격' },
  { id: 'tutor', label: '튜터소개' }
];

function MainPage() {
  const [activeTab, setActiveTab] = useState('what');
  const [modalContactOpen, setModalContactOpen] = useState(false);
  const openContact = () => setModalContactOpen(true);
  const closeContact = () => setModalContactOpen(false);

  const renderSection = () => {
    switch(activeTab) {
      case 'what': return <WhatSection />;
      case 'curriculum': return <CurriculumSection/>;
      case 'make': return <MakeSection openContact={openContact}/>;
      case 'price': return <PriceSection/>;
      case 'tutor': return <TutorSection/>;
      default: return null;
    }
  };

  return (
    <div className="App">
      <header className="header">
        <h1>🖥️ 바이브 코딩 원데이 클래스</h1>
        <div className="main-intro">
          <span>AI와 함께 <span className="mbr"/><br className="mbr"/>3시간 만에 직접 만드는 <br className="mbr"/>나만의 바이브 코딩 프로젝트!</span>
          <span className="intro-desc">코딩을 몰라도, 기획부터 디자인, 개발까지.<br/>AI로 빠르게 완성하는 원데이 클래스✨</span>
        </div>
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
          <button className="contact-nav" onClick={openContact}>문의</button>
        </nav>
      </header>
      {renderSection()}
      {modalContactOpen && <ModalContactForm onClose={closeContact}/>}
      <footer className="footer">© 2025 VibeClass. All rights reserved.</footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />}/>
      </Routes>
    </Router>
  );
}

export default App;
