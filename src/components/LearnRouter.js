import React from 'react';
import ReactDOM from 'react-dom';
import {
	Link
} from 'react-router';

import {
	LayerConfirm,
	LayerLessonSuccess,
	LayerYuYue,
	LayerPinjia,
	LayerLookPinjia,
	LayerTeacherPinjia
} from './Dialog';

export default class LearnRouter extends React.Component {
	render() {
		return ( <div>
			<div className="smy_wapper smyclearfix">
				{/* <!--left--> */}
				<div className="left smy_left_part">
					{/* <!--左侧 学习中心 此处通过jq修改选中样式--> */}
					<ul className="smy_left_x_nav">
						<Link to="/learncenter/main" activeClassName="smy_left_x_cur" >学习中心</Link>
						<Link to="/learncenter/yuyue" activeClassName="smy_left_x_cur" >预约课程</Link>
						<Link to="/learncenter/mylesson" activeClassName="smy_left_x_cur" >我的课表</Link>
						<Link to="/learncenter/my_Follow" activeClassName="smy_left_x_cur" >我的关注</Link>
						<Link to="/learncenter/report" activeClassName="smy_left_x_cur" >我的报告</Link>
						<Link to="/learncenter/myguide" activeClassName="smy_left_x_cur" >设备检测</Link>
					</ul>
					<div className="smy_left_bottom">
						<p>当前时间</p>
						<p>16:25:25</p>
					</div>
				</div>
				{/* <!--right--> */}
				<div className="left smy_right_part">
					{/* <!--右侧头部背景--> */}
					<div className="smy_right_part_bg1"></div>
					<div className="smy_right_part_relbox">
						{/* <!--请在此处添加内容--> */}
						{this.props.children}

						<LayerConfirm msg='wqin' isShow={false} closefun={() => {
								alert( 2 )
							}} btntext='取消' quxiaofun={() => {
								alert( 1 )
							}}/>
						<LayerLessonSuccess isShow={false}/>
						<LayerYuYue isShow={false}/>
						<LayerPinjia isShow={false} closefun={() => {
								alert( 2 )
							}}/>
						<LayerLookPinjia isShow={false} closefun={() => {
								alert( 2 )
							}}/>
						<LayerTeacherPinjia isShow={false} closefun={() => {
								alert( 2 )
							}}/>
					</div>
					<div className="smy_right_part_bg2"></div>
				</div>
			</div>
		</div> )
	}
}
