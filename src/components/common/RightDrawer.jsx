import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { X } from 'lucide-react';

// --- ANIMATIONS ---
const slideInRight = keyframes`
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
`;

const fadeInBackdrop = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

// --- STYLED COMPONENTS ---
const DrawerBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  justify-content: flex-end;
  animation: ${fadeInBackdrop} 0.25s cubic-bezier(0.4, 0, 0.2, 1) forwards;
`;

const DrawerContent = styled.div`
  width: 480px;
  max-width: 90vw;
  height: 100vh;
  background-color: #ffffff;
  box-shadow: -10px 0 30px rgba(15, 23, 42, 0.08);
  display: flex;
  flex-direction: column;
  animation: ${slideInRight} 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  position: relative;
`;

const DrawerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid #f1f5f9;

  h3 {
    font-family: 'Outfit', sans-serif;
    font-size: 18px;
    font-weight: 700;
    color: #0f172a;
  }
`;

const CloseButton = styled.button`
  border: none;
  background: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #64748b;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f1f5f9;
    color: #0f172a;
  }
`;

const DrawerBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 24px;
`;

const RightDrawer = ({ isOpen, onClose, title, children }) => {
  // Prevent body scrolling when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <DrawerBackdrop onClick={handleBackdropClick}>
      <DrawerContent>
        <DrawerHeader>
          <h3>{title}</h3>
          <CloseButton onClick={onClose} aria-label="Close drawer">
            <X size={18} />
          </CloseButton>
        </DrawerHeader>
        <DrawerBody>
          {children}
        </DrawerBody>
      </DrawerContent>
    </DrawerBackdrop>
  );
};

export default RightDrawer;
