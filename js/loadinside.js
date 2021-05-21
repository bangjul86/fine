async function loadInside(elem, url) {
	let response = await fetch(url, {
		cache: 'no-cache'
	});
	let html = await response.text();

	elem.innerHTML = html;
	childs = elem.querySelectorAll('*');

	for (const child of [...childs]) {
		if (child.nodeName === "SCRIPT") {
			let script;

			if (child.src) {
				response = await fetch(child.src, {
					cache: 'no-cache'
				});
				script = await response.text();
			} else {
				script = child.innerText;
			}

			eval(script);
		}
	}
}
