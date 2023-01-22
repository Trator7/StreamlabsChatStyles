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
			const el = document.createElement("textarea");
			/*var txt = allTabs[i].innerHTML;
			txt = txt.replaceAll('&lt;', '<');
			txt = txt.replaceAll('&gt;', '>');
			txt = txt.replaceAll('<br>', '');
			txt = txt.replaceAll('                    ', '');
			el.value = txt;*/

			fetch(allTabs[i].src)
  			.then(response => el.value = response.text());

			document.body.appendChild(el);
			el.select();
			document.execCommand("copy");
			document.body.removeChild(el);  
		}
	}
}