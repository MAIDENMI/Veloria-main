import { NextRequest, NextResponse } from 'next/server';

// Simple email storage - replace with your preferred service
const emails: string[] = [];

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email required' },
        { status: 400 }
      );
    }

    // Store email (in production, use a database or email service)
    emails.push(email);
    
    // TODO: Integrate with your email service
    // Examples:
    // - Mailchimp API
    // - ConvertKit API  
    // - Airtable
    // - Google Sheets
    // - Database (PostgreSQL, MongoDB)
    
    console.log(`New waitlist signup: ${email}`);
    console.log(`Total signups: ${emails.length}`);
    
    return NextResponse.json({
      success: true,
      message: 'Successfully added to waitlist',
      count: emails.length
    });
    
  } catch (error) {
    console.error('Waitlist signup error:', error);
    return NextResponse.json(
      { error: 'Failed to add to waitlist' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Admin endpoint to view signups (add authentication in production)
  return NextResponse.json({
    count: emails.length,
    emails: emails // Remove this in production for privacy
  });
}
