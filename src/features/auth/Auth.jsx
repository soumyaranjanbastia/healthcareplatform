import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Mail, Lock, Key, Phone, HelpCircle, ArrowRight, Shield } from 'lucide-react';
import authIllustration from '../../assets/auth_design.png';

// --- ANIMATIONS ---
const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
`;

// --- STYLED COMPONENTS ---
const PageContainer = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
  background-color: #410909ff;
  font-family: 'Inter', sans-serif;
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

// RIGHT SIDE: AUTHENTICATION PANEL
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
  animation: ${fadeIn} 0.6s ease-out;
  display: flex;
  flex-direction: column;
`;

const FormHeader = styled.div`
  text-align: center;
  margin-bottom: 32px;
  
  h2 {
    font-family: 'Outfit', sans-serif;
    font-size: 32px;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 8px;
  }
  p {
    font-size: 14px;
    color: #64748b;
    font-weight: 500;
  }
`;

// SEGMENTED SWITCHER (TABS)
const TabContainer = styled.div`
  display: flex;
  background-color: #f8fafc;
  padding: 6px;
  border-radius: 14px;
  margin-bottom: 32px;
  border: 1px solid #f1f5f9;
`;

const TabButton = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 16px;
  border: none;
  background-color: ${props => props.active ? '#ffffff' : 'transparent'};
  color: ${props => props.active ? '#0f172a' : '#64748b'};
  font-size: 14px;
  font-weight: ${props => props.active ? '600' : '500'};
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: ${props => props.active ? '0 4px 12px rgba(15, 23, 42, 0.05)' : 'none'};

  &:hover {
    color: #0f172a;
  }
`;

// FORM ELEMENTS
const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 24px;
  position: relative;
  animation: ${fadeIn} 0.3s ease-out;
`;

const LabelRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Label = styled.label`
  font-size: 13px;
  font-weight: 600;
  color: #334155;
`;

const ForgotLink = styled.a`
  font-size: 13px;
  font-weight: 600;
  color: #009688;
  text-decoration: none;
  cursor: pointer;
  
  &:hover {
    color: #00796b;
    text-decoration: underline;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const InputIcon = styled.div`
  position: absolute;
  left: 16px;
  color: #94a3b8;
  display: flex;
  align-items: center;
  pointer-events: none;
`;

const InputField = styled.input`
  width: 100%;
  padding: 14px 16px 14px 48px;
  font-size: 14px;
  color: #0f172a;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  outline: none;
  transition: all 0.2s ease;

  &::placeholder {
    color: #94a3b8;
  }

  &:focus {
    border-color: #009688;
    box-shadow: 0 0 0 4px rgba(0, 150, 136, 0.08);
  }
`;

const ErrorMsg = styled.span`
  font-size: 12px;
  color: #ef4444;
  font-weight: 500;
  margin-top: 4px;
`;

const SendOtpStatusRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 6px;
  font-size: 12px;
`;

const StatusNote = styled.span`
  color: #64748b;
  font-weight: 500;
`;

const ResendButton = styled.button`
  background: none;
  border: none;
  font-size: 12px;
  font-weight: 600;
  color: #009688;
  cursor: pointer;
  padding: 0;

  &:hover {
    color: #00796b;
    text-decoration: underline;
  }
`;

