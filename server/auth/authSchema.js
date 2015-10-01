import * as tokenProvider from '../shared/security/crypto/tokenProvider';

import * as boom from 'boom';

export function tokenScheme(server, options){
	return {
		authenticate:function(request, reply){
			let userId = authenticateUser(request);

			if(userId){
				return reply.continue({credentials:{userId:userId}});
			}else{
				return reply(boom.unauthorized(null, 'The user authentication token was either not provided or was invalid'))
			}
			
		}
	};
};

export function authenticateUser(request){
	var authToken = request.headers['token'];
	
	let userId = false;
	if(authToken){
		userId = tokenProvider.validateToken(authToken);
	}

	return userId;
};