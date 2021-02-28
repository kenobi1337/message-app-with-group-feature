import React, { useState } from 'react';
import styled from 'styled-components';

import AccessTimeIcon from '@material-ui/icons/AccessTime';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

// sign out dialoge
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
const Transition = React.forwardRef(
	function Transition(props, ref) {
		return (
			<Slide
				direction="up"
				ref={ref}
				{...props}
			/>
		);
	}
);

function Header({ user, signOut }) {
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<Container>
				<Main>
					<AccessTimeIcon />

					<SearchContainer>
						<Search>
							<input
								type="text"
								placeholder="Search..."
							/>
						</Search>
					</SearchContainer>

					<HelpOutlineIcon />
				</Main>
				<UserContainer>
					<Name>{user.name}</Name>
					<UserImage
						onClick={handleClickOpen}>
						<img
							src={
								user.photo
									? user.photo
									: 'https://i.imgur.com/6VBx3io.png'
							}
							alt="user_profile"
						/>
					</UserImage>
				</UserContainer>
			</Container>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-labelledby="alert-dialog-slide-title"
				aria-describedby="alert-dialog-slide-description">
				<DialogTitle id="alert-dialog-slide-title">
					{'Do you want to logout?'}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-slide-description">
						Please confirm below.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleClose}
						color="primary">
						Cancel
					</Button>
					<Button
						onClick={signOut}
						color="primary">
						Logout
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default Header;

const Container = styled.div`
	background-image: url('https://image.freepik.com/free-photo/abstract-techno-background-with-connecting-lines_1048-5570.jpg');
	color: white;
	display: flex;
	align-items: center;
	justify-content: space-between;
	box-shadow: 0 1px 0 0 rgba(255 255 255 / 10%);
`;

const Main = styled.div`
	display: flex;
	margin: 0 16px;
`;

const SearchContainer = styled.div`
	min-width: 400px;
	margin: 0 16px;
`;

const Search = styled.div`
	width: 100%;
	box-shadow: inset 0 0 0 1px rgba(104 74 104);
	border-radius: 6px;

	input {
		width: 100%;
		background-color: transparent;
		border: none;
		color: white;
		padding: 6px 8px;
	}

	input:focus {
		outline: none;
	}
`;

const UserContainer = styled.div`
	display: flex;
	align-items: center;
	padding-right: 16px;
`;

const Name = styled.div``;

const UserImage = styled.div`
	border: 2px solid white;
	border-radius: 3px;
	height: 38px;
	width: 38px;
	cursor: pointer;

	img {
		width: 100%;
	}
`;
