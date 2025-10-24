// api/contact.js
import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  try {
    if (req.method === 'OPTIONS') {
      res.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN || '*');
      res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      return res.status(200).end();
    }

    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, email, message, honeypot } = req.body || {};
    if (honeypot) return res.status(200).json({ ok: true });
    if (!name || !email) return res.status(400).json({ error: 'Name and email are required' });

    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE;
    if (!url || !key) {
      return res.status(500).json({ error: 'Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE env vars' });
    }

    const supabase = createClient(url, key);

    const userAgent = req.headers['user-agent'] || '';
    const ip = (req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '').toString().split(',')[0];

    const { error } = await supabase
      .from('leads')
      .insert([{ name, email, message, user_agent: userAgent, ip }]);

    if (error) {
      console.error('Supabase insert error:', error);
      return res.status(500).json({ error: 'Database insert failed', detail: error.message });
    }

    // Optional email via Resend (won’t block success if it fails)
    if (process.env.RESEND_API_KEY && process.env.OWNER_EMAIL) {
      const html = `
        <h2>New Website Lead</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong><br>${escapeHtml(message || '')}</p>
      `;
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: 'DNC Luxe <onboarding@resend.dev>',
            to: [process.env.OWNER_EMAIL],
            subject: 'New DNC Luxe Lead',
            html
          })
        });
      } catch (e) {
        console.warn('Resend failed:', e);
      }
    }

    res.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN || '*');
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Unhandled error:', err);
    return res.status(500).json({ error: 'Server error', detail: String(err?.message || err) });
  }
}

function escapeHtml(s = '') {
  return s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
