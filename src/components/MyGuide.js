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
import axios from 'axios';
import ServerUrl from '../config/server';

import '../styles/xjr_guide.css'
import '../styles/xjr_base.css'
// import '../styles/xjr_fqwc.css';
// import WuDingdan from '../images/xjr_wudingdan.png'
import xjr_hr from '../images/xjr/xjr_hr.png'
import xjr_guide from '../images/xjr/xjr_guide.png'



export default class MyGuide extends React.Component {
    constructor() {
        super()
        this.state = {
           
        }
    }
    
    componentDidMount() {
       
   }
   
  
    render() {
       
       
        return (
            <div className="xjr_infoBox">
                <p className="xjr_yuyue_title">新手引导</p>
                <img className="xjr_yuyue_hr" src={xjr_hr} alt=""/>
                {/* <img className="xjr_guide_video" src={xjr_guide} alt=""/> */}
                <video controls src="movie.ogg" poster={xjr_guide} className="xjr_guide_video" >Your browser does not support the video tag.</video>
                <div className="xjr_guide_text">
                    <div className="xjr_text_know">
                        亲爱的家长，首次上课前请了解以下几件事~
                    </div>
                    <p className="xjr_text_title">1、预约课程 </p> 
                    <p className="xjr_text_content"> 需要至少提前2小时预约，提前规划好时间后，在学习中心找到【预约课程】选择上课日期、时间、老师后点击【预约】。</p>
                    
                    <p className="xjr_text_title">2、上课前的准备 </p> 
                    <p className="xjr_text_content">① 设备齐全、网络稳定、环境安静的情况下，使用谷歌浏览器 <a href="#" className="xjr_guide_href">【点击下载】</a>进入GoGoTalk 官网，在线上课。</p>
                    <p className="xjr_text_content">② 提前进入学习中心选择【我的课表】——【我的课程】——【预习课件】预习教材。</p>
                    
                    <p className="xjr_text_title">3、正式上课</p> 
                    <p className="xjr_text_content">① 学习中心首页找到即将开课的课程，提前10分钟点击【进入教室】。</p>
                    <p className="xjr_text_content">② 进入教室后遇到技术类问题可在学习中心点击<a href="#" className="xjr_guide_href">【在线技术支持】</a>联系技术人员。</p>

                    <p className="xjr_text_title">4、取消课程</p> 
                    <p className="xjr_text_content">① 学习中心 ——【我的课表】选择要取消的课程点击【取消预约】。</p>
                    <p className="xjr_text_content">② 规则：课前需至少提前2小时取消课程，课前24小时内一个月（自然月）有3次免费取消的机会，超出3次后每课前24小时内</p>
                    <p className="xjr_text_content xjr_text_content1">取消课程将会扣除相应的课时费。</p>

                    <p className="xjr_text_title">5、复习课程</p> 
                    <p className="xjr_text_content">学习中心 ——【我的课表】——【历史课程】——【复习课件】。</p>

                    <p className="xjr_text_title">6、录像回放</p> 
                    <p className="xjr_text_content"> 学习中心 ——【我的课表】——【历史课程】——【回放】。</p>

                    <p className="xjr_text_title">7、售后服务</p> 
                    <p className="xjr_text_content">① 专属助教老师，定期发送学习周报和课堂录像锦集，随时跟踪宝贝学习情况。</p>
                    <p className="xjr_text_content">② 每节课后，外教会根据学生课堂表现作出评价，保证学习效果及进度。</p>
                    <p className="xjr_text_content">③ 课程结束24小时后有录像回放，便于家长了解宝贝上课情况和宝贝复习。</p>
                    <p className="xjr_text_content">④ 为学员提供阶段性英语水平测评，保证学习效果。</p>
                    <p className="xjr_text_content">⑤ 同时提供睡前故事、公开课、英文绘本、英文儿歌、文化科普辅助学习。</p>

                    <p className="xjr_text_title">8、我们的服务时间</p> 
                    <p className="xjr_text_content">助教老师上班时间：周一至周五：13:00-21:00；周六、日：10:00-21:00</p>
                    <p className="xjr_text_content">在此时间外，如您需要咨询请留言给助教老师，紧急情况可致电4008787276，会有在线值班的助教老师帮您解决问题！在线助教</p>
                    <p className="xjr_text_content">上班时间：8:00-22:00</p>

                    <p className="xjr_text_title">9、学习联盟</p> 
                    <p className="xjr_text_content">若您对我们的课程和服务满意，欢迎推荐朋友共同加入GoGoTalk学习，我们将为您的朋友安排一次免费的体验课程。</p>
                    <p className="xjr_text_content xjr_guide_href">若您的朋友成功报名课程，推荐人和被推荐人都有赠课哦~</p>
                </div>
            
            
            </div>
        )
    }
}
