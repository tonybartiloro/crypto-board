export const wrapErrorManager =
	(transform, transformError = (e) => e) =>
	(data) => {
		const { error } = data

		return error ? transformError(data) : transform(data)
	}
