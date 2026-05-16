# OneTool Deployment Guide

This document outlines the steps to deploy OneTool to production (Vercel or AWS).

## 1. Environment Configuration

You must provide the following environment variables in your production environment (e.g., Vercel Dashboard):

### **Authentication (Clerk)**
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: From Clerk Dashboard
- `CLERK_SECRET_KEY`: From Clerk Dashboard

### **Database (Prisma)**
- `DATABASE_URL`: Your production PostgreSQL URL (e.g., Supabase, Neon, or AWS RDS).
- `DIRECT_URL`: (Optional) Required for some serverless DB providers.

### **Payments (Stripe)**
- `STRIPE_SECRET_KEY`: From Stripe Dashboard (Live mode).
- `NEXT_PUBLIC_STRIPE_PRO_PRICE_ID`: The ID of your "Pro" subscription price.
- `STRIPE_WEBHOOK_SECRET`: (Required later) To sync payments with the DB.

### **AI Engine (OpenAI)**
- `OPENAI_API_KEY`: Your production API key.

### **General**
- `NEXT_PUBLIC_APP_URL`: The production URL (e.g., `https://onetool.com`).

---

## 2. Deployment Steps (Vercel - Recommended)

1. **Push to GitHub**: Initialize a git repository and push your code.
2. **Import to Vercel**: Connect your GitHub repo to Vercel.
3. **Set Framework**: Ensure it's set to "Next.js".
4. **Environment Variables**: Copy the values from your `.env.local` to the Vercel "Environment Variables" section.
5. **Build & Deploy**: Vercel will automatically run `npm run build` and `prisma generate`.

---

## 3. Post-Deployment Database Setup

Once the app is live, you need to sync your database schema:

```bash
# Run this locally with your production DATABASE_URL in .env
npx prisma db push
```

---

## 4. Stripe Webhooks (Critical for Subscriptions)

To ensure users get their Pro credits after paying, you must set up a Stripe Webhook:

1. Go to **Stripe Dashboard > Developers > Webhooks**.
2. Add an endpoint: `https://your-domain.com/api/webhooks/stripe`.
3. Select events: `checkout.session.completed`, `invoice.payment_succeeded`.
4. Copy the **Signing Secret** to your `STRIPE_WEBHOOK_SECRET` environment variable.

---

## 5. Custom Logic for Tools

To add custom logic to a specific tool:
1. Locate its ID in `src/lib/tools-data.ts`.
2. Add a specific `if (tool.id === 'your-id')` block in `src/app/api/tools/process/route.ts`.
3. Implement your custom API call or library logic there.
