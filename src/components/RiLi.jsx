import React, {Component} from 'react';
import axios from 'axios';
import '../styles/rili.css';
import {LayerConfirm, LayerLessonTime} from './Dialog'
import server from '../config/server'

class RiLi extends Component {
  constructor() {
    super();
    this.state = {
      nowYear: null,
      nowMonth: null,
      nowDate: null,
      year: null,
      month: null,
      changeYear: null,
      changeMonth: null,
      changeYear2: null,
      changeMonth2: null,
      riLiArr: [],
      LessonRecords: [],
      DayLessonRecords: [],
      clickNum: 0,
      clickIndex: -1,
      data: null,
      teacherId: null,
      AttentionStatus: null,
      index: -1,
      isShow: false,
      isShow2: false,
      isShow3: false,
      times: null,
      index2: -1,
      LessonState: null,
      RecordID: null,
    }
  }

  getAllMonthDate(year, month) {//获取本月天数
    let allMonthDate = '';

    if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) {
      return allMonthDate = 31
    } else if (month === 2) {
      if (year % 4 === 0 && year % 100 !== 0) {//闰年
        return allMonthDate = 29
      } else if (year % 400 === 0) {//闰年
        return allMonthDate = 29
      } else {
        return allMonthDate = 28
      }
    } else {
      return allMonthDate = 30
    }
  }

  componentDidMount() {
    let This = this;
    axios.get(server.GetSystemTime)
      .then(function (response) {
        let time = new Date(response.data.data.Time * 1000);
        let year = time.getFullYear();
        let month = time.getMonth() + 1;
        let date = time.getDate();
        let arr = [];
        let nextYear = year;
        let upYear = year;
        let upMonth = month - 1;
        let nextMonth = month + 1;
        if (month === 12) {
          nextYear = year + 1;
          nextMonth = 1;
        } else if (month === 1) {
          upYear = year - 1;
          upMonth = 12
        }

        This.publicFn(upYear, upMonth, year, month, nextYear, nextMonth, arr);
        let yearAndMonth = year + '-' + month;
        axios.get(server.GetLessonForMonth, {//根据时间)获取我的课程表
          params: {
            time: yearAndMonth
          }
        })
          .then(function (response) {
            for (let i = 0; i < response.data.data.LessonRecords.length; i++) {
              response.data.data.LessonRecords[i].year = new Date(response.data.data.LessonRecords[i].LessonTime).getFullYear();
              let lessonRecordsMonth = new Date(response.data.data.LessonRecords[i].LessonTime).getMonth() + 1;
              let minutes = new Date(response.data.data.LessonRecords[i].LessonTime).getMinutes().toString();
              if (minutes.length === 1) {
                minutes = "0" + minutes;
              }
              let hourAndMinutes = new Date(response.data.data.LessonRecords[i].LessonTime).getHours() + ":" + minutes;
              let yearAndMonthAndDate = new Date(response.data.data.LessonRecords[i].LessonTime).getFullYear() + "-" + new Date(response.data.data.LessonRecords[i].LessonTime).getMonth() + '-' + new Date(response.data.data.LessonRecords[i].LessonTime).getDate();
              if (lessonRecordsMonth === 13) {
                lessonRecordsMonth = 1
              }
              response.data.data.LessonRecords[i].month = lessonRecordsMonth;
              response.data.data.LessonRecords[i].date = new Date(response.data.data.LessonRecords[i].LessonTime).getDate();
              response.data.data.LessonRecords[i].hourAndMinutes = hourAndMinutes;
              response.data.data.LessonRecords[i].yearAndMonthAndDate = yearAndMonthAndDate;
            }
            console.log(response.data.data.LessonRecords)
            This.setState({LessonRecords: response.data.data.LessonRecords})
          })
          .catch(function (error) {
            console.log(error);
          });

        This.setState({
          nowYear: year,
          nowMonth: month,
          nowDate: date,
          year: year,
          month: month,
          riLiArr: arr,
          changeYear: upYear,
          changeMonth: upMonth,
          changeYear2: year,
          changeMonth2: month
        })

      })
      .catch(function (error) {
        console.log(error);
      });

  }

  getUpMonth() {
    let state = this.state, {year, month, changeYear, changeMonth, riLiArr} = state;
    let arr = [];

    let nextYear = changeYear;
    let upYear = changeYear;
    let upMonth = changeMonth - 1;
    let nextMonth = changeMonth + 1;
    if (changeMonth === 12) {
      nextYear = changeYear + 1;
      nextMonth = 1;
    } else if (changeMonth === 1) {
      upYear = changeYear - 1;
      upMonth = 12
    }

    let upYear2 = changeYear;
    let upMonth2 = changeMonth;
    if (changeMonth === 12) {
      upYear2 = changeYear + 1;
      upMonth2 = 1
    }

    this.publicFn(upYear, upMonth, changeYear, changeMonth, nextYear, nextMonth, arr);
    this.setState({
      changeYear2: upYear2,
      changeMonth2: upMonth2,
      year: changeYear,
      month: changeMonth,
      changeYear: upYear,
      changeMonth: upMonth,
      riLiArr: arr,
      clickNum: 2
    });
  }

  publicFn(upYear, upMonth, year, month, nextYear, nextMonth, arr) {
    let allMonthDate = this.getAllMonthDate(year, month);//获取本月天数
    let allUpMonthDate = this.getAllMonthDate(nextYear, upMonth);//获取上个月天数

    let day = new Date(year + "-" + month + "-1").getDay();//获取本月1号 是周几

    if (day === 1) {

      for (let i = 1; i < allMonthDate + 1; i++) {
        arr.push({year: year, month: month, date: i})
      }
      for (let j = 1; j < 43 - allMonthDate; j++) {
        arr.push({year: nextYear, month: nextMonth, date: j})
      }

    } else if (day === 2) {

      for (let k = allUpMonthDate; k < allUpMonthDate + 1; k++) {
        arr.push({year: upYear, month: upMonth, date: k})
      }
      for (let i = 1; i < allMonthDate + 1; i++) {
        arr.push({year: year, month: month, date: i})
      }
      for (let j = 1; j < 42 - allMonthDate; j++) {
        arr.push({year: nextYear, month: nextMonth, date: j})
      }

    } else if (day === 3) {
      console.log(upMonth + '---' + month + '---' + nextMonth);
      for (let k = allUpMonthDate - 1; k < allUpMonthDate + 1; k++) {
        arr.push({year: upYear, month: upMonth, date: k})
      }
      for (let i = 1; i < allMonthDate + 1; i++) {
        arr.push({year: year, month: month, date: i})
      }
      for (let j = 1; j < 41 - allMonthDate; j++) {
        arr.push({year: nextYear, month: nextMonth, date: j})
      }

    } else if (day === 4) {

      for (let k = allUpMonthDate - 2; k < allUpMonthDate + 1; k++) {
        arr.push({year: upYear, month: upMonth, date: k})
      }
      for (let i = 1; i < allMonthDate + 1; i++) {
        arr.push({year: year, month: month, date: i})
      }
      for (let j = 1; j < 40 - allMonthDate; j++) {
        arr.push({year: nextYear, month: nextMonth, date: j})
      }

    } else if (day === 5) {

      for (let k = allUpMonthDate - 3; k < allUpMonthDate + 1; k++) {
        arr.push({year: upYear, month: upMonth, date: k})
      }
      for (let i = 1; i < allMonthDate + 1; i++) {
        arr.push({year: year, month: month, date: i})
      }
      for (let j = 1; j < 39 - allMonthDate; j++) {
        arr.push({year: nextYear, month: nextMonth, date: j})
      }

    } else if (day === 6) {

      for (let k = allUpMonthDate - 4; k < allUpMonthDate + 1; k++) {
        arr.push({year: upYear, month: upMonth, date: k})
      }
      for (let i = 1; i < allMonthDate + 1; i++) {
        arr.push({year: year, month: month, date: i})
      }
      for (let j = 1; j < 38 - allMonthDate; j++) {
        arr.push({year: nextYear, month: nextMonth, date: j})
      }

    } else if (day === 0) {

      for (let k = allUpMonthDate - 5; k < allUpMonthDate + 1; k++) {
        arr.push({year: upYear, month: upMonth, date: k})
      }
      for (let i = 1; i < allMonthDate + 1; i++) {
        arr.push({year: year, month: month, date: i})
      }
      for (let j = 1; j < 37 - allMonthDate; j++) {
        arr.push({year: nextYear, month: nextMonth, date: j})
      }

    }
  }

  getNextMonth() {
    let state = this.state, {year, month, changeYear, changeMonth, changeYear2, changeMonth2, riLiArr} = state;
    let arr = [];
    let nextYear = changeYear2;
    let upYear = changeYear2;
    let upMonth = changeMonth2;
    let thisMonth = changeMonth2 + 1;
    let thisYear = changeYear2;
    let nextMonth = changeMonth2 + 2;

    let month2 = changeMonth2 + 1;
    let year2 = changeYear2;
    if (changeMonth2 === 12) {
      thisMonth = 1;
      thisYear = changeYear2 + 1;
      nextYear = changeYear2 + 1;
      nextMonth = 2;
      month2 = 1;
      year2 = changeYear2 + 1
    } else if (changeMonth2 === 11) {
      nextMonth = 1;
      nextYear = changeYear2 + 1
    }

    let upYear2 = changeYear2;
    let upMonth2 = changeMonth2 - 1;
    if (changeMonth2 === 1) {
      upYear2 = changeYear2 - 1;
      upMonth2 = 12
    }
    this.publicFn(upYear, upMonth, thisYear, thisMonth, nextYear, nextMonth, arr);

    this.setState({
      changeYear: upYear,
      changeMonth: upMonth,
      year: year2,
      month: month2,
      changeYear2: thisYear,
      changeMonth2: thisMonth,
      riLiArr: arr,
      clickNum: 2
    });

  }

  LessonStateFn(LessonTime) {//判断是否  正在上课、即将开课、待上课
    let lessonTime = new Date(LessonTime);
    let nowTime = new Date();
    let LessonState = (lessonTime - nowTime) / 60000;
    return LessonState
  }

  getTimeClass(data, index) {//根据时间获取对应的课时
    let thisDay = data.year + '-' + data.month + '-' + data.date;
    let arr = [];
    let This = this;
    axios.get(server.GetLessonForDay, {
      params: {
        time: thisDay
      }
    })
      .then(function (response) {
        if (response.data.data === null) {

        } else {
          for (let i = 0; i < response.data.data.LessonRecords.length; i++) {
            response.data.data.LessonRecords[i].LessonState = This.LessonStateFn(response.data.data.LessonRecords[i].LessonTime);
          }
          arr = response.data.data.LessonRecords;
        }

        This.setState({clickNum: 1, clickIndex: index, DayLessonRecords: arr, data: data})
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  // 1 是  关注
  guanZhu(teacherId, AttentionStatus, index) {
    if (AttentionStatus === 0) {
      let arr1 = this.state.DayLessonRecords;
      AttentionStatus = 1;
      arr1[index].AttentionStatus = AttentionStatus;
      this.setState({DayLessonRecords: arr1});

      axios.get(server.AttentionTeacher, {
        params: {
          teacherId: teacherId,
          status: AttentionStatus
        }

      })
        .then(function (response) {

        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      this.setState({teacherId: teacherId, AttentionStatus: AttentionStatus, index: index, isShow: true});
    }
  }


  getNowDate(data) {
    let state = this.state, {nowYear, nowMonth, nowDate, riLiArr} = state;
    let thisDay = nowYear + '-' + nowMonth + '-' + nowDate;
    let arr = [];
    let This = this;
    let index = null;
    for (let i = 0; i < riLiArr.length; i++) {
      if (nowYear === riLiArr[i].year && nowMonth === riLiArr[i].month && nowDate === riLiArr[i].date) {
        index = i
      }
    }

    axios.get(server.GetLessonForDay, {
      params: {
        time: thisDay
      }
    })
      .then(function (response) {
        if (response.data.data === null) {

        } else {
          for (let i = 0; i < response.data.data.LessonRecords.length; i++) {
            response.data.data.LessonRecords[i].LessonState = This.LessonStateFn(response.data.data.LessonRecords[i].LessonTime);
          }
          arr = response.data.data.LessonRecords;
        }

        This.setState({
          clickNum: 1,
          clickIndex: index,
          DayLessonRecords: arr,
          data: {year: nowYear, month: nowMonth, date: nowDate}
        })
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  quXiaoYuYue(index, LessonState, RecordID) {
    this.setState({index2: index, LessonState: LessonState, RecordID: RecordID, isShow2: true})
  }

  YueKeNoNext1(LessonState, RecordID) {
    let This = this;
    if (LessonState < 1440) {
      axios.get(server.CancelLessonCount)
        .then(function (response) {
          This.setState({isShow2: false, isShow3: true, times: response.data.data})
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      axios.get(server.CancelAttendLesson, {
        params: {
          attendLessonId: RecordID
        }
      })
        .then(function (response) {

        })
        .catch(function (error) {
          console.log(error);
        });
      history.go(0)
    }
  }

  YueKeNoNext4(RecordID) {
    let This = this;
    axios.get(server.CancelAttendLesson, {
      params: {
        attendLessonId: RecordID
      }
    })
      .then(function (response) {
        console.log(response);
        This.setState({isShow3: false})
      })
      .catch(function (error) {
        console.log(error);
      });
    // history.go(0)
  }

  render() {
    let state = this.state, {
      nowYear, nowMonth, nowDate, year, month, riLiArr, LessonRecords, DayLessonRecords, clickNum, clickIndex, data,
      isShow, isShow2, isShow3, times, teacherId, AttentionStatus, index, LessonState, RecordID
    } = state;
    return (
      <div>
        {isShow ? <LayerConfirm msg='确认要取消关注吗？' btntext="取消"
                                quxiaofun={this.QuXiaoGuanZhu1.bind(this, teacherId, AttentionStatus, index)}
                                closefun={() => this.setState({isShow: false})}/> : null}

        {isShow2 ? <LayerConfirm msg='确定取消本次预约？' btntext="暂不取消"
                                 quxiaofun={this.YueKeNoNext1.bind(this, LessonState, RecordID)}
                                 closefun={() => this.setState({isShow2: false})}/> : null}

        {isShow3 ? <LayerLessonTime btntext="暂不取消"
                                    times={times}
                                    quxiaofun={this.YueKeNoNext4.bind(this, RecordID)}
                                    closefun={() => this.setState({isShow3: false})}/> : null}

        <div className="zjb-rili">
          <div className="back" onClick={() => history.go(-1)}><span>&lt;</span><span>&#x3000;返回</span></div>
          <div className="line"></div>
          <div className="riliBox">
            <div className="rili">
              <div className="riliTop">
                <div className="title"><span
                  onClick={this.getUpMonth.bind(this)}>&lt;</span>&#x3000;{year}年{month}月&#x3000;
                  <span onClick={this.getNextMonth.bind(this)}>&gt;</span></div>
                <div className="btn" onClick={this.getNowDate.bind(this)}>到今天</div>
              </div>
              <div className="riliContent">
                <div className="xingqiBox">
                  <div className="xingqi">星期一</div>
                  <div className="xingqi">星期二</div>
                  <div className="xingqi">星期三</div>
                  <div className="xingqi">星期四</div>
                  <div className="xingqi">星期五</div>
                  <div className="xingqi">星期六</div>
                  <div className="xingqi">星期日</div>
                </div>
                <div className="dateBox">
                  {
                    riLiArr.map((data, index) => {
                        let arr = [];
                        return (
                          data.month === nowMonth ?
                            <div key={index}
                                 onClick={this.getTimeClass.bind(this, data, index)}
                                 className={nowYear === data.year && nowMonth === data.month && nowDate === data.date ? clickNum === 1 && index === clickIndex ? 'date borderColor bgColor' : 'date borderColor' : clickNum === 1 && index === clickIndex ? 'date bgColor' : 'date'}>
                              {data.date}
                              {nowYear === data.year && nowMonth === data.month && nowDate === data.date ?
                                <span className="nowDate">今</span> : null}
                              {LessonRecords.map((data2, index2) => {
                                  if (data.year === data2.year && data.month === data2.month && data.date === data2.date) {
                                    arr.push(data2)
                                  }
                                  if (data2.yearAndMonthAndDate < (data.year + "-" + data.month + "-" + data.date)) {
                                    if (arr.length > 1) {
                                      return (<span
                                        className="hourAndMinute hourAndMinute1 hourAndMinute3">{arr[0].hourAndMinutes}&#x3000;
                                        more</span>)
                                    } else if (arr.length === 1) {
                                      return (<span
                                        className="hourAndMinute hourAndMinute1 hourAndMinute2">{data2.hourAndMinutes}</span>)
                                    } else {
                                      return
                                    }
                                  } else {
                                    if (arr.length > 1) {
                                      return (<span className="hourAndMinute hourAndMinute3">{arr[0].hourAndMinutes}&#x3000;
                                        more</span>)
                                    } else if (arr.length === 1) {
                                      return (<span className="hourAndMinute hourAndMinute2">{data2.hourAndMinutes}</span>)
                                    } else {
                                      return
                                    }
                                  }


                                }
                              )}
                            </div>
                            :
                            <div key={index}
                                 className="dateGrey date">
                              {data.date}
                            </div>
                        )
                      }
                    )
                  }
                </div>
              </div>
            </div>
          </div>
        </div>

        {
          clickNum === 1 ?
            <p className="zjb-title">{data.year}年{data.month}月{data.date}日,您有{DayLessonRecords.length}节课</p> : null
        }

        <div className="smy_MyCourse_list">
          {this.state.DayLessonRecords.map((data, index) => {
            if (data.LessonTime > (this.state.data.year + "-" + this.state.month + "-" + this.state.date)) {
              return (
                <div key={index} className="smy_MyCourse_item">
                  <div className="smy_MyCourse_item_top">
                    <div className="left smyclearfix smy_MyCourse_item_courseName">
                      <div className="left">{data.BookName}</div>
                    </div>

                    {data.LessonState < 10 && data.LessonState > 0 ?
                      <div className="left smyclearfix smy_MyCourse_item_courseState">
                        <div className="right">即将开课</div>
                      </div>
                      :
                      data.LessonState < 0 && data.LessonState > (-30) ?
                        <div className="left smyclearfix smy_MyCourse_item_courseState">
                          <i className="left"/>
                          <div className="right">正在上课</div>
                        </div>
                        : null}

                    <div className="right smy_MyCourse_item_courseTime">{data.LessonTime}</div>
                  </div>
                  <div className="smyclearfix smy_MyCourse_item_bottom">
                    <div className="left smy_MyCourse_item_bottom_teacherImg"><img
                      src="../images/smy_part/smy_my_course/teacher2.jpg"/></div>
                    <div className="left smy_MyCourse_item_bottom_teacherImg_ri">
                      <div className="smyclearfix smy_MyCourse_item_bottom_teacherName">
                        <div className="left">{data.EnglishName}</div>
                        {data.Sex === -1 ? '未设置' : data.Sex === 1 ? <i className="left man"/> :
                          <i className="left woman"/>}
                      </div>
                      <div
                        className={data.AttentionStatus === 0 ? "smy_MyCourse_item_bottom_guanzhu_hong2" : "smy_MyCourse_item_bottom_guanzhu_bai2"}
                        onClick={this.guanZhu.bind(this, data.TeacherID, data.AttentionStatus, index)}>{data.AttentionStatus === 0 ? "关注" : "取消关注"}</div>
                    </div>
                    <div className="right smyclearfix smy_MyCourse_item_bottom_buttonBox">
                      {
                        data.Status === 1 ?
                          <div className="left smy_MyCourse_item_bottom_button_huang"
                               onClick={this.quXiaoYuYue.bind(this, index, data.LessonState, data.RecordID)}>
                            取消预约</div>
                          :
                          <div className="left smy_MyCourse_item_bottom_button_hui">取消预约</div>
                      }
                      <div className="left smy_MyCourse_item_bottom_button_ju">进入教室</div>
                    </div>
                  </div>
                </div>
              )
            } else {
              return (
                <div key={index} className="smy_MyCourse_item">
                  <div className="smy_MyCourse_item_top">
                    <div className="left smyclearfix smy_MyCourse_item_courseName">
                      <div className="left">{data.BookName}</div>
                    </div>

                    {data.LessonState < 10 && data.LessonState > 0 ?
                      <div className="left smyclearfix smy_MyCourse_item_courseState">
                        <div className="right">即将开课</div>
                      </div>
                      :
                      data.LessonState < 0 && data.LessonState > (-30) ?
                        <div className="left smyclearfix smy_MyCourse_item_courseState">
                          <i className="left"/>
                          <div className="right">正在上课</div>
                        </div>
                        : null}

                    <div className="right smy_MyCourse_item_courseTime">{data.LessonTime}</div>
                  </div>
                  <div className="smyclearfix smy_MyCourse_item_bottom">
                    <div className="left smy_MyCourse_item_bottom_teacherImg"><img
                      src="../images/smy_part/smy_my_course/teacher2.jpg"/></div>
                    <div className="left smy_MyCourse_item_bottom_teacherImg_ri">
                      <div className="smyclearfix smy_MyCourse_item_bottom_teacherName">
                        <div className="left">{data.EnglishName}</div>
                        {data.Sex === -1 ? '未设置' : data.Sex === 1 ? <i className="left man"/> :
                          <i className="left woman"/>}
                      </div>
                      <div
                        className={data.AttentionStatus === 0 ? "smy_MyCourse_item_bottom_guanzhu_hong2" : "smy_MyCourse_item_bottom_guanzhu_bai2"}
                        onClick={this.guanZhu.bind(this, data.TeacherID, data.AttentionStatus, index)}>{data.AttentionStatus === 0 ? "关注" : "取消关注"}</div>
                    </div>
                  </div>
                </div>
              )
            }
          })
          }

        </div>


      </div>
    )
  }
}

export default RiLi;
