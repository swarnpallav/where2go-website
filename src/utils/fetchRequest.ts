const headers = {
	"Content-Type": "application/json",
};

const getRequest = async (url: string, init?: RequestInit) => {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`, {
			headers,
			...init,
		});

		const jsonifiedResponse = await response.json();

		return jsonifiedResponse;
	} catch (error) {
		console.log(
			`Error occured while fetching data for ${process.env.NEXT_PUBLIC_BACKEND_URL}${url}: `,
			error
		);
	}
};

const postRequest = async (url: string, payload?: Record<string, any>, init?: RequestInit) => {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`, {
			method: "POST",
			body: JSON.stringify(payload),
			headers,
			...init,
		});

		const jsonifiedResponse = await response.json();

		return jsonifiedResponse;
	} catch (error) {
		console.log(
			`Error occured while fetching data for ${process.env.NEXT_PUBLIC_BACKEND_URL}${url}: `,
			error
		);
	}
};

export { getRequest, postRequest };
