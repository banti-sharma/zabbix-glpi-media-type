var Helpdesk = {
    params: {},
    sessions: {},
    setParams: function (params) {
        if (typeof params !== 'object') {
            return;
        }

        Helpdesk.params = params;
    },

    request: function (method, query, data) {
        var url = Helpdesk.params.helpdesk_url + query;
        var request = new CurlHttpRequest();
        var response = null;
        if (typeof data !== 'undefined') {
            data = JSON.stringify(data);
        }

        request.AddHeader('Content-Type: application/json');
        request.AddHeader('Session-Token: ' + Helpdesk.params.session_token);
        request.AddHeader('App-Token: ' + Helpdesk.params.helpdesk_app_token);

        Zabbix.Log(4, '[Helpdesk Webhook] Sending request: ' + url + ((typeof data === 'string') ? (' ' + data) : ''));

        switch (method) {
            case 'get':
                response = request.Get(url, data);
                break;

            case 'post':
                response = request.Post(url, data);
                break;

            case 'put':
                response = request.Put(url, data);
                break;

            default:
                throw 'Unsupported HTTP request method: ' + method;
        }

        Zabbix.Log(4, '[Helpdesk Webhook] Received response with status code ' + request.Status() + '. ' + response);

        if (response !== null) {
            try {
                response = JSON.parse(response);
            }
            catch (error) {
                Zabbix.Log(4, '[Helpdesk Webhook] Failed to parse response received from Helpdesk.');
            }
        }

        if (request.Status() < 200 || request.Status() >= 300) {
            var message = 'Request failed with status code ' + request.Status();

            if (response !== null && typeof response.error !== 'undefined'
                && Object.keys(response.error).length > 0) {
                message += ': ' + JSON.stringify(response.error);
            }
            else if (response !== null && typeof response.description !== 'undefined'
                && Object.keys(response.description).length > 0) {
                message += ': ' + JSON.stringify(response.description);
            }
            else {
                message += '. ' + response;
            }
            throw message + '. Check debug log for more information.';
        }

        return {
            status: request.Status(),
            data: response
        };
    },
    initSession: function () {
        var url = Helpdesk.params.helpdesk_url + '/initSession';
        var request = new CurlHttpRequest();
        request.AddHeader('Content-Type: application/json');
        request.AddHeader('Authorization: ' + Helpdesk.params.helpdesk_user_token);
        request.AddHeader('App-Token: ' + Helpdesk.params.helpdesk_app_token);

        var response = request.Get(url);

        if (request.Status() < 200 || request.Status() >= 300) {
            var message = 'Request failed with status code ' + request.Status();

            if (response !== null && typeof response.error !== 'undefined'
                && Object.keys(response.error).length > 0) {
                message += ': ' + JSON.stringify(response.error);
            }
            else if (response !== null && typeof response.description !== 'undefined'
                && Object.keys(response.description).length > 0) {
                message += ': ' + JSON.stringify(response.description);
            }
            else {
                message += '. ' + response;
            }
            throw message + '. Check debug log for more information.';
        } else {
            Zabbix.Log(4, '[Helpdesk Webhook] Helpdesk Session Created:' + request.Status() + '. Id:' + JSON.stringify(response));
            response = JSON.parse(response);
            Helpdesk.params.session_token = response.session_token;
        }
    },
    killSession: function () {
        var url = Helpdesk.params.helpdesk_url + '/killSession';
        var request = new CurlHttpRequest();
        request.AddHeader('Content-Type: application/json');
        request.AddHeader('Session-Token: ' + Helpdesk.params.session_token);
        request.AddHeader('App-Token: ' + Helpdesk.params.helpdesk_app_token);
        Zabbix.Log(4, '[Helpdesk Webhook] Killing helpdesk session: ' + url);
        var response = request.Get(url);
        Zabbix.Log(4, '[Helpdesk Webhook] Helpdesk Session Killed' + request.Status() + '. ' + response);
        Helpdesk.params.session_token = null;
    },

    createIssue: function () {
        Helpdesk.initSession();
        if (!Helpdesk.params.session_token) return;

        var now = new Date().toISOString();
        var data = {
            input: [{
                users_id: 4,
                requesttypes_id: Helpdesk.params.helpdesk_ticket_type,
                date: now,
                date_mod: now,
                date_creation: now,
                entities_id: Helpdesk.params.helpdesk_entities_id,
                urgency: Helpdesk.params.event_nseverity,
                impact: Helpdesk.params.event_nseverity,
                priority: Helpdesk.params.priority,
                name: '[HMS - ' + Helpdesk.params.event_id + '] - ' + Helpdesk.params.event_name + ' - ' + Helpdesk.params.host_name,
                content: 'Ticket open by HMS Server\n Event: ' + Helpdesk.params.event_name + '\n Host: ' + Helpdesk.params.host_name,
            }]
        };

        var response = Helpdesk.request('post', '/Ticket/', data);

        if (typeof response !== 'object' || response.status != 201) {
            throw 'Cannot create Helpdesk issue. Check debug log for more information.';
        }
        Helpdesk.killSession();
        return response.data[0].id;
    },

    updateIssue: function () {
        Helpdesk.initSession();

        if (!Helpdesk.params.session_token) return;

        var data = {
            input: [{
                itemtype: "Ticket",
                items_id: Helpdesk.params.helpdesk_ticket_id,
                solutiontypes_id: Helpdesk.params.helpdesk_solution_id,
                status: 3,
                content: "Problem Solved in HMS Server"
            }]
        };
        Helpdesk.request('post', '/itilsolution/' + Helpdesk.params.helpdesk_ticket_id, data);
        Helpdesk.killSession();
    }
};

