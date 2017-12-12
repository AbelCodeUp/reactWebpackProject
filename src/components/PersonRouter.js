import React from 'react';
import ReactDOM from 'react-dom';
import {
  Link
} from 'react-router';

export default class PersonRouter extends React.Component {
  render() {
    return (<div>
      <div className="smy_wapper smyclearfix">
        {/* <!--left--> */}
        <div className="left smy_left_part">
            {/* <!--左侧 学习中心 此处通过jq修改选中样式--> */}
            <ul className="smy_left_x_nav">
                <Link to="/personcenter/mypersoninfo" activeClassName="smy_left_x_cur" >基本信息</Link>
                <Link to="/personcenter/changepwd" activeClassName="smy_left_x_cur" >密码修改</Link>
                <Link to="/personcenter/myclass" activeClassName="smy_left_x_cur" >我的课时</Link>
                <Link to="/personcenter/myclass" activeClassName="smy_left_x_cur" >我的订单</Link>
                <Link to="/personcenter/myguide" activeClassName="smy_left_x_cur" >新手引导</Link>
            </ul>
            <div className="smy_left_bottom">
                <p>当前时间</p>
                <p>16:25:25</p>
            </div>
        </div>
        {/* <!--right--> */}
        <div className="left smy_right_part">
            {/* <!--右侧头部背景--> */}
            <div className="smy_right_part_bg1"></div>
            <div className="smy_right_part_relbox">
                {/* <!--请在此处添加内容--> */}
                {
                  this.props.children
                }
            </div>
            <div className="smy_right_part_bg2"></div>
        </div>
    </div>
    </div>)
  }
}
