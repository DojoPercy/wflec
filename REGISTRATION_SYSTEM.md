# WFLEC 2026 Registration System

## Overview
Fully functional registration form system with validation, success states, and global state management.

## Features

### ✅ **Complete Form Fields**
- Personal Information:
  - Full Name (required)
  - Email Address (required, validated)
  - Phone Number (required)
  - Country (required)

- Professional Information:
  - Organization (required)
  - Job Title (required)
  - Attendance Type (required dropdown):
    - Conference Delegate
    - Speaker/Panelist
    - Sponsor/Exhibitor
    - Media/Press
    - Student/Academic

- Areas of Interest (multi-select checkboxes):
  - Leadership Development
  - Innovation & Technology
  - Policy & Regulation
  - Networking
  - Exhibition
  - Sponsorship Opportunities
  - Speaking Opportunities

- Additional Message (optional textarea)

### ✅ **Form Validation**
- Real-time field validation
- Email format validation
- Required field checks
- Visual error indicators
- Error messages below fields
- Clears errors on user input

### ✅ **User Experience**
- Beautiful modal overlay with backdrop blur
- Smooth animations (Framer Motion)
- Loading state with spinner during submission
- Success state with animated checkmark
- Auto-close after successful submission
- Responsive design (mobile-friendly)
- Scroll-enabled for long forms
- Keyboard accessible (ESC to close)

### ✅ **Global Integration**
All registration buttons throughout the site are connected:
- Hero section "Register Interest" button
- Header "Register Now" button (desktop & mobile)
- Key Pillars section CTA
- Target Audience section CTA
- Board Speakers section CTA

## Technical Implementation

### Components
1. **`registrationModal.tsx`** - Main form component with validation
2. **`registrationContext.tsx`** - Context provider for global state
3. **`registrationWrapper.tsx`** - Wrapper to connect modal with context

### Usage Pattern
```tsx
// Any component can trigger the modal
import { useRegistration } from '@/context/registrationContext';

const MyComponent = () => {
  const { openModal } = useRegistration();
  
  return (
    <button onClick={openModal}>Register Now</button>
  );
};
```

## Google Apps Script Backend - FULLY IMPLEMENTED ✅

### What's Included

The registration system now includes a complete Google Apps Script backend that:

1. **Automatically creates a Google Sheet** to store all registrations
2. **Sends email notifications** to Richmond & Rhema for every registration
3. **Sends confirmation emails** to registrants
4. **Formats data beautifully** with brand colors
5. **Handles all security** (CORS, authentication, etc.)
6. **Costs $0** - completely free using Google's infrastructure

### Quick Setup (5 minutes)

1. **Deploy the Google Apps Script:**
   - Follow the detailed instructions in `google-apps-script/SETUP_INSTRUCTIONS.md`
   - Copy your Web App URL

2. **Configure your Next.js app:**
   ```bash
   # Copy the example file
   cp env.example .env.local
   
   # Edit .env.local and paste your Web App URL
   NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_ID/exec
   ```

3. **Restart your development server:**
   ```bash
   npm run dev
   ```

4. **Test it:**
   - Fill out the registration form
   - Check your Google Sheet for the new entry
   - Check your email for notifications

### What Happens When Someone Registers

1. **Form submission** → Validated on frontend
2. **Data sent to Google Apps Script** via secure POST request
3. **Google Sheet updated** with new registration (formatted with brand colors)
4. **Email sent to team** (Richmond & Rhema) with full details
5. **Confirmation email sent** to registrant with event details
6. **Success message shown** to user

### Files Created

```
google-apps-script/
├── Code.gs                    # Main Google Apps Script code
└── SETUP_INSTRUCTIONS.md      # Detailed deployment guide

env.example                     # Environment variable template
```

## Email Integration Options

### Option 1: Direct to Email (Simple)
Send form data directly to the contact emails using a service like:
- SendGrid
- Mailgun
- AWS SES
- Resend

### Option 2: CRM Integration
Connect to your CRM system:
- HubSpot
- Salesforce
- Pipedrive
- Zoho CRM

### Option 3: Database Storage
Store registrations in a database:
- PostgreSQL
- MongoDB
- Supabase
- Firebase

## Styling
- Matches WFLEC brand colors (#F6C15F, #F3911A, #E94E1B)
- Dark theme with glassmorphism effects
- Gradient buttons and accents
- Smooth hover states and transitions
- Professional, executive aesthetic

## Form Data Structure
```typescript
interface FormData {
  fullName: string;
  email: string;
  phone: string;
  organization: string;
  jobTitle: string;
  country: string;
  attendanceType: string;
  interests: string[];
  message: string;
}
```

## Testing Checklist
- [ ] All required fields show validation errors
- [ ] Email validation works correctly
- [ ] Multi-select interests work properly
- [ ] Form submission shows loading state
- [ ] Success message displays correctly
- [ ] Modal closes properly
- [ ] All CTA buttons open the modal
- [ ] Mobile responsive layout works
- [ ] Form resets after successful submission
- [ ] Error handling displays properly

## Next Steps
1. Set up your backend API endpoint
2. Configure email service or CRM integration
3. Test form submissions end-to-end
4. Set up email notifications to Richmond & Rhema
5. Add analytics tracking (Google Analytics, etc.)
6. Consider adding CAPTCHA for spam prevention
