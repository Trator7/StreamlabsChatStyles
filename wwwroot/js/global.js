function openTab(elem, tabName) {
	var streamlabStyle = elem.parentElement.parentElement;
	var buttons = elem.parentElement.querySelectorAll("button");
	for(var i = 0; i < buttons.length; i++){
		buttons[i].className = "tablinks";
	}

	var allTabs = streamlabStyle.querySelectorAll(".tabcontent");
	for(var i = 0; i < allTabs.length; i++){
		allTabs[i].hidden = true;
	}

	streamlabStyle.querySelector("#"+tabName).hidden = false
	elem.className += " active";
}

function copyToClipboard(elem) {
	var streamlabStyle = elem.parentElement;
	var allTabs = streamlabStyle.querySelectorAll(".tabcontent");
	for(var i = 0; i < allTabs.length; i++){
		if(allTabs[i].hidden == false)
		{			
			var idText = allTabs[i].id;
			fetch(allTabs[i].src)
			.then(res => res.text())
			.then(data => 
			{
				const el = document.createElement("textarea");
				el.value = cleanText(idText, data)

				document.body.appendChild(el);
				el.select();
				document.execCommand("copy");
				document.body.removeChild(el);
			});
		}
	}
}

function cleanText(textType, text){
	var cleanedTxt = "";
	switch(textType) {
		case "HTML":
			cleanedTxt = text.replaceAll(new RegExp("(\\t){7}.*\\n","g"), "");
			break;
		case "CSS":
			cleanedTxt = text;
			break;
		case "JS":
			cleanedTxt = text;
			break;
		  default:
			cleanedTxt = text;
	}
	return cleanedTxt;
}