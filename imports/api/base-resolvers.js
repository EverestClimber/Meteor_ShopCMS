import { UnknownError, UnauthorizedError, AlreadyAuthenticatedError, ForbiddenError } from './base-errors';
import { createResolver } from 'apollo-resolvers';
import { Shops } from './Shop/model';
// THESE RESOLVES CAN BE ATTACHED TO OTHER RESOLVERS 
// TO PROVIDE MIDDLEWARE FUNCTIONALITY FOR CATCHING AND RETURNING ERRORS
// see: https://www.youtube.com/watch?v=xaorvBjCE7A
// =============================================================================

const baseResolver = createResolver(
   //incoming requests will pass through this resolver like a no-op
  null,

  (root, args, context, error) => {
  	if (isInstance(error)) {
  		return error
  	}
  	return new UnknownError({
  		data: {
  			name: error.name
  		}
  	})
  }
);

	

export const isAuthenticatedResolver = baseResolver.createResolver(
	(root, args, context) => {
		const { user } = context;
		if (!user) throw new UnauthorizedError();
	}
);

export const isOwnerOrAdminResolver = isAuthenticatedResolver.createResolver(
	(root, { shopId }, context) => {
		let shop = Shops.findOne({_id: shopId});

		if (!shop) {
			throw new ForbiddenError();
		}
		if ((context.user._id !== shop.ownerId) && !context.user.roles.includes('admin')) {
			throw new ForbiddenError();
		}
	}
);

export const isManagerResolver = isAuthenticatedResolver.createResolver(
	(root, args, context) => {
		const { user } = context;
		if (!user.roles.includes('manager')) throw new ForbiddenError();
	}
);

export const isAdminResolver = isAuthenticatedResolver.createResolver(
	(root, args, context) => {
		const { user } = context;
		if (!user.roles.includes('admin')) throw new ForbiddenError();
	}
);
