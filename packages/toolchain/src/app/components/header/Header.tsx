import React from 'react';
import { Toolbar } from '@osio/widgets';
import HeaderMenuHelp from './HeaderMenuHelp';
import HeaderMenuUser from './HeaderMenuUser';

const Header: React.SFC = () => (
  <Toolbar>
    <HeaderMenuHelp />
    <HeaderMenuUser />
  </Toolbar>
);

export default Header;
