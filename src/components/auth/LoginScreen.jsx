import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import { Heart, Phone, Mail, ShieldCheck, ArrowRight, Lock } from 'lucide-react';
import Button from '../common/Button';
import Input from '../common/Input';

// --- ANIMATIONS ---
const pulseGlow = keyframes`
  0% { box-shadow: 0 0 12px rgba(16, 185, 129, 0.2); }
  50% { box-shadow: 0 0 24px rgba(16, 185, 129, 0.4); }
  100% { box-shadow: 0 0 12px rgba(16, 185, 129, 0.2); }
`;

const backgroundFloat = keyframes`
  0% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-10px) scale(1.05); }
  100% { transform: translateY(0) scale(1); }
`;

// --- STYLED COMPONENTS ---
const PageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #070a13;
  position: relative;
  overflow: hidden;
  padding: 24px;
`;

const DecorativeCircle1 = styled.div`
  position: absolute;
  top: -10%;
  left: -10%;
  width: 50vw;
  height: 50vw;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, rgba(0, 0, 0, 0) 70%);
  z-index: 1;
  animation: ${backgroundFloat} 10s ease-in-out infinite;
`;

const DecorativeCircle2 = styled.div`
  position: absolute;
  bottom: -10%;
  right: -10%;
  width: 50vw;
  height: 50vw;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(14, 165, 233, 0.08) 0%, rgba(0, 0, 0, 0) 70%);
  z-index: 1;
  animation: ${backgroundFloat} 12s ease-in-out infinite alternate;
`;

const CardContainer = styled.div`
  background: linear-gradient(135deg, rgba(17, 24, 39, 0.8) 0%, rgba(9, 13, 22, 0.9) 100%);
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
  border-radius: 24px;
  width: 100%;
  max-width: 480px;
  padding: 40px;
  position: relative;
  z-index: 10;
  backdrop-filter: blur(16px);
  animation: ${pulseGlow} 4s infinite ease-in-out;
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 32px;
`;

const LogoIcon = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 16px;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
  margin-bottom: 16px;
`;

const LogoTitle = styled.h2`
  font-family: 'Outfit', sans-serif;
  font-size: 24px;
  font-weight: 800;
  background: linear-gradient(135deg, #ffffff 0%, #94a3b8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const LogoSubtitle = styled.p`
  font-size: 13px;
  color: #64748b;
  margin-top: 6px;
  font-family: 'Inter', sans-serif;
`;

const Title = styled.h3`
  font-family: 'Outfit', sans-serif;
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 24px;
  text-align: center;
`;

const OTPTooltip = styled.div`
  background: rgba(16, 185, 129, 0.08);
  border: 1px dashed rgba(16, 185, 129, 0.3);
  padding: 12px 16px;
  border-radius: 12px;
  color: #10b981;
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const TimerText = styled.span`
  font-size: 12px;
  color: #64748b;
  font-weight: 500;
  text-align: right;
  display: block;
  margin-top: -8px;
  margin-bottom: 16px;
`;

const FooterText = styled.p`
  text-align: center;
  font-size: 13px;
  color: #64748b;
  margin-top: 24px;

  button {
    background: none;
    border: none;
    color: #10b981;
    font-weight: 600;
    cursor: pointer;
    padding: 0;
    margin-left: 4px;
    font-family: inherit;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const LoginScreen = ({ onNavigateToSignUp }) => {
  const dispatch = useDispatch();
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // 1 = Input credentials, 2 = Verify OTP
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    let interval;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => {
        setTimer(t => t - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const handleSendOTP = (e) => {
    e.preventDefault();
    if (!phone || phone.trim().length < 10) {
      setErrors({ phone: 'Please enter a valid 10-digit mobile number' });
      return;
    }
    setErrors({});
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setStep(2);
      setTimer(30);
    }, 1200);
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    if (!otp || otp.trim().length !== 6) {
      setErrors({ otp: 'Please enter a 6-digit OTP' });
      return;
    }

    if (otp !== '123456') {
      setErrors({ otp: 'Invalid OTP. Please enter the mock OTP: 123456' });
      return;
    }

    setErrors({});
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      // Dispatch mock success action with dynamic Admin User Details
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          user: {
            name: "Dr. Aditya Vardhan",
            email: "aditya.vardhan@swastyam.com",
            phone: phone,
            role: "Admin",
            designation: "Chief Medical Director"
          },
          clinic: {
            name: "Swastyam General Clinic",
            specialties: ["Cardiology", "Neurology", "Pediatrics"],
            address: "Building B-4, Medical District, Sector 62",
            license: "LIC-7788192"
          }
        }
      });
    }, 1500);
  };

  const handleResend = () => {
    if (timer > 0) return;
    setTimer(30);
    // Simulate sending OTP again
  };

  return (
    <PageContainer>
      <DecorativeCircle1 />
      <DecorativeCircle2 />

      <CardContainer>
        <LogoContainer>
          <LogoIcon>
            <Heart size={28} color="#ffffff" />
          </LogoIcon>
          <LogoTitle>Swastyam</LogoTitle>
          <LogoSubtitle>Partner Portal Gateway</LogoSubtitle>
        </LogoContainer>

        {step === 1 ? (
          <form onSubmit={handleSendOTP}>
            <Title>Administrator Login</Title>
            <Input
              label="Clinic Mobile Number"
              placeholder="Enter registered mobile number"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
              icon={Phone}
              error={errors.phone}
              maxLength={10}
            />

            <Button primary={true} fullWidth={true} loading={loading} type="submit">
              Request OTP Authentication <ArrowRight size={16} />
            </Button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOTP}>
            <Title>Verify Verification Code</Title>

            <OTPTooltip>
              <ShieldCheck size={20} />
              <span>Simulated environment active. Enter mock OTP <strong>123456</strong>.</span>
            </OTPTooltip>

            <Input
              label={`OTP Sent to +91 ******${phone.slice(-4)}`}
              placeholder="Enter 6-digit OTP code"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              icon={Lock}
              error={errors.otp}
              maxLength={6}
            />

            {timer > 0 ? (
              <TimerText>Resend OTP in {timer}s</TimerText>
            ) : (
              <TimerText style={{ color: '#10b981', cursor: 'pointer' }} onClick={handleResend}>
                Resend OTP Now
              </TimerText>
            )}

            <Button primary={true} fullWidth={true} loading={loading} type="submit">
              Verify & Enter Dashboard
            </Button>

            <Button
              secondary={true}
              fullWidth={true}
              style={{ marginTop: '12px' }}
              onClick={() => {
                setStep(1);
                setOtp('');
                setErrors({});
              }}
              type="button"
            >
              Change Phone Number
            </Button>
          </form>
        )}

        <FooterText>
          New Medical Partner?
          <button onClick={onNavigateToSignUp}>Create Clinic Account</button>
        </FooterText>
      </CardContainer>
    </PageContainer>
  );
};

export default LoginScreen;