try {
    var params = JSON.parse(value);
    var update = {};
    var result = { tags: {} };
    var severities = [
        { name: 'not_classified', color: '#97AAB3' },
        { name: 'information', color: '#7499FF' },
        { name: 'warning', color: '#FFC859' },
        { name: 'average', color: '#FFA059' },
        { name: 'high', color: '#E97659' },
        { name: 'disaster', color: '#E45959' },
        { name: 'resolved', color: '#009900' },
        { name: 'default', color: '#000000' }
    ];
    Zabbix.Log(4, '[Helpdesk Webhook] INFO: ' + value);
    // Possible values: 0 - Trigger, 1 - Discovery, 2 - Autoregistration, 3 - Internal.
    if ([0, 1, 2, 3].indexOf(parseInt(params.event_source)) === -1) {
        throw 'Incorrect "event_source" parameter given: ' + params.event_source + '\nMust be 0-3.';
    }

    // Check {EVENT.VALUE} for trigger-based and internal events.
    // Possible values: 1 for problem, 0 for recovering
    if (params.event_value !== '0' && params.event_value !== '1'
        && (params.event_source === '0' || params.event_source === '3')) {
        throw 'Incorrect "event_value" parameter given: ' + params.event_value + '\nMust be 0 or 1.';
    }

    // Check {EVENT.UPDATE.STATUS} only for trigger-based events.
    // Possible values: 0 - Webhook was called because of problem/recovery event, 1 - Update operation.
    if (params.event_source === '0' && params.event_update_status !== '0' && params.event_update_status !== '1') {
        throw 'Incorrect "event_update_status" parameter given: ' + params.event_update_status + '\nMust be 0 or 1.';
    }

    if (params.event_source !== '0' && params.event_value === '0') {
        throw 'Recovery operations are supported only for trigger-based actions.';
    }

    // helpdesk_ticket_id must be a positive integer if an update action is being performed.
    if (params.event_source === '0' && ((params.event_value === '1' && params.event_update_status === '1')
        || (params.event_value === '0' && (params.event_update_status === '0' || params.event_update_status === '1')))
        && (isNaN(parseInt(params.helpdesk_ticket_id)) || parseInt(params.helpdesk_ticket_id) < 1)) {
        throw 'Incorrect "helpdesk_ticket_id" parameter given: ' + params.helpdesk_ticket_id +
        '\nMust be positive integer.';
    }

    if ([0, 1, 2, 3, 4, 5].indexOf(parseInt(params.event_nseverity)) === -1) {
        params.event_nseverity = '7';
    }

    if (params.event_value === '0') {
        params.event_nseverity = '6';
    }

    params.priority = params['severity_' + severities[params.event_nseverity].name] || severities[7].name;
    Helpdesk.setParams(params);

    // Create issue for non trigger-based events.
    if ((params.event_source !== '0' && params.event_value !== '0')
        || params.event_value === '1' && update.status === '0') {
        var _helpdesk_ticket_id = Helpdesk.createIssue();
        result.tags._helpdesk_ticket_id = _helpdesk_ticket_id;
        result.tags._helpdesk_ticketlink = params.helpdesk_base_url + 'front/ticket.form.php?id=' + _helpdesk_ticket_id;
        //      (params.helpdesk_url.endsWith('/') ? '' : '/') + 'agent/tickets/' + key;
    }
    // Update created issue for trigger-based event.
    else {
        Helpdesk.updateIssue();
    }

    return JSON.stringify(result);
}
catch (error) {
    Zabbix.Log(3, '[Helpdesk Webhook] ERROR: ' + error);
    throw 'Sending failed: ' + error;
}