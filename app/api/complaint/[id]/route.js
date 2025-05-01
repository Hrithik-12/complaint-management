import connectDB from '@/app/utility/dbConnect';  // To connect to the MongoDB
import Complaint from '@/app/modals/schema';  // The Complaint model
connectDB();
export async function PUT(request,{params}) {
    // Update complaint status
    const { id } = params;  // Get ID from the URL
    const { title, description, category, priority, status } = await request.json();

  
    try {
      const updatedComplaint = await Complaint.findByIdAndUpdate(id, { title,description,category,priority,status }, { new: true });
      if(!updatedComplaint) {
        return new Response(JSON.stringify({ message: 'Complaint not found' }), { status: 404 });
      }   
      return new Response(JSON.stringify(updatedComplaint), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ message: 'Error updating complaint', error }), { status: 400 });
    }
  }
  
  export async function DELETE(request,{params}) {
    // Delete complaint by ID
    const { id } = params;  // Get ID from the URL
  
    try {
      const deledtcomplaint=await Complaint.findByIdAndDelete(id,);
      if(!deledtcomplaint) {
        return new Response(JSON.stringify({ message: 'Complaint not found' }), { status: 404 });
      }   
      return new Response(JSON.stringify({ message: 'Complaint deleted' }), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ message: 'Error deleting complaint', error }), { status: 400 });
    }
  }
  