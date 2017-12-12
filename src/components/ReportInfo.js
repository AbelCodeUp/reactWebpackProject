import React, { PropTypes } from 'react';
import axios from 'axios';
import ServerUrl from '../config/server';

export default class ReportInfo extends React.Component {
	constructor( props ) {
		super( props );
    this.state = {
      LessonReport:null
    }

    this.GetLessonReportDetil();
	}

  //获取报告详情
  GetLessonReportDetil = () => {
    let { id } = this.props.params;
    if( id === undefined )  return false;
    axios
      .get( ServerUrl.LessonReportDetil ,{
        params:{
          recordID:id
        }
      })
      .then( e => {
        if ( e.data.result === 1 ) {
          this.setState( { LessonReport: e.data.data } )
        }
      })
  }

  // 星星个数
  getXinNum = (num)=>{
    var arr = [];
    for(var i=0;i<num;i++){
      arr.push(<img key={i} src="images/smy_part/smy_my_report/smy_report_xing.png"/>);
    }
    return arr;
  }



	render() {
    let { LessonReport } = this.state;
    console.log(LessonReport);
    let reportTime = '';
    let x1 = 5;
    let x2 = 5;
    let x3 = 5;
    let x4 = 5;
    let StudentDes = '';
    let SurplusCount = 0;

    if(LessonReport!==null){
      reportTime = `${LessonReport.StartTime.split('T')[0]}-${LessonReport.EndTime.split('T')[0]}`
      x4 = LessonReport.OnesCount;
      x3 = LessonReport.InteractionCount;
      x2 = LessonReport.OntimeCount;
      x1 = LessonReport.LessonCount;
      // StudentDes = LessonReport.StudentDes.replace(/\n/g, "<br/>");
      StudentDes = LessonReport.StudentDes;
      SurplusCount = LessonReport.SurplusCount;
    }



		return ( <div>
			<div className="smy_monthReport_Box">
				<div className="smy_monthReport">
					<div className="smy_monthReport_title">2017年3月份（上半月）</div>
					<div className="smy_monthReport_user1">
						<div>宝贝姓名：<span>Mark</span>
						</div>
						<div>完成课时：<span>{SurplusCount}</span>
						</div>
						<div>月报周期：<span>{reportTime}</span>
						</div>
					</div>
					<div className="smy_monthReport_title_s">课堂表现</div>
					<div className="smy_monthReport_user2">
						<div className="smyclearfix smy_monthReport_user2_item">
							<div className="left smy_monthReport_user2_item_title">主动上课：</div>
							<div className="left">
								{
                  this.getXinNum(x1)
                }
							</div>
						</div>
						<div className="smyclearfix smy_monthReport_user2_item">
							<div className="left smy_monthReport_user2_item_title">出席准时：</div>
							<div className="left">
                {
                  this.getXinNum(x2)
                }
							</div>
						</div>
						<div className="smyclearfix smy_monthReport_user2_item">
							<div className="left smy_monthReport_user2_item_title">课堂互动：</div>
							<div className="left">
                {
                  this.getXinNum(x3)
                }
							</div>
						</div>
						<div className="smyclearfix smy_monthReport_user2_item">
							<div className="left smy_monthReport_user2_item_title">独立互动：</div>
							<div className="left">
                {
                  this.getXinNum(x4)
                }
							</div>
						</div>
					</div>
					<div className="smy_monthReport_title_s">学员分析</div>
					<div className="smy_monthReport_user3">
						{
              StudentDes
            }
					</div>
					<div className="smy_monthReport_title_s">学员风采</div>
					<div className="smy_monthReport_user4">
						<div className="smyclearfix smy_monthReport_user4_box">
							<div className="left"><img src="images/smy_part/smy_my_report/smy_report_shili.jpg"/></div>
							<div className="left"><img src="images/smy_part/smy_my_report/smy_report_shili.jpg"/></div>
							<div className="left"><img src="images/smy_part/smy_my_report/smy_report_shili.jpg"/></div>
							<div className="left"><img src="images/smy_part/smy_my_report/smy_report_shili.jpg"/></div>
						</div>
					</div>
				</div>
			</div>
		</div> );
	}
}
