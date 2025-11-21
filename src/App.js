import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate
} from 'react-router-dom';
import { motion } from 'framer-motion';
import TechBackground from './TechBackground';

// ----- Animation Variants -----
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const MotionSection = ({ children, className, id }) => {
  return (
    <motion.section
      className={className}
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeInUp}
    >
      {children}
    </motion.section>
  );
};

// ----- 모달 문의폼 구현 -----
function ModalContactForm({ onClose }) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    setIsSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 2000); // 2초 뒤 닫기
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div
        className="modal-contact"
        onClick={e => e.stopPropagation()}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 500 }}
      >
        <button className="modal-close" onClick={onClose}>&times;</button>
        <section className="contact-page-modal">
          <h3>🚀 클래스 신청하기</h3>
          {!isSubmitted ? (
            <form
              action="https://script.google.com/macros/s/AKfycbyFNPQNOybCRv4-T700iO_K5IR4_ja3rMUs3QxwhvVkFl34F5yQpruVIIaRBJfKwSqJ2g/exec"
              method="POST"
              target="hidden_iframe"
              onSubmit={handleSubmit}
            >
              <div className="input-group">
                <label>이름</label>
                <input type="text" name="name" required placeholder="홍길동" />
              </div>
              <div className="input-group">
                <label>연락처</label>
                <input type="text" name="phone" required placeholder="010-1234-5678" />
              </div>
              <div className="input-group">
                <label>신청/문의 내용</label>
                <textarea name="message" rows={5} required placeholder="원하시는 수업 시간이나 궁금한 점을 적어주세요."></textarea>
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(139, 92, 246, 0.6)" }}
                whileTap={{ scale: 0.98 }}
                className="submit-btn"
              >
                신청하기
              </motion.button>
            </form>
          ) : (
            <motion.div
              className="success-message"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h4>🎉 신청이 완료되었습니다!</h4>
              <p>확인 후 빠르게 연락드리겠습니다.</p>
            </motion.div>
          )}
          <iframe name="hidden_iframe" style={{ display: 'none' }} title="숨김" />
          {!isSubmitted && <p className="privacy-notice">개인정보는 상담을 위해서만 안전하게 사용됩니다.</p>}
        </section>
      </motion.div>
    </div>
  );
}

// ----- 각 섹션별 컴포넌트 분리 -----

