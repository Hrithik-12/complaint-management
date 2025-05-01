import User from '@/app/modals/userschema';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectDB from '@/app/utility/dbConnect';

export async function POST(req) {
  await connectDB();

  const body = await req.json();
  const { email, password,role } = body;

  const user = await User.findOne({ email });
  if (!user) {
    return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
      status: 401,
    });
  }
  const userRole = user.role;
  if (userRole !== role) {
    return new Response(JSON.stringify({ error: 'Unauthorized role' }), {
      status: 403,
    });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
      status: 401,
    });
  }

  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  return new Response(
    JSON.stringify({ message: 'Login successful', role: user.role }),
    {
      status: 200,
      headers: {
        'Set-Cookie': `token=${token}; HttpOnly; Path=/; Max-Age=86400`,
        'Content-Type': 'application/json',
      },
    }
  );
}
