import connectDB from '@/app/utility/dbConnect';
import Complaint from '@/app/modals/schema';

connectDB();

export async function PUT(request, {params}) {
    const { id } = params // ✅ Don't await context

    const { title, description, category, priority, status } = await request.json();

    try {
        const updatedComplaint = await Complaint.findByIdAndUpdate(
            id,
            { title, description, category, priority, status },
            { new: true }
        );

        if (!updatedComplaint) {
            return new Response(JSON.stringify({ message: 'Complaint not found' }), { status: 404 });
        }

        return new Response(JSON.stringify(updatedComplaint), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Error updating complaint', error }), { status: 400 });
    }
}

export async function DELETE(request, { params }) {
    const { id } = params;

    try {
        const deletedComplaint = await Complaint.findByIdAndDelete(id);

        if (!deletedComplaint) {
            return new Response(JSON.stringify({ message: 'Complaint not found' }), { status: 404 });
        }

        return new Response(JSON.stringify({ message: 'Complaint deleted' }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Error deleting complaint', error }), { status: 400 });
    }
}
