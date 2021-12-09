import { useMemo, useRef } from "react";
import useSWR from "swr";
import { useClient } from "./";
import axios from "axios";
import { formatResponseError } from "../utils";

const noop = () => {};

const fetcherGenerator = (apiFunction, setCancel, client) => (key, args) => {
	const cancelTokenSource = axios.CancelToken.source();

	if (typeof setCancel === "function") {
		setCancel(cancelTokenSource.cancel);
	}

	return apiFunction({
		cancelToken: cancelTokenSource.token,
		client,
		...(args ? JSON.parse(args) : {}),
	})
		.then((res) => res.data)
		.catch((err) => {
			const error = formatResponseError(err);
			error.__CANCEL__ = err.__CANCEL__;
			throw error;
		});
};

const isPrimitive = (test) => {
	return test !== Object(test);
};

const generateArgKeys = (args) => {
	const primiteArgKeys = Object.keys(args).filter((argKey) => isPrimitive(args[argKey]));
	return primiteArgKeys.sort().map((argKey) => args[argKey]);
};

/**
 * @param {function} method
 * @param {string|array|function|null|undefined} [key]
 * @param {Object} args - must be serializable otherwise data will not be passed to the method.
 * @param {boolean} paused - force paused.
 * @param {Object} options - useSWR options @see https://swr.vercel.app/docs/options#options.
 */
const useApi = ({ method, key, args = {}, paused = false, options = {} }) => {
	const client = useClient();

	const memoizedArgsDeps = Object.values({
		...args,
	}).map((dep) => (isPrimitive(dep) ? dep : JSON.stringify(dep)));

	const cancelRef = useRef(noop);
	const setCancel = (cancel) => (cancelRef.current = cancel);

	// memoizing args in necessary because swr shallowly compares args and if one arg
	// is and object it will be threated as different objects on every render
	// generating render loop
	const memoizedArgs = useMemo(
		() => JSON.stringify({ ...args, ...{ currentUserId: client.defaults.headers.userId || 0 } }),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		memoizedArgsDeps
	);

	const { data, error, mutate, isValidating } = useSWR(
		paused ? null : [key || method.key, ...(memoizedArgs === "{}" ? [] : [memoizedArgs]), ...generateArgKeys(args)],
		fetcherGenerator(method, setCancel, client),
		{ fetcherGenerator, ...options }
	);

	return {
		data,
		error,
		mutate,
		isValidating,
		cancel: cancelRef.current,
		cancelled: error?.__CANCEL__,
	};
};

export default useApi;
