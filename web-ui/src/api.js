import store from './store';

export async function api_get(path) {
	let text = await fetch("http://localhost:4000/api/v1" + path, {});
	let resp = await text.json();
	return resp.data;
}

async function api_post(path, data) {
	let opts = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Origin': 'http://localhost:4000'
		},
		body: JSON.stringify(data),
	};
	let text = await fetch(
		"http://localhost:4000/api/v1" + path, opts);
	return await text.json();
}

export function fetch_users() {
	api_get("/users").then((data) => {
		let action = {
			type: 'users/set',
			data: data,
		}
		store.dispatch(action);
	});
}

export function fetch_companies() {
	api_get("/companies").then((data) => {
		let action = {
			type: 'companies/set',
			data: data
		}
		store.dispatch(action);
	});
}

export function api_login(email, password) {
	api_post("/session", { email, password }).then((data) => {
		if (data.session) {
			let action = {
				type: 'session/set',
				data: data.session,
			}
			store.dispatch(action);
		}
		else if (data.error) {
			let action = {
				type: 'error/set',
				data: data.error,
			};
			store.dispatch(action);
		}
	});
}

async function abstract_opts(path, opts) {
	let text = await fetch(
		"http://localhost:4000/api/v1" + path, opts);
	return await text.json();
}

export function get_company(companies, id) {
	for (var i = 0; i < companies.length; i++) {
		if (companies[i].id === id) {
			return companies[i];
		}
	}
	return null;
}


export async function create_company(company) {
	let state = store.getState();
	let token = state?.session?.token;

	let opts = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'x-auth': token
		},
		body: JSON.stringify({ "company": company })
	};

	let text = await fetch(
		"http://localhost:4000/api/v1/companies", opts);
	return await text.json();
}

export async function edit_company(id, company) {
	let opts = {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ "id": id, "company": company })
	};

	return abstract_opts("/companies/" + id, opts);
}

export async function delete_company(id) {
	let opts = {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ "id": id })
	};

	await fetch(
		"http://localhost:4000/api/v1" + "/companies/" + id, opts);
	fetch_companies();
}

export async function create_comment(comment) {
	let state = store.getState();
	let token = state?.session?.token;
	let opts = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'x-auth': token
		},
		body: JSON.stringify({ "comment": comment })
	};
	return abstract_opts("/comments", opts);
}

export async function delete_comment(id) {
	let opts = {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ "id": id })
	};

	await fetch(
		"http://localhost:4000/api/v1" + "/comments/" + id, opts);
	fetch_companies();
}


export function create_user(user) {
	let data = new FormData();
	data.append("user[name]", user.name);
	data.append("user[email]", user.email);
	data.append("user[password]", user.password);

	let opts = {
		method: 'POST',
		body: data
	};
	return abstract_opts("/users", opts);
}

export function edit_user(id, user) {
	let data = new FormData();
	data.append("user[name]", user.name);
	data.append("user[email]", user.email);
	data.append("user[password]", user.password);
	data.append("user[password_hash]", user.password_hash);

	let opts = {
		method: 'PATCH',
		body: data
	};

	return abstract_opts("/users/" + id, opts);
}


export function load_defaults() {
	fetch_users();
	fetch_companies();
}