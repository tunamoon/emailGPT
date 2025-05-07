This is our testing documentation for the EmailGPT Chrome extension
# Interface Testing
Our application consists of three components: ApiKeyForm, MainScreen and History feature. To ensure that each of these features renders appropriately when run, and to handle any edge cases, we created testing files for each of the features that use jest and react for automated testing to mock client inputs.

Test files are located alongside their respective components:

- `src/components/ApiKeyForm.test.tsx` - Tests for the API Key form
- `src/components/MainScreen.test.tsx` - Tests for the main interface
- `src/components/History.test.tsx` - Tests for the History feature 

These tests can be run with the 'npm test' command.


# Prompt Testing
## Test Case 1: Work Email Thread
**Input:**

---


**Subject:** Q3 Marketing Campaign – Kickoff Discussion  

---

**From:** Julia Kim <j.kim@company.com>  
**To:** Marketing Team  
**Date:** Mon, April 22, 2025 at 9:12 AM

Hi all,  

We need to start planning the Q3 marketing campaign. I’d like to propose a kickoff call this Thursday at 2 PM to align on objectives, assign initial roles, and discuss the timeline. Please confirm your availability.  

Best,  
Julia  

---

**From:** Daniel Reyes <d.reyes@company.com>  
**To:** Julia Kim, Marketing Team  
**Date:** Mon, April 22, 2025 at 9:37 AM

Thanks Julia, Thursday at 2 PM works for me. Looking forward to hearing everyone's thoughts on lead gen strategies.  

–Daniel  

---

**From:** Priya Nair <p.nair@company.com>  
**To:** Julia Kim, Marketing Team  
**Date:** Mon, April 22, 2025 at 10:03 AM

Thursday is fine. Could we also touch on social media performance in Q2? I’ve gathered some insights we might want to apply to the Q3 rollout.  

Thanks,  
Priya  

---

**From:** Julia Kim <j.kim@company.com>  
**To:** Marketing Team  
**Date:** Mon, April 22, 2025 at 10:45 AM

Great – sounds like Thursday at 2 PM works for everyone. I’ll send out a calendar invite and agenda by EOD.  

Julia  

---

**Expected Summary:**
An email thread started by Julia Kim to confirm if Thursday at 2pm works for q3 marketing campaign planning meeting. 

---
**Expected Action Items:**

Send out calendar invite: Julia Kim, by EOD Monday April 22, 2025
Send out calendar Agenda: Julia Kim, by EOD Monday April 22, 2025 

---
---
**Expected Message by Message Breakdown:**

Message 1
Sender: Julia Kim
Main Points:

Proposes kickoff meeting for Q3 marketing campaign.
Suggests Thursday at 2 PM.

Meeting goals: align on objectives, assign roles, and discuss timeline.
Requests/Questions:
Asks team to confirm availability.

Message 2
Sender: Daniel Reyes
Main Points:
Confirms Thursday at 2 PM works.

Mentions interest in discussing lead generation strategies.
Requests/Questions:
None.

Message 3
Sender: Priya Nair
Main Points:
Confirms availability for Thursday.

Requests discussion of Q2 social media performance.
Requests/Questions:
Asks if social media performance can be added to the agenda.

Message 4
Sender: Julia Kim
Main Points:
Confirms Thursday at 2 PM as meeting time.
Will send out invite and agenda by end of day.

Requests/Questions:

None.

---
**Model Used: Gemini 2.0 Flash**
---

**Actual Summary:**
A kickoff meeting for the Q3 Marketing Campaign is scheduled for **Thursday at 2 PM**. The meeting aims to align on objectives, assign initial roles, and discuss the timeline. Julia Kim will send a calendar invite and agenda.

---
**Actual Action Items:**
* Send out a calendar invite for the Q3 marketing campaign kickoff call (scheduled for Thursday at 2 PM).
* **Responsible:** Julia Kim
* **Deadline:** By End of Day (EOD) on Monday, April 22, 2025

