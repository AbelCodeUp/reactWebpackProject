import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import axios from 'axios';
require('styles/smy_base_20171130.css');

export default class IndexMain extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div>
      <div className="smy_base_top">
        {/* <!--黑线--> */}
        <span className="smy_base_top_xian smy_base_top_xian_l"></span>
        <span className="smy_base_top_xian smy_base_top_xian_r"></span>
        {/* <!--logo 请加连接--> */}
        <a className="left smy_base_top_logo" href="###"></a>
        {/* <!--头部导航 smy_top_cur为选中样式 此处通过jq修改选中样式--> */}
        <dl className="left smy_base_top_nav">
          <Link to="/learncenter" activeClassName="smy_top_cur">学习中心</Link>
          <dd className="left"></dd>
          <Link to="/personcenter" activeClassName="smy_top_cur">个人中心</Link>
          <dd className="left"></dd>
          <a href="javascript:;" className="left">公开课</a>
        </dl>
        {/* <!--头部右侧--> */}
        <div className="right smy_base_top_right">
          {/* <!--默认男头像，女头像为smy_top_img_nv.jpg--> */}
          <div className="left smy_base_top_img">
            <img src="images/smy_base/smy_top_img_nan.jpg"/>
          </div>
          <span className="left smy_base_top_jiantou"></span>
          {/* <!--下拉菜单 此处通过jq修改选中样式--> */}
          <div className="smy_base_top_meau">
            <p className="smy_base_top_meau_cur">我的课表</p>
            <p>我的课时</p>
            <p>我的订单</p>
            <p>退出登录</p>
          </div>
        </div>
      </div>
      {
        this.props.children
      }
      {/* <!--底部--> */}
      <div className="smy_footer">
          <p>GoGoTalk青少外教在线英语 www.gogo-talk.com 京ICP备15001014号-4</p><p>All Rights Reserved Copyright 2002-2017 笨鸟盛世(北京)教育科技有限公司 版权所有</p>
      </div>
      {/* <!--右侧悬浮--> */}
      <div className="smy_right_position">
          <img src={require("../images/smy_base/smy_right_po1.png")}/>
          <img src={require("../images/smy_base/smy_right_po2.png")}/>
          <img src={require("../images/smy_base/smy_right_po3.png")}/>
      </div>
    </div>)
  }
}
IndexMain.propTypes = {};
