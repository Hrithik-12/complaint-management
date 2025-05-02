import connectDB from '@/app/utility/dbConnect';  // MongoDB connection
import Complaint from '@/app/modals/schema';       // Mongoose model
import { sendEmail } from '@/app/utility/Nodemailer'; // 🔥 SendGrid mail utility

connectDB();

export async function POST(request) {
  const { title, description, category, priority } = await request.json();

  try {
    const newComplaint = new Complaint({
      title,
      description,
      category,
      priority
    });

    await newComplaint.save();

    // ✅ Send email notification to admin
    await sendEmail({
      to: process.env.SENDGRID_SENDER,  // Or any admin email
      subject: '🆕 New Complaint Submitted',
      html: `
        <h3>New Complaint Submitted</h3>
        <p><strong>Title:</strong> ${title}</p>
        <p><strong>Category:</strong> ${category}</p>
        <p><strong>Priority:</strong> ${priority}</p>
        <p><strong>Description:</strong> ${description}</p>
      `
    });

    return new Response(JSON.stringify(newComplaint), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error creating complaint', error }), { status: 400 });
  }
}
