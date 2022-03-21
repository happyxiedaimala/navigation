const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
const x = localStorage.getItem("x");
const xObject = JSON.parse(x);
const hashMap = xObject || [
	{ logo: "acfun.png", url: "https://www.acfun.cn/" },
	{ logo: "bilibili-fill.png", url: "https://www.bilibili.com/" },
	{ logo: "知乎.png", url: "https://www.zhihu.com/" },
	{ logo: "掘金-logo.png", url: "https://juejin.cn/" },
];
const simplifyUrl = (url) => {
	return url
		.replace("https://", "")
		.replace("http://", "")
		.replace("www.", "")
		.replace(/\/.*/, "");
};

const render = () => {
	$siteList.find("li:not(.last)").remove();
	hashMap.forEach((node, index) => {
		if (node.logo.indexOf(".png") > -1) {
			let $li = $(`<li>
      <div class="site">
        <div class="logo">
        <img src="${node.logo}" alt="404" />
        </div>
        <div class="link">${simplifyUrl(node.url)}</div>
        <div class='close'>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-close1"></use>
        </svg>
        </div>
      </div>
  </li>`).insertBefore($lastLi);
			$li.on("click", () => {
				window.open(node.url);
			});
			$li.on("click", ".close", (e) => {
				e.stopPropagation();
				hashMap.splice(index, 1);
				render();
			});
		} else {
			let $li = $(`<li>
      <div class="site">
        <div class="logo">
         ${node.logo[0]}
        </div>
        <div class="link">${simplifyUrl(node.url)}</div>
        <div class='close'>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-close1"></use>
        </svg>
        </div>
      </div>
  </li>`).insertBefore($lastLi);
			$li.on("click", () => {
				window.open(node.url);
			});
			$li.on("click", ".close", (e) => {
				e.stopPropagation();
				hashMap.splice(index, 1);
				render();
			});
		}
	});
};
render();
$(".addButton").on("click", () => {
	let url = window.prompt("想要添加的网址是(=・ω・=)");
	if (url.indexOf("http") !== 0) {
		url = "https://" + url;
	}
	hashMap.push({
		logo: simplifyUrl(url)[0].toUpperCase(),
		url: url,
	});
	render();
});

window.onbeforeunload = () => {
	const string = JSON.stringify(hashMap);
	localStorage.setItem("x", string);
};
