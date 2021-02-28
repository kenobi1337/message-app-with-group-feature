// style
import './App.css';

// components module
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
import styled from 'styled-components';
import { useEffect, useState } from 'react';

// import components
import Chat from './components/Chat';
import Login from './components/Login';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

// DB
import db from './config/firebase';

// auth
import { auth, provider } from './config/firebase';
import { LocalSeeOutlined } from '@material-ui/icons';

function App() {
	const [rooms, setRooms] = useState([]);
	const [user, setUser] = useState(
		JSON.parse(localStorage.getItem('user'))
	);

	const getChannels = () => {
		db.collection('rooms').onSnapshot(snapshot => {
			setRooms(
				snapshot.docs.map(doc => {
					return {
						id: doc.id,
						name: doc.data().name
					};
				})
			);
		});
	};

	const signOut = () => {
		auth.signOut().then(() => {
			localStorage.removeItem('user');
			setUser(null);
		});
	};

	useEffect(() => {
		getChannels();
	}, []);

	return (
		<div className="App">
			<Router>
				{!user ? (
					<Login setUser={setUser} />
				) : (
					<Container>
						<Header
							user={user}
							signOut={signOut}
						/>
						<Main>
							<Sidebar rooms={rooms} />
							<Switch>
								<Route path="/room/:channelId">
									<Chat
										user={user}
									/>
								</Route>
								<Route path="/">
									Select or Create
									channel
								</Route>
								{/* <Route path="/">
									<Login />
								</Route> */}
							</Switch>
						</Main>
					</Container>
				)}
			</Router>
		</div>
	);
}

export default App;

const Container = styled.div`
	width: 100%;
	height: 100vh;
	display: grid;
	grid-template-rows: 40px auto;
`;

const Main = styled.div`
	display: grid;
	grid-template-columns: 260px auto;
`;
