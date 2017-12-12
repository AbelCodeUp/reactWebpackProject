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
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import ServerUrl from '../config/server';

import '../styles/xjr_prerson.css'
import '../styles/xjr_base.css'
// import '../comon/date/calendar.css'
import xjr_hr from '../images/xjr/xjr_hr.png'
import xjr_person_image from '../images/xjr/xjr_person_image.png'
// import '../comon/date/z.src'
// import '../comon/date/ui'



export default class MyPersonInfo extends React.Component {
    constructor() {
        super()
        this.state = {
            phone: '',
            Ename: 'student',
            Cname: '',
            fathername:'',
            birth: '',
            sex: '',
            time: new Date(),
            isOpen: false,
            provinceItems: [],
            cityItems: [],
            provinceId: '',
            cityId: '',
            //保存成功
            saveSuc: false,
            startDate: moment()
        }
    }
    
    componentDidMount() {
        let that = this;
        axios.get(ServerUrl.GetStudentInfo)
        .then(function(res) {
          let info = res.data.data
          console.log(info.Birthday)
          that.setState({
            touxiang:'',
            phone: info.Phone,
            Ename: info.EnglistName,
            Cname: info.RealName,
            fathername:info.FatherName,
            sex: info.Sex,
            birth: info.Birthday,
            address: info.Address,
            provinceId: info.ProvinceID,
            cityId: info.CityID,
            startDate: moment(info.Birthday)
            
          })
        }).catch(function(error) {
          console.log(error);
        });
        
        setTimeout(function() { //为了异步获取省市ID
            //获取省
            axios.get(ServerUrl.GetProvinceList).then(function(res) {
      
              let items = [<option value='10000'>请选择</option>];
              res.data.data.forEach(function(item, index) {
                if (that.state.provinceId == item.ProvinceID) {
                  //   alert(1)
                  items.push(<option key={index} value={item.ProvinceID} selected="selected">{item.ProvinceName}</option>)
                } else {
                  items.push(<option key={index} value={item.ProvinceID}>{item.ProvinceName}</option>)
                }
      
              })
              console.log(items)
              that.setState({provinceItems: items})
            }).then(function() {
              //   获取初始市(异步)
              // var beginCity=this.state.provinceId
              axios.get(ServerUrl.GetCityList, {
                params: {
                  provinceID: that.state.provinceId
                }
              }).then(function(res) {
                console.log(res.data.data)
                let items = [];
                that.setState({cityItems: []})
                res.data.data.forEach(function(item, index) {
                  if (that.state.cityId == item.CityID) {
                    items.push(<option key={index} value={item.CityID} selected='selected'>{item.CityName}</option>)
                  } else {
                    items.push(<option key={index} value={item.CityID}>{item.CityName}</option>)
                  }
      
                })
      
                that.setState({cityItems: items})
              }).catch(function(error) {
                console.log(error);
              });
            }).catch(function(error) {
              console.log(error);
            });
            
      
          }, 0)
      
           
    }
    
    EnameChange(event) {
        this.setState({Ename: event.target.value})
    }
    CnameChange(event) {
        this.setState({Cname: event.target.value})
    }
    fathernameChange(event){
        this.setState({fathername: event.target.value})
    }
    birthChange(event){
        this.setState({birth: event.target.value})
    }
    becomeGirl() {
        this.setState({sex: 1})
    }
    becomeBoy() {
        this.setState({sex: 0})
        
    }
    setCity() {
        let that = this;
        let cityIdIndex = this.refs.city.selectedIndex;
        let cityId = this.refs.city.options[cityIdIndex].value;
        this.setState({cityId: cityId});
        console.log(this.state.provinceId + "-----" + this.state.cityId)
    }
    selectCity() {

        //获取市
        let that = this;
        let ProvinceIdIndex = this.refs.province.selectedIndex;
        let ProvinceId = this.refs.province.options[ProvinceIdIndex].value;
        this.setState({provinceId: ProvinceId})
        axios.get(ServerUrl.GetCityList, {
        params: {
            provinceID: ProvinceId
        }
        }).then(function(res) {
        let items = [];
        that.setState({cityItems: []})
        res.data.data.forEach(function(item, index) {
            items.push(<option key={index} value={item.CityID}>{item.CityName}</option>)
        })
        console.log(items)
        that.setState({cityItems: items})
        }).catch(function(error) {
        console.log(error);
        });
        this.refs.city.options[0].selected = true;
    }
    SaveInfo() {
        // alert(this)
        var that = this;
        // if (this.state.Ename == '') {
        //   document.getElementById('Ename').placeholder = "英文名不能为空"
        //   return
        // }
        // if (this.state.Cname == '') {
        //   document.getElementById('Cname').placeholder = "中文名不能为空"
        //   return
        // }
        axios.post(ServerUrl.PostStudentInfo, {
          "EnglistName": that.state.Ename,
          "RealName": that.state.Cname,
          "Sex": that.state.sex,
          "FatherName":that.state.fathername,
          "Birthday": that.state.startDate._i,
          "ProvinceID": that.state.provinceId,
          "CityID": that.state.cityId
        }).then(function(res) {
          that.setState({saveSuc: true})
          setTimeout(function() {
            that.setState({saveSuc: false})
          }, 1000)
        }).catch(function(error) {
          console.log(error);
        });
    }

