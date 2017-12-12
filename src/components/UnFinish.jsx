import React, { Component } from 'react';
import axios from 'axios';
import server from '../config/server';
import { LayerConfirm, LayerLessonTime } from './Dialog'

class UnFinish extends Component {
	constructor( props ) {
		super( props );
		this.state = {
			LessonRecords: [],
			isLoading: false,
			isGuanZhu: 1,

			isShow: false,
			isShow2: false,
			isShow3: false,
			teacherId: null,
			AttentionStatus: null,
			index: -1,
			index2: -1,
			LessonState: null,
			RecordID: null,
			times: null
		}
	}

	LessonStateFn( LessonTime ) { //判断是否  正在上课、即将开课、待上课
		let lessonTime = new Date( LessonTime );
		let nowTime = new Date();
		let LessonState = ( lessonTime - nowTime ) / 60000;
		return LessonState }

	componentDidMount() {
		let TotlePage = '';
		let arr = [];
		let This = this;

		//未完成
		axios
			.get( server.GetLessonRecords, { //获取我的学习记录
				params: {
					status: 1,
					pageIndex: 1
				} } )
			.then( function( response ) {
				TotlePage = response.data.data.TotlePage;
				for ( let i = 0; i < TotlePage; i++ ) {

					axios
						.get( 'http://testapi.gogo-talk.com/api/Student/GetLessonRecords', {
							params: {
								status: 1,
								pageIndex: i + 1
							}
						} )
						.then( function( response ) {
							for ( let j = 0; j < 10; j++ ) {
								if ( response.data.data.LessonRecords[ j ] === undefined ) {} else {
									response
										.data
										.data
										.LessonRecords[ j ]
										.LessonState = This.LessonStateFn( response.data.data.LessonRecords[ j ].LessonTime );
									arr.push( response.data.data.LessonRecords[ j ] )
								}
							}
							This.setState( { LessonRecords: arr, isLoading: true } )
						} )
						.catch( function( error ) {
							console.log( error );
						} );
				}
			} )
			.catch( function( error ) {
				console.log( error );
			} );
		//未完成
	}

	// 1 是  关注
	guanZhu( teacherId, AttentionStatus, index ) {
		if ( AttentionStatus === 0 ) {
			let arr1 = this.state.LessonRecords;
			AttentionStatus = 1;
			arr1[ index ].AttentionStatus = AttentionStatus;
			this.setState( { LessonRecords: arr1 } );

			axios
				.get( server.AttentionTeacher, {
					params: {
						teacherId: teacherId,
						status: AttentionStatus
					}

				} )
				.then( function( response ) {
					console.log( response )
				} )
				.catch( function( error ) {
					console.log( error );
				} );
		} else {
			this.setState( { teacherId: teacherId, AttentionStatus: AttentionStatus, index: index, isShow: true } );
		}
	}

	QuXiaoGuanZhu1( teacherId1, AttentionStatus, index1 ) {
		let arr1 = this.state.LessonRecords;
		AttentionStatus = 0;
		arr1[ index1 ].AttentionStatus = AttentionStatus;
		this.setState( { LessonRecords: arr1, isShow: false } );
		axios
			.get( server.AttentionTeacher, {
				params: {
					teacherId: teacherId1,
					status: AttentionStatus
				}
			} )
			.then( function( response ) {
				console.log( response )
			} )
			.catch( function( error ) {
				console.log( error );
			} );
	}

	quXiaoYuYue( index, LessonState, RecordID ) {
		this.setState( { index2: index, LessonState: LessonState, RecordID: RecordID, isShow2: true } )
	}

	YueKeNoNext1( LessonState, RecordID ) {
		let This = this;
		if ( LessonState < 1440 ) {
			axios
				.get( server.CancelLessonCount )
				.then( function( response ) {
					This.setState( { isShow2: false, isShow3: true, times: response.data.data } )
				} )
				.catch( function( error ) {
					console.log( error );
				} );
		} else {
			axios
				.get( server.CancelAttendLesson, {
					params: {
						attendLessonId: RecordID
					}
				} )
				.then( function( response ) {} )
				.catch( function( error ) {
					console.log( error );
				} );
			history.go( 0 )
		}
	}

	YueKeNoNext4( RecordID ) {
		let This = this;
		axios
			.get( server.CancelAttendLesson, {
				params: {
					attendLessonId: RecordID
				}
			} )
			.then( function( response ) {
				console.log( response );
				This.setState( { isShow3: false } )
			} )
			.catch( function( error ) {
				console.log( error );
			} );
		// history.go(0)
	}

