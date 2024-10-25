'use client';

import styled from 'styled-components';

interface ScaffoldProps {
  header?: React.ReactNode;
  body?: React.ReactNode;
  footer?: React.ReactNode;
}

const Layout = styled.div`
  width: 100%;
  height: 100%;
`;

const Col = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const HeaderBox = styled.div`
  width: 100%;
  height: 200px;
`;

const BodyLayout = styled.div`
  display: flex;
  flex: 1;
  background-color: lightcyan;
`;

const BodyBox = styled.div`
  flex: 1;
  margin: 20px 150px;
  background-color: ${p => p.theme.color.bg.primary};
`;

const FooterBox = styled.div`
  width: 100%;
  min-height: 200px;
`;

const Scaffold = ({
  header,
  body,
  footer,
}: ScaffoldProps) => (
  <Layout>
    <Col>
      <HeaderBox>{header}</HeaderBox>
      <BodyLayout>
        <BodyBox>{body}</BodyBox>
      </BodyLayout>
      <FooterBox>{footer}</FooterBox>
    </Col>
  </Layout>
);

export default Scaffold;
