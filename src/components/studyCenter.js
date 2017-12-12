import React, { PropTypes } from 'react';
require( '../styles/xjr_base.css' );
require( '../styles/xjr_studyCenter.css' );
import axios from 'axios';
import ServerUrl from '../config/server';
import {
	LayerConfirm,
	LayerPinjia
} from './Dialog';

export default class StudyCenter extends React.Component {
	constructor( props ) {
		super( props );
		this.state = {
			newLessonRecord: null, //获取最新上课记录
			stuInfo: {
				HeaderImage: '',
				RealName: '',
				TotalUsedTime: '',
				AbsenceCount: '',
				Gift: '',
				LateCount: ''
			}, // 获取学生的学习情况
			daiLesson: null, // 获取待上课
			stuTime: {
				StudentLesson: 153,//学员课时数
	      TotalUsed: 178,
	      Percent: "",
	      SurplusCount: 28,
	      TotalGiveLesson: 75, //总赠送课时
	      StudyTime: 5340,//总学习小时数
	      RStudyDay: 3
			}, // 获取课时时间
			isShowGuanZhu:false,
			TeacherID:0 //取消老师的ID
		}

		this.GetNewLessonRecord();
		this.LearningSituation();
		this.GetRemindLesson();
		this.getStudentLessonTime();

	}
	//获取最新上课记录
	GetNewLessonRecord = () => {
		axios
			.get( ServerUrl.GetNewLessonRecord )
			.then( e => {
				if ( e.data.result === 1 ) {
					if(e.data.data.LessonRecord != null){
						this.setState( {
							newLessonRecord: e.data.data.LessonRecord,
							TeacherID:e.data.data.LessonRecord.TeacherID
						 } )
					}
				}
			} )
	}
	componentDidMount() {}
	//获取待上课
	GetRemindLesson = () => {
		axios
			.get( ServerUrl.GetRemindLesson )
			.then( e => {
				if ( e.data.result === 1 ) {
					this.setState( { daiLesson: e.data.data } )

				}
			} )
	}

