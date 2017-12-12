import React, {Component} from 'react';
import '../styles/lhb-choose-data.css';
import axios from 'axios';
import manImg from '../images/lhb/man.png';
import womanImg from '../images/lhb/woman.png'
import teacherImg from '../images/lhb/teacher.png';
import yuyueImg from '../images/lhb/lhb-yuyue.png';
import radioImg from '../images/lhb/lhb-radio.png';
import radio1Img from '../images/lhb/lhb-radio1.png';
import noteacher from '../images/lhb/lhb-noteacher.png'
import server from '../config/server';
import {Link} from 'react-router';
import {LayerConfirm,LayerYuYue,LayerLessonSuccess} from './Dialog'
const url = 'http://testapi.gogo-talk.com';
// const url = 'http://192.168.0.101:803';
class ChooseDate extends Component{
    constructor(){
        super();
        this.state ={
            //日期数据
            dateArr:[],
            days:null,
            isActive:0,
            //时间数据
            timeArr:[],
            isTimeActive:-1,
            times:null,
            sex:0,
            teacherName:'',
            //老师数据
            TeacherArr:[],


            //windows
            guanzhuWindows:false,

            guanzhuStatus:'',
            guanzhuID:'',

            yuyueWindows:false,
            teachername:'',
            lessonname:'',
            windowsTime:'',
            teacherImg:'',
            yuyueID:'',


            yuyueSuccessWindows:false
        }

    }

    //毫秒格式化
    formatDate(str){  
            function getzf(num){  
                if(parseInt(num) < 10){  
                    num = '0'+num;  
                }  
                return num;  
            }  
            var oDate = new Date(str),  

            oYear = oDate.getFullYear(),  
            oMonth = oDate.getMonth()+1,  
            oDay = oDate.getDate(),  
            oHour = oDate.getHours(),  
            oMin = oDate.getMinutes(),  
            oSen = oDate.getSeconds(),  
            oTime = oYear +'-'+ getzf(oMonth) +'-'+ getzf(oDay) +' '+ getzf(oHour) +':'+ getzf(oMin) +':'+getzf(oSen);//最后拼接时间  
            return oTime;  
    };  
        
    //设置两周的时间
    setTwoWeek(serverTime){
        
        let nowDate = new Date(serverTime);
        let dataArrs = [];
        const weekArr = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
        for (let i = 0; i < 14; i++) {
            let futDate = new Date(nowDate);
            futDate.setDate(nowDate.getDate() + i);

            let m = (futDate.getMonth() + 1) < 10 ? '0' + (futDate.getMonth() + 1) : (futDate.getMonth() + 1);
            let d = futDate.getDate() < 10 ? '0' + futDate.getDate() : futDate.getDate();
            let timeStr = futDate.getFullYear() + "-" + m + "-" + d;
            let dateStr = m + "-" + d;
            dataArrs.push({
                data: dateStr,
                week: weekArr[futDate.getDay()],
                time: timeStr,
                val: i
            });
        }
        this.setState({
            dateArr: dataArrs,
            days: dataArrs[0].time
        })

    }

    //获取可以约的课时间表
    getGetTch_Lesson(time){
        axios.get(server.GetTch_Lesson, {
              params: {
                LessonTime:time
              }
            })
              .then( (res)=> {
                let tatalTime = res.data.data;
                let timeArr1 = [].concat.apply([],tatalTime)
                this.setState({
                    timeArr:timeArr1
                })
                // 判断第一个红色
                let flag = true;
                let flag1 = false;
                timeArr1.map((d,i)=>{
                    if(d.Status == 1 && flag){
                        this.setState({
                            isTimeActive:i,
                            times:d.Time
                        })
                        flag =false;
                        flag1 = true;
                    }
                })
                // 判断是否有可以点击的时间
                if(flag1){
                    let teacherTime = this.state.days + ' ' + this.state.times;
                    this.getGetTeacherLessons(teacherTime)
                }else{
                    this.setState({
                        TeacherArr:[]
                    })
                }

              })
              .catch((error) => {});
    }
    
    
    getGetTeacherLessons(time,sex,name){
         axios.get(server.GetTeacherLessons, {
          params: {
            time:time,
            sex:sex,
            name:name
          }
        })
          .then( (res)=> {
                let teacherarr = res.data.data?([].concat.apply([],res.data.data.TeacherLessons)):[];
                this.setState({
                    TeacherArr:teacherarr
                });
          })
          .catch((error) => {
            console.log(error);
          });
    }

