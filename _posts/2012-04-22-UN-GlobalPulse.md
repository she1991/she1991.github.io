---
layout: post
title: "Data Visualization for UN Global Pulse"
subtitle: "UNDERSTANDING DATA AND DESIGNING VISUALIZATIONS"
description: "Evaluated the viability of using Wikipedia as a big data source for informing UN policies. Project involved understanding UNGP's vision and conducting a creative and exploratory analysis."
image: UNGP-Poster.png
date: 2012-05-22
tags: [Human Factors, Experimental Tooling, Sketch]
comments: false
share: false
timeline: "Sep 2016"
team_size: "1"
role: "Visualization design and data wrangling."
methods: "Data analysis, visualization design, information architecture"
client: "UN Global Pulse"
lead_quote: Featured on <a href=https://www.unglobalpulse.org/news/%20big-data-exploration-project-child-marriage-project-design-phase>UN Global Pulse blog</a>. Can big-data sources be used to inform policy making?
permalink: un_global_pulse
---

<h2>Project's vision</h2>
UN Global Pulse wanted to evaluate if big data sources like Wikipedia could be used to inform policy decision.
<img class="wide-img" src="{{ site.url }}{{ site.baseurl }}/images/UNGP-Poster.png"/>
<br/>
 My contribution was an exploratory data analysis of Wikipedia edit data and usage statictics to help identify topics with high traffic and conflict. One of the work items was to visualize a Wikipedia edit war so policy makers could understand the level of conflict and identify key actors in the contributions and upkeep of a page.

<h2>Visualizing a Wikipedia edit war</h2>
<img class="full-wide-img" src="{{ site.url }}{{ site.baseurl }}/images/diff.png"/>
In the above edit, the user Glassleila corrects two words added by 203.220.72.109. What you see is a <i>Wikipedia edit diff</i> between two consecutive commits.
<blockquote>An <a href="https://en.wikipedia.org/wiki/Wikipedia:Edit_warring">edit war</a> occurs when editors who disagree about the content of a page repeatedly override each other's contributions.</blockquote>
I used a python Wikimedia library called <a href="https://www.mediawiki.org/wiki/Manual:Pywikibot">Pywikibot</a> to scrape existing edit data and compare consecutive edits to build a weighted <a href="https://en.wikipedia.org/wiki/Adjacency_matrix">adjacency matrix</a>. The adjacency matrix was weighted by a simplistic rubric - insert strength and delete strenght; mesuring how many characters of data were inserted by the new edit and how many characters were deleted from the old edit.
<h2>Exploring visualization constructs</h2>
There are several existing visual constructs to represent data that represents interactions between multiple parties. 
<img class="center-image" src="{{ site.url }}{{ site.baseurl }}/images/uber-viz.png"/>
<div class="sub-title"><p>A visualization of uber rides by <a href="https://bost.ocks.org/mike/uberdata/">Mike Bostock</a>.</p></div>
<h3>Candidates for visualization constructs</h3>
<ul>
	<li><b><a href="https://bl.ocks.org/mbostock/4062045">Force Directed Graph</a> :</b> This is a network/node diagram with responsive movable nodes. Can be used to represent connections between nodes, however representing the strength and nature of these connections is harder and can also be hard to read.</li>
	<li><b><a href="https://bl.ocks.org/mbostock/4063423">Sunburst Diagram</a> :</b> This is more sophisticated form of a pie chart with subjections projecting outwards. Cannot intuitively represent inter-section relationships.</li>
	<li><b><a href="http://bl.ocks.org/oyyd/859fafc8122977a3afd6">Heatmap Matrix</a> :</b> This is a very direct representation of the raw weighted adjacency data. Reading heat-encoded data may not be the friendliest experience for people, since subtle differenced in data are often blended into similar colors.</li>
</ul>
<h3>The winning visual construct</h3>
<ul>
	<li><b><a href="https://bost.ocks.org/mike/uberdata/">Chord diagram</a> :</b> This is a diagram where a circular whole is bisected into sections, each section connecting to the other if applicable with a chord. The thickness of this chord represents the magnitude of this connection. This was chosen as the form of visualization because it effectively represents the nature of inter-party interaction by allowing us to encode the magnitude of these interactions using varying thickness of the chord. Also in-bound interactions by a party can be represented as an inbound bezier curve instead of a connecting chord. This diagram is also very easy to read because parties of interest can be highlighted by hovering over the arc that represents the party. The above image of uber rides is an example of a chord diagram.</li>
</ul>
<h2>Crawling Wikipedia and analysing data</h2>
The python programs processes consecutive edits to calculate a difference between them. The result of the crawling and data processing is an adjacency matric which also carries weight data.
<img class="center-image" src="{{ site.url }}{{ site.baseurl }}/images/adjacency.png"/>
<h3>When user adds to previous edit</h3>
Suppose a user <b>User 1</b> adds 90 characters to the commit made by the last edit, this data does not overwrite the contents of the previous edit. This is thus calculated as <i>insert strength</i> and added to the [User 1, User 1] position of the adjacency matrix.
<h3>When user deletes from a previous edit</h3>
Suppose a user <b>User 1</b> deletes 30 characters from the edit made by <b>User 2</b>. In the next edit, <b>User 2</b> make an edit that deletes 4 characters from the previous edit. This is represented in the delete strength at [User 1, User 2] and [User 2, User 1], this does not preserve the directionality of the edits as we are interested in identifying edit wars. 
<h2>How to read this</h2>
<img class="wide-img" src="{{ site.url }}{{ site.baseurl }}/images/UN-viz.png"/>
<div class="sub-title"><p>Edits made on English wiki chil marriage page, Jul 2010 - Jul 2011</p></div>
In the above diagram, for the highlighted arc for <b>79.173.228.159</b>, you can see the inbound curve representign the added data by all edits made by this user. The user also has had major edit interactions with <b>ClueBot NG</b>, seems to be the only user whose edits have been worked by the user <b>ClueBot NG</b>. Edit wars can be identified as thick and equally distributed chord connections between two entities. There are no edit wars visibly identifyable in the above diagram. 
<h2>Other work</h2>
Other work included making scatter plots for wikipedia visit data, translations done for Hindi and Marathi language keywords for twitter analysis. The volunteering stint concluded with a written report detailing the feasability of useing Wikipedia as a big data source.
<h2>Potential and challenges</h2>
A continued challenge is representing the directionality of the edits along with the magnitude of the edits - without complicating the visual representation. Currently the diagram serves us right in identifying the level of interactions and edit wars on a page. However, it is not possible to know if the edits have been done by user A on B or vice versa. Since time also play an important role in identifying an edit war - a better visualization can incorporate that dimension as well.