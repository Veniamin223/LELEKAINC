import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, phone, city, projectType, budget, message } = await req.json();

    if (!name || !email || !phone || !projectType || !budget) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Determine the sender email
    // If domain lelekainc.com is not verified yet, Resend API key will only allow sending from onboarding@resend.dev.
    // We try estimates@lelekainc.com first, and fall back to onboarding@resend.dev if needed.
    let fromEmail = 'estimates@lelekainc.com';
    let fallbackUsed = false;

    let adminEmailResult = null;
    let clientEmailResult = null;

    try {
      // 1. Send Alert to Leleka Inc Admin
      adminEmailResult = await resend.emails.send({
        from: `Leleka Builder Inc. <${fromEmail}>`,
        to: ['lelekainc.ca@gmail.com'],
        subject: `New Proposal Request: ${projectType} from ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <h2 style="color: #FF5A1F; border-bottom: 2px solid #FF5A1F; padding-bottom: 10px; margin-top: 0;">New Project Proposal Request</h2>
            <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #f3f4f6; width: 150px;">Client Name:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #f3f4f6;">Email:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6;"><a href="mailto:${email}">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #f3f4f6;">Phone Number:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6;"><a href="tel:${phone}">${phone}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #f3f4f6;">City/Location:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6;">${city || 'Not specified'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #f3f4f6;">Project Type:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6;">${projectType}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #f3f4f6;">Budget Range:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6;">${budget}</td>
              </tr>
            </table>
            
            <h3 style="margin-top: 25px; color: #111827;">Project Details & Message:</h3>
            <div style="background-color: #f9fafb; padding: 15px; border-radius: 6px; border: 1px solid #f3f4f6; font-size: 14px; line-height: 1.6;">
              ${message ? message.replace(/\n/g, '<br>') : 'No additional details provided.'}
            </div>
            
            <p style="margin-top: 30px; font-size: 12px; color: #9ca3af; text-align: center;">
              This notification was generated from lelekainc.com contact form.
            </p>
          </div>
        `,
      });
    } catch (adminError: any) {
      console.warn('Sending from estimates@lelekainc.com failed. Retrying with onboarding@resend.dev...');
      fromEmail = 'onboarding@resend.dev';
      fallbackUsed = true;

      // Retry sending to admin via onboarding address
      adminEmailResult = await resend.emails.send({
        from: `Leleka Builder Sandbox <onboarding@resend.dev>`,
        to: ['lelekainc.ca@gmail.com'],
        subject: `[SANDBOX] New Proposal Request: ${projectType} from ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h3>SANDBOX NOTIFICATION (Domain Not Verified Yet)</h3>
            <p><strong>Client Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>City/Location:</strong> ${city || 'Not specified'}</p>
            <p><strong>Project Type:</strong> ${projectType}</p>
            <p><strong>Budget Range:</strong> ${budget}</p>
            <p><strong>Message:</strong> ${message || 'None'}</p>
          </div>
        `,
      });
    }

    // 2. Send Auto-Confirmation to Client
    try {
      // Note: If domain is not verified, Resend will prevent sending to external addresses.
      // We wrap client email in a try-catch block so that if domain verification is pending,
      // it doesn't crash the entire request and at least the admin email gets delivered successfully!
      if (!fallbackUsed) {
        clientEmailResult = await resend.emails.send({
          from: 'Leleka Builder Inc. <estimates@lelekainc.com>',
          to: [email],
          subject: 'We Received Your Proposal Request! | Leleka Inc.',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
              <div style="text-align: center; margin-bottom: 25px;">
                <h1 style="color: #FF5A1F; margin: 0; font-size: 28px; letter-spacing: 0.05em;">LELEKA<span style="color: #0B0F17;">INC</span></h1>
                <p style="font-size: 12px; text-transform: uppercase; color: #9ca3af; letter-spacing: 0.1em; margin-top: 5px; font-weight: bold;">
                  Licensed & Insured • CSLB #1146118
                </p>
              </div>
              
              <p>Hello <strong>${name}</strong>,</p>
              <p>Thank you for requesting a project proposal from <strong>Leleka Builder Inc.</strong> We have successfully received your details for a <strong>${projectType}</strong> project in the Sacramento area.</p>
              
              <div style="background-color: #f9fafb; padding: 20px; border-radius: 6px; border: 1px solid #f3f4f6; margin: 25px 0;">
                <h3 style="margin-top: 0; color: #111827; font-size: 16px; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px;">Logged Request Details:</h3>
                <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                  <tr>
                    <td style="padding: 6px 0; color: #6b7280; width: 120px;">Project Type:</td>
                    <td style="padding: 6px 0; font-weight: bold; color: #111827;">${projectType}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; color: #6b7280;">Estimated Budget:</td>
                    <td style="padding: 6px 0; font-weight: bold; color: #111827;">${budget}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; color: #6b7280;">Location:</td>
                    <td style="padding: 6px 0; font-weight: bold; color: #111827;">${city || 'Sacramento Region'}</td>
                  </tr>
                </table>
              </div>
              
              <p>One of our Sacramento estimators will contact you via email at <strong>${email}</strong> or call you at <strong>${phone}</strong> within 1 business day to coordinate a convenient time for an on-site consultation and layout inspection.</p>
              
              <p>If you have any questions or need to make immediate changes to your request, please feel free to reply directly to this email or call our team at <strong>+1 (916) 539-9005</strong>.</p>
              
              <p style="margin-top: 25px;">Best regards,</p>
              <p style="font-weight: bold; color: #111827; margin-top: 5px;">Leleka Builder Inc. Team</p>
              
              <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 30px 0;" />
              <p style="font-size: 11px; color: #9ca3af; text-align: center; line-height: 1.5;">
                Leleka Builder Inc. • CSLB License #1146118 • Sacramento County, CA<br>
                This email was sent to ${email} as confirmation of your request.
              </p>
            </div>
          `,
        });
      } else {
        console.warn('Sandbox mode active: Client confirmation auto-reply skipped since domain is unverified.');
      }
    } catch (clientError: any) {
      console.error('Failed to send auto-reply to client (likely due to unverified domain limitations):', clientError.message);
    }

    return NextResponse.json({ 
      success: true, 
      fallbackUsed,
      adminEmailId: adminEmailResult?.data?.id || null,
      clientEmailId: clientEmailResult?.data?.id || null
    });

  } catch (error: any) {
    console.error('Resend api route error:', error);
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}
