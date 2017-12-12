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

import '../styles/xjr_myClass.css'
import '../styles/xjr_base.css'
// import '../styles/xjr_fqwc.css';
// import WuDingdan from '../images/xjr_wudingdan.png'
import xjr_hr from '../images/xjr/xjr_hr.png'



export default class MyClass extends React.Component {
    constructor() {
        super()
        this.state = {
            LessonList:[],
            classInfo:{
                leaveClass:0,
                totalClass:0,
                leaveTime:0,
                buyClass:0,
                giveClass:0,
                percent:'0%'
            }
        }
    }
    
    componentDidMount() {
        var that=this;
        axios.get(ServerUrl.GetClassHourPage, {//课时记录
            params: {
                pageIndex:1,
                pageSize:10
            }
          })
          .then(function (res) {
            that.setState({
                LessonList:res.data.data.LessonHistory
            })

          })
          .catch(function (error) {
            console.log(error);
          });

        axios.get(ServerUrl.GetLessonStock)//课时信息
          .then(function (res) {
              let ClassInfo=res.data.data.LessonStock
              console.log(ClassInfo)
              that.setState({
                classInfo:{
                    leaveClass:ClassInfo.StudentLesson-ClassInfo.TotalUsed,//剩余课时
                    totalClass:ClassInfo.StudentLesson,//总课时
                    leaveTime:ClassInfo.SurplusCount,//剩余有效期
                    buyClass:ClassInfo.StudentLesson-ClassInfo.TotalGiveLesson,//购买课时
                    giveClass:ClassInfo.TotalGiveLesson,//赠送课时
                    percent:ClassInfo.Percent//百分比
                }
            })

          }).then(function(){
            that.drawProcess(84)
        
          })
          .catch(function (error) {
            console.log(error);
          });
        
    }
    toPoint(percent){
        let str=percent.replace("%","");
        str= str/100;
        return str;
    }
    drawProcess(w) { 
        let canvasProcess=document.getElementsByClassName('process')[0];
       var text = canvasProcess.innerHTML;  
       var process = text.substring(0, text.length-1);  
       let canvas = canvasProcess;  
       var context = canvas.getContext('2d');  
       context.clearRect(0, 0, w, w);  
       context.beginPath();  
       context.moveTo(w/2, w/2);  
       context.arc(w/2, w/2, w/2, 0, Math.PI * 2, false);  
       context.closePath();  
       context.fillStyle = '#EF9196';  
       context.fill();  
       // 画进度  
       context.beginPath();  
       context.moveTo(w/2, w/2);  
       context.arc(w/2, w/2, w/2, 3*Math.PI/2, Math.PI * 2 * process / 100+Math.PI*3/2, false);  
       context.closePath();  
       context.fillStyle = '#E63E46';  
       context.fill();  
 
       // 画内部空白  
       context.beginPath();  
       context.moveTo(w/2, w/2);  
       context.arc(w/2, w/2, w/2-10, 0, Math.PI * 2, true);  
       context.closePath();  
       context.fillStyle = 'rgba(255,255,255,1)';  
       context.fill();  
         
        // 画一条线  
       context.beginPath();  
       context.arc(w/2, w/2, w/2-12, 0, Math.PI * 2, true);  
       context.closePath();  
           // 与画实心圆的区别,fill是填充,stroke是画线  
       context.strokeStyle = '#ddd';  
       context.stroke();  
           //在中间写字  
       context.font = "bold 9pt Arial";  
       context.fillStyle = '#e74c3c';  
       context.textAlign = 'center';  
       context.textBaseline = 'middle';  
       context.moveTo(w/2, w/2);  
       context.fillText(text, w/2, w/2);  
   }
   
   createLesson(Lessonlist){
    let brr=[]
    console.log(Lessonlist.length)
    if(Lessonlist.length==0){
        brr.push(
            <div className="xjr_noClass">
            没有课时记录
        </div>
        )
    }else{
         Lessonlist.forEach((item,index,arr)=>{
            brr.push(
                // <div className="xjr_note_item">
                //     <p className="xjr_note_itemName">{item.TypeName}</p>
                //     <p className="xjr_note_itemVal">{item.Hours}</p>
                //     <p className="xjr_note_itemTime">{item.CreateTime}</p>
                // </div>
            
                <div className="xjr_note_item" key={ index }>
                    <p  className="xjr_item_type">{item.TypeName}</p>
                    <p className="xjr_item_rednum">{item.Hours}</p>
                    <p className="xjr_note_time">{item.CreateTime}</p>
                </div>
            )
        })
     }
    return brr
}

    render() {
        let percent=this.state.classInfo.percent
        let LastPercent = ((1-this.toPoint(percent))*100).toFixed(0)+'%';
       
        return (
            <div className="xjr_infoBox">
                    <p className="xjr_yuyue_title">我的课时</p>
                    <img className="xjr_yuyue_hr" src={xjr_hr} alt=""/>
                    <div className="xjr_myClass_box">
                        <div className="xjr_myClass">
                            <div className="xjr_class_info">
                                <div className="xjr_info_canvas">
                                    <canvas className="process" width="84px" height="84px">{LastPercent}</canvas>
                                    <p className="xjr_leaveClass">剩余课时：<span>{this.state.classInfo.leaveClass}</span></p>  
                                </div>
                                <div className="xjr_info_num">
                                    <p className="xjr_buyclass">
                                        购买课时：<span>{this.state.classInfo.buyClass}</span>
                                        赠送课时：<span>{this.state.classInfo.giveClass}</span>
                                        剩余：<span>{this.state.classInfo.leaveClass}</span>
                                        剩余有效期：<span>{this.state.classInfo.leaveTime}天</span>
                                    </p>
                                    {/* <p className="xjr_giveclass">
                                        赠送课时：<span>{this.state.classInfo.giveClass}</span>
                                        剩余：<span>200</span>
                                        剩余有效期：<span>200天</span>
                                    </p> */}
                                </div>
                            </div>
                            <div className="xjr_class_note">
                                <div className="xjr_note_head">
                                    课时记录
                                </div>
                                <div className="xjr_note_main">
                                    {/* <div className="xjr_note_item">
                                        <p className="xjr_item_type">赠课</p>
                                        <p className="xjr_item_rednum">+1</p>
                                        <p className="xjr_note_time">2017-11-11 09:30</p>
                                    </div>
                                    <div className="xjr_note_item">
                                        <p  className="xjr_item_type">购买课时</p>
                                        <p className="xjr_item_rednum">+360</p>
                                        <p className="xjr_note_time">2017-11-11 09:30</p>
                                    </div>
                                    <div className="xjr_note_item">
                                        <p  className="xjr_item_type">约课</p>
                                        <p>-1</p>
                                        <p className="xjr_note_time">2017-11-11 09:30</p>
                                    </div> */}
                                    {
                                        this.createLesson(this.state.LessonList)
                                    }
                                    {/* <div className="xjr_noClass">
                                        没有课时记录
                                    </div> */}
                                </div>
                                {/* <div className="xjr_noClass">
                                    没有课时记录
                                </div> */}
                            </div>
                        </div>
                        
                    </div>
                </div>
        )
    }
}
