import React, {Component} from 'react';
import axios from 'axios';
import server from '../config/server';
import {LayerConfirm,LayerPinjia} from './Dialog'

class Finisheds extends Component {
  constructor() {
    super();
    this.state = {
      LessonRecords: [],
      isLoading: false,
      isShow: false,
      isShow2:false,
      teacherId: null,
      RecordID:null,
      num:1,
      index2:-1,
      AttentionStatus: null,
      index: -1,
      xingArr: [1, 2, 3, 4, 5]
    }
  }

  componentDidMount() {
    let TotlePage = '';
    let arr = [];
    let This = this;

    //已完成
    axios.get(server.GetLessonRecords, {//获取我的学习记录
      params: {
        status: 2,
        pageIndex: 1
      }
    })
      .then(function (response) {
        TotlePage = response.data.data.TotlePage;
        for (let i = 0; i < TotlePage; i++) {

          axios.get('http://testapi.gogo-talk.com/api/Student/GetLessonRecords', {
            params: {
              status: 2,
              pageIndex: i + 1
            }
          })
            .then(function (response) {
              for (let j = 0; j < 10; j++) {
                if (response.data.data.LessonRecords[j] === undefined) {

                } else {
                  arr.push(response.data.data.LessonRecords[j])
                }
              }
              console.log(arr);
              This.setState({LessonRecords: arr, isLoading: false})
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    //未完成
  }

  QuXiaoGuanZhu1(teacherId1, AttentionStatus, index1) {
    let arr1 = this.state.LessonRecords;
    AttentionStatus = 0;
    arr1[index1].AttentionStatus = AttentionStatus;
    this.setState({LessonRecords: arr1, isShow: false});
    axios.get(server.AttentionTeacher, {
      params: {
        teacherId: teacherId1,
        status: AttentionStatus
      }
    })
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // 1 是  关注
  guanZhu(teacherId, AttentionStatus, index) {
    if (AttentionStatus === 0) {
      let arr1 = this.state.LessonRecords;
      AttentionStatus = 1;
      arr1[index].AttentionStatus = AttentionStatus;
      this.setState({LessonRecords: arr1});

      axios.get(server.AttentionTeacher, {
        params: {
          teacherId: teacherId,
          status: AttentionStatus
        }

      })
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      this.setState({teacherId: teacherId, AttentionStatus: AttentionStatus, index: index, isShow: true});
    }
  }

  submit(fen1,fen2,textArea) {

    let This=this;
    axios.get(server.SetComment, {
      params: {
        points: fen1,
        content: textArea,
        lessonId: this.state.RecordID,
        type: 1
      }
    })
      .then(function (response) {
        console.log(response);

        let arr=this.state.LessonRecords;
        arr[This.state.index2].IsComment=1;
        This.setState({num:2,LessonRecords:arr})

      })
      .catch(function (error) {
        console.log(error);
      });

  }
  render() {
    let state = this.state, {LessonRecords, isShow,isShow2, teacherId, AttentionStatus, index, xingArr,num} = state;
    return (

      <div className="smy_MyCourse_history_list">
        {
          isShow ? <LayerConfirm msg='确认要取消关注吗？' btntext="取消"
                                 quxiaofun={this.QuXiaoGuanZhu1.bind(this, teacherId, AttentionStatus, index)}
                                 closefun={() => this.setState({isShow: false})}/> : null
        }
        {
          isShow2 ? <LayerPinjia msg='确认要取消关注吗？' btntext="取消"
                                 num={num}
                                 callbackfun={this.submit.bind(this)}
                                 closefun={() => this.setState({isShow2: false})}/> : null
        }
        {
          LessonRecords.length === 0 && this.state.isLoading ?
            <div className="smy_course_quesheng">
              <i className="i2"/>
              <p>您还没有已结束的课程！</p>
            </div>

            :
            LessonRecords.map((data, index) => (
              <div key={data.TeacherID} className="smyclearfix smy_MyCourse_history_item">
                <div className="left smy_MyCourse_history_item_left">
                  <div className="smyclearfix smy_MyCourse_history_courseTime">
                    <div className="left">{data.LessonTime}</div>
                    <span className="left">{data.WorkAttendance}</span>
                  </div>
                  <div className="smyclearfix smy_MyCourse_history_courseTeacher">
                    <div className="left smy_MyCourse_history_courseTeacher_img"><img
                      src={data.HeaderImage === null ? "../images/smy_part/smy_my_course/teacher1.jpg" : data.HeaderImage}/>
                    </div>
                    <div className="left smy_MyCourse_history_courseName">
                      <p className="smy_MyCourse_history_courseName_rel">{data.BookName}</p>
                      <div className="smyclearfix smy_MyCourse_history_teacherName">
                        <span className="left">{data.EnglishName}</span>
                        <img className="left"
                             src="../images/smy_part/smy_my_course/smy_my_course_teacher_nan.png"/>
                      </div>
                    </div>

                    <div
                      className={data.AttentionStatus === 0 ? "smy_MyCourse_item_bottom_guanzhu_hong" : "smy_MyCourse_item_bottom_guanzhu_bai"}
                      onClick={this.guanZhu.bind(this, data.TeacherID, data.AttentionStatus, index)}>{data.AttentionStatus === 0 ? "关注" : "取消关注"}</div>
                  </div>
                </div>
                <div className="left smy_MyCourse_history_item_mid">
                  <div className="smyclearfix smy_MyCourse_history_item_mid_top">
                    <div className="left smy_MyCourse_history_pingjia_ti">外教评语</div>
                    <div className="left smy_MyCourse_history_pingjia_xingBox">
                      {
                        xingArr.map((data, index) => (
                          <i key={index} className={index < data.TCommentPoint ? 'i1 left' : "i2 left"}/>
                        ))
                      }
                    </div>
                  </div>
                  <div className="smyclearfix smy_MyCourse_history_pingjia_beiBox">
                    <div className="left smy_MyCourse_history_pingjia_ti2">课堂奖励</div>
                    <img className="left"
                         src="../images/smy_part/smy_my_course/smy_my_course_bei.png"/>
                    <p className="left">×{data.Gift}</p>
                    <span className="left">还需努力哦！</span>
                  </div>
                </div>
                <div className="left smy_MyCourse_history_item_right">
                  {data.IsComment === 0 ? <button
                      onClick={()=>this.setState({isShow2:true,RecordID:data.RecordID,index2:index})} className="smy_MyCourse_history_pingjia_go">去评价</button> :
                    <button className="smy_MyCourse_history_pingjia_yi">已评价</button>}

                  <div className="smyclearfix smy_MyCourse_history_buttonBox">
                    <div className="left smy_MyCourse_item_bottom_button_huang2">回放</div>
                    <div className="left smy_MyCourse_item_bottom_button_huang">复习课件</div>
                  </div>
                </div>
              </div>
            ))
        }


        {/*
                        <div className="smyclearfix smy_MyCourse_history_item">
                            <div className="left smy_MyCourse_history_item_left">
                                <div className="smyclearfix smy_MyCourse_history_courseTime">
                                    <div className="left">10月16日（周三） 12:30</div>
                                    <span className="left smy_MyCourse_history_courseChong">[ 重上 ]</span>
                                    <span className="left">迟到</span>
                                </div>
                                <div className="smyclearfix smy_MyCourse_history_courseTeacher">
                                    <div className="left smy_MyCourse_history_courseTeacher_img"><img
                                        src="images/smy_part/smy_my_course/teacher1.jpg"/></div>
                                    <div className="left smy_MyCourse_history_courseName">
                                        <p className="smy_MyCourse_history_courseName_rel">Get Ready 2 Get Ready2_01</p>
                                        <div className="smyclearfix smy_MyCourse_history_teacherName">
                                            <span className="left">ruisun</span>
                                            <img className="left"
                                                 src="images/smy_part/smy_my_course/smy_my_course_teacher_nan.png"/>
                                            <div className="left smy_MyCourse_history_guanzhui_hui">取消关注</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="left smy_MyCourse_history_item_mid">
                                <div className="smyclearfix smy_MyCourse_history_item_mid_top">
                                    <div className="left smy_MyCourse_history_pingjia_ti">外教评语</div>
                                    <div className="left smy_MyCourse_history_pingjia_xingBox">
                                        <i className="left"/>
                                        <i className="left"/>
                                        <i className="left"/>
                                        <i className="left"/>
                                        <i className="left"/>
                                    </div>
                                </div>
                                <div className="smyclearfix smy_MyCourse_history_pingjia_beiBox">
                                    <div className="left smy_MyCourse_history_pingjia_ti2">课堂奖励</div>
                                    <img className="left" src="images/smy_part/smy_my_course/smy_my_course_bei.png"/>
                                    <p className="left">×5</p>
                                    <span className="left">还需努力哦！</span>
                                </div>
                            </div>
                            <div className="left smy_MyCourse_history_item_right">
                                <button className="smy_MyCourse_history_pingjia_yi">去评价</button>
                                <div className="smyclearfix smy_MyCourse_history_buttonBox">
                                    <div className="left smy_MyCourse_item_bottom_button_huang2">回放</div>
                                    <div className="left smy_MyCourse_item_bottom_button_huang">复习课件</div>
                                </div>
                            </div>
                        </div>
                        <div className="smyclearfix smy_MyCourse_history_item">
                            <div className="left smy_MyCourse_history_item_left">
                                <div className="smyclearfix smy_MyCourse_history_courseTime">
                                    <div className="left">10月16日（周三） 12:30</div>
                                </div>
                                <div className="smyclearfix smy_MyCourse_history_courseTeacher">
                                    <div className="left smy_MyCourse_history_courseTeacher_img"><img
                                        src="images/smy_part/smy_my_course/teacher1.jpg"/></div>
                                    <div className="left smy_MyCourse_history_courseName">
                                        <p className="smy_MyCourse_history_courseName_rel">Get Ready 2 Get Ready2_01</p>
                                        <div className="smyclearfix smy_MyCourse_history_teacherName">
                                            <span className="left">ruisun</span>
                                            <img className="left"
                                                 src="images/smy_part/smy_my_course/smy_my_course_teacher_nan.png"/>
                                            <div className="left smy_MyCourse_history_guanzhui_hui">取消关注</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="left smy_MyCourse_history_item_mid">
                                <div className="smyclearfix smy_MyCourse_history_item_mid_top">
                                    <div className="left smy_MyCourse_history_pingjia_ti">外教评语</div>
                                    <div className="left smy_MyCourse_history_pingjia_xingBox">
                                        <i className="left"/>
                                        <i className="left"/>
                                        <i className="left"/>
                                        <i className="left"/>
                                        <i className="left i2"/>
                                    </div>
                                </div>
                                <div className="smyclearfix smy_MyCourse_history_pingjia_beiBox">
                                    <div className="left smy_MyCourse_history_pingjia_ti2">课堂奖励</div>
                                    <img className="left" src="images/smy_part/smy_my_course/smy_my_course_bei.png"/>
                                    <p className="left">×5</p>
                                    <span className="left">还需努力哦！</span>
                                </div>
                            </div>
                            <div className="left smy_MyCourse_history_item_right">
                                <button className="smy_MyCourse_history_pingjia_yi">去评价</button>
                                <p className="smy_MyCourse_history_teacher_queqing">老师缺勤，课时已返还</p>
                                <div className="smyclearfix smy_MyCourse_history_buttonBox">
                                    <div className="left smy_MyCourse_item_bottom_button_huang2">回放</div>
                                    <div className="left smy_MyCourse_item_bottom_button_huang">复习课件</div>
                                </div>
                            </div>
                        </div>
                        */}

      </div>
    )
  }
}

export default Finisheds;