	render() {

		let state = this.state, {
				isLoading,
				teacherId,
				AttentionStatus,
				index,
				LessonRecords,
				isShow,
				isShow2,
				isShow3,
				LessonState,
				RecordID,
				times
			} = state;
		return ( <div>
			<LayerConfirm msg='确认要取消关注吗？' btntext="取消" isShow={isShow} quxiaofun={this
					.QuXiaoGuanZhu1
					.bind( this, teacherId, AttentionStatus, index )} closefun={() => this.setState( { isShow: false } )}/>

			<LayerConfirm msg='确定取消本次预约？' btntext="暂不取消" isShow={isShow2} quxiaofun={this
					.YueKeNoNext1
					.bind( this, LessonState, RecordID )} closefun={() => this.setState( { isShow2: false } )}/>
      { isShow3
					? <LayerLessonTime btntext="暂不取消" times={times}
            quxiaofun={this.YueKeNoNext4.bind( this, RecordID )}
            closefun={() => this.setState( { isShow3: false } )}/>
					: null
			}

			{
				isLoading
					? <div>
							<p className="smy_MyCourse_ps">开课前10分钟内可以进入教室哦~</p>
							<div className="smy_MyCourse_list">
								{
									LessonRecords.length === 0
										? <div className="smy_course_quesheng">
												<i className="i1"/>
												<p>您还没有预约课程，快去预约一节吧！</p>
												<button>去约课</button>
											</div>
										: LessonRecords.map( ( data, index ) => ( <div key={data.TeacherID} className="smy_MyCourse_item">
											<div className="smy_MyCourse_item_top">
												<div className="left smyclearfix smy_MyCourse_item_courseName">
													<div className="left">{data.BookName}</div>
													<span className="left">{
															data.IsAgain === 1
																? "[ 重上 ]"
																: null
														}</span>
												</div>
												{
													data.LessonState < 10 && data.LessonState > 0
														? <div className="left smyclearfix smy_MyCourse_item_courseState">
																<div className="right">即将开课</div>
															</div>
														: data.LessonState < 0 && data.LessonState > ( -30 )
															? <div className="left smyclearfix smy_MyCourse_item_courseState">
																	<i className="left"/>
																	<div className="right">正在上课</div>
																</div>
															: null
												}

												<div className="right smy_MyCourse_item_courseTime">{data.LessonTime}</div>
											</div>
											<div className="smyclearfix smy_MyCourse_item_bottom">
												<div className="left smy_MyCourse_item_bottom_teacherImg"><img src={data.HeaderImage === null
												? "../images/smy_part/smy_my_course/teacher1.jpg"
												: data.HeaderImage}/>
												</div>
												<div className="left smy_MyCourse_item_bottom_teacherImg_ri">

													<div className="smyclearfix smy_MyCourse_item_bottom_teacherName">
														<div className="left">{data.EnglishName}</div>
														{
															data.Sex === -1
																? '未设置'
																: data.Sex === 1
																	? <i className="left man"/>
																	: <i className="left woman"/>
														}
													</div>

													<div className={data.AttentionStatus === 0
															? "smy_MyCourse_item_bottom_guanzhu_hong2"
															: "smy_MyCourse_item_bottom_guanzhu_bai2"} onClick={this
															.guanZhu
															.bind( this, data.TeacherID, data.AttentionStatus, index )}>{
															data.AttentionStatus === 0
																? "关注"
																: "取消关注"
														}</div>

												</div>
												<div className="right smyclearfix smy_MyCourse_item_bottom_buttonBox">
													{
														data.Status === 1
															? <div className="left smy_MyCourse_item_bottom_button_huang" onClick={this
																		.quXiaoYuYue
																		.bind( this, index, data.LessonState, data.RecordID )}>
																	取消预约</div>
															: <div className="left smy_MyCourse_item_bottom_button_hui">取消预约</div>
													}

													<div className="left smy_MyCourse_item_bottom_button_ju">进入教室</div>
												</div>
											</div>
										</div> ) )
								}
								{/*
                        <div className="smy_MyCourse_item">
                            <div className="smy_MyCourse_item_top">
                                <div className="left smyclearfix smy_MyCourse_item_courseName">
                                    <div className="left">Gogo Start 1 L30</div>
                                </div>
                                <div className="left smyclearfix smy_MyCourse_item_courseState">
                                    <div className="right">即将开课</div>
                                </div>
                                <div className="right smy_MyCourse_item_courseTime">1月12日（周日） 20 : 00</div>
                            </div>
                            <div className="smyclearfix smy_MyCourse_item_bottom">
                                <div className="left smy_MyCourse_item_bottom_teacherImg"><img
                                    src="./images/smy_part/smy_my_course/teacher2.jpg"/></div>
                                <div className="left smy_MyCourse_item_bottom_teacherImg_ri">
                                    <div className="smyclearfix smy_MyCourse_item_bottom_teacherName">
                                        <div className="left">Mark</div>
                                        <img className="left"
                                             src="./images/smy_part/smy_my_course/smy_my_course_teacher_nv.png"/>
                                    </div>
                                    <div className="smy_MyCourse_item_bottom_guanzhu_bai">取消关注</div>
                                </div>
                                <div className="right smyclearfix smy_MyCourse_item_bottom_buttonBox">
                                    <div className="left smy_MyCourse_item_bottom_button_hui">取消预约</div>
                                    <div className="left smy_MyCourse_item_bottom_button_ju">进入教室</div>
                                </div>
                            </div>
                        </div>
                        <div className="smy_MyCourse_item">
                            <div className="smy_MyCourse_item_top">
                                <div className="left smyclearfix smy_MyCourse_item_courseName">
                                    <div className="left">Gogo Start 1 L30</div>
                                </div>
                                <div className="right smy_MyCourse_item_courseTime">1月12日（周日） 20 : 00</div>
                            </div>
                            <div className="smyclearfix smy_MyCourse_item_bottom">
                                <div className="left smy_MyCourse_item_bottom_teacherImg"><img
                                    src="./images/smy_part/smy_my_course/teacher1.jpg"/></div>
                                <div className="left smy_MyCourse_item_bottom_teacherImg_ri">
                                    <div className="smyclearfix smy_MyCourse_item_bottom_teacherName">
                                        <div className="left">Mark</div>
                                        <img className="left"
                                             src="./images/smy_part/smy_my_course/smy_my_course_teacher_nan.png"/>
                                    </div>
                                    <div className="smy_MyCourse_item_bottom_guanzhu_bai">取消关注</div>
                                </div>
                                <div className="right smyclearfix smy_MyCourse_item_bottom_buttonBox">
                                    <div className="left smy_MyCourse_item_bottom_button_huang">取消预约</div>
                                    <div className="left smy_MyCourse_item_bottom_button_ju">预习课件</div>
                                </div>
                            </div>
                        </div>
                        */
								}
							</div>
						</div>

					: null
			}
		</div> )
	}
}

export default UnFinish;
