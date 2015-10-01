import * as inventoryManager from '../shared/ansible/inventory/inventoryManager';

export function get(request, response){
	inventoryManager.getInventory()
		.then(function(inventory){
			return response(inventory).code(200);
		})
		.fail(function(err){
			console.log(err);
			return response(err).code(500);
		})
};