    //点击日期
    handleClick(time,data,i){
        this.setState({
            // TeacherArr:[],
            // timeArr:[],
            days: time,
            isActive: i,
            sex:0,
            teacherName:'',
        });
        this.refs.all.src = radioImg;
        this.refs.man.src = radio1Img;
        this.refs.woman.src = radio1Img;
        //获取可以约的课时间表
        this.getGetTch_Lesson(time);
    }
    //点击时间
    handleTimeClick(time,i){
        this.setState({
            // TeacherArr:[],
            times: time,
            isTimeActive: i
        });
        let teacherTime = this.state.days + ' ' + this.state.times; 
        this.getGetTeacherLessons(teacherTime,this.state.sex,this.refs.teacherName.value)
    }

    getJoinAttendLesson(LessonTime,teacherId){
        axios.get(server.JoinAttendLesson, {
          params: {
            LessonTime:LessonTime,
            teacherId:teacherId
          }
        })
          .then( (res)=> {
                if (res.data.result==1) {
                    // alert('约课成功');
                    // let teacherTime = this.state.days + ' ' + this.state.times; 
                    // this.getGetTeacherLessons(teacherTime,this.state.sex,this.refs.teacherName.value)
                }
          })
          .catch((error) => {
            console.log(error);
          });
    }

    componentDidMount(){
        //获取系统时间 设置日期

        axios.get(server.GetSystemTime, {
          params: {}
        })
          .then( (res)=> {
            let nowTime = this.formatDate(res.data.data.Time*1000)
            this.setTwoWeek(nowTime);
          })
          //默认请求第一天时间数据
          .then((res)=>{
            this.getGetTch_Lesson(this.state.days)
          })
          //默认请求第一次老师数据
          .catch((error) => {
            console.log(error);
          });
    }


    //选择性别
    clickSex(sex){
        if (sex==0) {
            this.setState({
                sex:0
            })
            this.refs.all.src = radioImg;
            this.refs.man.src = radio1Img;
            this.refs.woman.src = radio1Img;
            let teacherTime = this.state.days + ' ' + this.state.times;
            this.getGetTeacherLessons(teacherTime,0,this.refs.teacherName.value);
        }else if(sex==1){
            this.setState({
                sex:0
            })
            this.refs.all.src = radio1Img;
            this.refs.man.src = radioImg;
            this.refs.woman.src = radio1Img;
            let teacherTime = this.state.days + ' ' + this.state.times;
            this.getGetTeacherLessons(teacherTime,1,this.refs.teacherName.value);
        }else if(sex==2){
            this.setState({
                sex:2
            })
            this.refs.all.src = radio1Img;
            this.refs.man.src = radio1Img;
            this.refs.woman.src = radioImg;
            let teacherTime = this.state.days + ' ' + this.state.times;
            this.getGetTeacherLessons(teacherTime,2,this.refs.teacherName.value);
        }
        
    }
    search(){
        let teacherTime = this.state.days + ' ' + this.state.times;
        this.getGetTeacherLessons(teacherTime,this.state.sex,this.refs.teacherName.value)
    }
    //预约课程
    yuyueClick(TeacherID,teachername,lessonname,windowsTime,teacherImg,yuyueID){
        console.log(TeacherID)
        this.setState({
            yuyueWindows:true,
            TeacherId:TeacherID,
            teachername:teachername,
            lessonname:lessonname,
            windowsTime:windowsTime,
            teacherImg:teacherImg,
            yuyueID:yuyueID
        })
        // let teacherTime = this.state.days + ' ' + this.state.times;
        // this.getJoinAttendLesson(teacherTime,TeacherID);
    }

