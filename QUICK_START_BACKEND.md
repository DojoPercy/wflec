# 🚀 Quick Start: Google Apps Script Backend

## What You're Setting Up

A free, serverless backend that:
- ✅ Stores registrations in Google Sheets
- ✅ Sends emails to your team (Richmond & Rhema)
- ✅ Sends confirmation emails to registrants
- ✅ Requires NO server, NO hosting, NO monthly fees

## 5-Minute Setup

### Step 1: Deploy Google Apps Script (2 minutes)

1. Open [Google Apps Script](https://script.google.com/)
2. Click **"New project"**
3. Copy ALL the code from `google-apps-script/Code.gs`
4. Paste it into the editor (replace any existing code)
5. Click **Save** (💾 icon)
6. Click **Deploy** → **New deployment**
7. Click the ⚙️ gear → Select **"Web app"**
8. Settings:
   - Execute as: **"Me"**
   - Who has access: **"Anyone"**
9. Click **Deploy**
10. Authorize when prompted (click Allow)
11. **COPY THE WEB APP URL** (looks like `https://script.google.com/macros/s/ABC.../exec`)

### Step 2: Configure Your App (1 minute)

1. In your project root, create `.env.local`:
   ```bash
   NEXT_PUBLIC_GOOGLE_SCRIPT_URL=paste_your_url_here
   ```

2. Paste the Web App URL you copied

### Step 3: Test It (2 minutes)

1. Restart your dev server:
   ```bash
   npm run dev
   ```

2. Open your site and click "Register Interest"

3. Fill out the form and submit

4. Check:
   - ✅ Google Sheet created with your data
   - ✅ Email received at richmond@radcommgroup.com
   - ✅ Email received at rhema@radcommgroup.com
   - ✅ Confirmation email sent to registrant

## Done! 🎉

Your registration system is now live and fully functional.

## What Gets Created Automatically

### Google Sheet Format

| Timestamp | Full Name | Email | Phone | Country | Organization | Job Title | Attendance Type | Areas of Interest | Additional Message | Status |
|-----------|-----------|-------|-------|---------|--------------|-----------|-----------------|-------------------|-------------------|--------|
| 2025-10-03 12:30 | John Doe | john@example.com | +971... | UAE | Energy Corp | CEO | Conference Delegate | Leadership, Innovation | Looking forward... | New |

- Headers in brand orange (#F6C15F)
- Alternating row colors
- Auto-formatted
- Easy to export to CSV/Excel

### Email Notifications

**To Your Team:**
```
Subject: 🎯 New WFLEC 2026 Registration

[Beautiful HTML email with all registration details]
- Personal info
- Professional info
- Areas of interest
- Direct link to Google Sheet
```

**To Registrant:**
```
Subject: Thank You for Registering - WFLEC 2026

[Professional confirmation email]
- Event details (March 10-12, 2026)
- Registration summary
- Next steps
- Contact information
```

## Customization

### Change Email Recipients

In `Code.gs`, line 19:
```javascript
const NOTIFICATION_EMAILS = [
  'richmond@radcommgroup.com',
  'rhema@radcommgroup.com'
];
```

Add or remove emails, then redeploy (same Web App URL stays valid).

### Change Sheet Name

In `Code.gs`, line 17:
```javascript
const SHEET_NAME = 'WFLEC 2026 Registrations';
```

### View All Registrations

The sheet is automatically created in your Google Drive:
- File name: **"WFLEC 2026 Registration Data"**
- Search for it in Google Drive
- Or check the link in notification emails

## Troubleshooting

### No sheet created?
- Run the `testSetup()` function in Apps Script
- Check the execution log for errors

### No emails received?
- Check spam folder
- Verify email addresses in code
- Make sure you authorized the script

### Form not submitting?
- Check browser console for errors
- Verify `.env.local` has the correct URL
- Make sure URL starts with `https://script.google.com/macros/s/`

### Script authorization issues?
- Click "Advanced" → "Go to project (unsafe)"
- Grant all permissions requested
- The script needs: Sheets, Drive, Gmail access

## Google Sheets Features You Get

### Export Data
File → Download → CSV or Excel

### Filter & Sort
Use Google Sheets built-in tools

### Add Formulas
- Count registrations by type
- Track registrations over time
- Calculate statistics

### Share Access
Share the sheet with team members:
- View only for general team
- Edit access for admins

### Integration Options
Connect to:
- Zapier (automate workflows)
- HubSpot (CRM sync)
- Slack (notifications)
- Google Data Studio (dashboards)

## Security & Privacy

✅ **HTTPS encrypted** - All data transfer is secure  
✅ **Google authentication** - Only you can access the sheet  
✅ **No public database** - Data stays in your Google Drive  
✅ **Rate limited** - Google prevents abuse automatically  
✅ **Audit trail** - See all executions in Apps Script dashboard  

## Cost: $0

Google provides generous free quotas:
- 100 emails/day
- Unlimited sheet rows
- Unlimited form submissions
- 6 min max execution time per run

For WFLEC, this is more than enough!

## Production Ready

This system is:
- ✅ Battle-tested (millions use Apps Script)
- ✅ Reliable (99.9%+ uptime)
- ✅ Scalable (handles thousands of submissions)
- ✅ Maintainable (easy to update)
- ✅ Free (forever)

## Support

Having issues? Check:
1. `google-apps-script/SETUP_INSTRUCTIONS.md` - Detailed guide
2. Apps Script execution log - See what went wrong
3. Browser console - Check for frontend errors

## Pro Tips

### Backup Your Data
1. Open the Google Sheet
2. File → Make a copy
3. Do this weekly during registration period

### Monitor Registrations
1. Add a bookmark to your Google Sheet
2. Check it daily
3. Update Status column as you process registrations

### Custom Status Values
Change from "New" to:
- "Contacted"
- "Confirmed"
- "Paid"
- "Declined"

This helps you track your registration pipeline!

---

**That's it!** Your registration system is now production-ready. 🎉
