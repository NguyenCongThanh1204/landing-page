import { createClient } from '@sanity/client';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const contentType = req.headers.get('content-type') || '';
    if (!contentType.includes('multipart/form-data')) {
      return res.status(400).json({ message: 'Request must be multipart/form-data' });
    }

    const formData = await req.formData();
    const fullName = String(formData.get('fullName') || '').trim();
    const phone = String(formData.get('phone') || '').trim();
    const position = String(formData.get('position') || '').trim();
    const file = formData.get('cv');

    if (!fullName || !phone) {
      return res.status(400).json({ message: 'Vui lòng điền họ tên và số điện thoại.' });
    }

    const projectId = process.env.VITE_SANITY_PROJECT_ID;
    const dataset = process.env.VITE_SANITY_DATASET || 'production';
    const sanityToken = process.env.VITE_SANITY_WRITE_TOKEN;

    if (!projectId || !sanityToken) {
      return res.status(500).json({
        message: 'Thiếu cấu hình Sanity trên server. Vui lòng thêm VITE_SANITY_PROJECT_ID và VITE_SANITY_WRITE_TOKEN vào Vercel Environment Variables.'
      });
    }

    const sanityClient = createClient({
      projectId,
      dataset,
      useCdn: false,
      apiVersion: '2024-01-01',
      token: sanityToken,
    });

    let cvUrl = 'Chưa tải lên file CV';

    if (file && typeof file.arrayBuffer === 'function') {
      const asset = await sanityClient.assets.upload('file', file, {
        filename: file.name || 'cv.pdf',
        contentType: file.type || 'application/octet-stream',
      });

      cvUrl = asset.url;
    }

    const serviceId = process.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = process.env.VITE_EMAILJS_TEMPLATE_ID_CAREERS;
    const publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      return res.status(500).json({
        message: 'Thiếu cấu hình EmailJS trên server.'
      });
    }

    const emailResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        template_params: {
          from_name: fullName,
          phone,
          job_position: position,
          cv_link: cvUrl,
        },
      }),
    });

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text();
      throw new Error(errorText || 'EmailJS send failed');
    }

    return res.status(200).json({
      success: true,
      message: 'Gửi hồ sơ thành công.',
    });
  } catch (error) {
    console.error('submit-application error:', error);

    return res.status(500).json({
      success: false,
      message: 'Gửi hồ sơ thất bại. Vui lòng thử lại sau.',
    });
  }
}

