import MessageIcon from '@material-ui/icons/Message';
import InboxIcon from '@material-ui/icons/InboxOutlined';
import DraftsIcon from '@material-ui/icons/Drafts';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorderOutlined';
import PeopleIcon from '@material-ui/icons/People';
import AppsIcon from '@material-ui/icons/Apps';

export const sidebarItems = [
	{
		icon: <MessageIcon />,
		text: 'Thread'
	},
	{
		icon: <InboxIcon />,
		text: 'All DMs'
	},
	{
		icon: <DraftsIcon />,
		text: 'Mentions & Reactions'
	},
	{
		icon: <BookmarkBorderIcon />,
		text: 'Save Items'
	},
	{
		icon: <PeopleIcon />,
		text: 'People & Groups'
	},
	{
		icon: <AppsIcon />,
		text: 'More'
	}
];
