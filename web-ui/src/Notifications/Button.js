import { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import NotificationNew from './New';
import DeleteNotification from './Delete';

function NotificationButton({company, session}) {

	let history = useHistory();
	const location = useLocation();

	const [notification, setNotification] = useState({
        company_id: company.id, 
        user_id: session.user_id
	});

    var b = false;

    function determine(notif) {
        if (notif.company_id === company.id && notif.user_id === session.user_id) {
            b = true;
        }
    }
    function determine2() {
        company.notifications.map((notif) => (determine(notif)));
    }

    determine2();

    if (b) {
        return (<DeleteNotification company={company} session={session}/>);
    }
    else {
        return (<NotificationNew company={company} session={session}/>);
    }
}

export default NotificationButton;