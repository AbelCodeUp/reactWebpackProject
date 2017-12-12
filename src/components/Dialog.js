import React, {
	PropTypes
} from 'react';
import '../styles/dialog/smy_base_20171130.css';
import '../styles/dialog/smy_part.css';
import axios from 'axios';
import ServerUrl from '../config/server';

import x1 from '../images/dialog/smy_tanchuang/smy_tanchuang_xing1.png';
import x2 from '../images/dialog/smy_tanchuang/smy_tanchuang_xing2.png';
// type1:
//
export const Msg = (props) => {
	return (<div className="smy_tanchuang_box">
		{this.props.msg}
	</div>);
}

export const LayerSuccess = (props) => {
	return (<div className="smy_tanchuang_box smy_tanchuang_t_succ">
		<p>您已成功预约体验课，稍后会有客服联系您，</p>
		<p>请注意接听电话哦~</p>
	</div>);
}

export const LayerTuifei = (props) => {
	return (<div className="smy_tanchuang_box smy_tanchuang_tuifei">
		<p>您已发起退费申请，退费过程中您将不能进行</p>
		<p>约课和上课操作</p>
	</div>);
}
// <!--示例三：课程转化申请弹窗-->

export class LayerZhuanHua extends React.Component {
	constructor(props) {
		super(props);

	}

	render() {
		return (
			<div className="smy_tanchuang_box smy_tanchuang_zhuanhua">
			<div className="smy_tanchuang_zhuanhua_top">
				<p>亲爱的宝贝家长，您已于{time}发起了课程转化申请，现已转化为新的课程，祝您的宝贝学习愉快，新课程信息如下：</p>
				<div>
					<span>商品名称：</span>欧美转化</div>
				<div>
					<span>课时：</span>300课时</div>
				<div>
					<span>课时有效期：</span>360天</div>
				<div>
					<span>赠送课时：</span>10</div>
			</div>
			<button className="smy_tanchuang_but_big_hong">我知道了</button>
		</div>);
	}
}

// <!--示例四：取消提示弹窗 确认预约试听课-->
export class LayerConfirm extends React.Component {
	constructor(props) {
		super(props);
		console.log(props.isShow);
		this.state = {
			nShow: props.isShow
		}
	}

	render() {
		const {
			quxiaofun,
			msg,
			closefun,
			btntext,
			isShow
		} = this.props;
		let {
			nShow
		} = this.state;
		console.log(nShow);
		let show = {
			display: isShow ?
				'block' : 'none'
		};

		return (
			<div className="smy_tanchuang_box smy_tanchuang_quguan" style={show}>
			<div className="smy_tanchuang_quguan_top">
				<p>{msg}</p>
			</div>
			<div className="smy_tanchuang_buttonBox">
				<button className="smy_tanchuang_but_s_hui" onClick={() => closefun()}>
					{btntext}
				</button>
				<button className="smy_tanchuang_but_s_hong" onClick={() => quxiaofun()}>确定</button>
			</div>
		</div>);
	}

}

// <!--示例六：不扣课时取消提示弹窗-->
export class LayerLessonTime extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			nShow: true
		}
	}

	render() {
		const {
			quxiaofun,
			closefun,
			times
		} = this.props;
		let {
			nShow
		} = this.state;

		let show = {
			display: nShow ?
				'block' : 'none'
		};

		return (<div className="smy_tanchuang_box smy_tanchuang_quxiao_b" style={show}>
			<div className="smy_tanchuang_box_title1">温馨提示</div>
			<div className="smy_tanchuang_quxiao_b_top">
				{
					times > 0
						? <p>本月您还有{times}次课前24小时内取消课程后</p>
						: <p>本月已无课前24小时内取消课程后返还课时的机会，</p>
				}
				<p>系统返还课时的机会。</p>
			</div>
			<div className="smy_tanchuang_buttonBox">
				<button className="smy_tanchuang_but_s_hui" onClick={() => closefun()}>暂不取消</button>
				<button className="smy_tanchuang_but_s_hong" onClick={() => quxiaofun()}>确定</button>
			</div>
		</div>);
	}
}