    handleChange(date) {
        let that=this;
        this.setState({
            startDate:moment(date._d.toLocaleString())
        });
        setTimeout(function(){
            let xxx=that.state.startDate._i;
               let date=xxx.split(' ')[0].split('/')
               let xjr_y = date[0]
               let xjr_m = date[1].length == 2
                 ? date[1]
                 : "0" + date[1]
               let xjr_d = date[2].length == 2
                 ? date[2]
                 : "0" + date[2]
               let cdate = xjr_y + "-" + xjr_m + "-" + xjr_d
                console.log(cdate)
       
               that.setState({
                   startDate:moment(cdate)
               })
        },0)
    }
    handleSelect(date){
    }
    render() {
       let webPhone=this.state.phone;
       webPhone=webPhone.split('')
       webPhone.splice(3,4,'****')
       webPhone.join(''); 
    //    console.log(this.state.startDate)
        return (
            <div className="xjr_infoBox">
                <p className="xjr_yuyue_title">基本信息</p>
                <img className="xjr_yuyue_hr" src={this.state.touxiang||xjr_hr} alt=""/>
                {/* <img className="xjr_info_img" src={xjr_person_image} alt=""/> */}
                <div className='xjr_info_img'>
                     <img src={xjr_person_image} alt=""/>
                </div>
                <div className="xjr_inputBox">
                    <p className="xjr_info_name">账号 <span>{webPhone}</span></p>
                    <div className="xjr_info_title">
                        宝贝姓名   <input className="xjr_info_input" maxLength="10" value={this.state.Cname} onChange={this.CnameChange.bind(this)} type="text" placeholder="请输入宝贝姓名"/>
                    </div>
                    <div className="xjr_info_title">
                        宝贝英文名   <input className="xjr_info_input" maxLength="20" value={this.state.Ename} onChange={this.EnameChange.bind(this)} type="text" placeholder="请输入宝贝英文名"/>
                    </div>
                    <div className="xjr_info_title">
                    宝贝生日<DatePicker className="xjr_info_input"
                        placeholderText="请选择宝贝生日"
                        locale="zh-cn"
                        selected={this.state.startDate}
                        onSelect={this.handleSelect.bind(this)}
                        onChange={this.handleChange.bind(this)}
                        dateFormat="YYYY-MM-DD"
                    />
                        {/* 宝贝生日   <input id="date1" className="xjr_info_input" type="text" value='2017-10-11' onChange={this.birthChange.bind(this)} placeholder="请设置宝贝生日"/> */}
                    </div>
                    <div className="xjr_info_title">
                        宝贝性别   
                        <div className="xjr_info_sex">
                            <label><input onChange={this.becomeGirl.bind(this)} className="xjr_rdos" name="Sex" checked={this.state.sex==1?'checked':''} type="radio" value="1" />男 </label> 
                            <label ><input onChange={this.becomeBoy.bind(this)} className="xjr_rdos" name="Sex" checked={this.state.sex==0?"checked":''} type="radio" value="0" />女 </label> 
                        </div>
                    </div>
                    <div className="xjr_info_title">
                        家长姓名<input className="xjr_info_input" maxLength="10" value={this.state.fathername} onChange={this.fathernameChange.bind(this)} type="text" placeholder="请输入家长姓名"/>
                    </div>
                    <div  className="xjr_info_title">
                        所在地
                        <p className="xjr_info_sex">
                            {/* <select className="xjr_info_add">
                                    <option>北京市</option>
                                    <option>北京市</option>
                            </select>
                            <span>&nbsp;&nbsp;</span>
                            <select className="xjr_info_add">
                                    <option>北京市</option>
                                    <option>海淀区</option>
                            </select> */}
                            <select  className="xjr_info_add" ref="province" onChange={this.selectCity.bind(this)}>
                                {this.state.provinceItems}
                            </select>
                            <span>&nbsp;&nbsp;</span>
                            <select  className="xjr_info_add" ref="city" onChange={this.setCity.bind(this)}>
                                <option>请选择</option>
                                {this.state.cityItems}
                            </select>
                        </p>
                    </div>
                </div>
                <div onClick={this.SaveInfo.bind(this)} className="xjr_save_info">保存</div>
            </div>
               
        )
    }
}
