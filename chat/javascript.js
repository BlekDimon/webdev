$("#input").on('keyup', function(event) {
	var check = false;
        for (var i=0; i<document.getElementById("input").value.length; i++) {
                if (document.getElementById("input").value[i] != " ") {
                        check = true;
                }
        }
	if (event.keyCode === 13 && document.getElementById("input").value.length != 0 && check) {
		var node = document.createElement("div");
		var textNode = document.createTextNode("Gracz: " + document.getElementById("input").value);
		node.appendChild(textNode);
		document.getElementById("messages").appendChild(node);
		document.getElementById("input").value = "";
		document.getElementById("messages").scrollTo(0, 100000);
	}
});

