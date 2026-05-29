import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Sparkles, ArrowRight, Bell, CheckCircle } from 'lucide-react';

// --- KEYFRAMES ---
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const pulseGlow = keyframes`
  0% { box-shadow: 0 0 25px rgba(0, 150, 136, 0.15); }
  50% { box-shadow: 0 0 45px rgba(0, 150, 136, 0.35); }
  100% { box-shadow: 0 0 25px rgba(0, 150, 136, 0.15); }
`;

const spinSlow = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const scaleUp = keyframes`
  0% { transform: scale(0.95); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
`;

// --- STYLED COMPONENTS ---
const ComingSoonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 450px;
  padding: 40px 24px;
  box-sizing: border-box;
  background: radial-gradient(circle at 50% 50%, rgba(248, 250, 252, 1) 0%, rgba(241, 245, 249, 0.6) 100%);
  border-radius: 24px;
  overflow: hidden;
  position: relative;
`;

const CardContainer = styled.div`
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 24px;
  padding: 48px 40px;
  max-width: 520px;
  width: 100%;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.03);
  animation: ${float} 6s ease-in-out infinite, ${pulseGlow} 4s ease-in-out infinite;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  position: relative;
  z-index: 2;
`;

const GlowingBadge = styled.div`
  background: linear-gradient(90deg, #e0f2fe, #e6f9f3);
  border: 1px solid rgba(0, 150, 136, 0.15);
  border-radius: 50px;
  padding: 6px 16px;
  font-family: 'Outfit', sans-serif;
  font-size: 11px;
  font-weight: 700;
  color: #009688;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-bottom: 24px;
  box-shadow: 0 4px 10px rgba(0, 150, 136, 0.05);
  display: flex;
  align-items: center;
  gap: 6px;
`;

const IconOuterRing = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(0, 150, 136, 0.1) 0%, rgba(22, 163, 74, 0.05) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 28px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: -4px;
    left: -4px;
    right: -4px;
    bottom: -4px;
    border-radius: 50%;
    border: 1px dashed rgba(0, 150, 136, 0.3);
    animation: ${spinSlow} 20s linear infinite;
  }
`;

const IconInnerContainer = styled.div`
  width: 66px;
  height: 66px;
  border-radius: 50%;
  background: linear-gradient(135deg, #009688 0%, #00796b 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  box-shadow: 0 10px 20px rgba(0, 150, 136, 0.25);
`;

const Heading = styled.h2`
  font-family: 'Outfit', sans-serif;
  font-size: 28px;
  font-weight: 800;
  color: #0f172a;
  margin: 0 0 12px 0;
  letter-spacing: -0.5px;
  line-height: 1.2;
`;

const GradientText = styled.span`
  background: linear-gradient(90deg, #009688, #00bfa5, #00796b);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${shimmer} 3s linear infinite;
`;

const Description = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 14.5px;
  color: #64748b;
  line-height: 1.6;
  margin: 0 0 32px 0;
  font-weight: 500;
  max-width: 400px;
`;

const NotifyContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  padding: 6px;
  box-sizing: border-box;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.01);
  transition: all 0.2s ease;
  
  &:focus-within {
    border-color: #009688;
    box-shadow: 0 0 0 3px rgba(0, 150, 136, 0.08);
  }
`;

const NotifyInput = styled.input`
  border: none;
  outline: none;
  padding: 10px 16px;
  font-family: 'Inter', sans-serif;
  font-size: 13.5px;
  font-weight: 600;
  color: #1e293b;
  flex: 1;
  background: transparent;
  
  &::placeholder {
    color: #94a3b8;
    font-weight: 500;
  }
`;

const NotifyButton = styled.button`
  background: linear-gradient(135deg, #009688 0%, #00796b 100%);
  color: #ffffff;
  border: none;
  border-radius: 10px;
  padding: 0 16px;
  font-family: 'Outfit', sans-serif;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  box-shadow: 0 4px 10px rgba(0, 150, 136, 0.15);
  height: 38px;
  
  &:hover {
    background: linear-gradient(135deg, #00796b 0%, #004d40 100%);
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const SuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  background: rgba(16, 185, 129, 0.06);
  border: 1px solid rgba(16, 185, 129, 0.25);
  border-radius: 16px;
  padding: 20px 24px;
  width: 100%;
  box-sizing: border-box;
  animation: ${scaleUp} 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
`;

const SuccessTitle = styled.h4`
  font-family: 'Outfit', sans-serif;
  font-size: 16.5px;
  font-weight: 700;
  color: #065f46;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SuccessSub = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 13.5px;
  color: #047857;
  margin: 0;
  font-weight: 500;
  line-height: 1.5;
`;

const RedirectNotice = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  color: #059669;
  font-weight: 700;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  margin-top: 4px;
  opacity: 0.9;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const ErrorText = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 12.5px;
  font-weight: 600;
  color: #ef4444;
  margin-top: 10px;
  text-align: left;
  width: 100%;
  padding-left: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const BackgroundBlob1 = styled.div`
  position: absolute;
  top: 10%;
  left: 15%;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0, 150, 136, 0.08) 0%, rgba(255, 255, 255, 0) 70%);
  filter: blur(10px);
  z-index: 1;
`;

const BackgroundBlob2 = styled.div`
  position: absolute;
  bottom: 10%;
  right: 15%;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(22, 163, 74, 0.06) 0%, rgba(255, 255, 255, 0) 70%);
  filter: blur(15px);
  z-index: 1;
`;

const ComingSoon = ({ 
  badgeText = "Coming Soon", 
  title = "Exciting Feature On The Way", 
  gradientSpan = "Under Construction", 
  description = "We are currently hard at work designing and building this modular workspace element. Register your email below to be notified as soon as it goes live!",
  icon = <Sparkles size={30} />,
  placeholderText = "Enter your email address",
  onNotifySuccess
}) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [countdown, setCountdown] = useState(2);

  const validateEmail = (emailVal) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal);
  };

  const handleNotifySubmit = (e) => {
    if (e) e.preventDefault();

    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');
    setIsSubmitted(true);
  };

  useEffect(() => {
    let timer;
    let interval;

    if (isSubmitted) {
      interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      timer = setTimeout(() => {
        if (onNotifySuccess) {
          onNotifySuccess();
        }
      }, 2000);
    }

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [isSubmitted, onNotifySuccess]);

  return (
    <ComingSoonWrapper>
      <BackgroundBlob1 />
      <BackgroundBlob2 />
      
      <CardContainer>
        <GlowingBadge>
          <Bell size={12} />
          {badgeText}
        </GlowingBadge>
        
        <IconOuterRing>
          <IconInnerContainer>
            {icon}
          </IconInnerContainer>
        </IconOuterRing>
        
        <Heading>
          {title} <br />
          <GradientText>{gradientSpan}</GradientText>
        </Heading>
        
        <Description>
          {description}
        </Description>
        
        {!isSubmitted ? (
          <div style={{ width: '100%' }}>
            <form onSubmit={handleNotifySubmit} style={{ width: '100%', margin: 0, padding: 0 }}>
              <NotifyContainer>
                <NotifyInput 
                  type="email" 
                  placeholder={placeholderText} 
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                />
                <NotifyButton type="submit">
                  Notify Me <ArrowRight size={14} />
                </NotifyButton>
              </NotifyContainer>
            </form>
            {error && (
              <ErrorText>
                <span>⚠️</span> {error}
              </ErrorText>
            )}
          </div>
        ) : (
          <SuccessContainer>
            <SuccessTitle>
              <CheckCircle size={18} color="#10b981" />
              Successfully Registered!
            </SuccessTitle>
            <SuccessSub>
              We'll send early updates and launch notifications to <strong>{email}</strong>.
            </SuccessSub>
            <RedirectNotice>
              Redirecting to Dashboard in {countdown}s...
            </RedirectNotice>
          </SuccessContainer>
        )}
      </CardContainer>
    </ComingSoonWrapper>
  );
};

export default ComingSoon;
