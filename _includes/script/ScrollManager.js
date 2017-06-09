var currentPage;
var backPage;
var lastScrollTop = 0;

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
    console.log(activePostTitle, nextPostTitle);
    //Set activePostTitle to scroll-up-trigger
    d3.select(".scroll-up-trigger h4")
        .text(activePostTitle);
    //Set nextPostTitle to scroll-down-trigger
    d3.select(".scroll-down-trigger h4")
        .text(nextPostTitle+".");
}
