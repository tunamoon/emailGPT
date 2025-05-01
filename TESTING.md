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

Confirm Availability (Marketing Team)
Send out calendar invite and agenda : Julia Kim, by EOD Monday April 22, 2025

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
**Model Used: Gemini 2.5 Pro**
---

**Actual Summary:**
Julia Kim proposed a Q3 marketing campaign kickoff call for Thursday, April 25, 2025, at 2 PM to discuss objectives, roles, and timeline. Daniel Reyes and Priya Nair confirmed their availability. Priya also requested to discuss Q2 social media performance. Julia confirmed the meeting time and will send a calendar invite and agenda by the end of Monday, April 22, 2025.

---
**Actual Action Items:**
Confirm availability for the kickoff call (Marketing Team).
Send out a calendar invite for the kickoff call (Julia Kim).
Send out an agenda for the kickoff call (Julia Kim) - by EOD on Monday, April 22, 2025.

---
**Actual Message by Message Breakdown:**

Message 1

Sender: Julia Kim (j.kim@company.com)
Main points: Proposing a kickoff call for the Q3 marketing campaign. The call is scheduled for this Thursday at 2 PM. The purpose is to align on objectives, assign initial roles, and discuss the timeline.
Requests or questions raised: Please confirm your availability.
Message 2

Sender: Daniel Reyes (d.reyes@company.com)
Main points: Confirms availability for Thursday at 2 PM. Expresses interest in discussing lead generation strategies.
Requests or questions raised: None.
Message 3

Sender: Priya Nair (p.nair@company.com)
Main points: Confirms availability for Thursday. Suggests discussing social media performance in Q2 and applying insights to the Q3 rollout.
Requests or questions raised: Could we also touch on social media performance in Q2?
Message 4

Sender: Julia Kim (j.kim@company.com)
Main points: Acknowledges that Thursday at 2 PM works for everyone. Confirms she will send out a calendar invite and agenda by the end of the day (EOD).
Requests or questions raised: None.

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

**Model Used: Gemini 2.5 Pro**
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
Alex and Jamie confirmed their dinner plans for Friday, April 26th at 7:30 PM at Paolo's. Jamie had already booked movie tickets (screen 5, row D seats 7 & 8). Alex later mentioned that Lisa might join them for dinner. Jamie offered to inform the restaurant to accommodate three people, which Alex agreed was a good idea.

**Actual Action Items:**
Tell the restaurant to make the reservation for 3 people (Jamie Lee).

**Actual Message by Message Breakdown:**
Message 1

Sender: Alex Rivera (alex.r@gmail.com)
Main points: Checking in about dinner plans for tonight at 7:30 PM at Paolo's. Also asking if Jamie booked the movie tickets.
Requests or questions raised: Are we still good for dinner tonight? 7:30 at Paolo’s? Let me know if we need to change anything. Did you book the movie tickets yet?
Message 2

Sender: Jamie Lee (jamie.lee@yahoo.com)
Main points: Confirming dinner at Paolo's at 7:30 PM and that she booked the movie tickets (screen 5, row D seats 7 & 8).
Requests or questions raised: None.
Message 3

Sender: Alex Rivera (alex.r@gmail.com)
Main points: Thanking Jamie and mentioning Lisa might join them for dinner.
Requests or questions raised: Hope that’s cool!
Message 4

Sender: Jamie Lee (jamie.lee@yahoo.com)
Main points: Saying it's fine for Lisa to join and asking if she should inform the restaurant.
Requests or questions raised: Should I tell the restaurant to make it 3 ppl?
Message 5

Sender: Alex Rivera (alex.r@gmail.com)
Main points: Agreeing that Jamie should inform the restaurant about the extra person.
Requests or questions raised: None.

**Evaluation**
The model performed better than expected. It was able to recognize action items that had already been resolved and only listed those that needed to be pursued following the email conversation. The model includes the sender email within the message by message breakdown as well, which also makes it more convenient in analysis