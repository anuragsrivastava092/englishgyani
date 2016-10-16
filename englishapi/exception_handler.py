import json
exceptions = {
	404 : 'Not Found',
	200 : 'OK',
	201 : 'Created',
	202 : 'Accepted',
	203 : 'Non-Authoritative Information',
	204 : 'No Content',
	205 : 'Reset Content',
	302 : 'Found',
	400 : 'Bad Request',
	401 : 'Unauthorized',
	402 : 'Payment Required',
	403 : 'Forbidden',
	405 : 'Method Not Allowed'
}


def set_server_response(status = None, message = None, valid=True):
	response_dir = {'status':'', 'message' : '', 'response': ''}
	if status:
		response_dir['status'] = status
		set_exc = exceptions[status]
		response_dir['response'] = set_exc
	if message:
		response_dir['message'] = message
	response_dir['valid'] = valid
	return json.dumps(response_dir)