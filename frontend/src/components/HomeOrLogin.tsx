import React from 'react';
import { Redirect, RouteComponentProps } from 'react-router';
import { RootState } from '../data/reducers';
import { connect, ConnectedProps } from 'react-redux';
import Tabs from '../pages/Tabs';

const mapStateToProps = (state: RootState) => ({
   loggedIn: state.userDetails.isLoggedIn
});

const connector = connect(mapStateToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

interface HomeOrLoginProps extends PropsFromRedux {};
const HomeOrLogin: React.FC<HomeOrLoginProps> = (props) => {
   return props.loggedIn ? <Tabs /> : <Redirect to="/auth" />
};

export default connector(HomeOrLogin);