// import module and such stuff
import React, { useState } from 'react';
import styled from 'styled-components';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AddIcon from '@material-ui/icons/Add';
import { sidebarItems } from '../data/SidebarData';
import IconButton from '@material-ui/core/IconButton';
import db from '../config/firebase';

// dialog module
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// router
import { useHistory } from 'react-router-dom';

function Sidebar({ rooms }) {
	const [open, setOpen] = useState(false);

	// router history set up
	const history = useHistory();

	// add channel
	const [
		newChannelName,
		setNewChannelName
	] = useState('');
	const [description, setDescription] = useState('');
	const addChannel = () => {
		setOpen(false);
		if (newChannelName) {
			db.collection('rooms').add({
				name: newChannelName,
				description
			});
		}
		setNewChannelName('');
		setDescription('');
	};
	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};
	const trackChannelName = ({ target }) => {
		setNewChannelName(target.value);
	};
	const trackDescription = ({ target }) => {
		setDescription(target.value);
	};

	// go to channel
	const goToChannel = id => {
		if (id) {
			history.push(`/room/${id}`);
		}
	};

	return (
		<Container>
			<WorkspaceContainer>
				<Name>Group Chat web App (beta)</Name>
				<NewMessage>
					<IconButton>
						<AddCircleOutlineIcon />
					</IconButton>
				</NewMessage>
			</WorkspaceContainer>
			<MainChannel>
				{sidebarItems.map(item => (
					<MainChannelItem>
						{item.icon}
						{item.text}
					</MainChannelItem>
				))}
			</MainChannel>
			<ChannelContainer>
				<NewChannelContainer>
					<div>Channels</div>
					<IconButton
						color="secondary"
						onClick={handleOpen}>
						<AddIcon />
					</IconButton>
				</NewChannelContainer>
				<ChannelList>
					{rooms.map(channel => (
						<Channel
							onClick={() =>
								goToChannel(
									channel?.id
								)
							}>
							# {channel?.name}
						</Channel>
					))}
				</ChannelList>
			</ChannelContainer>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">
					Channel Name
				</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Please add the name and
						description(optional) for new
						channel below.
					</DialogContentText>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Channel Name"
						type="text"
						value={newChannelName}
						onChange={trackChannelName}
						fullWidth
					/>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Description"
						type="text"
						value={description}
						onChange={trackDescription}
						fullWidth
					/>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleClose}
						color="primary">
						Cancel
					</Button>
					<Button
						onClick={addChannel}
						color="primary">
						Add
					</Button>
				</DialogActions>
			</Dialog>
		</Container>
	);
}

export default Sidebar;

const Container = styled.div`
	background-image: url('https://image.freepik.com/free-photo/abstract-techno-background-with-connecting-lines_1048-5570.jpg');
`;

const WorkspaceContainer = styled.div`
	color: white;
	height: 64px;
	display: flex;
	align-items: center;
	padding-left: 19px;
	justify-content: space-between;
	border-bottom: 1px solid #532753;
`;

const Name = styled.div``;

const NewMessage = styled.div`
	width: 36px;
	height: 36px;
	background: white;
	color: #3f0e40;
	fill: #3f0e40;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	margin-right: 20px;
	cursor: pointer;
`;

const MainChannel = styled.div`
	padding: 20px 0 0 0;
`;

const MainChannelItem = styled.div`
	color: rgba(188, 171, 188);
	display: grid;
	grid-template-columns: 15% auto;
	height: 28px;
	align-items: center;
	padding-left: 19px;
	cursor: pointer;

	:hover {
		background: #350d36;
	}
`;

const ChannelContainer = styled.div`
	color: rgb(188, 171, 188);
	margin: 10px 0 0 0;
`;

const NewChannelContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 28px;
	padding: 0 0 12px 19px;
`;

const Channel = styled.div`
	height: 20px;
	display: flex;
	align-items: center;
	padding: 2.5px 0 0 19px;
	cursor: pointer;

	:hover {
		background: #350d36;
	}
`;

const ChannelList = styled.div``;
