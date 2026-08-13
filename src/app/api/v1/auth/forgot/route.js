'use server';

import db from 'lib/db';
import crypto from 'crypto';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return Response.json({ error: 'E-mail é obrigatório' }, { status: 400 });
    }

    // Verifica se o usuário existe
    const userResult = await db.query(
      `SELECT id, email FROM usuarios WHERE email = $1 LIMIT 1`,
      [email],
    );

    if (userResult.rows.length === 0) {
      // Não revela se usuário existe ou não
      return Response.json(
        { message: 'Se o e-mail existir, enviaremos instruções.' },
        { status: 200 },
      );
    }

    const user = userResult.rows[0];

    // Gera token único
    const token = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1h

    // Apaga tokens antigos desse usuário (boa prática)
    await db.query(`DELETE FROM password_resets WHERE usuario_id = $1`, [
      user.id,
    ]);

    // Insere novo token
    await db.query(
      `
      INSERT INTO password_resets (usuario_id, token, expires_at)
      VALUES ($1, $2, $3)
    `,
      [user.id, token, expiresAt],
    );

    // Monta link dinâmico
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset/${token}`;

    // Envia e-mail pelo resend
    await resend.emails.send({
      from: 'Suporte b2b-connect-platform <no-reply@b2b-connect-platform.com>',
      to: user.email,
      subject: 'Recuperação de senha',
      html: `
        <p>Você solicitou a recuperação de senha.</p>
        <p>Clique no link abaixo para cadastrar uma nova senha:</p>
        <p><a href="${resetLink}">${resetLink}</a></p>
        <p>O link expira em 1 hora.</p>
      `,
    });

    return Response.json(
      { message: 'Se o e-mail existir, enviaremos instruções.' },
      { status: 200 },
    );
  } catch (err) {
    console.error('Erro em forgot-password:', err);
    return Response.json({ error: 'Erro interno' }, { status: 500 });
  }
}
