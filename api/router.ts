import { Router } from "@invisement/husk";
import { uiDir } from "../config.ts";

export const router = new Router({});

// Serve ui and static files
router.push("/", `${uiDir}/index.html`, {
	headers: { Location: `${uiDir}/index.html` },
});

router.push("/index.:ext", `${uiDir}/index.:ext`);
router.push("/components.:ext", `${uiDir}/components.:ext`);

router.push("/ui/:path*", `${uiDir}/:path`);

router.push("/static/:path*", "./static/:path");

//router.push("/src/:path*.css", "./src/:path.css");
//router.push("/src/:path*.ts", "./src/:path.ts");

router.push("/components/:path*", `${uiDir}/components.html`);

// import * as examples from "../test/data-samples/examples.ts";
// const examplesJson = JSON.stringify(examples);

// new class {
// 	@router.assign("/examples", { method: "GET" })
// 	getExamples() {
// 		return examplesJson;
// 	}
// }();
