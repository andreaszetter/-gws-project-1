# Form Automation Quick Reference

Quick reference for maintaining the automated form submission system.

## How It Works

```
User fills form → Form submits → Apps Script triggers → Formats data → Commits to GitHub → Idea appears in IDEAS.md
```

⏱️ **Processing time**: ~30-60 seconds from submission to commit

## Key Files

| File | Purpose |
|------|---------|
| `FormToGitHub.gs` | The Google Apps Script code |
| `AUTOMATION_SETUP.md` | Complete setup instructions |
| Google Sheet | Stores form responses and runs the script |
| IDEAS.md | Where new ideas are added |

## Common Tasks

### Check if automation is working

1. Go to Google Sheet → Extensions → Apps Script
2. Click **Executions** (📋 icon)
3. Look for recent successful runs

### Test the automation

Option 1: Submit test through the form
- Fill form with test data marked "TEST - Delete"
- Wait 1 minute
- Check IDEAS.md for the entry

Option 2: Run test function
1. Open Apps Script editor
2. Select `testFormSubmission` function
3. Click **Run**
4. Check execution log and repository

### View error logs

1. Apps Script → **Executions**
2. Click on failed execution
3. Read error details

### Update GitHub token

When your token expires:
1. Generate new token at GitHub Settings → Developer settings → Personal access tokens
2. Apps Script → Project Settings → Script Properties
3. Edit `GITHUB_TOKEN` property
4. Save

### Pause automation

1. Apps Script → **Triggers**
2. Click ⋮ next to trigger → Delete

### Resume automation

1. Apps Script → **Triggers**
2. **+ Add Trigger**
3. Function: `onFormSubmit`
4. Event: "On form submit"
5. Save

## Troubleshooting Quick Fixes

| Problem | Quick Fix |
|---------|-----------|
| Ideas not appearing | Check Executions for errors |
| Token expired | Generate new token, update properties |
| Wrong repository | Verify GITHUB_OWNER and GITHUB_REPO properties |
| Duplicate submissions | Delete extra triggers, keep only one |
| Script not running | Check trigger exists and is active |

## Script Properties Reference

Required properties in Apps Script → Project Settings:

```
GITHUB_TOKEN        = ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
GITHUB_OWNER        = andreaszetter
GITHUB_REPO         = -gws-project-1
GITHUB_BRANCH       = main
GITHUB_FILE_PATH    = IDEAS.md (optional, this is the default)
```

## Useful Apps Script Functions

| Function | Purpose | How to Run |
|----------|---------|------------|
| `testConfiguration()` | Verify setup | Select function, click Run |
| `testFormSubmission()` | Test without form | Select function, click Run |
| `onFormSubmit(e)` | Main function | Runs automatically on form submit |

## Monitoring

### Regular checks (monthly):

- ✅ Review execution log for errors
- ✅ Verify token hasn't expired
- ✅ Check IDEAS.md for proper formatting
- ✅ Test with a form submission

### Signs of problems:

- ❌ No executions showing in log
- ❌ Failed executions in log
- ❌ Form submissions not appearing in IDEAS.md
- ❌ Malformed markdown in IDEAS.md

## Support Resources

1. **Setup issues**: See AUTOMATION_SETUP.md
2. **Script errors**: Check Apps Script execution log
3. **GitHub API errors**: Verify token and repository access
4. **Form issues**: Check Google Form settings and Sheet link

## Emergency Contacts

If automation fails completely:
1. **Immediate**: Pause automation (delete trigger)
2. **Short-term**: Process submissions manually using FORM_SUBMISSION_TEMPLATE.md
3. **Long-term**: Debug using execution logs and AUTOMATION_SETUP.md troubleshooting

## Tips

💡 **Best Practices**:
- Set GitHub token expiration reminder in your calendar
- Test after any changes to script or form
- Keep backup of script code
- Document any customizations you make

💡 **Performance**:
- Script typically uses <1 second execution time
- GitHub API calls are well within free tier limits
- No special Google Workspace subscription needed

---

*For complete setup instructions, see [AUTOMATION_SETUP.md](AUTOMATION_SETUP.md)*
