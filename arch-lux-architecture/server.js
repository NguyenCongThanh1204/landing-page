import express from 'express';
import multer from 'multer';
import dotenv from 'dotenv';
import { createClient } from '@sanity/client';

dotenv.config();

const app = express();
const upload = multer({ storage: multer.memoryStorage() });
const PORT = 3000;

app.use(express.json());

app.post('/api/submit-application', upload.single('cv'), async (req, res) => {
  try {
    const { fullName, phone, position } = req.body || {};
    const file = req.file;

    if (!fullName || !phone) {
      return res.status(400).json({ message: 'Vui lòng điền họ tên và số điện thoại.' });
    }

    const projectId = process.env.VITE_SANITY_PROJECT_ID;
    const dataset = process.env.VITE_SANITY_DATASET || 'production';
    const sanityToken = process.env.VITE_SANITY_WRITE_TOKEN;

    if (!projectId || !sanityToken) {
      return res.status(500).json({
        message: 'Thiếu VITE_SANITY_PROJECT_ID hoặc VITE_SANITY_WRITE_TOKEN trên server.'
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

    if (file) {
      const asset = await sanityClient.assets.upload('file', file.buffer, {
        filename: file.originalname || 'cv.pdf',
        contentType: file.mimetype || 'application/octet-stream',
      });
      cvUrl = asset.url;
    }

    const serviceId = process.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = process.env.VITE_EMAILJS_TEMPLATE_ID_CAREERS;
    const publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY;
    const privateKey = process.env.VITE_EMAILJS_PRIVATE_KEY || process.env.VITE_EMAILJS_ACCESS_TOKEN;

    if (!serviceId || !templateId || !publicKey || !privateKey) {
      return res.status(500).json({ message: 'Thiếu cấu hình EmailJS trên server (Service ID / Template / Public Key / Private Key).' });
    }

    const emailPayload = {
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      accessToken: privateKey,
      template_params: {
        from_name: fullName,
        phone,
        job_position: position,
        cv_link: cvUrl,
      },
    };

    const emailResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(emailPayload),
    });

    if (!emailResponse.ok) {
      const text = await emailResponse.text();
      console.error('EmailJS error response:', text);
      throw new Error(text || 'EmailJS send failed');
    }

    return res.status(200).json({ success: true, message: 'Gửi hồ sơ thành công.' });
  } catch (error) {
    console.error('submit-application error:', error);
    return res.status(500).json({
      success: false,
      message: error?.message || 'Gửi hồ sơ thất bại. Vui lòng thử lại.',
    });
  }
});

app.post('/api/increment-post-view', async (req, res) => {
  try {
    const { postId } = req.body || {};

    if (!postId) {
      return res.status(400).json({ success: false, message: 'Thiếu postId.' });
    }

    const projectId = process.env.VITE_SANITY_PROJECT_ID;
    const dataset = process.env.VITE_SANITY_DATASET || 'production';
    const sanityToken = process.env.VITE_SANITY_WRITE_TOKEN;

    if (!projectId || !sanityToken) {
      return res.status(500).json({
        success: false,
        message: 'Thiếu VITE_SANITY_PROJECT_ID hoặc VITE_SANITY_WRITE_TOKEN trên server.'
      });
    }

    const sanityClient = createClient({
      projectId,
      dataset,
      useCdn: false,
      apiVersion: '2024-01-01',
      token: sanityToken,
    });

    const result = await sanityClient
      .patch(postId)
      .setIfMissing({ views: 0 })
      .inc({ views: 1 })
      .commit();

    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error('increment-post-view error:', error);
    return res.status(500).json({
      success: false,
      message: error?.message || 'Không thể cập nhật lượt xem.'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Local API server running on http://localhost:${PORT}`);
});