// <!--示例九：预约成功弹窗-->
export class LayerLessonSuccess extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			nShow: props.isShow
		}
		window.setTimeout(() => {
			this.setState({
				nShow: false
			})
		}, 2000)

	}
	render() {
		const {
			quxiaofun,
			closefun,
			times
		} = this.props;
		let {
			nShow
		} = this.state;

		let show = {
			display: nShow ?
				'block' : 'none'
		};

		return (<div className="smy_tanchuang_box smy_tanchuang_succ" style={show}>
			<img className="smy_tanchuang_big_img1" src={require("../images/dialog/smy_tanchuang/smy_tanchuang_succ.png")}/>
			<p className="smy_tanchuang_big_img_bot">恭喜您，约课成功，记得准时上课哦！</p>
		</div>);
	}
}
// <!--示例十二：预约课程弹窗-->
export class LayerYuYue extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			nShow: props.isShow,
			openCS: false,
			lesson: [],
			select: ''
		}
	}

	openLayerCs = () => {
		axios.get(ServerUrl.GetRestartLesson).then(e => {
			if (e.data.result === 1) {
				this.setState({
					lesson: e.data.data,
					openCS: true
				})

			}
		})
	}
	// attendTime
	// teacerId
	onSelectLesson = (AttendLessonID) => {
		let {
			lesson
		} = this.state;
		lesson.map(e => {
			if (e.AttendLessonID === AttendLessonID) {
				this.active.className = 'smy_tanchuang_chongshang_cur';
				this.AttendLessonID = AttendLessonID;
			}
			return e;
		})
	}

	onYueLesson = () => {
		let {
			AttendLessonID
		} = this;
		let {
			attendTime
		} = this.props;
		axios.get(ServerUrl.JoinAttendLesson, {
			params: {
				LessonTime: attendTime,
				teacerId: teacerId,
				attendLessonId: AttendLessonID
			}
		}).then(e => {
			if (e.data.result === 1) {
				this.setState({
					lesson: e.data.data,
					openCS: true
				})
			}
		})
	}

	render() {
		const {
			callbackfun,
			closefun,
			time,
			teachername,
			lessonname
		} = this.props;
		let {
			nShow,
			openCS,
			lesson
		} = this.state;

		let show = {
			display: nShow ?
				'block' : 'none'
		};

		let openCshow = {
			display: openCS ?
				'block' : 'none'
		};

		let lessonItem = lesson.map(e => {
			return (<li key={e.AttendLessonID} ref={e => this.active = e} onClick={() => {
					this.onSelectLesson(e.AttendLessonID)
				}}>
				{e.BookName}
			</li>)
		})

		return (<div>
			<div className="smy_tanchuang_box smy_tanchuang_yueke_qeren1" style={show}>
				<div className="smy_tanchuang_box_title2">
					预约课程
				</div>
				<div>
					<div className="smy_tanchuang_yueke_qeren_teacher_img">
						<img src={require("../images/dialog/smy_tanchuang/smy_tanchuang_teacher_shili.jpg")}/>
					</div>
					<p className="smy_tanchuang_yueke_qeren_p1">{teachername}</p>
					<p className="smy_tanchuang_yueke_qeren_p2">{time}</p>
					<p className="smy_tanchuang_yueke_qeren_p3">课程：A01 A0-L77-SC</p>
					<p className="smy_tanchuang_yueke_qeren_p4" onClick={() => this.openLayerCs()}>选择重上课程&nbsp;&gt;</p>
				</div>
				<div className="smy_tanchuang_buttonBox">
					<button className="smy_tanchuang_but_s_hui" onClick={() => closefun()}>取消</button>
					<button className="smy_tanchuang_but_s_hong" onClick={() => callbackfun()}>确定</button>
				</div>
			</div>

			<div className="smy_tanchuang_box smy_tanchuang_yueke_chongshang" style={openCshow}>
				<div className="smy_tanchuang_box_title2">选择重上课程</div>
				<div className="smy_tanchuang_yueke_chongshang_time">{time}</div>
				<ul className="smy_tanchuang_chongshang_listBox">
					{lessonItem}
				</ul>
				<div className="smy_tanchuang_buttonBox">
					<button className="smy_tanchuang_but_s_hui" onClick={() => this.setState({openCS: false})}>取消</button>
					<button className="smy_tanchuang_but_s_hong" onClick={() => this.onYueLesson()}>确定</button>
				</div>
			</div>

		</div>);
	}
}

