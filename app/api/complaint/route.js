import connectDB from '@/app/utility/dbConnect';  // To connect to the MongoDB
import Complaint from '@/app/modals/schema';  // The Complaint model

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