* Send out an agenda for the Q3 marketing campaign kickoff call.
* **Responsible:** Julia Kim
* **Deadline:** By End of Day (EOD) on Monday, April 22, 2025

---
**Actual Message by Message Breakdown:**

**Message 1**

1. **Sender:** Julia Kim
2. **Main Points:**
* Announces the need to begin planning the Q3 marketing campaign.
* Proposes a kickoff meeting for Thursday at 2 PM.
* Outlines the purpose of the meeting: align on objectives, assign initial roles, discuss timeline.
3. **Requests or Questions Raised:**
* Asks team members to confirm their availability for the proposed meeting time (Thursday at 2 PM).

**Message 2**

1. **Sender:** Daniel Reyes
2. **Main Points:**
* Confirms availability for the proposed meeting time (Thursday at 2 PM).
* Expresses interest in discussing lead generation strategies during the meeting.
3. **Requests or Questions Raised:**
* None. (He expresses interest in a topic, but doesn't phrase it as a direct request to add it).

**Message 3**

1. **Sender:** Priya Nair
2. **Main Points:**
* Confirms availability for the proposed meeting time (Thursday).
* Indicates she has insights from Q2 social media performance that could be relevant for Q3.
3. **Requests or Questions Raised:**
* Asks if they can discuss Q2 social media performance during the kickoff meeting.

**Message 4**

1. **Sender:** Julia Kim
2. **Main Points:**
* Acknowledges that the proposed meeting time (Thursday at 2 PM) seems to work for everyone.
* States she will send a calendar invitation and agenda by the end of the day (EOD).
3. **Requests or Questions Raised:**
* None. (This message confirms action will be taken).

---

** Evaluation: **
The model works very well with the given prompts, it was able to give results even better than those we generated on our own, within a clean business context. 

## Test Case 2: Casual Personal Email
**Input:**
---
Subject: Re: Dinner plans?

From: Alex Rivera alex.r@gmail.com
To: Jamie Lee jamie.lee@yahoo.com
Date: Fri, April 26, 2025 at 8:32 AM

Hey Jamie,

Just checking in—are we still good for dinner tonight? 7:30 at Paolo’s? Let me know if we need to change anything.

Also: did you book the movie tickets yet?

– Alex

From: Jamie Lee jamie.lee@yahoo.com
To: Alex Rivera alex.r@gmail.com
Date: Fri, April 26, 2025 at 9:15 AM

Yep!
7:30 at Paolo’s works—
I got the tickets last night (screen 5, row D seats 7 & 8).
See you then! :)

Sent from my iPhone

From: Alex Rivera alex.r@gmail.com
To: Jamie Lee jamie.lee@yahoo.com
Date: Fri, April 26, 2025 at 12:02 PM

Awesome, thanks! 😄

btw—Lisa might join us for dinner. Hope that’s cool!

On Fri, Apr 26, 2025 at 9:15 AM Jamie Lee jamie.lee@yahoo.com wrote:

Yep!
7:30 at Paolo’s works—
I got the tickets last night (screen 5, row D seats 7 & 8).
See you then! :)

From: Jamie Lee jamie.lee@yahoo.com
To: Alex Rivera alex.r@gmail.com
Date: Fri, April 26, 2025 at 12:08 PM

Oh cool! Totally fine w/ Lisa joining. Should I tell the restaurant to make it 3 ppl?

From: Alex Rivera alex.r@gmail.com
To: Jamie Lee jamie.lee@yahoo.com
Date: Fri, April 26, 2025 at 12:11 PM

Yeah—better let them know so we don’t end up squeezed in 😂
Thanks!

**Model Used: Gemini 2.0 Flash**
**Expected Summary:**
A discussion about upcoming plans between Alex and Jamie. Alex and Jamie confirm dinner plans at Sao Paolo, 7:30pm and ticket booking.  Alex mentions modifying restaurant number to include order. 

