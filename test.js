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
        var eventSources = { Trigger: '0', Discovery: '1', Autoregistration: '2', Internal: '3' }
        var eventValues = { Problem: '1', Recovering: '0', }
        var updateStatuses = { ProblemOrRecovery: '0', Update: '1' };
        const x = {
            zabbix_url: 'http://localhost/graphoun-hms/ui',
            event_id: "446",
            event_nseverity: "3",
            event_source: "0",
            event_tags: "[]",
            event_update_message: "",
            event_update_status: "0",
            event_value: "1",
            trigger_id: "16199",
            event_name: "Graphoun agent is not available (for 3m)",
            helpdesk_solution_id: "0",
            helpdesk_url: "http://localhost/graphoun-helpdesk/apirest.php",
            helpdesk_app_token: "PJYaHFZBlLl3mvbzXbMCcSRmDVjBSZzmq9iWCP8e",
            helpdesk_user_token: "user_token DrKso89zY0fbwEa9iwMEQTo1AazJkVAFZ2cTS2xu",
            helpdesk_ticket_type: "5",
            helpdesk_entities_id: "0",
            priority: "1",
            helpdesk_ticket_id: "",
            helpdesk_base_url: "http://localhost/graphoun-helpdesk/",
            host_name: "Graphoun server"
        }

        const response = await helpdesk.createOrUpdateTicket(JSON.stringify({
            "event_id": "459",
            "event_nseverity": "3",
            "event_source": "0",
            "event_tags": "[]",
            "event_update_message": "{EVENT.UPDATE.MESSAGE}",
            "event_update_status": "0",
            "event_value": "1",
            "trigger_id": "18807",
            "event_name": "HTTP service is down on reliance.reliance",
            "helpdesk_solution_id": "0",
            "helpdesk_url": "http://localhost/graphoun-helpdesk/apirest.php",
            "helpdesk_app_token": "PJYaHFZBlLl3mvbzXbMCcSRmDVjBSZzmq9iWCP8e",
            "helpdesk_user_token": "user_token DrKso89zY0fbwEa9iwMEQTo1AazJkVAFZ2cTS2xu",
            "helpdesk_ticket_type": "5",
            "helpdesk_entities_id": "0",
            "priority": "1",
            "helpdesk_ticket_id": "{EVENT.TAGS._helpdesk_ticket_id}",
            "helpdesk_base_url": "http://localhost/graphoun-helpdesk/",
            "host_name": "reliance.reliance",
            "event_recovery_value": "{EVENT.RECOVERY.VALUE}",
            "event_update_user": "{USER.FULLNAME}",
            "event_update_action": "{EVENT.UPDATE.ACTION}",
            "trigger_description": "",
            "alert_message": "Problem started at 18:14:52 on 2021.07.24\r\nProblem name: HTTP service is down on reliance.reliance\r\nHost: reliance.reliance\r\nSeverity: Average\r\nOperational data: Down (0)\r\nOriginal problem ID: 459\r\n",
            "alert_subject": "Problem: HTTP service is down on reliance.reliance"
        }));
        console.log(response);
    } catch (error) {
        console.log('Request failed');
    }
})();

const x = {
    "event_id": "461",
    "event_nseverity": "3",
    "event_source": "0",
    "event_tags": "[]",
    "event_update_message": "{EVENT.UPDATE.MESSAGE}",
    "event_update_status": "0",
    "event_value": "0",
    "trigger_id": "13470",
    "event_name": "Graphoun discoverer processes more than 75% busy",
    "helpdesk_solution_id": "0",
    "helpdesk_url": "http://localhost/graphoun-helpdesk/apirest.php",
    "helpdesk_app_token": "PJYaHFZBlLl3mvbzXbMCcSRmDVjBSZzmq9iWCP8e",
    "helpdesk_user_token": "user_token DrKso89zY0fbwEa9iwMEQTo1AazJkVAFZ2cTS2xu",
    "helpdesk_ticket_type": "5",
    "helpdesk_entities_id": "0",
    "priority": "1",
    "helpdesk_ticket_id":
        "{EVENT.TAGS._helpdesk_ticket_id}",
    "helpdesk_base_url": "http://localhost/graphoun-helpdesk/",
    "host_name": "Graphoun server",
    "event_recovery_value": "0",
    "event_update_user":
        "{USER.FULLNAME}",
    "event_update_action": "{EVENT.UPDATE.ACTION}",
    "trigger_description": "",
    "alert_message": "Problem has been resolved in 9m 0s at 18:38:35 on 2021.07.24\r\nProblem name: Graphoun discoverer processes more than 75% busy\r\nHost: Graphoun server\r\nSeverity: Average\r\nOriginal problem ID: 461\r\n",
    "alert_subject": "Resolved: Graphoun discoverer processes more than 75% busy"
}

const y = {
    "event_id": "459",
    "event_nseverity": "3",
    "event_source": "0",
    "event_tags": "[]",
    "event_update_message": "{EVENT.UPDATE.MESSAGE}",
    "event_update_status": "0",
    "event_value": "1",
    "trigger_id": "18807",
    "event_name": "HTTP service is down on reliance.reliance",
    "helpdesk_solution_id": "0",
    "helpdesk_url": "http://localhost/graphoun-helpdesk/apirest.php",
    "helpdesk_app_token": "PJYaHFZBlLl3mvbzXbMCcSRmDVjBSZzmq9iWCP8e",
    "helpdesk_user_token": "user_token DrKso89zY0fbwEa9iwMEQTo1AazJkVAFZ2cTS2xu",
    "helpdesk_ticket_type": "5",
    "helpdesk_entities_id": "0",
    "priority": "1",
    "helpdesk_ticket_id": "{EVENT.TAGS._helpdesk_ticket_id}",
    "helpdesk_base_url": "http://localhost/graphoun-helpdesk/",
    "host_name": "reliance.reliance",
    "event_recovery_value": "{EVENT.RECOVERY.VALUE}",
    "event_update_user": "{USER.FULLNAME}",
    "event_update_action": "{EVENT.UPDATE.ACTION}",
    "trigger_description": "",
    "alert_message": "Problem started at 18:14:52 on 2021.07.24\r\nProblem name: HTTP service is down on reliance.reliance\r\nHost: reliance.reliance\r\nSeverity: Average\r\nOperational data: Down (0)\r\nOriginal problem ID: 459\r\n",
    "alert_subject": "Problem: HTTP service is down on reliance.reliance"
}




