import React from 'react';
import styled from 'styled-components';

// auth
import { auth, provider } from '../config/firebase';

function Login({ setUser }) {
	// auth function
	const signIn = () => {
		auth.signInWithPopup(provider)
			.then(result => {
				const newUser = {
					name: result.user.displayName,
					photo: result.user.photoURL
				};
				localStorage.setItem(
					'user',
					JSON.stringify(newUser)
				);
				setUser(newUser);
			})
			.catch(() => {
				alert('there are an error');
			});
	};

	return (
		<Container>
			<Content>
				<LogoImg src="https://i.pinimg.com/originals/3f/83/26/3f8326ae92489327dc278963d362d5d4.png" />
				<h1>Sign in to Chat</h1>
				<SignInButton onClick={signIn}>
					Sign in with Google
				</SignInButton>
			</Content>
		</Container>
	);
}

export default Login;

const Container = styled.div`
	width: 100%;
	height: 100vh;
	background: #f8f8f8;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Content = styled.div`
	background-color: white;
	padding: 40px;
	border-radius: 5px;
	box-shadow: 0 1px 3px rgb(0 0 0 / 12%),
		0 1px 2px rgb(0 0 0 /24%);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const LogoImg = styled.img`
	height: 174px;
`;

const SignInButton = styled.button`
	margin-top: 50px;
	background-color: #add8e6;
	color: white;
	border: none;
	height: 40px;
	border-radius: 4px;
	cursor: pointer;
	font-size: 15px;
`;
