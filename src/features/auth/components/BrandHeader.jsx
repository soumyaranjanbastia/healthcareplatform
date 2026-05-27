import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
`;

const LogoSvg = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
      fill="url(#headerHeartGradient)"
    />
    <defs>
      <linearGradient id="headerHeartGradient" x1="2" y1="3" x2="22" y2="21.35" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#0ea5e9" />
      </linearGradient>
    </defs>
  </svg>
);

const Title = styled.h1`
  font-family: 'Outfit', sans-serif;
  font-size: 24px;
  font-weight: 800;
  color: #1e293b;
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Subtitle = styled.p`
  font-size: 13px;
  color: #64748b;
  margin-top: 4px;
  text-align: center;
`;

const BrandHeader = ({ subtitle }) => {
  return (
    <HeaderContainer>
      <LogoSvg />
      <Title>Swastyam Connect</Title>
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
    </HeaderContainer>
  );
};

export default BrandHeader;
