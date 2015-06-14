var app = {
	
	moteID: "",
/*
	Application constructor
*/	
	initialize: function() {
		this.bindEvents();
		console.log("Starting NFC Reader app");
	},	
	
/*
	bind any events that are required on startup to listeners:
*/
	bindEvents: function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
	},

/*
	this runs when the device is ready for user interaction:
*/
	onDeviceReady: function() {
		nfc.addTagDiscoveredListener(
				app.onNfc,
			// tag successfully scanned
			function (status) {
				// listener successfully initialized
				app.display("Acerca un mote para leer su ID.");
			},
			function (error) {
				// listener fails to initialize
				app.display("NFC reader failed to initialize " +
					JSON.stringify(error));
			}
		);
	},

/*
	displays tag ID from @nfcEvent in message div:
*/
	onNfc: function(nfcEvent) {
		var tag = nfcEvent.tag;
		moteID = nfc.bytesToHexString(tag.id);
		var tag1 = "041276c2613e80";
		var tag2 = "042b75c2613e80";
		if (moteID == tag1)
			app.display("Mote ID: 1");
		else if (moteID == tag2)
			app.display("Mote ID: 2");
	},

/*
	appends @message to the message div:
*/
	display: function(message) {
		var label = document.createTextNode(message),
			lineBreak = document.createElement("br");
		messageDiv.appendChild(lineBreak); // add a line break
		messageDiv.appendChild(label); // add the text
	},
	
/*
	clears the message div:
*/
	clear: function() {
		messageDiv.innerHTML = "";
	},
	
	getForm: function() {
		var ip = $('#ip').val();
		var port = $('#port').val();
		var tag;
		var tag1 = "041276c2613e80";
		var tag2 = "042b75c2613e80";
		
		if (moteID == tag1)
			tag = 1;
		else if (moteID == tag2)
			tag = 2;
		
		var type = $('input[name=t]:checked', '#myForm').val();
		var myURL = "http://" + "10.213.3.204" + ":" + "3000" + "/?tag=" + tag + "&type=" + type;
		//alert(myURL);
		$.ajax({
			type: 'GET',
			//data: "hola",
			url: myURL,
			success: function(){
				//console.log(data);
				alert('Peticion enviada');
			},
			error: function(){
				//console.log(data);
				alert('Error al enviar la peticion');
			}
		});
	}
	
}; // end of app
