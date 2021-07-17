import {useEffect, useState, useCallback} from "react";
import axios from "axios";
import useSwr from 'swr';
import lock from '../Images/lock.png'
import unlock from '../Images/unlock.png'
import "./styles/ChatList.scss"
import PwdCheckModal from "./PwdCheckModal";

const ChatList = () => {
	const fetcher = async (url:string) => {
		const res = await axios.get(url)
		return res.data;
	}

	const {data, error} = useSwr<{title:string, num:number, security:string}[]>('Lobby/chatList', fetcher)

	const [ClickedRoomTitle, setClickedRoomTitle] = useState('')
	const [PwdCheckModalState, setPwdCheckModalState] = useState(false);

	const openPwdCheckModal = (title:string) => {
		setPwdCheckModalState(true);
		setClickedRoomTitle(title)
	}
	const closePwdCheckModal = () => {
		setPwdCheckModalState(false);
	}

	return (
	<>
	{data?.map(chatRoom=>
		<button type="button" className="chatList" onClick={() => {
			if (chatRoom.security === 'protected')
				openPwdCheckModal(chatRoom.title)
			else
				document.location.href = '/chat'
				sessionStorage.setItem('roomName', chatRoom.title)
		}}>
			<span className="chatList-left">
				<div className="chatList-num">{chatRoom.num}</div>
			</span>
			<span className="lock">
				{chatRoom.security != "protected" ? <img src={unlock} width="20" height="20"/> : <img src={lock} width="20" height="20"/>}
			</span>
			<span className="roomName">
				{chatRoom.title}
			</span>

		</button>
	)}
	<PwdCheckModal open={PwdCheckModalState} close={closePwdCheckModal} chatRoomID={ClickedRoomTitle}></PwdCheckModal>
	</>
	)
}

export default ChatList