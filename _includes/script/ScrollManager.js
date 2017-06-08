var currentPage;
var backPage;
var lastScrollTop = 0;

function bodyLoaded(){
	$(document).ready(function() {
		$('#fullpage').fullpage();
	});
    //Get all post divs
    var postDivs = d3.selectAll(".post");
    //Display the first post div
    postDivs.style("visibility",
        function(d, i){if(i == 0){return "visible";}else{return "visible"}}
    );
    //Make 'posts' div visible
    var posts = d3.selectAll(".posts")
        .style("visibility", "visible");
    lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    window.addEventListener('scroll', scrollHandler, true)
}

function scrollHandler(e) {
	console.log("scroll", e);
	var st = window.pageYOffset || document.documentElement.scrollTop;
   	if (st > lastScrollTop){
    	// downscroll code
    	console.log("down");
	} else {
		// upscroll code
		console.log("up");
	}
	lastScrollTop = st;
}
