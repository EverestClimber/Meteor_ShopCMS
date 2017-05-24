import { createError } from 'apollo-errors';

export const UnknownError = createError('UnknownError', {
	message: 'An unknown error has occured'
});

export const UnauthorizedError = createError('UnauthorizedError', {
	message: 'You must login to do that'
});

export const AlreadyAuthenticatedError = createError('AlreadyAuthenticatedError', {
	message: 'You are already authenticated'
});

export const ForbiddenError = createError('ForbiddenError', {
	message: 'You are not allowed to do that'
});

