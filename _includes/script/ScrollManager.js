var currentPage;
var backPage;

function bodyLoaded(){
    //Get all post divs
    var postDivs = d3.selectAll(".post");
    //Display the first post div
    postDivs.style("visibility",
        function(d, i){if(i == 0){return "visible";}else{return "hidden"}}
    );
    //Make 'posts' div visible
    var posts = d3.selectAll(".posts")
        .style("visibility", "visible");
}
