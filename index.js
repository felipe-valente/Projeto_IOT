const mqtt = require("mqtt");

// Build MQTT Connection -- Set up to your Broker Settings
const options = {
  port: 1883,
  host: '127.0.0.1',
  protocol: 'mqtt'
}

const mqttClient  = mqtt.connect(options)

function startPublishing(){
	let inittime = (new Date()).getTime();

	setInterval(function(){
		let time = (new Date()).getTime() - inittime;
		let level_G = Math.floor(Math.random() * (140 - 60 + 1)) + 60;
    let level_I = (Math.random()*14)+2;
    let level_Gl = Math.floor(Math.random() *(120 - 50 + 1)) + 50;
    let glicemia;
    let insulina;
    let glicose
		if(level_G >= 126)
			glicemia = "Glicemia Alta";
    else if(level_G >= 99 && level_g < 126)
      glicemia = "Glicemia Alterada";
    else if(level_G > 70 && level_g < 99)
      glicemia = "Glicemia Normal";
    else if(level_G <= 70)
      glicemia = "Glicemia Baixa";
    if(level_I < 2)
      insulina = "Insulina Baixa";
    else if(level_I >= 2 && level_I <=13)
      insulina = "Insulina Normal";
    else if(level_I > 13)
      insulina = "Insulina Alta";
    if(level_Gl < 70)
      glicose = "Glicose Baixa";
    else if(level_Gl >= 70 && level_Gl <= 99)
      glicose = "Glicose Normal";
    else if(level_Gl > 99)
      glicose = "Glicose Alta";

    mqttClient.publish("BioLink/Sensor_J/Diabetes/Glicemia", {concentration: level_G, level: glicemia});
    mqttClient.publish("BioLink/Sensor_J/Diabetes/Insulina", {concentration: level_I, level: insulina.toFixed(2)});
    mqttClient.publish("BioLink/Sensor_J/Diabetes/Glicemia", {concentration: level_Gl, level: glicose});


	}, 3000)
}


mqttClient.on('connect', startPublishing);
