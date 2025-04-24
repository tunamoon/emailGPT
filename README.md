# Team Collaboration Workflow
Work on separate branches
- every time you finish working
     1. `git fetch origin` so you're on latest remote version
     2. `git status` optional, to check whether you're on the right branch, what changes you've made that's different from local
     3. `git pull origin main` try to complete merge requests yourself
     5. `git add .`
     6. `git commit -m "whatever you did"`
     7. `git push origin [your current branch]`
- make a pull request, add luna as a reviewer
- try not to push directly to main if possible
Updating chrome extension
- to update the actual chrome extension, rerun `npm run build`
- run `npm run dev` to find the local version that updates immediately after you change code

# Colors
- gmail blue, orange, white

# Responsibilities
- Luna: UI, manage pull requests, readme, testing documentation
- Lisa: Action Items
- Emma: Summarizing, landing
- Alan: Message by message breakdown
- All: slides

