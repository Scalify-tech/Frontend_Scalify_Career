import React, { useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import CustomCursor from './components/CustomCursor';
import Toast from './components/Toast';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Ticker from './components/Ticker';
import TasksSection from './components/TasksSection';
import PerksSection from './components/PerksSection';
import WhoSection from './components/WhoSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import ApplicationModal from './components/ApplicationModal';

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  const openModal = () => {
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = '';
  };

  const showToast = (message, type = 'ok') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
  };

  return (
    <>
      <CustomCursor />
      <Toast toast={toast} />
      <Navbar onApply={openModal} />
      <Hero onApply={openModal} />
      <Ticker />
      <TasksSection />
      <PerksSection />
      <WhoSection />
      <CTASection onApply={openModal} />
      <Footer />
      <ApplicationModal
        isOpen={modalOpen}
        onClose={closeModal}
        showToast={showToast}
      />
      <Analytics />
    </>
  );
}

export default App;
