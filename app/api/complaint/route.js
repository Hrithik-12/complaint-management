import connectDB from '@/app/utility/dbConnect';  // To connect to the MongoDB
import Complaint from '@/app/modals/schema';  // The Complaint model
import { sendEmail } from '@/app/utility/Nodemailer';  // For sending emails

connectDB();

export async function POST(request) {
  // Create a new complaint
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

export async function GET() {
  // Get all complaints (for admin view)
  try {
    const complaints = await Complaint.find();
    return new Response(JSON.stringify(complaints), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error fetching complaints', error }), { status: 400 });
  }
}

