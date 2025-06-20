import { router } from "./api/router.ts";
import { serveDir } from "jsr:@std/http/file-server";

import { hostname, port } from "./config.ts";

Deno.serve({ port, hostname }, async (req) => {
	const pathname = new URL(req.url).pathname;

	if (pathname.startsWith("/src/")) {
		return serveDir(req, {
			fsRoot: "src",
			urlRoot: "src",
		});
	}

	if (pathname.startsWith("/data/")) {
		return serveDir(req, {
			fsRoot: "data",
			urlRoot: "data",
		});
	}

	const resp = await router.serve(req);
	if (resp === null) {
		return new Response("404: Resource Not Found!", { status: 404 });
	}
	return resp;
});
