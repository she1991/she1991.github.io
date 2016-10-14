/*
Set up SVG for rendering
*/

var svg = d3.select('svg'),
	width = + svg.attr('width'),
	height = + svg.attr('height');

/*
Color legend for our visualization
*/

const aNodeColor = '#74273E';
const cNodeColor = '#DF3669';
const oNodeColor = '#F69FB9';

const infectedNodeColor = '#FFEA05';

const stageOneABColor = '#638C99';
const stageTwoABColor = '#096398';
const stageThreeABColor = '#2C3940';

const abResistantColor = '#FFAC05';

/*
Population constants
*/

const totalPopulation = 100;
const connectionLimit = 2;
const aBeta = 0.2;
const aGamma = 0.6;
const cBeta = 0.5;
const cGamma = 0.4;
const oBeta = 0.7;
const oGamma = 0.2;

/*
Control flags and stats
*/

var infectionStarted = false;
var abStageOneAdministered = 0;
var abStageTwoAdministered = 0;
var abStageThreeAdministered = 0;
var abResistantNodes = 0;
var infectedCount = 0;
var recoveredCount = 0;

/*
NodeArray global variable
*/

var nodeArray = [];

/*
NxN adjacency matrix
*/

var linksArray = [];

/*
define node object templates
*/

function getBeta(nodeType){
	if(nodeType == 'Adult'){
		return aBeta;
	}
	else if(nodeType == 'Child'){
		return cBeta;
	}
	else if(nodeType == 'Old'){
		return oBeta;
	}
}

function getGamma(nodeType){
	if(nodeType == 'Adult'){
		return aGamma;
	}
	else if(nodeType == 'Child'){
		return cGamma;
	}
	else if(nodeType == 'Old'){
		return oGamma;
	}
}

function getNodeColor(nodeType){
	if(nodeType == 'Adult'){
		return aNodeColor;
	}
	else if(nodeType == 'Child'){
		return cNodeColor;
	}
	else if(nodeType == 'Old'){
		return oNodeColor;
	}
}

function Node( nodeType, nodeId ){
	this.type = nodeType;
	this.infectedFlag = false;
	this.recoveredFlag = false;
	this.stageFlag = 0;
	this.abResistantFlag = false;
	this.nodeId = nodeId;
	this.beta = getBeta(nodeType);
	this.gamma = getGamma(nodeType);
}

/*
Randomized population of dataset
Randomly populates a dataset of N with random distribution of
Adults, Children and Old persons.
*/

for (var i = 0; i < totalPopulation; i++){
	//Random trial 0 = adult, 1 and so on
	var randTrial = Math.floor(Math.random()*3);
	if(randTrial == 0){
		//adult
		var adultNode = new Node('Adult', i);
		nodeArray.push(adultNode);
	}
	else if(randTrial == 1){
		//child
		var childNode = new Node('Child', i);
		nodeArray.push(childNode);
	}
	else if(randTrial == 2){
		//older person
		var oldNode = new Node('Old', i);
		nodeArray.push(oldNode);
	}
}

/*
Randomized grouping of nodes.
*/

for (var i = 0; i < totalPopulation; i++){
	var currNode = nodeArray[i];
	var randTrialConnection = Math.floor(Math.random()*connectionLimit);
	for(var j = 0; j <= randTrialConnection; j++){
		//Prepare links
		//Select a random node from the nodeArray, not currNode
		var connectedNode = nodeArray[Math.floor(Math.random()*totalPopulation)];
		//make link object
		var linkObject = {
			source : currNode,
			target : connectedNode
		}
		linksArray.push(linkObject);
	}
}

/*
Make on json object out of nodeArray and linksArray
*/

var dataJSON = {
	nodes : nodeArray,
	links : linksArray
}

/*
Initial FCG rendering code
*/

var simulation = d3.forceSimulation()
				.force("link", d3.forceLink().id(function(d){ return d.type }))
				.force("charge", d3.forceManyBody())
				.force("center", d3.forceCenter(width/2, height/2));

function drawInitialization(graph){

	var link = svg.append("g")
				.attr("class", "links")
				.selectAll("line")
					.data(graph.links)
					.enter().append("line");
	var node = svg.append("g")
				.attr("class", "nodes")
				.selectAll("circle")
					.data(graph.nodes)
					.enter().append("circle")
						.attr("id", function(d){ return d.nodeId; })
						.attr("r", 12)
						.attr("fill", function(d){
							return getNodeColor(d.type);
						})
						.attr("group", function(d){
							return d.type;
						})
						.call(d3.drag()
							.on("start", dragstarted)
							.on("drag", dragged)
							.on("end", dragended))
						.on("click", nodeclicked);

	node.append("title")
		.text(function(d){
			return "Type:"+d.type+"\n";
		});

	simulation
		.nodes(graph.nodes)
		.on("tick", ticked);
	
	simulation.force("link")
		.links(graph.links);
	
	function ticked(){
		link
			.attr("x1", function(d) { return d.source.x; })
	        .attr("y1", function(d) { return d.source.y; })
	        .attr("x2", function(d) { return d.target.x; })
	        .attr("y2", function(d) { return d.target.y; });

		node
			.attr("cx", function(d) { return d.x; })
			.attr("cy", function(d) { return d.y; });
	}
}

function dragstarted(d){
	if (!d3.event.active) simulation.alphaTarget(0.3).restart();
	d.fx = d.x;
    d.fy = d.y;
}

function dragged(d) {
	d.fx = d3.event.x;
    d.fy = d3.event.y;
}

