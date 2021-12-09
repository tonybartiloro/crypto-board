import axios from "axios";
import axiosRetry from "axios-retry";
import { isServerSide } from "../utils";

const throwError = (msg) => {
	throw new Error(msg);
};

const IDEMPOTENT_HTTP_METHODS = ["get", "head", "options", "put", "delete"];

const isRetryableError = (error) => {
	return error.code !== "ECONNABORTED" && error.response?.status > 500 && error.response?.status <= 599;
};

const createClient = (config = {}) => {
	let client = {
		get: () => throwError("Client not initialized"),
		post: () => throwError("Client not initialized"),
		delete: () => throwError("Client not initialized"),
		head: () => throwError("Client not initialized"),
		options: () => throwError("Client not initialized"),
		put: () => throwError("Client not initialized"),
		patch: () => throwError("Client not initialized"),
	};

	client = axios.create({
		// We don't want to expose client side the api url
		//baseURL: isServerSide() ? `${process.env.API_HOST}${process.env.API_PATH}` : undefined,
		_retry_max: process.env.NEXT_PUBLIC_API_RETRY_MAX,
		...config,
	});

	axiosRetry(client, {
		retries: process.env.NEXT_PUBLIC_API_RETRY_MAX || 5,
		retryDelay: axiosRetry.exponentialDelay,
		retryCondition: (error) => {
			if (!error.config) {
				// Cannot determine if the request can be retried
				return false;
			}

			return isRetryableError(error) && IDEMPOTENT_HTTP_METHODS.includes(error.config.method);
		},
	});

	return client;
};

export { createClient, axios as defaultClient };
