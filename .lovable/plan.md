## Plan: Connect project to GitHub with two-way sync

### Goal
Move the source of truth for the slide deck to GitHub so you and your team can pull it, edit it in Claude Code (or any IDE), and push changes back — while keeping the Lovable preview and one-click publishing working.

### What will happen
1. Authorize the Lovable GitHub app on your GitHub account.
2. Pick the GitHub account / org where the repo should live.
3. Lovable creates a new repo, pushes the current project code to it, and enables two-way sync.
4. After that, edits pushed to GitHub sync back to Lovable, and edits in Lovable sync to GitHub.

### Team workflow after connection
- Copy the GitHub repo URL into your Telegram chat.
- Anyone with repo access can `git clone`, open in Claude Code, Cursor, or VS Code, edit components, and push.
- Lovable preview updates automatically on push.
- You can still publish from Lovable when you want a live public URL.

### Important constraints
- Only one GitHub account can be linked to your Lovable account. The repo will live under your GitHub account/org.
- Collaborators edit via the GitHub repo, not by connecting their own Lovable accounts to GitHub.
- To let others edit in Lovable's UI, invite them as Editors to the Lovable project separately.

### Steps I will take
1. Trigger the GitHub connection flow.
2. Wait for you to authorize and select the target account/org in the Lovable UI.
3. Confirm the repo is created and the initial push succeeds.
4. Return the GitHub repo URL and instructions for the team.

### No file changes required
This is a project-level integration action; it does not modify source files.

Ready to proceed?