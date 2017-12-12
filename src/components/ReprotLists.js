import React, { PropTypes } from 'react';
require( '../styles/smy_base_20171130.css' );
require( '../styles/smy_part.css' );
import axios from 'axios';
import ServerUrl from '../config/server';
import { Link } from 'react-router';

export default class StudyCenter extends React.Component {
	constructor( props ) {
		super( props );
		this.state = {
			LessonReport: null, //获取最新上课记录
		}

		this.GetLessonReport();

	}
	//获取报告列表
	GetLessonReport = () => {
		axios
			.get( ServerUrl.LessonReport ,{
        params:{
          pageIndex:1
        }
      })
			.then( e => {
				if ( e.data.result === 1 ) {
					this.setState( { LessonReport: e.data.data.LessonReport } )
				}
			})
	}
	componentDidMount() {}

	render() {
		let { LessonReport } = this.state;

		let ReportList = LessonReport != null
			? LessonReport.map(e => {
				var time = e.EndTime.split('T')[0];
				var year = time.split('-')[0];
				var month = time.split('-')[1];
				return (<div key={e.ReportID} className="left smy_MyReport_list_item">
					<Link to={`/learncenter/reportinfo/${e.ReportID}`} > <div className="smy_MyReport_list_item_p1">{year}年{month}月份月报</div>
					<div className="smy_MyReport_list_item_p2">（上半月）</div>
					<img className="smy_MyReport_list_item_img1" src="images/smy_part/smy_my_report/smy_report_img1.png"/>
					<div className="smy_MyReport_list_item_p3">{ time }</div>
				</Link>
			</div>
			) } ) :
			<div className="smy_course_quesheng">
				<img src="images/smy_part/smy_my_course/smy_my_course_que.png"/>
				<p>您还没有报告，快去预约上一节吧！</p>
			</div>

			return (
			<div className="smy_MyReport">
				<div className="smy_MyReport_title">我的报告</div>
				<div className="smyclearfix smy_MyReport_item_box">
					{ReportList}
					{/* <div className="left smy_MyReport_list_item">
					<div className="smy_MyReport_list_item_p1">测评报告</div>
					<img className="smy_MyReport_list_item_img2" src="images/smy_part/smy_my_report/smy_report_img2.png"/>
					<div className="smy_MyReport_list_item_p3">2017.10.15</div>
				</div> */
					}
				</div>
			</div>
			)
	}
}