    //点击确定预约
    yuyueOK(){
         let teacherTime = this.state.days + ' ' + this.state.times;
        this.getJoinAttendLesson(teacherTime,this.state.TeacherId);
        this.setState({
            yuyueWindows:false,
            yuyueSuccessWindows:true
        })
        window.setTimeout(() => {
            this.setState({
                yuyueSuccessWindows: false
            })
        }, 2000)
    }
    getAttentionTeacher(TeacherID,status,i){
        
         axios.get(server.AttentionTeacher, {
          params: {
            TeacherID:TeacherID,
            status:status
          }
        })
          .then( (res)=> {
            console.log(res.data);
            let teacherArr = this.state.TeacherArr;
            status==1?teacherArr[i].IsAttention=1:teacherArr[i].IsAttention=0;
            this.setState({
                TeacherArr:teacherArr
            })
          })
          .catch((error) => {
            console.log(error);
          });
    }
    // 点击取消关注出现弹窗
    cancleGuanzhu(TeacherId,guanzhuStatus,guanzhuID){
        this.setState({
            guanzhuWindows:true,
            TeacherId:TeacherId,
            guanzhuStatus:guanzhuStatus,
            guanzhuID:guanzhuID
        })
        // this.getAttentionTeacher(TeacherId,guanzhuStatus,guanzhuID)
    }
    // 点击确定取消
    quxiaoOK(){
        this.getAttentionTeacher(this.state.TeacherId,this.state.guanzhuStatus,this.state.guanzhuID);
        this.setState({
            guanzhuWindows:false
        })
    }
    render(){
        let { guanzhuWindows } = this.state;
        // 日期列表
        let twoWeek = this.state.dateArr;
        let weekItems = [];

       

        twoWeek.map((d,i)=>{
            // activeClass  红色 red    橙色 orange
            let activeClass = "";
            let selectClass = "";
            if (d.week == '周六' || d.week == '周日') {
                activeClass = 'orange'
            }else{
                activeClass = ''
            }
            if (this.state.isActive == i) {
                selectClass = 'red'
            } else {
                selectClass = ''
            }
            weekItems.push(
                <li key={i} className = {activeClass +' '+ selectClass} onClick={this.handleClick.bind(this, d.time, d.data, i)}>
                    <div>
                        <p>{d.week}</p>
                        <p>{d.data}</p>
                    </div>
                </li>
            )
        })
        // 时间列表
        let timeList = this.state.timeArr;
        let timeItems = [];
        // let flag = true;
      

        timeList.map((d,i) =>{
            let markClass = "";
            // let clickClass = "";
            // let overClass = "";
            let item = null ;

            if (d.Status == 2 ) {
                markClass = "mark";
            }else if(this.state.isTimeActive ==i){
                markClass = 'red';
            }else if(d.Status == -1){
                markClass = 'gray';
            }

            if (d.Status == 0 || d.Status ==-1) {
                item = <li key={i}><del>{d.Time}</del></li>
            }else{
                item = <li key={i} className = {markClass} onClick={this.handleTimeClick.bind(this, d.Time, i)}>{d.Time}</li>
            }

            timeItems.push(
                item
            )
        })

        //老师列表
        let teacherArr1 = this.state.TeacherArr;
        let teacherItems = [];
        
        teacherArr1.map((d,i)=>{
            let headImg = d.Sex==1? manImg:womanImg;
            teacherItems.push(
                <li key={i}>
                    <div>
                        <div className="lhb-teacher-top">
                            <div className="lhb-teacher-top-left">
                                <img src={d.HeaderImage} alt="" />
                            </div>
                            <div className="lhb-teacher-top-right">
                                <Link to={{pathname:"/learncenter/yuyueDetail",query:{TeacherId:d.TeacherId,HeaderImage:d.HeaderImage,EnglishName:d.EnglishName,IsAttention:d.IsAttention,Sex:d.Sex} }}><p>{d.EnglishName} <img src={headImg} alt="" /></p></Link>
                                <p>
                                    {
                                        d.IsAttention==0?<span onClick={this.getAttentionTeacher.bind(this,d.TeacherId,1,i)}>关注</span>:
                                        <span className="lhb-cancel" onClick={this.cancleGuanzhu.bind(this,d.TeacherId,0,i)}>取消关注</span>
                                    }
                                </p>
                            </div>
                        </div>
                        {/*<div className="lhb-teacher-bottom" onClick={this.yuyueClick.bind(this, d.TeacherId, i)}>*/}
                        <div className="lhb-teacher-bottom" onClick={this.yuyueClick.bind(this,d.TeacherId,d.EnglishName,'课程名字','时间',d.HeaderImage ,i)}>
                            <img src={yuyueImg} alt="" />
                        </div>
                    </div>
                </li>
            )
        })
        if (teacherArr1.length==0) {
            teacherItems.push(<div className="lhb-noteacher"><div><div><img src={noteacher} alt=""/></div><div className="lhb-notercher-con">老师已经被其他小伙伴约走了，下次早点来哦~</div></div></div>)
        }


        return (
            <div>
                <div className="lhb-top-title">
                    <div>预约课程</div>
                    <div><img src="images/lhb/xjr_hr.png" alt="" /></div>
                </div>

                 <div className="lhb-choose-data lhb-padding">
                    <div className="con">选择日期</div>
                        <ul>
                            {weekItems}
                        </ul>
                    </div>

                    <div className="lhb-choose-time lhb-padding">
                        <div className="con">选择时间<span> （注：<i>• </i>表示该时间点自己已经约过课了哦） </span></div>
                        <ul>
                            {timeItems}
                        </ul>
                    </div>

                    <div className="lhb-choose lhb-padding">
                         <div className="con">
                                <div className="lhb-choose-left">
                                    教师性别
                                    <span onClick={this.clickSex.bind(this,0)}><img src={radioImg} alt="" ref="all"/>全部</span>
                                    <span onClick={this.clickSex.bind(this,1)}><img src={radio1Img} alt="" ref="man"/>男</span>
                                    <span onClick={this.clickSex.bind(this,2)}><img src={radio1Img} alt="" ref="woman"/>女</span>
                                </div>
                                <div className="lhb-choose-right">
                                    <input type="text" ref="teacherName" placeholder="请输入老师名称" />
                                    <input type="button" value="搜索" onClick={this.search.bind(this)}/>
                                </div>
                         </div>
                    </div>

                    <div className="lhb-teacher-list lhb-padding">
                        <ul>
                            {teacherItems}
                        </ul>
                    </div>


                    <LayerConfirm msg='确定取消关注吗？' isShow={this.state.guanzhuWindows} btntext='取消'  closefun={()=>{this.setState({guanzhuWindows:false})}} quxiaofun={this.quxiaoOK.bind(this)}/>
                    <LayerYuYue 
                        isShow={this.state.yuyueWindows} 
                        time={this.state.windowsTime} 
                        teachername={this.state.teachername} 
                        lessonname={this.state.lessonname}  
                        teacherImg={this.state.teacherImg} 
                        btntext='取消' 
                        closefun={()=>{this.setState({yuyueWindows:false})}} 
                        callbackfun={this.yuyueOK.bind(this)}
                    />
                    <LayerLessonSuccess isShow={this.state.yuyueSuccessWindows} />
            </div>
        )
    }
}
export default ChooseDate;
