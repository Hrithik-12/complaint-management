import connectDB from '@/app/utility/dbConnect';
import Complaint from '@/app/modals/schema';
import { sendEmail } from '@/app/utility/Nodemailer';

connectDB();

// export async function PUT(request, {params}) {
//     const { id } = params // ✅ Don't await context

//     const { title, description, category, priority, status } = await request.json();

//     try {
//         const updatedComplaint = await Complaint.findByIdAndUpdate(
//             id,
//             { title, description, category, priority, status },
//             { new: true }
//         );

//         if (!updatedComplaint) {
//             return new Response(JSON.stringify({ message: 'Complaint not found' }), { status: 404 });
//         }

//         return new Response(JSON.stringify(updatedComplaint), { status: 200 });
//     } catch (error) {
//         return new Response(JSON.stringify({ message: 'Error updating complaint', error }), { status: 400 });
//     }
// }


// export async function PUT(request, { params }) {
//     const { id } = params;
//     const { title, description, category, priority, status } = await request.json();
  
//     try {
//       const updatedComplaint = await Complaint.findByIdAndUpdate(
//         id,
//         { title, description, category, priority, status },
//         { new: true }
//       );
  
//       if (!updatedComplaint) {
//         return new Response(JSON.stringify({ message: 'Complaint not found' }), { status: 404 });
//       }
  
//       // ✅ Send Email Notification on Status Update
//       await sendEmail({
//         to: process.env.SENDGRID_SENDER, // Or the admin's actual email
//         subject: '✅ Complaint Status Updated',
//         html: `
//           <h3>Status of Complaint Updated</h3>
//           <p><strong>Title:</strong> ${updatedComplaint.title}</p>
//           <p><strong>New Status:</strong> ${updatedComplaint.status}</p>
//           <p><strong>Updated At:</strong> ${new Date().toLocaleString()}</p>
//         `
//       });
  
//       return new Response(JSON.stringify(updatedComplaint), { status: 200 });
//     } catch (error) {
//       return new Response(JSON.stringify({ message: 'Error updating complaint', error }), { status: 400 });
//     }
//   }

// ✅ Use your Nodemailer utility

export async function PUT(request, { params }) {
  const { id } = params;
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

    // ✅ Send email after status update
    await sendEmail({
      to: process.env.EMAIL_TO || process.env.EMAIL_USER, // Can be the same or different admin
      subject: '✅ Complaint Status Updated',
      html: `
        <h3>Status Updated</h3>
        <p><strong>Title:</strong> ${updatedComplaint.title}</p>
        <p><strong>Status:</strong> ${updatedComplaint.status}</p>
        <p><strong>Updated At:</strong> ${new Date().toLocaleString()}</p>
      `
    });

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
