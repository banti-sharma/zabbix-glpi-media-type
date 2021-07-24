import helpdesk from './index.js';
import CurlHttpRequest from './CurlHttpRequest.js';

global.Zabbix = {
    Log: (type, str) => {
        console.log(str);
    }
}
global.CurlHttpRequest = CurlHttpRequest;


(async function () {
    try {
        await helpdesk.createOrUpdateTicket(JSON.stringify({
            helpdesk_solution_id: '0',
            helpdesk_url: 'http://localhost/graphoun-helpdesk/apirest.php',
            helpdesk_app_token: 'PJYaHFZBlLl3mvbzXbMCcSRmDVjBSZzmq9iWCP8e',
            helpdesk_ticket_type: '5',
            event_nseverity: '1',
            event_id: '1',
            event_name: 'Graphoun Server disconnected',
            host_name: 'graphoun-server',
            event_value: '1',
            event_source: '1',
            helpdesk_user_token: 'user_token DrKso89zY0fbwEa9iwMEQTo1AazJkVAFZ2cTS2xu',
            helpdesk_entities_id: '0',
            event_update_status: '0',
        }));
    } catch (error) {
        console.log('Request failed');
    }
})();

const x = {
    "input": [{
        "users_id": 4,
        "requesttypes_id": "incident",
        "date": "2021-07-24T08:15:57.138Z",
        "date_mod": "2021-07-24T08:15:57.138Z",
        "date_creation": "2021-07-24T08:15:57.138Z",
        "entities_id": "0",
        "urgency": "1",
        "impact": "1",
        "priority": "default",
        "name": "[HMS - undefined] - Graphoun Server disconnected - graphoun-server",
        "content": "Ticket open by HMS Server\n Event: Graphoun Server disconnected\n Host: graphoun-server"
    }]
};


