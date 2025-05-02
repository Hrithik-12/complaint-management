// app/api/auth/register/route.js
import User from '@/app/modals/userschema';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectDB from '@/app/utility/dbConnect';

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password, role } = body;

    await connectDB();
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ error: 'User already exists' }), {
        status: 400,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword, role });

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    return new Response(JSON.stringify({ message: 'Registration successful', role: user.role }), {
      status: 201,
      headers: {
        'Set-Cookie': `token=${token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Lax${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`,
        'Content-Type': 'application/json',
      },
    });
  } catch (err) {
    console.error('Registration error:', err);
    return new Response(JSON.stringify({ error: 'Something went wrong' }), {
      status: 500,
    });
  }
}
