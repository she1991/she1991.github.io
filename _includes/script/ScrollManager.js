function bodyLoaded(){
	$(document).ready(function() {
		$('#fullpage').fullpage();
	});
    updateFixedDivs();
}

function updateFixedDivs() {
	//get which post is active
    var activePostDiv = d3.selectAll(".active");
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
            .text(nextPostTitle+".");
    }
}