**Expected Action Items:**
---
Confirm Plans (Jamie)
Book tickets (Jamie)
Call restaurant to change reservation to 3 people (Jamie)
---

**Expected Message by Message Breakdown:**

---
Message 1
Sender: Alex Rivera
Main Points:

Checks if dinner plans for 7:30 PM at Paolo’s are still on.

Asks if Jamie booked movie tickets.
Requests/Questions:

Confirms if dinner time/location are still okay.

Asks if movie tickets are booked.

Message 2
Sender: Jamie Lee
Main Points:

Confirms 7:30 PM at Paolo’s is fine.

Says movie tickets were booked the previous night (screen 5, row D, seats 7 & 8).

Says “See you then.”
Requests/Questions:

None.

Message 3
Sender: Alex Rivera
Main Points:

Thanks Jamie.

Mentions Lisa might join them for dinner.

Requests/Questions:
Hopes it’s okay if Lisa joins.

Message 4
Sender: Jamie Lee
Main Points:

Says it’s fine if Lisa joins.

Offers to tell the restaurant to update the reservation to 3 people.

Requests/Questions:
Asks if they should notify the restaurant about adding Lisa.

Message 5
Sender: Alex Rivera
Main Points:

Agrees they should let the restaurant know to reserve for 3.
Thanks Jamie.

Requests/Questions:
None.

---

**Actual Summary:**
* **Dinner Confirmed:** Alex and Jamie confirmed dinner plans for tonight (Friday, April 26) at 7:30 PM at Paolo's.
* **Movie Tickets Booked:** Jamie confirmed she booked the movie tickets.
* **Guest Added:** Alex informed Jamie that Lisa might join them for dinner.
* **Reservation Update:** Jamie agreed to Lisa joining and will update the restaurant reservation to three people.

**Actual Action Items:**
* Inform the restaurant (Paolo's) to change the reservation to 3 people.
* Responsible: Jamie Lee
* Deadline: Implicitly before dinner at 7:30 PM on Fri, April 26.

**Actual Message by Message Breakdown:**
**Message 1**

* **Sender:** Alex Rivera
* **Main Points:** Checking in about dinner plans for that night. Confirming the time (7:30 PM) and location (Paolo's).
* **Requests/Questions Raised:**
* Are the dinner plans (7:30 PM at Paolo's) still confirmed?
* Should any changes be made to the plans?
* Did Jamie book the movie tickets yet?

**Message 2**

* **Sender:** Jamie Lee
* **Main Points:** Confirms the dinner plans (7:30 PM at Paolo's) are still on. States that the movie tickets have been booked (providing details: Screen 5, Row D, Seats 7 & 8).
* **Requests/Questions Raised:** None.

**Message 3**

* **Sender:** Alex Rivera
* **Main Points:** Acknowledges Jamie's confirmation and thanks Jamie (presumably for booking tickets). Informs Jamie that another person, Lisa, might join them for dinner.
* **Requests/Questions Raised:** Asks (implicitly) if it's okay ("Hope that's cool!") for Lisa to join them for dinner.

**Message 4**

* **Sender:** Jamie Lee
* **Main Points:** Confirms that it is okay for Lisa to join them for dinner.
* **Requests/Questions Raised:** Asks if Jamie should inform the restaurant to change the reservation to three people.

**Message 5**

* **Sender:** Alex Rivera
* **Main Points:** Agrees that Jamie should update the restaurant reservation to three people. Thanks Jamie for doing so.
* **Requests/Questions Raised:** None (Confirms Jamie's suggested action).

**Evaluation**
The model performed better than expected. It was able to recognize action items that had already been resolved and only listed those that needed to be pursued following the email conversation, and outlined an implicit deadline. The model includes the sender email within the message by message breakdown as well, which also makes it more convenient in analysis. However, it did provide the summary in a bullet format instead of a paragraph so that was a bit different from our desired outcome. 