function CurriculumSection() {
  return (
    <MotionSection className="timeline" id="curriculum">
      <h3>🕒 수업 구성</h3>
      <ul>
        {[
          { time: "1시간", title: "AI 툴 사용법/기초 코딩 흐름", sub: "(실습 위주)" },
          { time: "30분", title: "아이디어 정리 &", sub: "간단 설계" },
          { time: "1시간 30분", title: "AI와 함께", sub: "실제 개발+완성" }
        ].map((item, index) => (
          <motion.li
            key={index}
            whileHover={{ scale: 1.05, y: -5, borderColor: "#8b5cf6" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <b>{item.time}</b><br /><span>{item.title}<br />{item.sub}</span>
          </motion.li>
        ))}
      </ul>
      <div className="desc">학생 맞춤, 방문 1:1 수업으로 진행합니다!</div>
    </MotionSection>
  );
}

function MakeSection({ openContact }) {
  const [selectedMake, setSelectedMake] = React.useState(null);
  const handleSelect = (type) => setSelectedMake(type);

  const buttons = [
    { id: 'website', label: '🌐 나만의 웹사이트' },
    { id: 'app', label: '📱 간단한 앱' },
    { id: 'blog', label: '🤖 블로그 자동포스팅' },
    { id: 'study', label: '✅ 공부 자동화(시간표/할 일)' },
    { id: 'chatbot', label: '💬 AI 챗봇' },
    { id: 'diary', label: '📔 감정 기록 앱' },
    { id: 'game', label: '🎮 미니게임' }
  ];

  return (
    <MotionSection className="make" id="make">
      <h3>🎨 만들 수 있는 것들</h3>
      <div className="make-list">
        {buttons.map(btn => (
          <motion.button
            key={btn.id}
            onClick={() => handleSelect(btn.id)}
            whileHover={{ scale: 1.05, backgroundColor: "#3b82f6" }}
            whileTap={{ scale: 0.95 }}
          >
            {btn.label}
          </motion.button>
        ))}
      </div>
      <small>원하는 항목을 눌러보세요! 관심사별로 기능·설계 맞춤 진행 👌</small>
      {/* 선택 상세 영역 */}
      <div className="make-detail">
        {selectedMake === 'website' && (
          <motion.div
            className="make-web-detail"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h4>🌐 나만의 웹사이트</h4>
            <div className="web-preview">
              <img src="/logo192.png" alt="vibeclass preview" width="66" style={{ float: 'left', marginRight: 12 }} />
              <div style={{ overflow: 'hidden' }}>
                <strong>이 사이트처럼, 나만의 이력/포트폴리오/클래스 랜딩페이지를 <br className="mbr" />AI와 단 3시간만에 직접 만듭니다.</strong><br />
                (실제 예시: <a href="#" style={{ color: '#3b82f6' }} rel="noopener noreferrer">바이브코딩 클래스 홈페이지</a>)<br />
                디자인 설계·실습, 도메인 연결, 실제 배포까지 직접 경험할 수 있습니다!
              </div>
            </div>
          </motion.div>
        )}
        {selectedMake && selectedMake !== 'website' && (
          <motion.div
            className="make-other-detail"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            아직 이 항목 예시는 준비중입니다.<br />클래스에서 원하는 서비스를 직접 구현해볼 수 있습니다!
          </motion.div>
        )}
      </div>
    </MotionSection>
  );
}

function PriceSection() {
  return (
    <MotionSection className="price" id="price">
      <h3>💰 수강비 (오픈이벤트)</h3>
      <div className="price-container">
        <motion.div
          className="price-card"
          whileHover={{ scale: 1.03, borderColor: "#8b5cf6" }}
        >
          <div className="price-header">1:1 방문 클래스</div>
          <div className="price-amount">6만원</div>
          <div className="price-duration">3시간 과정</div>
          <div className="price-per-hour">시간당 2만원</div>
          <div className="price-badge">타사 대비 50% 저렴</div>
        </motion.div>
      </div>
      <p className="notice">* 오픈특가 이후 가격 조정 예정</p>
    </MotionSection>
  );
}

function TutorSection() {
  return (
    <MotionSection className="tutor" id="tutor">
      <h3>🧑‍🏫 튜터 소개</h3>
      <ul>
        <li>중등 수학 강사 6개월</li>
        <li>코더랜드 튜터 4개월</li>
        <li>앱개발 2년차 (서비스 실전 경험)</li>
      </ul>
      <p>지도경험 & IT서비스 개발경력을 모두 갖춰,<br />학생 눈높이에 딱 맞는 실전형 프로젝트 안내!</p>
    </MotionSection>
  );
}

function WhatSection() {
  return (
    <MotionSection className="what-section">
      <div className="qabox">
        <div className="q">❓ <b>바이브코딩이 뭔가요?</b></div>
        <div className="a">💡 바이브코딩은 코드가 아닌 자연어(우리가쓰는 말)로 AI 도구를 적절히 사용하는 방식입니다.<br className="mbr" /> 저와의 클래스는 누구나 실습 중심으로 프로젝트를 완성하는 원데이 실전 교육 방식입니다.<br /><br />복잡한 이론 없이, 실제 결과물을 만드는 성취감과<br className="mbr" />AI 시대의 개발역량을 모두 키울 수 있도록 돕습니다.</div>
      </div>
      <div className="warnbox">
        <div className="warn-title">⚠️ 참고사항</div>
        <div className="warn-body">
          <blockquote>
            바이브 코딩 클래스는 “코드”를 직접 작성하는 것이 아니라,<br className="mbr" />
            AI와의 대화(프롬프트)로 원하는 결과를 만드는 방식입니다!<br /><br />
            이 때문에 수업은 ‘기획자’ 또는 ‘프로젝트 관리자’ 적인 부분위주로 수업이 진행되고,<br className="mbr" />
            필요에 따라 약간의 코드 수업이 추가되어<br className="mbr" />
            <b>“AI를 활용해 실제 결과물을 만들어내는 실습”</b>에 초점을 맞춥니다.
          </blockquote>
        </div>
      </div>
    </MotionSection>
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
    switch (activeTab) {
      case 'what': return <WhatSection />;
      case 'curriculum': return <CurriculumSection />;
      case 'make': return <MakeSection openContact={openContact} />;
      case 'price': return <PriceSection />;
      case 'tutor': return <TutorSection />;
      default: return null;
    }
  };

  return (
    <div className="App">
      <TechBackground />
      <header className="header">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          🖥️ 바이브 코딩 원데이 클래스
        </motion.h1>
        <motion.div
          className="main-intro"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.span variants={fadeInUp}>
            AI와 함께 <span className="mbr" /><br className="mbr" />3시간 만에 직접 만드는 <br className="mbr" />나만의 바이브 코딩 프로젝트!
          </motion.span>
          <motion.span className="intro-desc" variants={fadeInUp}>
            코딩을 몰라도, 기획부터 디자인, 개발까지.<br />AI로 빠르게 완성하는 원데이 클래스✨
          </motion.span>
        </motion.div>
        <nav className="nav-tabs">
          {TABS.map(tab => (
            <motion.button
              key={tab.id}
              className={activeTab === tab.id ? 'active' : ''}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab.label}
            </motion.button>
          ))}
          <motion.button
            className="contact-nav"
            onClick={openContact}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            문의
          </motion.button>
        </nav>
      </header>
      <div className="content-container">
        {renderSection()}
      </div>
      {modalContactOpen && <ModalContactForm onClose={closeContact} />}
      <footer className="footer">© 2025 VibeClass. All rights reserved.</footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </Router>
  );
}

export default App;
