import React, {useEffect, useState}from "react";
import "./styles/Admin.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import {allImages, findImg} from '../Images/Images';
import axios from "axios";

const Admin = () => {
	const [IntraID, setIntraID] = useState('')
	const [Nickname, setNickname] = useState('')
	const [Icon, setIcon] = useState('')
	const [OldNickname, setOldNickname] = useState('')
	const [OldIcon, setOldIcon] = useState('')
	const [SignUp, setSignUp] = useState(true)
	const [IsUnique, setIsUnique] = useState(true)

	useEffect(() => {
		const intra_id = sessionStorage.getItem("intraID")
		if (intra_id) setIntraID(intra_id);

		const old_nickname = sessionStorage.getItem("nickname");
		if (old_nickname) {
			setOldNickname(old_nickname);
			setSignUp(false);
		}

		const old_icon = sessionStorage.getItem("icon")
		if (old_icon) setOldIcon(old_icon)
	})

	const handleNicknameChange = (e:any) => {
		setNickname(e.target.value);
	};
	const handleIconChange = (e:any) => {
		setIcon(e.target.value);
	};

	async function saveAdmin(isSignUp: boolean){
		const body = {
			//intra_id 수정하기
			intra_id: IntraID,
			nickname: Nickname ? Nickname : OldNickname,
			state: 'on',
			icon: Icon ? Icon : OldIcon,
			//...
		}
		axios.put('/admin/' + IntraID, body)
		.then((Response) => {
			if (Nickname) sessionStorage.setItem("nickname", Nickname);
			if (Icon) sessionStorage.setItem("icon", Icon);
			document.location.href="/lobby"
		})
		.catch((Error) => {
			setIsUnique(false)
		})
	}

	return (
	<div className="Admin-container">
		{SignUp ? null : 
			<div>
				<img src={findImg(OldIcon)} width="30" height="30"/>
				&nbsp;{OldNickname}
				<hr/>
			</div>
		}
		<input onChange={handleNicknameChange} placeholder="Nickname" maxLength={10}/>
		{ IsUnique ? null:<div className="nickname-error">이미 사용중인 닉네임입니다.</div>}

		<div className="icon-box">
		{allImages.map(({value, src}) =>
			<span className="icon">
				<input type="radio" name="icon" value={value} onChange={handleIconChange} className="icon-input"/>
				<img src={src} width="50" height="50" className="icon-img"></img>
			</span>
		)}
		</div>

		<div className="Join-button">
			{
				SignUp && (!Nickname || !Icon) ? null :
				<a className="btn btn-dark" onClick={() => saveAdmin(SignUp)}><b>OK</b></a>
			}
		</div>
	</div>
	);
};

export default Admin;