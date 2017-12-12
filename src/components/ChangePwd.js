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
import '../styles/xjr_changePwd.css'
import '../styles/xjr_base.css'
// import '../styles/xjr_fqwc.css';
// import WuDingdan from '../images/xjr_wudingdan.png'
import xjr_hr from '../images/xjr/xjr_hr.png'


export default class ChangePwd extends React.Component {
    constructor() {
        super()
        this.state = {
           oldPwd:'',
           newPwd:'',
           againPwd:'',
           mimacuowu:false,
           qurencuowu:false
        }
    }
    
    componentDidMount() {
        
        
    }
    oldPwdChange(event){
        this.setState({oldPwd: event.target.value})
       
    }
    newPwdChange(event){
        this.setState({newPwd: event.target.value})
    }
    againPwdChange(event){
        this.setState({againPwd: event.target.value})
    }
    CHANGE(){
        let that=this;
        this.setState({
            qurencuowu:false
        })
        if(this.state.newPwd!==this.state.againPwd){
            this.setState({
                qurencuowu:true
            })
            return
        }
        let reg=/^[0-9A-Za-z]{6,20}$/;
        let flag1 = reg.test(this.state.oldPwd);
        let flag2 = reg.test(this.state.newPwd);
        if(!flag1){
            return alert('密码必须由6-12位字母或数字组成')
        }
        if(!flag2){
            return alert('新密码必须由6-12位字母或数字组成')
        }
        axios.post(ServerUrl.ChangePwdByWeChat, {
            "OldPwd": that.state.oldPwd,
            "NewPwd": that.state.newPwd
          }).then(function(res) {
              console.log(res.data)
              that.setState({
                mimacuowu:false
              })
              if(res.data.result==-1){
                  that.setState({
                    mimacuowu:true
                  })
              }
              if(res.data.result==1){
                alert('密码修改成功')
            }
            // that.setState({saveSuc: true})
            // setTimeout(function() {
            //   that.setState({saveSuc: false})
            // }, 1000)
          }).catch(function(error) {
            console.log(error);
          });
    }
    render() {
       
        return (
            <div className="xjr_infoBox">
                <p className="xjr_yuyue_title">密码修改</p>
                <img className="xjr_yuyue_hr" src={xjr_hr} alt=""/>
                <div className="xjr_changePwd_box">
                    <div className="xjr_changePwd">
                        <div className="xjr_pwd_list">
                            <span>当前密码:</span><input className="xjr_pwd_input" type="password" value={this.state.oldPwd} onChange={this.oldPwdChange.bind(this)} placeholder="6-12位字母或数字组成"/>
                            {this.state.mimacuowu?<p className="xjr_mimacuowu">当前密码输入错误</p>:''}
                        </div>
                        <div className="xjr_pwd_list">
                            <span>新密码:</span> <input className="xjr_pwd_input" type="password" value={this.state.newPwd} onChange={this.newPwdChange.bind(this)}  placeholder="6-12位字母或数字组成" />
                        </div>
                        <div className="xjr_pwd_list">
                            <span> 确认密码:</span><input className="xjr_pwd_input" type="password" value={this.state.againPwd} onChange={this.againPwdChange.bind(this)}  placeholder="6-12位字母或数字组成"/>
                            {this.state.qurencuowu?<p className="xjr_querencuowu">两次密码输入不一致</p>:''}
                            {/* <p className="xjr_querencuowu">两次密码输入不一致</p> */}
                        </div>
                        <div className="xjr_qrchange" onClick={this.CHANGE.bind(this)}>确认修改</div>
                    </div>
                    
                </div>
            </div>
        )
    }
}
