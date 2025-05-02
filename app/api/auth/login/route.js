import User from '@/app/modals/userschema';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectDB from '@/app/utility/dbConnect';

export async function POST(req) {
  await connectDB();

  const body = await req.json();
  const { email, password, role } = body;

  try {
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

    // Create a cookie that expires in 1 day (same as JWT)
    const cookieExpiry = new Date();
    cookieExpiry.setDate(cookieExpiry.getDate() + 1);

    return new Response(
      JSON.stringify({ 
        message: 'Login successful', 
        role: user.role,
        redirectUrl: `/com-man/${user.role}`
      }),
      {
        status: 200,
        headers: {
          'Set-Cookie': `token=${token}; HttpOnly; Path=/; Expires=${cookieExpiry.toUTCString()};SameSite=Lax${
            process.env.NODE_ENV === 'production' ? '; Secure' : ''
          }`,
          'content-type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Login error:', error);
    return new Response(
      JSON.stringify({ error: 'An error occurred during login' }),
      {
        status: 500,
        headers: {
          'content-type': 'application/json',
        },
      }
    );
  }
}