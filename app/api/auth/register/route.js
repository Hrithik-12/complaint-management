// app/api/auth/register/route.js
import User from '@/app/modals/userschema';
import bcrypt from 'bcryptjs';
import connectDB from '@/app/utility/dbConnect';

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password, role } = body;

    await connectDB();
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ email, password: hashedPassword, role });
    
    return new Response(JSON.stringify({ success: true }), {
      status: 201,
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'User already exists' }), {
      status: 400,
    });
  }
}