// 评价窗口
export class LayerPinjia extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			nShow: props.isShow,
			xin1: this.createXin('xin1'),
			xin2: this.createXin('xin2'),
			textArea: '',
			fen1: 3,
			fen2: 3,
			xin1Content: this.createXin('xin1')[2].xinContent,
			xin2Content: this.createXin('xin1')[2].xinContent
		}

	}
	// 创建XIn
	createXin = (type) => {
		var text = {
			xin1: [
				'rrrr', 'rrrrffff', 'rrrrffffffffge'
			],
			xin2: ['1111', '222222', '33333333333333']
		}
		var arr = [];
		for (var i = 0; i < 3; i++) {
			var obj = {};
			obj.id = i + 1;
			obj.active = true;
			obj.fen = i + 1;
			obj.xinContent = text[type][i];
			arr.push(obj);
		}
		return arr;
	}

	// 换星级
	onEditDataX1 = (id) => {
		let {
			xin1,
			xin1Content,
			fen1
		} = this.state;
		xin1 = xin1.map(e => {
			if (e.id <= id) {
				e.active = true;

			} else {
				e.active = false;
			}
			return e;
		})
		xin1Content = xin1[id - 1].xinContent
		fen1 = xin1[id - 1].fen
		this.setState({
			xin1,
			xin1Content,
			fen1
		})
	}
	// 换星级
	onEditDataX2 = (id) => {
		let {
			xin2,
			xin2Content,
			fen2
		} = this.state;
		xin2 = xin2.map(e => {
			if (e.id <= id) {
				e.active = true;
			} else {
				e.active = false;
			}
			return e;
		})
		xin2Content = xin2[id - 1].xinContent
		fen2 = xin2[id - 1].fen
		this.setState({
			xin2,
			xin2Content,
			fen2
		})
	}

	// 评语
	onEditTextArea = ({
		target
	}) => {
		let value = target.value;
		this.setState({
			textArea: value //设置评语
		})
	}

	render() {
		const {
			callbackfun,
			closefun
		} = this.props;
		let {
			nShow,
			xin1,
			xin2,
			textArea,
			xin1Content,
			xin2Content
		} = this.state;

		let show = {
			display: nShow ?
				'block' : 'none'
		};

		let xArray = xin1.map(e => {
			return (
				e.active ?
				<img key={e.id} onClick={() => this.onEditDataX1(e.id)} src={require('../images/dialog/smy_tanchuang/smy_tanchuang_xing1.png')}/> :
				<img key={e.id} onClick={() => this.onEditDataX1(e.id)} src={require('../images/dialog/smy_tanchuang/smy_tanchuang_xing2.png')}/>)
		})
		let yArray = xin2.map(e => {
			return (
				e.active ?
				<img key={e.id} onClick={() => this.onEditDataX2(e.id)} src={require('../images/dialog/smy_tanchuang/smy_tanchuang_xing1.png')}/> :
				<img key={e.id} onClick={() => this.onEditDataX2(e.id)} src={require('../images/dialog/smy_tanchuang/smy_tanchuang_xing2.png')}/>)
		})

		return (<div className="smy_tanchuang_box smy_tanchuang_teacher_dp" style={show}>
			<div className="smy_tanchuang_box_title4">教师评价</div>
			<div className="smy_tanchuang_teacher_dp_box">
				<div className="smy_tanchuang_teacher_dp_item">
					<div className="smy_tanchuang_teacher_dp_item_t">教师满意度：</div>
					<div className="smyclearfix">
						<div className="left smy_tanchuang_teacher_dp_item_b_text">
							{xin1Content}
						</div>
						<div className=" left smy_tanchuang_teacher_dp_item_b_xB">
							{xArray}
						</div>
					</div>
				</div>
				<div className="smy_tanchuang_teacher_dp_item">
					<div className="smy_tanchuang_teacher_dp_item_t">本节课学习效果：</div>
					<div className="smyclearfix">
						<div className="left smy_tanchuang_teacher_dp_item_b_text">
							{xin2Content}
						</div>
						<div className=" left smy_tanchuang_teacher_dp_item_b_xB">
							{yArray}
						</div>
					</div>
				</div>
				<div className="smy_tanchuang_teacher_dp_item2">
					<div className="smy_tanchuang_teacher_dp_item_t">学员评语：</div>
					<textarea placeholder="请留下您对本节课和外教的评价（200字以内）" value={textArea} onChange={(e) => {
							this.onEditTextArea(e)
						}}></textarea>
				</div>
			</div>
			<button className="smy_tanchuang_but_big_hong" onClick={() => callbackfun()}>提交</button>
			<span className="smy_tanchuang_close" onClick={() => {
					closefun()
				}}></span>
		</div>);
	}
}
// 学生查看评价窗口
export class LayerLookPinjia extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			nShow: props.isShow,
			xin1: this.createXin('xin1'),
			xin2: this.createXin('xin2'),
			data: props.data
		}

	}
	// 创建XIn
	createXin = (type) => {
		// let { sonce } = this.props.data;
		var arr = [];
		for (var i = 0; i < 3; i++) {
			var obj = {};
			obj.id = i + 1;
			if (i <= 2) {
				obj.active = true;
			}
			arr.push(obj);
		}
		return arr;
	}

	render() {
		const {
			closefun
		} = this.props;
		let {
			nShow,
			xin1,
			xin2,
			data
		} = this.state;

		let show = {
			display: nShow ?
				'block' : 'none'
		};

		let xArray = xin1.map(e => {
			return (
				e.active ?
				<img key={e.id} src={require('../images/dialog/smy_tanchuang/smy_tanchuang_xing1.png')}/> :
				<img key={e.id} src={require('../images/dialog/smy_tanchuang/smy_tanchuang_xing2.png')}/>)
		})
		let yArray = xin2.map(e => {
			return (
				e.active ?
				<img key={e.id} onClick={() => this.onEditDataX2(e.id)} src={require('../images/dialog/smy_tanchuang/smy_tanchuang_xing1.png')}/> :
				<img key={e.id} onClick={() => this.onEditDataX2(e.id)} src={require('../images/dialog/smy_tanchuang/smy_tanchuang_xing2.png')}/>)
		})

		return (<div className="smy_tanchuang_box smy_tanchuang_teacher_yp" style={show}>
			<div className="smy_tanchuang_box_title4">教师评价</div>
			<div className="smy_tanchuang_teacher_yp_box">
				<div className="smy_tanchuang_teacher_dp_item">
					<div className="smy_tanchuang_teacher_dp_item_t">教师满意度：</div>
					<div className="smyclearfix">
						<div className="left smy_tanchuang_teacher_dp_item_b_text">和教师互动非常开心</div>
						<div className=" left smy_tanchuang_teacher_dp_item_b_xB">
							{xArray}
						</div>
					</div>
				</div>
				<div className="smy_tanchuang_teacher_dp_item">
					<div className="smy_tanchuang_teacher_dp_item_t">本节课学习效果：</div>
					<div className="smyclearfix">
						<div className="left smy_tanchuang_teacher_dp_item_b_text">对本节学习内容印象深刻</div>
						<div className=" left smy_tanchuang_teacher_dp_item_b_xB">
							{yArray}
						</div>
					</div>
				</div>
				<div className="smy_tanchuang_teacher_dp_item2">
					<div className="smy_tanchuang_teacher_dp_item_t">学员评语：</div>
					<div className="smy_tanchuang_teacher_dp_item2_textarea">老师上课认真负责，兢兢业业，对待学生非常有耐心</div>
				</div>
			</div>
			<span className="smy_tanchuang_close" onClick={() => closefun()}></span>
		</div>);
	}
}
// <!--示例十三：外教评语弹窗-->
export class LayerTeacherPinjia extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			nShow: props.isShow,
			xin1: this.createXin('xin1', 5, 5),
			data: props.data
		}

	}
	// 创建XIn
	// num :总分
	// aNum：当前分
	createXin = (type, num, aNum) => {
		// let { sonce } = this.props.data; 分数
		var arr = [];
		for (var i = 0; i < num; i++) {
			var obj = {};
			obj.id = i + 1;
			if (i <= aNum) {
				obj.active = true;
			}
			arr.push(obj);
		}
		return arr;
	}

	render() {
		const {
			closefun
		} = this.props;
		let {
			nShow,
			xin1,
			data
		} = this.state;

		let show = {
			display: nShow ?
				'block' : 'none'
		};

		let xArray = xin1.map(e => {
			return (
				e.active ?
				<img key={e.id} src={require('../images/dialog/smy_tanchuang/smy_tanchuang_xing1.png')}/> :
				<img key={e.id} src={require('../images/dialog/smy_tanchuang/smy_tanchuang_xing2.png')}/>)
		})

		return (<div className="smy_tanchuang_waijiao_p" style={show}>
			<div className="smy_tanchuang_box_title3">外教评语</div>
			<div className="smy_tanchuang_yueke_waijiao_img">
				<img src="images/smy_tanchuang/smy_tanchuang_teacher_shili.jpg"/></div>
			<div className="smy_tanchuang_yueke_waijiao_n_x">
				<span className="smy_tanchuang_yueke_waijiao_n">Mary</span>
				{
					// 性别
					<img className="smy_tanchuang_yueke_waijiao_x" src={require("../images/dialog/smy_tanchuang/smy_tanchuang_nv.png")}/>
				}
			</div>
			<div className="smyclearfix smy_tanchuang_waijiao_div">
				<div className="left smy_tanchuang_waijiao_div_l">评分：</div>
				<div className="left smyclearfix smy_tanchuang_waijiao_div_r">
					{xArray}
				</div>
			</div>
			<div className="smyclearfix smy_tanchuang_waijiao_div">
				<div className="left smy_tanchuang_waijiao_div_l">评语：</div>
				<div className="left smy_tanchuang_waijiao_div_r">
					<p className="smy_tanchuang_waijiao_div_r_p1">Student did not show up.Student did not show up. Student did not show up. Student did not show upStudent did not show up</p>
				</div>
			</div>
			<div className="smyclearfix smy_tanchuang_waijiao_div">
				<div className="left smy_tanchuang_waijiao_div_l">时间：</div>
				<div className="left smy_tanchuang_waijiao_div_r">
					<p className="smy_tanchuang_waijiao_div_r_p2">2017-11-10 21:24</p>
				</div>
			</div>
			<span className="smy_tanchuang_close" onClick={() => closefun()}></span>
		</div>);
	}
}