function dragended(d) {
	if (!d3.event.active) simulation.alphaTarget(0);
	d.fx = null;
	d.fy = null;
}

function infectNode(node){
	//get beta value for node
	//Run trial on node with beta value
	if(node.infectedFlag || node.recoveredFlag){
		return;
	}
	if(Math.random() <= node.beta){
		//if success, update the infected flag, update infected node count
		node.infectedFlag = true;
		infectedCount = infectedCount + 1;
		//re-render node in infected color
		var svgNode = d3.select("svg")
	                        .selectAll('g.nodes')
	                            .selectAll('circle[id="'+node.nodeId+'"]')
	                            .attr("fill", infectedNodeColor);
	}
	updateStats();
	return node;
}

function healNode(node){
	//get gamma value for node
	//Run trial with gamma value
	if(node.recoveredFlag){
		return;
	}
	if(node.stageFlag == 3){
		//else if stage == 3 then mark as ab resistant, increment ab resistant count, re-render as ab resistant, only mark as recovered, disable infected flag- 
		node.abResistantFlag = true;
		abResistantNodes = abResistantNodes + 1;
		node.recoveredFlag = true;
		node.infectedFlag = false;
		var svgNode = d3.select("svg")
						.selectAll("g.nodes")
							.selectAll('circle[id="'+node.nodeId+'"]')
							.attr("fill", abResistantColor);
	}
	else if(Math.random() <= node.gamma){
		//if sucess, disable infected flag, deduct infected node count, update stage ab count, increment recovered count, set recovered flag
		node.infectedFlag = false;
		infectedCount = infectedCount - 1;
		var color = '';
		if(node.stageFlag == 0){
			//healed on stage 1
			abStageOneAdministered = abStageOneAdministered + 1;
			color = stageOneABColor;
		}
		else if(node.stageFlag == 1){
			//healed on stage 2
			abStageTwoAdministered = abStageTwoAdministered + 1;
			color = stageTwoABColor;
		}
		else if(node.stageFlag == 2){
			//healed on stage 3
			abStageThreeAdministered = abStageThreeAdministered + 1;
			color = stageThreeABColor;
		}
		recoveredCount = recoveredCount + 1;
		node.recoveredFlag = true;
		//re-render node in ab color
		var svgNode = d3.select("svg")
						.selectAll("g.nodes")
							.selectAll('circle[id="'+node.nodeId+'"]')
							.attr("fill", color);

	}
	else{
		//increment stage flag, increment gamma value, 
		node.stageFlag = node.stageFlag + 1;
		node.gamma = node.gamma + 0.1;
		if(node.gamma > 1){
			//normalizing
			node.gamma = 1;
		}
	}
	updateStats();
	return node;
}

function nodeclicked(d){
	if(!infectionStarted){
		var startNode = d3.select("svg")
						.selectAll('g.nodes')
							.selectAll('circle[id="'+d.nodeId+'"]')
							.attr("fill", infectedNodeColor);
		console.log(startNode);
		//mark the node as infected in the nodeArray
		var nodeRef = nodeArray[d.nodeId];
		nodeRef.infectedFlag = true;
		infectionStarted = true;
		infectedCount = infectedCount + 1;
		startSimulation();
	}
}

drawInitialization(dataJSON);

/*
Simulation infection trials
Straight walk through linksArray trying infection both ways for every tuple
Change color as soon as infection starts
minor delay
*/

function simulateInfection(){
	//For every connection in graph
	for (var i=0, j=linksArray.length; i<j; i++){
		var node1 = linksArray[i].source;
		var node2 = linksArray[i].target;
		//check if both are uninfected or any one of them has recovered
		//in that case no infection needs to be performed
		if(!(node1.infectedFlag && node2.infectedFlag)||!(node1.recoveredFlag || node2.recoveredFlag)){
			//Perform infection both ways
			//from node 1 to 2
			if(node1.infectedFlag){
				infectNode(node2);
			}
			else if(node2.infectedFlag){
				infectNode(node1);
			}
		}
	}
}

/*
Simulation healing trials
Straight walk through nodeArray trying ab shots
Change color as soon as infection is reversed
minor delay
*/

function simulateHealing(){
	//for every node in nodeArray
	for(var i=0; i < totalPopulation; i++){
		var node = nodeArray[i];
		if(node.infectedFlag){
			healNode(node);
		}
	}
}

/*
Update stats to the user on every run
*/

function updateStats(){
	var totalPopulationInpt = document.getElementById("totalPopulation");
	totalPopulationInpt.value = totalPopulation;
	var infectedPopulationInpt = document.getElementById("infectedPopulation");
	infectedPopulationInpt.value = infectedCount;
	var recoveredPopulationInpt = document.getElementById("recoveredPopulation");
	recoveredPopulationInpt.value = recoveredCount;
	var stageOneABInpt = document.getElementById("stageOneAB");
	stageOneABInpt.value = abStageOneAdministered;
	var stageTwoABInpt = document.getElementById("stageTwoAB");
	stageTwoABInpt.value = abStageTwoAdministered;
	var stageThreeABInpt = document.getElementById("stageThreeAB");
	stageThreeABInpt.value = abStageThreeAdministered;
	var abResistInpt = document.getElementById("abResistant");
	abResistInpt.value = abResistantNodes;
}

function startSimulation(){
		//delay call simulate infection
		setInterval(simulateInfection, 3000);
		//delay call simulate healing
		setInterval(simulateHealing, 3000);
}
