'use client';

import styled from 'styled-components';

const FooterBox = styled.footer`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: lightsteelblue;
`;

const Footer = () => (
  <FooterBox>
    <p>© 2024, All rights reserved</p>
  </FooterBox>
);

export default Footer;
