import React, {Component} from 'react';
import '../styles/smy_part2.css';
import '../styles/smy_base_20171130_2.css'
import axios from 'axios';
import {
  Link,
  Router,
  IndexRoute,
  Route,
  Redirect,
  hashHistory,
  IndexRedirect
} from 'react-router';
import server from '../config/server'

class MyLesson extends Component {
  constructor() {
    super();
    this.state = {
      LessonRecords: [],
      LessonRecords2: []
    }
  }

  componentDidMount() {
    let TotlePage = '';
    let arr = [];
    let arr2 = [];
    let This = this;

    //未完成
    axios.get(server.GetLessonRecords, {//获取我的学习记录
      params: {
        status: 1,
        pageIndex: 1
      }
    })
      .then(function (response) {

        TotlePage = response.data.data.TotlePage;
        for (let i = 0; i < TotlePage; i++) {

          axios.get(server.GetLessonRecords, {
            params: {
              status: 1,
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
              This.setState({LessonRecords: arr})
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

    //已完成
    axios.get(server.GetLessonRecords, {
      params: {
        status: 2,
        pageIndex: 1
      }
    })
      .then(function (response) {
        TotlePage = response.data.data.TotlePage;
        for (let i = 0; i < TotlePage; i++) {


          axios.get(server.GetLessonRecords, {
            params: {
              status: 2,
              pageIndex: i + 1
            }
          })
            .then(function (response) {
              for (let j = 0; j < 10; j++) {
                if (response.data.data.LessonRecords[j] === undefined) {

                } else {
                  arr2.push(response.data.data.LessonRecords[j])
                }
              }
              This.setState({LessonRecords2: arr2})
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      })
  }

  render() {
          // console.log(this.state.LessonRecords2)
    return (
      <div>
        <div className="smy_MyCourse">
          <div className="smyclearfix smy_MyCourse_title">
            <div className="left smy_MyCourse_title_tab">
              <Link activeClassName="smy_MyCourse_title_tab_cur" to="/learncenter/mylesson/unfinish">我的课程({this.state.LessonRecords.length>99?'99+':this.state.LessonRecords.length})</Link>
             <Link activeClassName="smy_MyCourse_title_tab_cur" to="/learncenter/mylesson/finisheds">历史课程({this.state.LessonRecords2.length>99?'99+':this.state.LessonRecords2.length})</Link>
            </div>
            <div className="smy_MyCourse_rili_button">
              <i/>
              <Link to="/learncenter/rili">课表日历</Link>
            </div>
          </div>

          {
            this.props.children
          }
        </div>
      </div>
    )
  }
}

export default MyLesson;
