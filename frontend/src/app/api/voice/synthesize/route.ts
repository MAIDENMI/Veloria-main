import { NextRequest, NextResponse } from 'next/server';

// This replaces the Node voice service
export async function POST(request: NextRequest) {
  try {
    const { text, voice_id } = await request.json();
    
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voice_id || 'EXAVITQu4vr4xnSDxMaL'}`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': process.env.ELEVENLABS_API_KEY!
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_monolingual_v1',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5
        }
      })
    });

    if (!response.ok) {
      throw new Error(`ElevenLabs API error: ${response.statusText}`);
    }

    const audioBuffer = await response.arrayBuffer();
    const base64Audio = Buffer.from(audioBuffer).toString('base64');
    
    return NextResponse.json({
      audio: base64Audio,
      status: 'success'
    });
    
  } catch (error) {
    console.error('Voice synthesis error:', error);
    return NextResponse.json(
      { error: 'Failed to synthesize voice' },
      { status: 500 }
    );
  }
}
