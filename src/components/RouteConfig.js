require( 'normalize.css/normalize.css' );

import React from 'react';
import ReactDOM from 'react-dom';
import {
	Router,
	IndexRoute,
	Route,
	Redirect,
	hashHistory,
	IndexRedirect
} from 'react-router';

import IndexMain from './IndexMain';
import LearnRouter from './LearnRouter';
import PersonRouter from './PersonRouter';

import MyClass from './MyClass';
import MyPersonInfo from './MyPersonInfo';
import MyGuide from './MyGuide';
import ChangePwd from './ChangePwd';
import ReprotLists from './ReprotLists';
import ReportInfo from './ReportInfo';

import StudyCenterMain from './studyCenter';

import UnFinish from './UnFinish';
import Finisheds from './Finisheds';
import MyLesson from './MyLesson';
import RiLi from './RiLi';

import Yuyue from './Yuyue'; // 预约课程
import YuyueDetail from './YuyueDetail'; //老师详情
import My_Follow from './My_Follow'; //我的关注

export default class AppComponent extends React.Component {
	render() {
		return ( <Router history={hashHistory}>
			<Route path="/" component={IndexMain}>
				{/* 权浏览权限判断 */}
				{/* <IndexRoute component={Main} onEnter={({params}, replace) => replace('/Login')} /> */}
				{/* <Route path="Main" onEnter={({params}, replace) => replace('/Login')} component={Main} />

                      <Route path="Login" component={Login} /> */
				}
				{/* 学习中心 */}
				<IndexRedirect from="/" to="/learncenter"/>
				<Route path="learncenter" component={LearnRouter}>
					<IndexRedirect from="/learncenter" to="/learncenter/main"/>
					<Route path="main" component={StudyCenterMain}/>
					<Route path="report" component={ReprotLists}/>
					{/* 月报详情 */}
					<Route path="reportinfo/:id" component={ReportInfo}/>

					<Route path="mylesson" component={MyLesson}>
						<IndexRedirect from="/learncenter/mylesson" to="/learncenter/mylesson/unfinish"/>
						<Route path="unfinish" component={UnFinish}/>
						<Route path="finisheds" component={Finisheds}/>
					</Route>
					<Route path="rili" component={RiLi}/>
					{/* 预约课程 */}
					<Route path="yuyue" component={Yuyue}></Route>
          <Route path="yuyueDetail" component={YuyueDetail}></Route>
					{/* 我的关注 */}
          <Route path="my_Follow" component={My_Follow}></Route>
				</Route>
				{/* 个人中心 */}
				<Route path="personcenter" component={PersonRouter}>
					<IndexRedirect from="/personcenter" to="/personcenter/mypersoninfo"/>
					<Route path="mypersoninfo" component={MyPersonInfo}></Route>
					<Route path="myclass" component={MyClass}></Route>
					<Route path="myguide" component={MyGuide}></Route>
					<Route path="changepwd" component={ChangePwd}></Route>
				</Route>
			</Route>
		</Router> )
	}
}
