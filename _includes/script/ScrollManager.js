var fullpageCreated = false;
var createdHeight = -1;

function bodyLoaded(){
	$(document).ready(function() {
        createFullpage();
        initializeScrollBeads();
        updateFixedDivs();
        repositionScrollBeads();
	});
}

function createFullpage() {
    if(fullpageCreated === false) {
        fullpageCreated = true;
        $('#fullpage').fullpage();
        createdHeight = d3.select(".fp-table").style("height");
        $(window).resize(function() {
            var newHeight = d3.select(".fp-table").style("height");
            console.log(newHeight+" "+createdHeight);
            if(newHeight > createdHeight) {
                fullpageCreated = false; 
                $.fn.fullpage.destroy('all');
                createFullpage();
            }
        });
    }
}

function updateFixedDivs() {
	//get which post is active
    var activePostDiv = d3.selectAll(".active");
    var postId = parseInt(activePostDiv.attr("id"));
    //Get post below it
    var nextPost = d3.select(".active + .post");
    //Get first character of current post title
    var activePostTitle = String(activePostDiv.select(".post-title").text()).trim().slice(0,1);
    //Get following post title
    var nextPostTitle = "";
    if(!nextPost.empty()){
        nextPostTitle = String(nextPost.select(".post-title").text()).trim();
    }
    //Set activePostTitle to scroll-up-trigger
    d3.select(".scroll-up-trigger h4")
        .text(activePostTitle);
    //Set nextPostTitle to scroll-down-trigger
    if(nextPostTitle.length == 0){
        //Hide scroll arrow
        d3.select(".scroll-down-trigger .scroll-arrow")
            .attr("class", "hidden-scroll-arrow");
        d3.select(".scroll-down-trigger h4")
            .attr("class", "the-end-trigger")
            .text("The End.");
    }
    else {
        d3.select(".scroll-down-trigger .hidden-scroll-arrow")
            .attr("class", "scroll-arrow");
        d3.select(".the-end-trigger")
            .attr("class","");
        d3.select(".scroll-down-trigger h4")
            .text(nextPostTitle);
    }

    updateScrollBeads(postId);
}

function initializeScrollBeads() {
    var postDivs = d3.selectAll(".post");
    var scrollBeadsDiv = d3.select(".scroll-beads");
    postDivs.each(function(d, i){
        if(i == 0){
            var j = i + 1;
            scrollBeadsDiv.append("div")
                .attr("class", "scroll-bead-active")
                .attr("id", "bead"+j);
        }
        else {
            var j = i + 1;
            scrollBeadsDiv.append("div")
                .attr("class", "scroll-bead")
                .attr("id", "bead"+j);
        }
    });  
}

function updateScrollBeads(postId) {
    //go through all beads
    //set as active if associated post is active else deactivate
    d3.selectAll(".scroll-beads div")
        .attr("class", "scroll-bead");
    d3.select(".scroll-beads #bead"+postId)
        .attr("class", "scroll-bead-active");
}

function repositionScrollBeads () {
    //Calculate the margin to so as to place the beads exacty in the center
    var divHeight = d3.select(".scroll-beads")
        .node()
        .getBoundingClientRect()
        .height;
    //calculate new margin top
    divHeight = divHeight/2;
    d3.select(".scroll-beads")
        .styles({
            "width": "2vmax",
            "position": "fixed",
            "right": "0",
            "margin-right": "0.5vmax",
            "margin-top": "calc(45vh - "+divHeight+"px)",
            "z-index": "1000" 
        });
}
