---
layout: home
title: Home
landing-title: Hi, my name is Akash.
description: 
image: 
author: 
---

<!-- Banner -->
<section id="banner" class="major">
	<div class="inner">
		<header class="major">
			<h1><img src="assets/images/AKASH.gif" style="vertical-align: middle;"/>&nbsp;&nbsp;{{ page.landing-title }}</h1>
		</header>
		<div class="content">
			<p>{{ site.description }}</p>
			<ul class="actions">
				<li><a href="#one" class="button next scrolly">See My Portfolio</a></li>
				<br/><br/>
				<li><a href="#contact" class="button next scrolly">Contact Me</a></li>
				<br/><br/>
				<li><a href="assets/images/AkashShetye_UTAustin.pdf" class="button next scrolly">My Resume</a></li>
			</ul>
		</div>
	</div>
</section>
<!-- Two -->
<section id="two">
    <div class="inner">
	       <header class="major">
		       <h2>What do I do?</h2>
	       </header>
   		   <p>
		   	<b>Rapid Low-FI Prototyping</b> : I build prototypes. Protoypes that closely mimic the actual user-experience, catching holes in use cases that much earlier. It also helps to have a working low-fi product for usability assesment and value proposition.<br/><br/>
			<b>Data Wrangling and Automation in Python</b> : I automate the hard stuff. Currently at the UT-Austin libraries, I am reconciling human-curated fuzzy data with databases to identify duplicate assets.<br/><br/>
			<b>Functional Mock-Ups, Brainstorming and Requirements</b> : This is something I have experience doing. Refining and analysing requirements, building use cases and evaluating product features.<br/><br/>
			<b>Front-End Development</b> : I am proficient in JavaScript, CSS and HTML. I have built front-end interfaces for critical financial applications.<br/><br/>
			<b>Data-informed UX and AB Testing</b> : I can help build AB test scenarios, distill heuristics into conclusions. Objectively evaluate UX decisions.<br/><br/>
		   </p>
	   <ul class="actions">
	       <li><a href="#one" class="button next scrolly">See My Portfolio</a></li>
       </ul>
    </div>
</section>

<!-- Main -->
<div id="main">

<!-- One -->
{% include tiles.html %}

</div>

