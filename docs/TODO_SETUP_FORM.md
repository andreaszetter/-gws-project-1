# Google Form Setup Instructions

## IMPORTANT: Replace Placeholder URLs

The documentation currently contains placeholder URLs (`https://forms.google.com/`) that need to be replaced with your actual Google Form URL.

## Steps to Complete Setup

### 1. Create the Google Form

Follow the instructions in [FORM_SETUP.md](FORM_SETUP.md) to create your Google Form with all the necessary questions.

### 2. Get Your Form's Sharing Link

Once your form is created:
1. In the Google Form editor, click the "Send" button (top right)
2. Click the link icon (🔗)
3. Check "Shorten URL" for easier sharing
4. Copy the form link (it will look like: `https://forms.gle/xxxxx` or `https://docs.google.com/forms/d/e/xxxxx/viewform`)

### 3. Replace Placeholder URLs

Replace `https://forms.google.com/` with your actual form URL in these files:

- [ ] `README.md` (line 22 and line 62)
- [ ] `CONTRIBUTING.md` (line 11)
- [ ] `docs/FORM_QUICK_START.md` (line 40)

You can use this command to find all instances:
```bash
find . -name "*.md" -type f -exec grep -n "https://forms.google.com/" {} +
```

Or use find and replace in your editor to replace all at once.

### 4. Test the Form

After updating the URLs:
1. Click on the link in README.md to make sure it opens your form
2. Test submitting a sample idea through the form
3. Verify you can see the response in your Google Form responses

### 5. Set Up Response Notifications (Optional)

To get notified when someone submits an idea:
1. Open your Google Form
2. Go to the "Responses" tab
3. Click the three dots menu (⋮)
4. Select "Get email notifications for new responses"

### 6. Commit Your Changes

After replacing the URLs, commit your changes:
```bash
git add README.md CONTRIBUTING.md docs/FORM_QUICK_START.md
git commit -m "Update Google Form URLs with actual form link"
git push
```

### 7. Set Up Automation (Recommended)

**Want form submissions to automatically appear in your repository?**

Once the basic form is working, set up automation to have submissions automatically committed to IDEAS.md:

📖 **Follow the instructions in [AUTOMATION_SETUP.md](AUTOMATION_SETUP.md)**

Benefits:
- ✅ No manual processing needed
- ✅ Ideas appear in repository within 1 minute
- ✅ Takes about 15-20 minutes to set up
- ✅ Works completely automatically once configured

## Example

If your form URL is `https://forms.gle/ABC123xyz`, you would replace:

**Before:**
```markdown
**📝 [Submit an Idea via Google Form](https://forms.google.com/)**
```

**After:**
```markdown
**📝 [Submit an Idea via Google Form](https://forms.gle/ABC123xyz)**
```

## Need Help?

If you need assistance setting up the form or have questions about the process, feel free to reach out to the team!

---

*This file can be deleted once you've completed the setup and replaced all placeholder URLs.*
