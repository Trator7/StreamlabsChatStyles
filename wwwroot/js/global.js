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
			cleanedTxt = 
			text.replace(
				"font-size: auto; /*{font_size}; streamLabs parameter  */",
				"font-size: {font_size};"
			);
			cleanedTxt = cleanedTxt.replace(
				"color: white; /*{text_color} streamlabs parameter*/",
				"color: {text_color};"
			);
			cleanedTxt = cleanedTxt.replaceAll(
				"fadeOut 0.5s ease 10s forwards; /* {message_hide_delay} streamLabs parameter */",
				"fadeOut 0.5s ease {message_hide_delay} forwards; "
			);
			break;
		case "JS":
			cleanedTxt = text;
			break;
		  default:
			cleanedTxt = text;
	}
	return cleanedTxt;
}