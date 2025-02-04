import React from 'react';
import loadable from '@loadable/component'
import { Switch, Route, Redirect } from 'react-router-dom';


const LogIn = loadable(() => import('@pages/LogIn'));
const SignUp = loadable(() => import('@pages/SignUp'));
const Channel = loadable(() => import('@pages/Channel'));
const DirectMessage = loadable(() => import('@pages/DirectMessage'));


const App = () => {
    return (
    <Switch>
        {/* 아래 중 한개만 작동됨 */}
        <Redirect exact path='/' to="/login"/>
        <Route path="/login" component={LogIn}/>
        <Route path="/signup" component={SignUp}/>
        <Route path="/workspace/channel" component={Channel}/>
        <Route path="/workspace/dm" component={DirectMessage}/>
    </Switch>
    );
};

export default App;

//redux 경쟁자 - 상태관리 라이브러리
//jotai, zustand, recoil