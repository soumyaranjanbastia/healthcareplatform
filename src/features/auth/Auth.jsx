import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import authIllustration from '../../assets/auth_design.png';

// Import components directly from screens
import Login from './screens/Login';
import Registration from './screens/Registration';

// --- ANIMATIONS ---
const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const PageContainer = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
  background-color: #ffffff;
  font-family: 'Outfit', 'Inter', sans-serif;
  overflow: hidden;
`;

// LEFT SIDE: ILLUSTRATION & BRANDING
const LeftPanel = styled.div`
  flex: 1.1;
  background: linear-gradient(135deg, #d3f9eb 0%, #e2fbf4 50%, #ffffff 100%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 40px 60px;
  position: relative;
  border-radius: 0 100px 100px 0;
  box-shadow: 15px 0 30px rgba(0, 0, 0, 0.02);

  @media (max-width: 1024px) {
    display: none;
  }
`;

const BrandBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: #ffffff;
  padding: 10px 24px;
  border-radius: 50px;
  box-shadow: 0 10px 25px rgba(16, 185, 129, 0.08);
  width: fit-content;
  border: 1px solid rgba(16, 185, 129, 0.05);
`;

const HeartLogoSvg = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
      fill="url(#heartGradient)"
    />
    <defs>
      <linearGradient id="heartGradient" x1="2" y1="3" x2="22" y2="21.35" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#ff4b5c" />
        <stop offset="35%" stopColor="#ff8f3d" />
        <stop offset="70%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#0ea5e9" />
      </linearGradient>
    </defs>
  </svg>
);

const BrandText = styled.span`
  font-family: 'Outfit', sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: #1e293b;
`;

const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  text-align: center;
  margin-top: -20px;
`;

const Tagline = styled.h2`
  font-family: 'Outfit', sans-serif;
  font-size: 26px;
  font-weight: 800;
  color: #00796b;
  margin-bottom: 8px;
  line-height: 1.3;
`;

const SubTagline = styled.p`
  font-size: 14px;
  color: #009688;
  font-weight: 500;
  margin-bottom: 30px;
`;

const GraphicWrapper = styled.div`
  width: 90%;
  max-width: 420px;
  animation: ${floatAnimation} 5s ease-in-out infinite;
  display: flex;
  justify-content: center;
  
  img {
    width: 100%;
    height: auto;
    object-fit: contain;
    filter: drop-shadow(0 20px 35px rgba(16, 185, 129, 0.15));
  }
`;

const CopyrightText = styled.div`
  font-size: 12px;
  color: #64748b;
  font-weight: 500;
  padding-left: 10px;
`;

// RIGHT SIDE: FORM CONSOLE PANEL
const RightPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
  background-color: #ffffff;
  position: relative;

  @media (max-width: 640px) {
    padding: 24px;
  }
`;

const FormWrapper = styled.div`
  width: 100%;
  max-width: 440px;
  display: flex;
  flex-direction: column;
`;

const FooterContainer = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
`;

const SupportText = styled.span`
  font-size: 13px;
  color: #64748b;
  font-weight: 500;

  a {
    color: #009688;
    text-decoration: none;
    font-weight: 600;
    margin-left: 4px;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const LegalLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: #64748b;
  font-weight: 500;

  span {
    color: #cbd5e1;
  }

  a {
    color: #64748b;
    text-decoration: none;

    &:hover {
      color: #009688;
      text-decoration: underline;
    }
  }
`;

const Auth = ({ onLogin }) => {
  const [authMode, setAuthMode] = useState('login'); // login | signup

  return (
    <PageContainer>
      {/* LEFT MARKETING SIDE */}
      <LeftPanel>
        <BrandBadge>
          <HeartLogoSvg />
          <BrandText>Swastyam Connect</BrandText>
        </BrandBadge>

        <LeftContent>
          <Tagline>Keep track of every detail.</Tagline>
          <SubTagline>From appointments to everyday hospital tasks.</SubTagline>
          <GraphicWrapper>
            <img src={authIllustration} alt="Secure Portal illustration" />
          </GraphicWrapper>
        </LeftContent>

        <CopyrightText>Copyright @ Mindcys</CopyrightText>
      </LeftPanel>

      {/* RIGHT LOGIN/REGISTRATION SIDE */}
      <RightPanel>
        <FormWrapper>
          {authMode === 'login' ? (
            <Login 
              onLogin={onLogin} 
              onSwitchToSignup={() => setAuthMode('signup')} 
            />
          ) : (
            <Registration 
              onSignup={onLogin} 
              onSwitchToLogin={() => setAuthMode('login')} 
            />
          )}

          <FooterContainer>
            <SupportText>
              Need help? 
              <a href="#support" onClick={(e) => { e.preventDefault(); alert('Redirecting to Supportdesk...'); }}>
                Contact Support
              </a>
            </SupportText>

            <LegalLinks>
              <a href="#privacy" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
              <span>•</span>
              <a href="#terms" onClick={(e) => e.preventDefault()}>Terms of Service</a>
            </LegalLinks>
          </FooterContainer>
        </FormWrapper>
      </RightPanel>
    </PageContainer>
  );
};

export default Auth;
