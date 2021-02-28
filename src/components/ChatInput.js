import React, { useState } from 'react';
import styled from 'styled-components';
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

function ChatInput({ sendMessage }) {
	const [text, setText] = useState('');

	const trackInput = ({ target }) => {
		setText(target.value);
	};

	const submit = e => {
		e.preventDefault();
		if (text) {
			sendMessage(text);
			setText('');
		}
	};

	const like = e => {
		e.preventDefault();
		setText('👍');
	};

	return (
		<Container>
			<InputContainer>
				<form onSubmit={submit}>
					<input
						type="text"
						placeholder="Message here..."
						onChange={trackInput}
						value={text}
					/>
					<SendButton>
						<IconButton color="primary">
							<SendIcon
								onClick={submit}
							/>
						</IconButton>
						<IconButton color="primary">
							<ThumbUpIcon
								onClick={like}
							/>
						</IconButton>
					</SendButton>
				</form>
			</InputContainer>
		</Container>
	);
}

export default ChatInput;

const Container = styled.div`
	padding: 0 24px 20px 20px;
`;

const InputContainer = styled.div`
	border: 1px solid #8d8d8e;
	border-radius: 4px;

	form {
		display: flex;
		height: 42px;
		align-items: center;
		padding: 0 0 0 10px;
		justify-content: space-between;

		input {
			flex: 1;
			border: none;
			font-size: 13px;
		}
		input:focus {
			outline: none;
		}
	}
`;

const SendButton = styled.div``;