// ACTIONS
const SubmitButton = styled.button`
  width: 100%;
  padding: 16px;
  background-color: #009688;
  color: #ffffff;
  font-size: 15px;
  font-weight: 600;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.25s ease;
  margin-top: 8px;
  box-shadow: 0 4px 12px rgba(0, 150, 136, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background-color: #00796b;
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(0, 150, 136, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

// BOTTOM FOOTER
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
  const [activeTab, setActiveTab] = useState('password'); // 'password' or 'otp'

  // PASSWORD STATES
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // OTP STATES
  const [otpTarget, setOtpTarget] = useState(''); // Email or phone input
  const [otpCode, setOtpCode] = useState('');
  const [otpStep, setOtpStep] = useState(1); // 1 = Send OTP input, 2 = Verify code input
  const [otpError, setOtpError] = useState('');

  const handlePasswordLogin = (e) => {
    e.preventDefault();
    setPasswordError('');

    if (!email) {
      setPasswordError('Please enter your email address.');
      return;
    }
    if (!password) {
      setPasswordError('Please enter your password.');
      return;
    }

    // Mock validation check
    if (!email.includes('@')) {
      setPasswordError('Please enter a valid email address.');
      return;
    }

    // Authenticate
    onLogin();
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    setOtpError('');

    if (!otpTarget) {
      setOtpError('Please enter your email or phone number.');
      return;
    }

    // Move to verification screen
    setOtpStep(2);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setOtpError('');

    if (!otpCode) {
      setOtpError('Please enter the 6-digit OTP code.');
      return;
    }

    if (otpCode.length < 4) {
      setOtpError('OTP must be at least 4 digits.');
      return;
    }

    // Authenticate
    onLogin();
  };

  const resetOtpFlow = () => {
    setOtpStep(1);
    setOtpCode('');
    setOtpError('');
  };

  return (
    <PageContainer>

      {/* LEFT SIDE PANEL (MARKETING & ILLUSTRATION) */}
      <LeftPanel>
        <BrandBadge>
          <HeartLogoSvg />
          <BrandText>Swastyam connect</BrandText>
        </BrandBadge>

        <LeftContent>
          <Tagline>Keep track of every detail.</Tagline>
          <SubTagline>From appointments to everyday hospital tasks.</SubTagline>

          <GraphicWrapper>
            <img src={authIllustration} alt="Secure Portal" />
          </GraphicWrapper>
        </LeftContent>

        <CopyrightText>Copyright @ Mindcys</CopyrightText>
      </LeftPanel>

      {/* RIGHT SIDE PANEL (LOGIN FORM) */}
      <RightPanel>
        <FormWrapper>
          <FormHeader>
            <h2>Welcome Back</h2>
            <p>Sign in to access your dashboard</p>
          </FormHeader>

          {/* TAB BUTTONS FOR SWITCHING MODE */}
          <TabContainer>
            <TabButton
              active={activeTab === 'password'}
              onClick={() => {
                setActiveTab('password');
                resetOtpFlow();
              }}
            >
              <Lock size={15} />
              Password
            </TabButton>
            <TabButton
              active={activeTab === 'otp'}
              onClick={() => setActiveTab('otp')}
            >
              <Key size={15} />
              OTP
            </TabButton>
          </TabContainer>

          {/* PASSWORD LOGIN FORM */}
          {activeTab === 'password' && (
            <form onSubmit={handlePasswordLogin}>
              <FormGroup>
                <Label htmlFor="pass-email">Email</Label>
                <InputWrapper>
                  <InputIcon>
                    <Mail size={16} />
                  </InputIcon>
                  <InputField
                    id="pass-email"
                    type="email"
                    placeholder="you@hospital.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </InputWrapper>
              </FormGroup>

              <FormGroup>
                <LabelRow>
                  <Label htmlFor="pass-secret">Password</Label>
                  <ForgotLink>Forgot?</ForgotLink>
                </LabelRow>
                <InputWrapper>
                  <InputIcon>
                    <Lock size={16} />
                  </InputIcon>
                  <InputField
                    id="pass-secret"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </InputWrapper>
                {passwordError && <ErrorMsg>{passwordError}</ErrorMsg>}
              </FormGroup>

              <SubmitButton type="submit">
                Sign In
              </SubmitButton>
            </form>
          )}

          {/* OTP LOGIN FORM */}
          {activeTab === 'otp' && (
            <>
              {otpStep === 1 ? (
                /* STEP 1: Enter email/phone to send OTP */
                <form onSubmit={handleSendOtp}>
                  <FormGroup>
                    <Label htmlFor="otp-target">Email</Label>
                    <InputWrapper>
                      <InputIcon>
                        <Mail size={16} />
                      </InputIcon>
                      <InputField
                        id="otp-target"
                        type="text"
                        placeholder="Abc@example .com"
                        value={otpTarget}
                        onChange={(e) => setOtpTarget(e.target.value)}
                      />
                    </InputWrapper>
                    {otpError && <ErrorMsg>{otpError}</ErrorMsg>}
                  </FormGroup>

                  <SubmitButton type="submit">
                    Send OTP
                  </SubmitButton>
                </form>
              ) : (
                /* STEP 2: Enter code received */
                <form onSubmit={handleVerifyOtp}>
                  <FormGroup>
                    <Label htmlFor="otp-read">Phone Number / Email</Label>
                    <InputWrapper>
                      <InputIcon>
                        <Mail size={16} />
                      </InputIcon>
                      <InputField
                        id="otp-read"
                        type="text"
                        value={otpTarget}
                        readOnly
                        style={{ backgroundColor: '#f8fafc', color: '#64748b', cursor: 'not-allowed' }}
                      />
                    </InputWrapper>
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="otp-code">Enter OTP</Label>
                    <InputWrapper>
                      <InputIcon>
                        <Key size={16} />
                      </InputIcon>
                      <InputField
                        id="otp-code"
                        type="text"
                        placeholder="6-digit OTP"
                        value={otpCode}
                        maxLength={6}
                        onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                      />
                    </InputWrapper>
                    {otpError && <ErrorMsg>{otpError}</ErrorMsg>}

                    <SendOtpStatusRow>
                      <StatusNote>OTP sent to {otpTarget || 'device'}.</StatusNote>
                      <ResendButton type="button" onClick={() => alert('OTP resent successfully!')}>
                        Resend OTP
                      </ResendButton>
                    </SendOtpStatusRow>
                  </FormGroup>

                  <SubmitButton type="submit">
                    Sign In
                  </SubmitButton>

                  <div style={{ textAlign: 'center', marginTop: '16px' }}>
                    <ResendButton type="button" onClick={resetOtpFlow}>
                      Change Email/Phone
                    </ResendButton>
                  </div>
                </form>
              )}
            </>
          )}

          {/* FOOTER METRICS AND HELPDESK */}
          <FooterContainer>
            <SupportText>
              Need help?
              <a href="#support" onClick={(e) => { e.preventDefault(); alert('Redirecting to Mindcys Swastyam Supportdesk...'); }}>
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
