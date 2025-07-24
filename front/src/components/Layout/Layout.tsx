import { Outlet, useNavigate } from 'react-router-dom';

import styled from 'styled-components';

const Layout = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Outlet />
    </Container>
  );
};

const Container = styled.div.attrs({ className: 'layout-container' })``;
export const Main = styled.main.attrs({ className: 'main' })`
  background: linear-gradient(180deg, #d9fdd3 0%, #ffffff 100%);
`;

export default Layout;
