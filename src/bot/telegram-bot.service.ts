import { Injectable } from '@nestjs/common';
import { Telegraf, Markup, Context, session } from 'telegraf';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Murojat } from '../murojat/murojat.entity';
import { Payment } from '../payments/payment.entity';
import { Student } from '../student/student.entity';
import { PaymentMethod } from '../enums/payment-method.enum';

interface SessionData {
  step?: 'name' | 'phone' | 'comment' | 'student_name' | 'payment_amount';
  name?: string;
  phone?: string;
  comment?: string;
  studentName?: string;
  studentId?: number;
  amount?: number;
}

@Injectable()
export class TelegramBotService {
  private bot: Telegraf<Context & { session?: SessionData }>;

  constructor(
    @InjectRepository(Murojat)
    private murojatRepo: Repository<Murojat>,
    @InjectRepository(Payment)
    private paymentRepo: Repository<Payment>,
    @InjectRepository(Student)
    private studentRepo: Repository<Student>,
  ) {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    if (!token) throw new Error('BOT_TOKEN topilmadi');

    this.bot = new Telegraf(token);
    this.bot.use(session());
    this.startBot();
  }

  startBot() {
    this.bot.start(async (ctx) => {
      ctx.session = {};
      await ctx.reply(
        '👋 Assalomu aleykum! Tugmalardan birini tanlang:',
        Markup.keyboard([['📝 Murojaat qoldirish'], ['💳 To‘lov qilish']])
          .resize()
          .oneTime(),
      );
    });

    // Murojaat 
    this.bot.hears('📝 Murojaat qoldirish', async (ctx) => {
      ctx.session = { step: 'name' };
      await ctx.reply('✍️ Iltimos, ismingizni yozing:');
    });

    // Tolov
    this.bot.hears('💳 To‘lov qilish', async (ctx) => {
      ctx.session = { step: 'student_name' };
      await ctx.reply('👤 Iltimos, Studentning ism va familiyasini kiriting:');
    });

    this.bot.on('text', async (ctx) => {
      ctx.session ||= {};
      const session = ctx.session;
      const text = ctx.message.text.trim();

      // name
      if (session.step === 'name') {
        if (!text) return ctx.reply('❗ Ismingiz bo‘sh bo‘lmasin.');
        session.name = text;
        session.step = 'phone';
        await ctx.reply('📞 Telefon raqamingizni yozing:');

      // phone
      } else if (session.step === 'phone') {
        session.phone = text;
        session.step = 'comment';
        await ctx.reply('💬 Izohingizni yozing:');

      //coment
      } else if (session.step === 'comment') {
        session.comment = text;

        try {
          const murojat = this.murojatRepo.create({
            name: session.name,
            phone: session.phone,
            comment: session.comment,
          });
          await this.murojatRepo.save(murojat);

          await ctx.reply(` Rahmat, ${session.name}! Murojaatingiz qabul qilindi.\nMurojatni teshkirish uchun Postmanda /murojat sorovi yuboring!`);
          ctx.session = {};
        } catch (err) {
          console.error(err);
          await ctx.reply(' Murojaatingizni saqlashda xatolik yuz berdi.');
        }

      
      } else if (session.step === 'student_name') {
        session.studentName = text;

        const [firstName, lastName] = text.split(' ');
        const student = await this.studentRepo.findOne({
          where: { firstName, lastName },
        });

        if (!student) return ctx.reply(' Bunday Student topilmadi. Iltimos, to‘g‘ri ism va familiya kiriting.');

        session.step = 'payment_amount';
        session.studentId = student.id;

        await ctx.reply(`💰 ${student.firstName} ${student.lastName} uchun to‘lov summasini kiriting (so‘m):`);

      
      } else if (session.step === 'payment_amount') {
        const amount = parseFloat(text);
        if (isNaN(amount)) return ctx.reply(' Iltimos, to‘g‘ri raqam kiriting.');

        const student = await this.studentRepo.findOne({ where: { id: session.studentId! } });
        if (!student) return ctx.reply(' Student topilmadi.');

        
        const payment = this.paymentRepo.create({
            amount,
            method: PaymentMethod.TELEGRAM, 
          student,
        });
        await this.paymentRepo.save(payment);

        await ctx.reply(` To‘lov qabul qilindi: ${amount} so‘m\nTolov ni teshkirish uchun Postmanda /payments sorovi yuboring!`);

        await this.notifyPayment(
          `💳 Yangi to'lov:\n👤 ${student.firstName} ${student.lastName}\n💰 ${amount} so‘m\n💳 Telegram`
        );

        ctx.session = {};
      }
    });

    this.bot.launch();
    console.log('Telegram bot ishga tushdi...');
  }

  async notifyPayment(message: string) {
    if (!process.env.ADMIN_CHAT_ID) return;
    await this.bot.telegram.sendMessage(process.env.ADMIN_CHAT_ID, message);
  }
}
