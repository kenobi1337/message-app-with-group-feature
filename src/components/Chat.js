import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import IconButton from '@material-ui/core/IconButton';

// import components
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';

// db
import db from '../config/firebase';

// timestamp
import firebase from 'firebase';

// router
import { useParams } from 'react-router-dom';

// dialogue
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function Chat({ user }) {
	let { channelId } = useParams();
	const [channel, setChannel] = useState(null);
	const [messages, setMessages] = useState([]);

	// dialoge
	const [open, setOpen] = React.useState(false);
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const getChannel = () => {
		db.collection('rooms')
			.doc(channelId)
			.onSnapshot(snapshot => {
				setChannel(snapshot.data());
			});
	};

	const getMessages = () => {
		db.collection('rooms')
			.doc(channelId)
			.collection('messages')
			.orderBy('timestamp', 'asc')
			.onSnapshot(snapshot => {
				let messages = snapshot.docs.map(doc =>
					doc.data()
				);
				setMessages(messages);
			});
	};

	const sendMessage = text => {
		if (channelId) {
			let payload = {
				text: text,
				user: user.name,
				userImage: user.photo,
				timestamp: firebase.firestore.Timestamp.now()
			};

			db.collection('rooms')
				.doc(channelId)
				.collection('messages')
				.add(payload);
			console.log(payload);
		}
	};

	useEffect(() => {
		getChannel();
		getMessages();
	}, [channelId]);

	return (
		<Container>
			<Header>
				<Channel>
					<ChannelName>
						# {channel?.name}
					</ChannelName>
					<ChannelInfo>
						{channel?.description.length <
						28
							? channel?.description
							: `${channel?.description.substring(
									0,
									28
							  )}...`}
					</ChannelInfo>
				</Channel>
				<ChannelDetail>
					<div>Details</div>
					<IconButton>
						<InfoOutlinedIcon
							onClick={handleClickOpen}
						/>
					</IconButton>
				</ChannelDetail>
			</Header>
			<MessageContainer>
				{messages?.length > 0 &&
					messages?.map((data, index) => (
						<ChatMessage
							key={index}
							text={data.text}
							name={data.user}
							img={data.userImage}
							timestamp={data.timestamp}
						/>
					))}
			</MessageContainer>
			<ChatInput sendMessage={sendMessage} />
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description">
				<DialogTitle id="alert-dialog-title">
					{'Info for this Channel'}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Id: {channelId}
						<br />
						Name: {channel?.name}
						<br />
						Description:{' '}
						{channel?.description}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleClose}
						color="primary"
						autoFocus>
						Done
					</Button>
				</DialogActions>
			</Dialog>
		</Container>
	);
}

export default Chat;

const Container = styled.div`
	background-image: url('https://image.freepik.com/free-vector/white-digital-matrix-binary-code-numbers-background_1017-25332.jpg');
	display: grid;
	grid-template-rows: 64px auto min-content;
`;

const Header = styled.div`
	padding: 0 20px;
	display: flex;
	align-items: center;
	border-bottom: 1px solid rgba(83, 39, 83, 0.33);
	justify-content: space-between;
`;

const MessageContainer = styled.div``;

const Channel = styled.div``;

const ChannelDetail = styled.div`
	display: flex;
	align-items: center;
	color: #606060;
`;

const ChannelName = styled.div`
	font-weight: 700;
`;

const ChannelInfo = styled.div`
	font-weight: 400;
	color: #606060;
	font-size: 13px;
	margin: 8px 0 0 0;
`;
