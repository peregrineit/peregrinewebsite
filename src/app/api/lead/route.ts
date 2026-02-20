import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { appendFileSync } from "fs";

const resend = new Resend(process.env.RESEND_API_KEY);

interface LeadData {
  name: string;
  email: string;
  company?: string;
  budget?: string;
  projectType?: string;
  message: string;
  pageUrl?: string;
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function logLead(data: LeadData) {
  try {
    const entry = JSON.stringify({ timestamp: new Date().toISOString(), ...data });
    appendFileSync("/tmp/leads.log", entry + "\n");
  } catch (err) {
    console.error("Failed to write lead log:", err);
  }
}

async function sendNotificationEmail(data: LeadData) {
  const { name, email, company, budget, projectType, message, pageUrl } = data;

  const body = `
New Project Inquiry

Name: ${name}
Email: ${email}
Company: ${company || "Not provided"}
Budget: ${budget || "Not provided"}
Project Type: ${projectType || "Not provided"}
Page URL: ${pageUrl || "Not provided"}

Message:
${message}
`.trim();

  await resend.emails.send({
    from: "Peregrine IT <onboarding@resend.dev>",
    to: "info@peregrine-it.com",
    subject: "New Project Inquiry – Peregrine IT",
    text: body,
  });
}

async function sendAutoReply(email: string, name: string) {
  await resend.emails.send({
    from: "Peregrine IT <onboarding@resend.dev>",
    to: email,
    subject: "We received your project request",
    text: `Hi ${name},

Thanks for contacting Peregrine IT.
An engineer will review your request and reply within 6 hours.

– Peregrine IT Team
https://peregrine-it.com`,
  });
}

export async function POST(request: NextRequest) {
  try {
    const data: LeadData = await request.json();

    // Validation
    if (!data.name || data.name.trim().length === 0) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }

    if (!data.email || !validateEmail(data.email)) {
      return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
    }

    if (!data.message || data.message.trim().length < 10) {
      return NextResponse.json(
        { error: "Message must be at least 10 characters." },
        { status: 400 }
      );
    }

    // Log lead to file
    logLead(data);

    // Send emails (non-blocking — don't fail the response if email fails)
    try {
      await sendNotificationEmail(data);
    } catch (err) {
      console.error("Failed to send notification email:", err);
    }

    try {
      await sendAutoReply(data.email, data.name);
    } catch (err) {
      console.error("Failed to send auto-reply email:", err);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Lead API error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
