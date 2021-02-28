import React, { useState } from 'react';
import styled from 'styled-components';

function ChatMessage({ text, name, img, timestamp }) {
	return (
		<Container>
			<UserAvatar>
				<img src={img} alt="user_avatar" />
			</UserAvatar>
			<MessageContent>
				<Name>
					{name}
					<span>
						{JSON.stringify(
							timestamp.toDate()
						)}
					</span>
				</Name>
				<Text>{text}</Text>
			</MessageContent>
		</Container>
	);
}

export default ChatMessage;

const Container = styled.div`
	padding: 8px 20px;
	display: flex;
	align-items: center;

	:hover {
		background: rgba(211, 211, 211, 0.5);
	}
`;

const UserAvatar = styled.div`
	width: 36px;
	height: 36px;
	border-radius: 5px;
	overflow: hidden;
	margin-right: 8px;
	img {
		width: 100%;
	}
`;

const MessageContent = styled.div`
	display: flex;
	flex-direction: column;
`;

const Name = styled.span`
	font-weight: 900;
	font-size: 15px;
	line-height: 1.4;
	span {
		margin-left: 8px;
		font-weight: 400;
		color: rgba(97, 97, 97, 0.9);
		font-size: 13px;
	}
`;

const Text = styled.span``;
