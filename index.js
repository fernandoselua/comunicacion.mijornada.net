const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
app.use(express.json());

app.post('/enviar-email', async (req, res) => {
  const { email, cuerpo } = req.body;

  if (!email || !cuerpo) {
    return res.status(400).json({ status: 'error', message: 'Faltan parámetros' });
  }

  // Configura tu SMTP aquí
  let transporter = nodemailer.createTransport({
    host: 'smtp.serviciodecorreo.es',
    port: 465,
    secure: true,
    auth: {
      user: 'comunicacion@mijornada.net',
      pass: 'Fernando1!2"'
    }
  });

  try {
    await transporter.sendMail({
      from: '"API Email" <comunicacion@mijornada.net>',
      to: email,
      subject: 'Mensaje desde API',
      text: cuerpo
    });
    res.json({ status: 'success', message: 'Email enviado' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('API Email escuchando en puerto', PORT);
});
