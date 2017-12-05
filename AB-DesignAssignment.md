---
layout: post
title: "Medication Tracker : Tracking patient medication administration routines and history for nurses."
subtitle: "PREPARING USER INTERFACES FOR AN ML REVOLUTION"
description: "Machine learning carries with itself an air of complexity, of black-box-ness. Products have been making use of ML but this technology remains heavily abstracted to the end-user. The project explores the possibility of exposing ML systems to non-expert users through visualizations."
image: iml.png
timeline: "Dec 2017"
team_size: "1"
role: "Product design."
methods: "Personas, interface design, domain deep dive, scenario building"
client: "Design exercise"
lead_quote: "For busy nurses, always on their feet - I designed a mobile interface that helps them track past and upcoming medication administration tasks."
date: 2012-05-22
tags: [Human Factors, Experimental Tooling, Sketch]
comments: false
share: false
permalink: AdvisoryB-DesignAssignment
---
<div class="btn-div">
	<img class="wide-img" src="{{ site.url }}{{ site.baseurl }}/images/Annotated_Low.png"/><br/><br/>
  <p>Annotated low-fidelity mock-ups detailing the various screens of the mobile application and their states.<br/><br/><a class="waves-effect waves-light btn" href="{{ site.url }}{{ site.baseurl }}/images/AdvisoryBoard_AkashShetye.sketch">Download Sketch File</a></p>
</div>

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<h2>Challenge, constraints and assumptions</h2>
The challenge can be summarized as
<ul>
<li>1. Track medicines given to patients in the past</li>
<li>2. Add new medicines given to patients - as they are administered</li>
</ul>
Apart from the information mentioned in the exercise document, I made the following assumptions.
<ul>
	<li>1. Prescribing doctors set up the drug prescriptions - the time of the day they must be administered, in what dosage and which drugs etc.</li>
	<li>2. A nurse's workday is divided into hour-long slots. These prescriptions are added into these slots, the nurses must administer these prescriptions within that hour-long slot.</li>
</ul>
Other more facts, assumptions and objectives were condensed into line items.
<img src="{{ site.url }}{{ site.baseurl }}/images/assumptions.jpg"/>
<h3>Why mobile</h3>
Being a nurse is not a sedentary job. A nurse needs to move around physically - to the patients all the time. This means the solution needs to be lightweight, movable and already incorporated into their lives so that there is no burden of extra gear. Mobile usage on the job is fairly common and I think a mobile based solution would be the most user friendly from a purely physical perspective, it also has its advantages with familiarity of use.
<h2>Domain deepdive - with Google</h2>
I prefer to explore the domain knowledge related to the problems I am solving. It helps me articulate and imagine the user better. The deep dive for this exercise was very elementary. The most important take aways were:
<ul>
	<li>1. The keywords we are looking for are <b>medication administration</b></li>
	<li>2. There were some paper-based forms of different types that related to tracking medication administration. They were week based, tabular and very time-table-like</li>
</ul>
From the domain exploration, I observed that nursing is a very specialized and highlytrained profession. I made it a point to have a very straightforward user-experience. Avoiding doing anything that may feel infantilizing to the user. E.g, trivial checklists, stepped wizards etc.
<h2>Personas</h2>
<img src="{{ site.url }}{{ site.baseurl }}/images/personas.jpg"/>
<h2>Scenario building</h2>
<img src="{{ site.url }}{{ site.baseurl }}/images/scenario.jpg"/>
Three key scenarios were constructed apart from the one mentioned in the exercise document.
<h3>Happy flow</h3>
A smooth linear flow which begins by Bob, the nurse looking up a patient. Checking their timeline to see their next dose, proceeding to administer their dose by starting the administration record in the system and then physically administering. Concluding the administration process by finishing the administration recording process in the system.
<h3>Checking up on your patients</h3>
Bob, the nurse has lost track of time and had been bust at an operation. He needs to know the status of his assigned patient's medication administration. He also needs to know which of his assigned patients needs him for administering medicine. He will go to this patient and conduct the medical administration.
<h3>Missed actions</h3>
Bob has very busy day working on an emergency operation. Once finished with the operation, he looks forward to getting back to his routine. Bob doesn't know it yet, but he has missed administering Jay's midnight dose. The notifications from the app let Bob know his missed doses and informs him about upcoming administration appointments.
<h2>Early wireframes</h2>
<img src="{{ site.url }}{{ site.baseurl }}/images/wireframes.jpg"/>
Early wireframes were crucial in forming the following decisions about the design of the app.
<h3>Why Patient ID as search parameter</h3>
I assume that the patient ID uniquely identifies a patient in the hospital system. We cannot depend upon names, age, sex or even hospital bed numbers to uniquely identify patients.<br/>
Also, basing the search operation on a human-unfriendly alphanumeric squence forces the user to pay attention to the patient details instead of relying on memory.<br/>
The cognitive heavy search experience also encourages users to bookmark the patients of their interest. Improves user experience as this is not a very search-based workflow anyway.<br/>
<h3>Double entry system for drug and dosage</h3>
This is to ensure that the user has administered the right drug and dosage. Ideally this is best done after the drug has been administered. This will catch any wrongly administered drug - or atleast alert the nurse about the mistake. Currently there is no way to enforce that it be done after adminsitering the drug physically.
<h3>Back button consistency</h3>
The app is designed to maintain a consistent back button behavior.
<h3>Temporal and big-picture views</h3>
While wireframing, I realized that nurses needed both A) A representation of their patient's medication administration duties and history on a time scale B) An overview of the patients medical prescriptions.<br/>
The app accomodates both these visions.
<h3>Bottom up flow of information</h3>
The user-experience recognizes the value of its user's experiences and wisdom. There is a channel for nurses to report issues with the data's integrity.
<h2>Future work and critique</h2>
<h3>Frictionless physical and virtual world connections</h3>
The biggest issue with auditing applications is ensuring that the data being recorded represents the ground reality. This could be solved by using QR or barcode based systems to ensure the drug being administered is physically present, that the patient is physically present when recording the medication administration.
<h3>Privacy</h3>
Privacy of patient data is a big concern. Perhaps limiting the search function to only crawl the patient records that the nurse is allowed to - could help limit indiscriminate access and enforce a need-to-know based patient record access.
<h2>Resources</h2>
Material Icons [https://material.io/icons/]<br/>
Wireframe Kit Teracyhq [https://github.com/teracyhq/wireframe]