	// 获取学生的学习情况
	LearningSituation = () => {
		axios
			.get( ServerUrl.LearningSituation )
			.then( e => {
				if ( e.data.result === 1 ) {
					this.setState( { stuInfo: e.data.data } )

				}
			} )
	}
	// GetLessonStock
	getStudentLessonTime = () => {
		axios
			.get( ServerUrl.GetLessonStock )
			.then( e => {
				if ( e.data.result === 1 ) {
					this.setState( { stuTime: e.data.data.LessonStock } )

				}
			} )
	}
  // 取消关注
  quxiaofun =(id)=>{
		let { TeacherID, newLessonRecord } = this.state;
		axios
			.get( ServerUrl.AttentionTeacher,{
				teacherId: id,
				status: 0
			} )
			.then( e => {
				if ( e.data.result === 1 ) {

					newLessonRecord = newLessonRecord.map(e=>{
						return e;
					})


				}
			} )
	}
	// 关注
	guanzhufun =(id)=>{
		// let { TeacherID, newLessonRecord } = this.state;
		axios
			.get( ServerUrl.AttentionTeacher,{
				teacherId: id,
				status: 1
			} )
			.then( e => {
				if ( e.data.result === 1 ) {

					newLessonRecord = newLessonRecord.map(e=>{
						return e;
					})


				}
			} )
	}
	pingjia = ()=>{
		// let { TeacherID, newLessonRecord } = this.state;
		axios
			.get( ServerUrl.SetComment,{
				teacherId: id,
				status: 1
			} )
			.then( e => {
				if ( e.data.result === 1 ) {

					newLessonRecord = newLessonRecord.map(e=>{
						return e;
					})


				}
			} )
	}
	render() {

		let {
			newLessonRecord,
			stuInfo: {
				HeaderImage,
				RealName,
				TotalUsedTime,
				LateCount,
				AbsenceCount,
				Gift,
			},
			daiLesson,
			stuTime,
			isShowGuanZhu
		} = this.state;

		let w_TeacherName = newLessonRecord != null
			? newLessonRecord.EnglishName
			: 'Teacher';
		let w_LessonTime = newLessonRecord != null
			? newLessonRecord.LessonTime
			: '';

		// let w_HeaderImage = newLessonRecord != null ? newLessonRecord.HeaderImage : '';
		// let w_EBookName = newLessonRecord != null ? newLessonRecord.EBookName : ''; 教材名
		// let w_IsTComment = newLessonRecord != null ? newLessonRecord.IsTComment : ''; 老师是否评价
		// let w_IsSComment = newLessonRecord != null ? newLessonRecord.IsSComment : ''; 学生是否评价
		// let w_Sex = newLessonRecord != null ? newLessonRecord.Sex : ''; 性别
		// let w_GiftCupNum = newLessonRecord != null ? newLessonRecord.GiftCupNum : ''; 奖杯数
		// let w_StudentAttendStatus = newLessonRecord != null ? newLessonRecord.StudentAttendStatus : ''; 学生考勤ß
		//最近上课记录
		let newnewLessonHtml = newLessonRecord != null
			? <div className="xjr_class_tishi xjr_class_tishi1">
					<img className="xjr_classTitle" src={require( "../images/xjr/xjr_index_lastover.png" )} alt=""/>
					<div className="xjr_class_willbegin xjr_class_lastover">
						<div className="xjr_willbegin_head">
							{/* <p className="xjr_willbegin_time">10月16日（周三） 12:30 */}
							<p className="xjr_willbegin_time">
								{w_LessonTime}
								<span>
									迟到
								</span>
							</p>
							<div className="xjr_gotopingia">
								去评价
							</div>
						</div>
						<div className="xjr_willbegin_main">
							<div>
								<img src={require( "../images/xjr/xjr_index_photo.png" )} alt=""/>
							</div>
							<div>
								<p className="xjr_class_id">Get Rasfdy asdasdsfdsfsaf2213</p>
								<div className="xjr_teacher_info">
									<p>
										{w_TeacherName}
									</p>
									<img src={require( "../images/xjr/xjr_class_teacherSex.png" )} alt=""/>
									{/* <!-- <div className="xjr_index_guanzhu">关注</div> --> */}
									<div className="xjr_index_noguanzhu">取消关注</div>
								</div>
								<div className="xjr_class_star">
									外教评语
									<span>
										<img src="../images/xjr/xjr_pingjia_red.png" alt=""/>
										<img src="../images/xjr/xjr_pingjia_red.png" alt=""/>
										<img src="../images/xjr/xjr_pingjia_red.png" alt=""/>
										<img src="../images/xjr/xjr_pingjia_white.png" alt=""/>
										<img src="../images/xjr/xjr_pingjia_white.png" alt=""/>
									</span>
									<span>
										<img src="../images/xjr/xjr_jiangbei.png" alt=""/>
										X5
										<span className="xjr_haixunuli">
											还需努力哦！</span>
									</span>
								</div>
							</div>
							<div>
								<div className="xjr_ke_buttonbox">
									<div className="xjr_ke_button1">回放</div>
									<div className="xjr_ke_button1">复习课件</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			: null;
		//待上课
		//  newLessonRecord.RecordID : '';
		// newLessonRecord.TeacherID : ''; 教材名
		// newLessonRecord.EnglishName : ''; 老师是否评价
		//  newLessonRecord.HeaderImage : ''; 学生是否评价
		// newLessonRecord.ChapterName : ''; 性别
		// newLessonRecord.Status : ''; 性别
		// newLessonRecord.Lesson : ''; 性别
		// newLessonRecord.BookName : ''; 性别
		//
		let daiLessonHtml = daiLesson != null
			? <div className="xjr_class_tishi">
					<img className="xjr_classTitle" src={require( "../images/xjr/xjr_classTitle.png" )} alt=""/>
					<div className="xjr_class_willbegin">
						<div className="xjr_willbegin_head">
							<p className="xjr_willbegin_time">10月16日（周三） 12:30</p>
							<p>距离开课：<span className="xjr_willbegin_leavetime">2天12小时28分</span>
							</p>
						</div>
						<div className="xjr_willbegin_main">
							<div>
								<img src={require( "../images/xjr/xjr_index_photo.png" )} alt=""/>
							</div>
							<div>
								<p className="xjr_class_id">Get Rasfdy asdasdsfdsfsaf2213</p>
								<div className="xjr_teacher_info">
									<p>ruisun</p>
									<img src={require( "../images/xjr/xjr_class_teacherSex.png" )} alt=""/>
									<div className="xjr_index_guanzhu" >关注</div>
									{/* <!-- <div className="xjr_index_noguanzhu">取消关注</div> --> */}
								</div>
							</div>
							<div>
								<div className="xjr_ke_buttonbox">
									<div className="xjr_ke_button1">取消预约</div>
									<div className="xjr_ke_button2">预习课件</div>
								</div>
								<p className="xjr_ke_tixing">开课前10分钟可以进入教室哦~</p>
							</div>
						</div>
					</div>
				</div>
			: <div className="xjr_class_tishi">
				<img className="xjr_classTitle" src="../images/xjr/xjr_classTitle.png" alt=""/>
				<img className="xjr_wyyuyue" src="../images/xjr/xjr_wuyuyue.png" alt=""/>
				<div className="xjr_lijiyuyue">立即预约</div>
			</div>

		// 学生上课时间

		return ( <div>
			<LayerConfirm isShow={isShowGuanZhu}
				btntext='暂不取消'
				closefun={()=>this.setState({isShowGuanZhu:false})}
				quxiaofun={ this.quxiaofun }
			/>
			<div className="xjr_infoBox">
				<div className="xjr_index_infobox">
					<div className="xjr_info_gang">
						<img className="xjr_gang_left" src={require( "../images/xjr/indexgang.png" )} alt=""/>
						<img alt="" className="xjr_gang_right" src={require("../images/xjr/indexgang.png")}/>
					</div>
					<div className="xjr_class_little">
						<p className="xjr_little_buyclass">
							购买课时：<span >300</span>
							剩余：<span >200</span>
							剩余有效期：<span >200天</span>
						</p>
						<p className="xjr_little_giveclass">
							赠送课时：<span >300</span>
							剩余：<span>200</span>
							剩余有效期：<span>200天</span>
						</p>
					</div>
					<div className="xjr_index_info">
						<div className="xjr_info_left">
							<div className="xjr_left_imgbox">
								{/* <img className="xjr_touxiang" src={require("../images/xjr/xjr_index_touxiang.png")} alt=""/> */}
								<img className="xjr_touxiang" src={HeaderImage} alt=""/>
								<p className="xjr_left_name">
									{RealName}
								</p>
								<img src="../images/xjr/xjr_vip.png" alt="" className="xjr_vip"/>
							</div>
							<div className="xjr_left_textbox">
								<div className="xjr_textBox_p">
									<p>累计上课：<span>{TotalUsedTime}</span>
									</p>
									<p>迟到：<span>{LateCount}</span>
									</p>
									<p>缺席：<span>{AbsenceCount}</span>
									</p>
								</div>
								<div className="xjr_textBox_p">
									<p>英语水平：<span >LV4</span>
									</p>
									<p>当前教材：<span className="xjr_p_span">小童星英语（一）</span>
									</p>
								</div>
								<div className="xjr_textBox_p">
									<p>累计获得：<img src={require( "../images/xjr/xjr_jiangbei.png" )} alt=""/>
										<span className="xjr_p_span1">x{Gift}</span>
									</p>
								</div>
							</div>
						</div>
						<div className="xjr_info_right">
							<div>
								<canvas className="indexprocess" width="100x" height="100px">10%</canvas>
							</div>
							<div className="xjr_index_leaveclass">
								<p>剩余课时:<span className="xjr_p_span1">230</span>
								</p>
								<p className="xjr_adviceclass">“建议至少每周上3次课哦”</p>
							</div>
						</div>

					</div>

				</div>
				<div className="xjr_index_ruxue">
					<a href="#"><img src={require( "../images/xjr/xjr_index_ruxuezhidao.png" )} alt=""/></a>
				</div>

				{/* <!-- 无预约 --> */}
				{daiLessonHtml}

				{newnewLessonHtml}

			</div>
		</div> );
	}
}
